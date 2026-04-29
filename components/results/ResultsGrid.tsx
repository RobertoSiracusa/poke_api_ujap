"use client";

import { useState } from "react";
import PokemonCard from "./PokemonCard";
import EmptyState from "./EmptyState";
import LoadingState from "./LoadingState";
import PokedexModal from "./PokedexModal";
import type { PokemonDetail } from "@/types/pokemon";

interface Props {
  items: PokemonDetail[];
  total: number;
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  canLoadMore: boolean;
  onLoadMore: () => void;
}

export default function ResultsGrid({
  items,
  total,
  loading,
  loadingMore,
  error,
  canLoadMore,
  onLoadMore,
}: Props) {
  const [selected, setSelected] = useState<PokemonDetail | null>(null);

  if (loading) return <LoadingState />;
  if (error) return <p className="text-sm text-red-400 p-4">Error: {error}</p>;
  if (items.length === 0) return <EmptyState />;

  return (
    <>
      <p className="text-xs text-slate-400 mb-2">
        Showing {items.length} of {total} match{total === 1 ? "" : "es"}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {items.map((p) => (
          <PokemonCard key={p.id} p={p} onClick={setSelected} />
        ))}
      </div>
      {canLoadMore && (
        <button
          onClick={onLoadMore}
          disabled={loadingMore}
          className="mx-auto block mt-6 rounded-md border border-slate-500 px-6 py-2 text-sm text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all"
        >
          {loadingMore ? "Loading more..." : "Load more"}
        </button>
      )}
      {selected && (
        <PokedexModal pokemon={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}


