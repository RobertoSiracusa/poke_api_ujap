export const POKEMON_TYPES = [
  "normal", "fire", "water", "electric", "grass", "ice", "fighting", "poison",
  "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark",
  "steel", "fairy",
] as const;

export const GENERATIONS = [
  { id: "1", label: "Gen I (Kanto)" },
  { id: "2", label: "Gen II (Johto)" },
  { id: "3", label: "Gen III (Hoenn)" },
  { id: "4", label: "Gen IV (Sinnoh)" },
  { id: "5", label: "Gen V (Unova)" },
  { id: "6", label: "Gen VI (Kalos)" },
  { id: "7", label: "Gen VII (Alola)" },
  { id: "8", label: "Gen VIII (Galar)" },
  { id: "9", label: "Gen IX (Paldea)" },
] as const;

export const PAGE_SIZE = 24;
export const POKEAPI_BASE = "https://pokeapi.co/api/v2";
