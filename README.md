# PokéSearch

University assignment — Lenguajes de Programación, UJAP.

Next.js app that searches Pokémon via [PokeAPI](https://pokeapi.co/). Filter by name, type, generation, and specific forms simultaneously. Features a custom Pokédex modal with evolution chains, regional variants, and full Spanish localization.

---

## Stack

| Tool | Version |
|---|---|
| Next.js (App Router) | 16.x |
| TypeScript | 5.x |
| Tailwind CSS | 4.x |
| PokeAPI | v2 |

---

## Features

- **Advanced Search & Filtering:**
  - Search by name (substring match) with a quick-clear (✕) button.
  - Filter by type (18 types) using official Pokémon Type Icons.
  - Filter by generation (Gen I – IX).
  - Filter by specific forms (Mega Evolutions, Gigantamax, Regional Variants, Paradox, etc.).
  - Combine all filters simultaneously.
- **Detailed Pokédex Modal:**
  - Displays Spanish Pokédex flavor text.
  - Full evolution chain display with sprites and level requirements.
  - Interactive Regional variants navigation (click a variant to view its details).
  - Dynamic badges with specific color schemes for special forms (e.g., Red/Purple for Paradox forms).
- **Automated Form Detection:** Automatically parses API names to identify and format forms (Alola, Galar, Hisui, Paldea, Primal, Origin, Wishiwashi-School, etc.) while hiding redundant Pokédex numbers for alternate forms.
- **UI / UX:** Minimalistic, responsive grid, localized entirely in Spanish.

---

## Project Structure

```text
app/                    # Next.js App Router pages
components/
  layout/               # Header
  search/               # SearchBar, FilterPanel, SearchControls
  results/              # ResultsGrid, PokemonCard, PokedexModal, EmptyState, LoadingState
hooks/
  usePokemonSearch.ts   # Search orchestration hook
  usePokemonDetail.ts   # Fetches species data, evolution chains, and regional variants
services/pokeapi/       # API layer (client, pokemon, type, generation)
lib/
  constants.ts          # Types list, generations list, form lists, type icons
  filters.ts            # Name intersection, substring logic, form filtering
  formInfo.ts           # Utility to detect and label alternate Pokémon forms
types/
  pokemon.ts            # TypeScript types for PokeAPI responses
```

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## How It Works

1. User enters name / selects type / selects generation / selects form (any combination).
2. Hook fetches candidate name lists from PokeAPI in parallel.
3. Lists are intersected by name; substring filter and form detection filter applied on top.
4. Detail fetches (sprite + types) run in parallel for up to 200 candidates.
5. Results render in a responsive grid, 24 at a time, displaying official Type Icons.
6. Clicking a Pokémon opens the **Pokédex Modal**, which triggers an additional fetch to the `pokemon-species` endpoint to retrieve Spanish descriptions, construct the evolution chain, and find related regional variants.

---

## Scripts

```bash
npm run dev      # dev server at localhost:3000
npm run build    # production build
npm run lint     # ESLint check
```
