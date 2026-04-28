"use client";

import { POKEMON_TYPES, GENERATIONS } from "@/lib/constants";

interface Props {
  type: string;
  generation: string;
  onType: (v: string) => void;
  onGen: (v: string) => void;
}

export default function FilterPanel({ type, generation, onType, onGen }: Props) {
  const selectClass =
    "rounded-md border border-neutral-300 px-3 py-2 text-sm bg-white focus:border-neutral-900 focus:outline-none";
  return (
    <div className="flex gap-2">
      <select
        value={type}
        onChange={(e) => onType(e.target.value)}
        className={selectClass}
        aria-label="Filter by type"
      >
        <option value="">All types</option>
        {POKEMON_TYPES.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
      <select
        value={generation}
        onChange={(e) => onGen(e.target.value)}
        className={selectClass}
        aria-label="Filter by generation"
      >
        <option value="">All gens</option>
        {GENERATIONS.map((g) => (
          <option key={g.id} value={g.id}>
            {g.label}
          </option>
        ))}
      </select>
    </div>
  );
}
