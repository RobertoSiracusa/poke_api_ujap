import { pokeFetch } from "./client";
import type { PokemonDetail, PokemonSummary } from "@/types/pokemon";

interface ListResponse {
  results: PokemonSummary[];
}

export async function getAllPokemonNames(): Promise<string[]> {
  const data = await pokeFetch<ListResponse>("/pokemon?limit=100000&offset=0");
  return data.results.map((p) => p.name);
}

export async function getPokemonByName(name: string): Promise<PokemonDetail> {
  return pokeFetch<PokemonDetail>(`/pokemon/${name.toLowerCase()}`);
}
