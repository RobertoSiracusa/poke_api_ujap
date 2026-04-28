import { pokeFetch } from "./client";
import type { TypeResponse } from "@/types/pokemon";

export async function getPokemonNamesByType(type: string): Promise<string[]> {
  const data = await pokeFetch<TypeResponse>(`/type/${type}`);
  return data.pokemon.map((p) => p.pokemon.name);
}
