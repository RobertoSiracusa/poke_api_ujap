"use client";

import { useState } from "react";
import SearchBar from "./SearchBar";
import FilterPanel from "./FilterPanel";
import ResultsGrid from "@/components/results/ResultsGrid";
import { usePokemonSearch } from "@/hooks/usePokemonSearch";

export default function SearchControls() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [generation, setGeneration] = useState("");

  const { visible, loading, error, canLoadMore, loadMore, results } =
    usePokemonSearch({ name, type, generation });

  return (
    <section className="mx-auto max-w-5xl px-4 py-6 space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <SearchBar value={name} onChange={setName} />
        </div>
        <FilterPanel
          type={type}
          generation={generation}
          onType={setType}
          onGen={setGeneration}
        />
      </div>
      <ResultsGrid
        items={visible}
        total={results.length}
        loading={loading}
        error={error}
        canLoadMore={canLoadMore}
        onLoadMore={loadMore}
      />
    </section>
  );
}
