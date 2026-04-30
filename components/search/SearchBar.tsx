"use client";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Nombre…"
        className="w-full rounded-md border border-slate-600 bg-slate-800 text-slate-100 placeholder-slate-400 px-3 py-2 pr-8 text-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
        aria-label="Search by name"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}
