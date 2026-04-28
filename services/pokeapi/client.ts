import { POKEAPI_BASE } from "@/lib/constants";

export async function pokeFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${POKEAPI_BASE}${path}`, {
    next: { revalidate: 60 * 60 * 24 },
  });
  if (!res.ok) {
    throw new Error(`PokeAPI ${res.status}: ${path}`);
  }
  return res.json() as Promise<T>;
}
