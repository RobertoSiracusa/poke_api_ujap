export const POKEMON_TYPES = [
  "normal", "fire", "water", "electric", "grass", "ice", "fighting", "poison",
  "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark",
  "steel", "fairy",
] as const;

export const TYPE_COLORS: Record<string, string> = {
  fire:     "#FFAB76",
  water:    "#76C0FF",
  grass:    "#86D97A",
  electric: "#FAE96A",
  psychic:  "#FA8FB8",
  ice:      "#A8E8F0",
  dragon:   "#A07CFF",
  dark:     "#6B5B4E",
  fairy:    "#F4A8CF",
  normal:   "#C2C2A3",
  fighting: "#D4786A",
  flying:   "#AABCF0",
  poison:   "#C47FCC",
  ground:   "#E8D08A",
  rock:     "#C9B86A",
  bug:      "#C0CC5A",
  ghost:    "#9A7EC0",
  steel:    "#C0C8D8",
};

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

export const PAGE_SIZE = 200;
export const POKEAPI_BASE = "https://pokeapi.co/api/v2";
