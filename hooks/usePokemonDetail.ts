"use client";

import { useEffect, useState } from "react";
import { getPokemonSpecies, getEvolutionChain } from "@/services/pokeapi/species";
import { getPokemonByName } from "@/services/pokeapi/pokemon";
import type { EvolutionStep, ChainLink, SpeciesData } from "@/types/pokemon";

// Extracts pokemon ID from its PokeAPI URL
function idFromUrl(url: string): number {
  const parts = url.replace(/\/$/, "").split("/");
  return parseInt(parts[parts.length - 1], 10);
}

// Recursively flatten the chain into ordered steps
function flattenChain(link: ChainLink, steps: EvolutionStep[] = []): EvolutionStep[] {
  const id = idFromUrl(link.species.url);
  const minLevel = link.evolution_details[0]?.min_level ?? null;
  steps.push({
    name: link.species.name,
    id,
    sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
    minLevel,
  });
  for (const next of link.evolves_to) {
    flattenChain(next, steps);
  }
  return steps;
}

// Get regional variant names (alola / hisui) from species varieties
function getRegionalVariants(species: SpeciesData): { name: string; label: string }[] {
  return species.varieties
    .filter((v) => !v.is_default)
    .filter((v) => v.pokemon.name.includes("-alola") || v.pokemon.name.includes("-hisui"))
    .map((v) => ({
      name: v.pokemon.name,
      label: v.pokemon.name.includes("-alola") ? "Alola" : "Hisui",
    }));
}

export interface PokemonDetailData {
  description: string;
  evolutions: EvolutionStep[];  // entire chain; first item is the base
  regionalVariants: { name: string; label: string; id: number; sprite: string }[];
  hasEvolutions: boolean;
}

export function usePokemonDetail(pokemonId: number | null) {
  const [data, setData] = useState<PokemonDetailData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (pokemonId === null) {
      setData(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);
    setData(null);

    (async () => {
      try {
        const species = await getPokemonSpecies(pokemonId);

        // English flavor text – clean up escape characters from the API
        const descEntry = species.flavor_text_entries.find(
          (e) => e.language.name === "en"
        );
        const description = descEntry
          ? descEntry.flavor_text.replace(/[\n\f\r]/g, " ")
          : "No description available.";

        // Evolution chain
        const chainRes = await getEvolutionChain(species.evolution_chain.url);
        const evolutions = flattenChain(chainRes.chain);
        const hasEvolutions = evolutions.length > 1;

        // Regional variants (only if no evolutions)
        let regionalVariants: PokemonDetailData["regionalVariants"] = [];
        if (!hasEvolutions) {
          const rawVariants = getRegionalVariants(species);
          regionalVariants = await Promise.all(
            rawVariants.map(async (v) => {
              try {
                const poke = await getPokemonByName(v.name);
                return { ...v, id: poke.id, sprite: poke.sprites.other?.["official-artwork"]?.front_default ?? poke.sprites.front_default ?? "" };
              } catch {
                const id = idFromUrl(
                  species.varieties.find((sv) => sv.pokemon.name === v.name)?.pokemon.url ?? ""
                );
                return {
                  ...v,
                  id,
                  sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
                };
              }
            })
          );
        }

        if (!cancelled) {
          setData({ description, evolutions, hasEvolutions, regionalVariants });
          setLoading(false);
        }
      } catch (e) {
        if (!cancelled) {
          setError((e as Error).message);
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [pokemonId]);

  return { data, loading, error };
}
