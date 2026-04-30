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
  form?: string;
}

// ---- Species / Evolution types ----

export interface FlavorTextEntry {
  flavor_text: string;
  language: NamedAPIResource;
  version: NamedAPIResource;
}

export interface PokemonVariety {
  is_default: boolean;
  pokemon: NamedAPIResource;
}

export interface SpeciesData {
  id: number;
  name: string;
  flavor_text_entries: FlavorTextEntry[];
  evolution_chain: { url: string };
  varieties: PokemonVariety[];
}

export interface EvolutionDetail {
  min_level: number | null;
  trigger: NamedAPIResource;
  item: NamedAPIResource | null;
}

export interface ChainLink {
  species: NamedAPIResource;
  evolution_details: EvolutionDetail[];
  evolves_to: ChainLink[];
}

export interface EvolutionChainResponse {
  chain: ChainLink;
}

export interface EvolutionStep {
  name: string;
  id: number;
  sprite: string;
  minLevel: number | null;
}

