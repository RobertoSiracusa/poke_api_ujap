import { pokeFetch } from "./client";
import type { GenerationResponse } from "@/types/pokemon";

export async function getPokemonNamesByGeneration(gen: string): Promise<string[]> {
  const data = await pokeFetch<GenerationResponse>(`/generation/${gen}`);
  return data.pokemon_species.map((s) => s.name);
}
