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

// Get regional variant names from species varieties (including the base form)
function getRegionalVariants(species: SpeciesData): { name: string; label: string }[] {
  const forms = species.varieties
    .filter((v) => 
      v.is_default || 
      v.pokemon.name.includes("-alola") || 
      v.pokemon.name.includes("-galar") || 
      v.pokemon.name.includes("-hisui") || 
      v.pokemon.name.includes("-paldea")
    )
    .map((v) => {
      let label = "Normal";
      if (v.pokemon.name.includes("-alola")) label = "Alola";
      else if (v.pokemon.name.includes("-galar")) label = "Galar";
      else if (v.pokemon.name.includes("-hisui")) label = "Hisui";
      else if (v.pokemon.name.includes("-paldea")) label = "Paldea";
      
      return {
        name: v.pokemon.name,
        label,
      };
    });
  
  // Only return if there's actually a regional variant alongside the normal one
  return forms.length > 1 ? forms : [];
}

export interface PokemonDetailData {
  description: string;
  evolutions: EvolutionStep[];  // entire chain; first item is the base
  regionalVariants: { name: string; label: string; id: number; sprite: string; detail: any }[];
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
        // Language logic: Spanish first, then English
        const spanishEntry = species.flavor_text_entries.find(
          (e) => e.language.name === "es"
        );
        const englishEntry = species.flavor_text_entries.find(
          (e) => e.language.name === "en"
        );

        const descEntry = spanishEntry || englishEntry;
        const description = descEntry
          ? descEntry.flavor_text.replace(/[\n\f\r]/g, " ")
          : "";

        // Evolution chain
        const chainRes = await getEvolutionChain(species.evolution_chain.url);
        const evolutions = flattenChain(chainRes.chain);
        const hasEvolutions = evolutions.length > 1;

        // Regional variants (always fetch if there are any)
        const rawVariants = getRegionalVariants(species);
        const regionalVariants = await Promise.all(
          rawVariants.map(async (v) => {
            try {
              const poke = await getPokemonByName(v.name);
              return { 
                ...v, 
                id: poke.id, 
                sprite: poke.sprites.other?.["official-artwork"]?.front_default ?? poke.sprites.front_default ?? "",
                detail: poke 
              };
            } catch {
              const id = idFromUrl(
                species.varieties.find((sv) => sv.pokemon.name === v.name)?.pokemon.url ?? ""
              );
              return {
                ...v,
                id,
                sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
                detail: null
              };
            }
          })
        );

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
