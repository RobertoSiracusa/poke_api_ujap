"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { usePokemonDetail } from "@/hooks/usePokemonDetail";
import { TYPE_COLORS } from "@/lib/constants";
import type { PokemonDetail, EvolutionStep } from "@/types/pokemon";

interface Props {
  pokemon: PokemonDetail;
  onClose: () => void;
}

function EvoBadge({ step }: { step: EvolutionStep }) {
  return (
    <div className="flex flex-col items-center gap-1 min-w-[64px]">
      <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center border border-white/30">
        <Image
          src={step.sprite}
          alt={step.name}
          width={52}
          height={52}
          unoptimized
          className="drop-shadow"
        />
      </div>
      <span className="text-xs font-semibold capitalize text-white/90">{step.name}</span>
      {step.minLevel && (
        <span className="text-[10px] text-white/60">Lv. {step.minLevel}</span>
      )}
    </div>
  );
}

export default function PokedexModal({ pokemon, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const { data, loading, error } = usePokemonDetail(pokemon.id);

  const mainType = pokemon.types[0]?.type.name ?? "normal";
  const themeColor = TYPE_COLORS[mainType] ?? "#C2C2A3";
  const sprite =
    pokemon.sprites.other?.["official-artwork"]?.front_default ??
    pokemon.sprites.front_default ??
    "";

  // Close on backdrop click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const dexNumber = `#${String(pokemon.id).padStart(3, "0")}`;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(5, 15, 40, 0.85)", backdropFilter: "blur(6px)" }}
    >
      {/* ---- Pokédex Shell ---- */}
      <div
        className="relative w-full max-w-sm rounded-[2rem] overflow-hidden shadow-2xl"
        style={{ background: "#1a1a2e", border: "4px solid #cc0000" }}
      >
        {/* Top red body with camera & lights */}
        <div
          className="relative flex flex-col items-center pt-6 pb-10 px-6"
          style={{ background: `linear-gradient(160deg, ${themeColor} 0%, ${themeColor}99 100%)` }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-4 text-white/80 hover:text-white text-xl font-bold leading-none cursor-pointer"
            aria-label="Close"
          >
            ✕
          </button>

          {/* Pokédex number & name */}
          <p className="mt-6 text-xs font-mono text-white/70">{dexNumber}</p>
          <h2 className="text-2xl font-extrabold capitalize text-white tracking-wide drop-shadow">
            {pokemon.name}
          </h2>

          {/* Type badges */}
          <div className="flex gap-2 mt-1">
            {pokemon.types.map((t) => (
              <span
                key={t.type.name}
                className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full"
                style={{ background: "rgba(0,0,0,0.25)", color: "white", letterSpacing: "0.08em" }}
              >
                {t.type.name}
              </span>
            ))}
          </div>

          {/* Pokemon image */}
          <div
            className="mt-3 w-36 h-36 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.15)", border: "3px solid rgba(255,255,255,0.3)" }}
          >
            {sprite && (
              <Image src={sprite} alt={pokemon.name} width={120} height={120} unoptimized className="drop-shadow-lg" />
            )}
          </div>

          {/* Decorative bottom divider */}
          <div className="absolute bottom-0 left-0 right-0 h-3 rounded-t-none" style={{ background: "#1a1a2e" }} />
        </div>

        {/* ---- Body (dark panel) ---- */}
        <div className="px-5 pt-5 pb-6 space-y-5" style={{ background: "#1a1a2e", color: "#e2e8f0" }}>

          {/* Description */}
          <div>
            <h3 className="text-[10px] uppercase tracking-widest font-bold mb-1" style={{ color: themeColor }}>
              Pokédex Entry
            </h3>
            {loading && (
              <p className="text-xs text-slate-400 animate-pulse">Loading data…</p>
            )}
            {error && (
              <p className="text-xs text-red-400">Could not load data.</p>
            )}
            {data && (
              <p className="text-sm leading-relaxed text-slate-300">{data.description}</p>
            )}
          </div>

          {/* Evolutions / Variants */}
          {data && (
            <div>
              <h3 className="text-[10px] uppercase tracking-widest font-bold mb-3" style={{ color: themeColor }}>
                {data.hasEvolutions ? "Evolution Line" : "Regional Forms"}
              </h3>

              {/* Evolution chain */}
              {data.hasEvolutions && (
                <div className="flex items-center justify-center flex-wrap gap-1">
                  {data.evolutions.map((step, i) => (
                    <div key={step.id} className="flex items-center gap-1">
                      <EvoBadge step={step} />
                      {i < data.evolutions.length - 1 && (
                        <span className="text-white/40 text-xl px-1">›</span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Regional variants */}
              {!data.hasEvolutions && data.regionalVariants.length > 0 && (
                <div className="flex flex-wrap justify-center gap-4">
                  {data.regionalVariants.map((v) => (
                    <div key={v.name} className="flex flex-col items-center gap-1">
                      <div className="w-16 h-16 rounded-full bg-white/20 border border-white/30 flex items-center justify-center">
                        <Image src={v.sprite} alt={v.name} width={52} height={52} unoptimized className="drop-shadow" />
                      </div>
                      <span className="text-xs text-white/80 font-semibold">{v.label} Form</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Neither */}
              {!data.hasEvolutions && data.regionalVariants.length === 0 && (
                <p className="text-sm text-slate-400 italic">
                  This Pokémon has no evolutions or regional forms.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Bottom decorative strip */}
        <div
          className="h-4 flex items-center justify-center gap-3"
          style={{ background: "#cc0000" }}
        >
          <div className="w-2 h-2 rounded-full bg-white/50" />
          <div className="w-2 h-2 rounded-full bg-white/50" />
          <div className="w-2 h-2 rounded-full bg-white/50" />
        </div>
      </div>
    </div>
  );
}
