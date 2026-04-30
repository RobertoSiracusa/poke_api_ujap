export const POKEMON_TYPES = [
  "normal", "fire", "water", "electric", "grass", "ice", "fighting", "poison",
  "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark",
  "steel", "fairy",
] as const;

export const TYPE_COLORS: Record<string, string> = {
  fire: "#FFAB76",
  water: "#76C0FF",
  grass: "#86D97A",
  electric: "#FAE96A",
  psychic: "#FA8FB8",
  ice: "#A8E8F0",
  dragon: "#A07CFF",
  dark: "#6B5B4E",
  fairy: "#F4A8CF",
  normal: "#C2C2A3",
  fighting: "#D4786A",
  flying: "#AABCF0",
  poison: "#C47FCC",
  ground: "#E8D08A",
  rock: "#C9B86A",
  bug: "#C0CC5A",
  ghost: "#9A7EC0",
  steel: "#C0C8D8",
};

export const TYPE_ICONS: Record<string, string> = {
  normal: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/1.png",
  fighting: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/2.png",
  flying: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/3.png",
  poison: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/4.png",
  ground: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/5.png",
  rock: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/6.png",
  bug: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/7.png",
  ghost: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/8.png",
  steel: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/9.png",
  fire: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/10.png",
  water: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/11.png",
  grass: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/12.png",
  electric: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/13.png",
  psychic: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/14.png",
  ice: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/15.png",
  dragon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/16.png",
  dark: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/17.png",
  fairy: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/18.png",
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

export const POKEMON_FORMS = [
  { id: "normal", label: "Normal" },
  { id: "Mega Evolución", label: "Mega Evolución" },
  { id: "Gigantamax", label: "Gigantamax" },
  { id: "Forma Alola", label: "Forma Alola" },
  { id: "Forma Galar", label: "Forma Galar" },
  { id: "Forma Hisui", label: "Forma Hisui" },
  { id: "Forma Paldea", label: "Forma Paldea" },
  { id: "Paradoja", label: "Paradoja (Todas)" },
  { id: "Forma Primigenia", label: "Forma Primigenia" },
  { id: "Forma Origen", label: "Forma Origen" },
] as const;

export const PAGE_SIZE = 200;
export const POKEAPI_BASE = "https://pokeapi.co/api/v2";
