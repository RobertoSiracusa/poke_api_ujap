import { useEffect, useMemo, useReducer, useCallback } from "react";
import { getAllPokemonNames, getPokemonByName } from "@/services/pokeapi/pokemon";
import { getPokemonNamesByType } from "@/services/pokeapi/type";
import { getPokemonNamesByGeneration } from "@/services/pokeapi/generation";
import { intersectNames, applyNameSubstring, applyFormFilter } from "@/lib/filters";
import { PAGE_SIZE } from "@/lib/constants";
import type { PokemonDetail, SearchFilters } from "@/types/pokemon";

type Action =
  | { type: "SET_LOADING" }
  | { type: "SET_INITIAL_RESULTS"; candidates: string[]; results: PokemonDetail[] }
  | { type: "SET_ERROR"; payload: string }
  | { type: "SET_LOADING_MORE" }
  | { type: "APPEND_RESULTS"; payload: PokemonDetail[] };

interface State {
  candidates: string[];
  results: PokemonDetail[];
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
}

const initial: State = {
  candidates: [],
  results: [],
  loading: false,
  loadingMore: false,
  error: null,
};

function reducer(s: State, a: Action): State {
  switch (a.type) {
    case "SET_LOADING":
      return { ...initial, loading: true };
    case "SET_INITIAL_RESULTS":
      return {
        ...s,
        loading: false,
        candidates: a.candidates,
        results: a.results,
      };
    case "SET_ERROR":
      return { ...s, loading: false, loadingMore: false, error: a.payload };
    case "SET_LOADING_MORE":
      return { ...s, loadingMore: true };
    case "APPEND_RESULTS":
      return {
        ...s,
        loadingMore: false,
        results: [...s.results, ...a.payload],
      };
    default:
      return s;
  }
}

export function usePokemonSearch(filters: SearchFilters) {
  const [state, dispatch] = useReducer(reducer, initial);

  const key = useMemo(
    () => `${filters.name}|${filters.type}|${filters.generation}|${filters.form}`,
    [filters.name, filters.type, filters.generation, filters.form]
  );

  useEffect(() => {
    let cancelled = false;
    dispatch({ type: "SET_LOADING" });

    (async () => {
      try {
        const [allNames, typeNames, genNames] = await Promise.all([
          getAllPokemonNames(),
          filters.type
            ? getPokemonNamesByType(filters.type)
            : Promise.resolve(undefined),
          filters.generation
            ? getPokemonNamesByGeneration(filters.generation)
            : Promise.resolve(undefined),
        ]);

        let candidates = intersectNames(allNames, typeNames, genNames);
        if (candidates === null) candidates = [];
        candidates = applyNameSubstring(candidates, filters.name);

        if (filters.form) {
          candidates = applyFormFilter(candidates, filters.form);
        }

        // Fetch first batch
        const firstSlice = candidates.slice(0, PAGE_SIZE);
        const details = await Promise.all(
          firstSlice.map((n) => getPokemonByName(n).catch(() => null))
        );
        const clean = details.filter((d): d is PokemonDetail => d !== null);

        if (!cancelled) {
          dispatch({
            type: "SET_INITIAL_RESULTS",
            candidates,
            results: clean,
          });
        }
      } catch (e) {
        if (!cancelled)
          dispatch({ type: "SET_ERROR", payload: (e as Error).message });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [key]);

  const loadMore = useCallback(async () => {
    if (state.loading || state.loadingMore) return;
    if (state.results.length >= state.candidates.length) return;

    dispatch({ type: "SET_LOADING_MORE" });

    try {
      const nextSlice = state.candidates.slice(
        state.results.length,
        state.results.length + PAGE_SIZE
      );
      const details = await Promise.all(
        nextSlice.map((n) => getPokemonByName(n).catch(() => null))
      );
      const clean = details.filter((d): d is PokemonDetail => d !== null);

      dispatch({ type: "APPEND_RESULTS", payload: clean });
    } catch (e) {
      dispatch({ type: "SET_ERROR", payload: (e as Error).message });
    }
  }, [state.loading, state.loadingMore, state.results.length, state.candidates]);

  return {
    ...state,
    visible: state.results, // Results are already paginated
    canLoadMore: state.results.length < state.candidates.length,
    loadMore,
  };
}

