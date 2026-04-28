"use client";

import PokemonCard from "./PokemonCard";
import EmptyState from "./EmptyState";
import LoadingState from "./LoadingState";
import type { PokemonDetail } from "@/types/pokemon";

interface Props {
  items: PokemonDetail[];
  total: number;
  loading: boolean;
  error: string | null;
  canLoadMore: boolean;
  onLoadMore: () => void;
}

export default function ResultsGrid({
  items,
  total,
  loading,
  error,
  canLoadMore,
  onLoadMore,
}: Props) {
  if (loading) return <LoadingState />;
  if (error) return <p className="text-sm text-red-600">Error: {error}</p>;
  if (items.length === 0) return <EmptyState />;

  return (
    <>
      <p className="text-xs text-neutral-500">
        {total} match{total === 1 ? "" : "es"}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {items.map((p) => (
          <PokemonCard key={p.id} p={p} />
        ))}
      </div>
      {canLoadMore && (
        <button
          onClick={onLoadMore}
          className="mx-auto block mt-2 rounded-md border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-50 cursor-pointer"
        >
          Load more
        </button>
      )}
    </>
  );
}
