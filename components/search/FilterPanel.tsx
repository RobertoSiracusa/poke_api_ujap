"use client";

import { POKEMON_TYPES, GENERATIONS, POKEMON_FORMS } from "@/lib/constants";

interface Props {
  type: string;
  generation: string;
  form: string;
  onType: (v: string) => void;
  onGen: (v: string) => void;
  onForm: (v: string) => void;
}

export default function FilterPanel({ type, generation, form, onType, onGen, onForm }: Props) {
  const selectClass =
    "rounded-md border px-3 py-2 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
    + " bg-slate-800 text-slate-100 border-slate-600 hover:border-slate-400 transition-colors";
  return (
    <div className="flex gap-2 flex-wrap">
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
      <select
        value={form}
        onChange={(e) => onForm(e.target.value)}
        className={selectClass}
        aria-label="Filter by form"
      >
        <option value="">All forms</option>
        {POKEMON_FORMS.map((f) => (
          <option key={f.id} value={f.id}>
            {f.label}
          </option>
        ))}
      </select>
    </div>
  );
}
