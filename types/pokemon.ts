export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface PokemonSummary {
  name: string;
  url: string;
}

export interface PokemonTypeSlot {
  slot: number;
  type: NamedAPIResource;
}

export interface PokemonSprites {
  front_default: string | null;
  other?: {
    "official-artwork"?: { front_default: string | null };
  };
}

export interface PokemonDetail {
  id: number;
  name: string;
  sprites: PokemonSprites;
  types: PokemonTypeSlot[];
}

export interface TypeResponse {
  pokemon: { pokemon: NamedAPIResource }[];
}

export interface GenerationResponse {
  pokemon_species: NamedAPIResource[];
}

export interface SearchFilters {
  name: string;
  type: string;
  generation: string;
}
