# PokéSearch

University assignment — Lenguajes de Programación, UJAP.

Next.js app that searches Pokémon via [PokeAPI](https://pokeapi.co/). Filter by name, type, and generation simultaneously.

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

- Search by name (substring match)
- Filter by type (18 types)
- Filter by generation (Gen I – IX)
- Combine all three filters simultaneously
- Paginated results (24 per page, load more)
- Minimalistic, responsive UI

---

## Project Structure

```
app/                    # Next.js App Router pages
components/
  layout/               # Header
  search/               # SearchBar, FilterPanel, SearchControls
  results/              # ResultsGrid, PokemonCard, EmptyState, LoadingState
hooks/
  usePokemonSearch.ts   # Search orchestration hook
services/pokeapi/       # API layer (client, pokemon, type, generation)
lib/
  constants.ts          # Types list, generations list, page size
  filters.ts            # Name intersection + substring logic
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

1. User enters name / selects type / selects generation (any combination).
2. Hook fetches candidate name lists from PokeAPI in parallel.
3. Lists are intersected by name; substring filter applied on top.
4. Detail fetches (sprite + types) run in parallel for up to 200 candidates.
5. Results render in a responsive grid, 24 at a time.

---

## Scripts

```bash
npm run dev      # dev server at localhost:3000
npm run build    # production build
npm run lint     # ESLint check
```
