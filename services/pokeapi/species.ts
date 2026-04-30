import { pokeFetch } from "./client";
import type { SpeciesData, EvolutionChainResponse } from "@/types/pokemon";

export async function getPokemonSpecies(idOrName: string | number): Promise<SpeciesData> {
  return pokeFetch<SpeciesData>(`/pokemon-species/${idOrName}`);
}

export async function getEvolutionChain(url: string): Promise<EvolutionChainResponse> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Evolution chain fetch failed: ${res.status}`);
  return res.json();
}
