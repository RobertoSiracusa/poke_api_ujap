import { useEffect, useMemo, useReducer } from "react";
import { getAllPokemonNames, getPokemonByName } from "@/services/pokeapi/pokemon";
import { getPokemonNamesByType } from "@/services/pokeapi/type";
import { getPokemonNamesByGeneration } from "@/services/pokeapi/generation";
import { intersectNames, applyNameSubstring } from "@/lib/filters";
import { PAGE_SIZE } from "@/lib/constants";
import type { PokemonDetail, SearchFilters } from "@/types/pokemon";

type Action =
  | { type: "SET_LOADING" }
  | { type: "SET_RESULTS"; payload: PokemonDetail[] }
  | { type: "SET_ERROR"; payload: string }
  | { type: "LOAD_MORE" };

interface State {
  results: PokemonDetail[];
  loading: boolean;
  error: string | null;
  visibleCount: number;
}

const initial: State = {
  results: [],
  loading: false,
  error: null,
  visibleCount: PAGE_SIZE,
};

function reducer(s: State, a: Action): State {
  switch (a.type) {
    case "SET_LOADING":
      return { ...s, loading: true, error: null, visibleCount: PAGE_SIZE };
    case "SET_RESULTS":
      return { ...s, loading: false, results: a.payload };
    case "SET_ERROR":
      return { ...s, loading: false, error: a.payload };
    case "LOAD_MORE":
      return { ...s, visibleCount: s.visibleCount + PAGE_SIZE };
  }
}

export function usePokemonSearch(filters: SearchFilters) {
  const [state, dispatch] = useReducer(reducer, initial);

  const key = useMemo(
    () => `${filters.name}|${filters.type}|${filters.generation}`,
    [filters.name, filters.type, filters.generation]
  );

  useEffect(() => {
    const hasAnyFilter =
      filters.name.trim() || filters.type || filters.generation;

    if (!hasAnyFilter) {
      dispatch({ type: "SET_RESULTS", payload: [] });
      return;
    }

    let cancelled = false;
    dispatch({ type: "SET_LOADING" });

    (async () => {
      try {
        const [allNames, typeNames, genNames] = await Promise.all([
          // Only fetch full name list for name-only searches
          filters.name.trim() && !filters.type && !filters.generation
            ? getAllPokemonNames()
            : Promise.resolve(undefined),
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

        const slice = candidates.slice(0, 200);
        const details = await Promise.all(
          slice.map((n) => getPokemonByName(n).catch(() => null))
        );
        const clean = details.filter((d): d is PokemonDetail => d !== null);

        if (!cancelled) dispatch({ type: "SET_RESULTS", payload: clean });
      } catch (e) {
        if (!cancelled)
          dispatch({ type: "SET_ERROR", payload: (e as Error).message });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    ...state,
    visible: state.results.slice(0, state.visibleCount),
    canLoadMore: state.visibleCount < state.results.length,
    loadMore: () => dispatch({ type: "LOAD_MORE" }),
  };
}
