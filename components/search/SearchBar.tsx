"use client";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Name…"
      className="w-full rounded-md border border-slate-600 bg-slate-800 text-slate-100 placeholder-slate-400 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
      aria-label="Search by name"
    />
  );
}
