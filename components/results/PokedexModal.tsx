"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { usePokemonDetail } from "@/hooks/usePokemonDetail";
import { TYPE_COLORS } from "@/lib/constants";
import { getFormInfo } from "@/lib/formInfo";
import type { PokemonDetail, EvolutionStep } from "@/types/pokemon";

interface Props {
  pokemon: PokemonDetail;
  onClose: () => void;
  onSelectPokemon?: (p: PokemonDetail) => void;
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

// Badge background per form label keyword (same palette as PokemonCard)
function modalBadgeStyle(label: string): React.CSSProperties {
  if (label.includes("Mega")) return { background: "rgba(180,0,220,0.15)", color: "#9b00d4", border: "1px solid rgba(180,0,220,0.4)" };
  if (label.includes("Gigantamax")) return { background: "rgba(220,30,60,0.15)", color: "#b30025", border: "1px solid rgba(220,30,60,0.4)" };
  if (label.includes("Eternamax")) return { background: "rgba(220,30,60,0.15)", color: "#b30025", border: "1px solid rgba(220,30,60,0.4)" };
  if (label.includes("Primigenia")) return { background: "rgba(200,100,0,0.15)", color: "#8a4400", border: "1px solid rgba(200,100,0,0.4)" };
  if (label.includes("Origen")) return { background: "rgba(60,80,200,0.15)", color: "#2030a0", border: "1px solid rgba(60,80,200,0.4)" };
  if (label.includes("Alola")) return { background: "rgba(255,165,0,0.15)", color: "#a06000", border: "1px solid rgba(255,165,0,0.4)" };
  if (label.includes("Galar")) return { background: "rgba(120,0,180,0.15)", color: "#600090", border: "1px solid rgba(120,0,180,0.4)" };
  if (label.includes("Hisui")) return { background: "rgba(80,140,60,0.15)", color: "#2e6020", border: "1px solid rgba(80,140,60,0.4)" };
  if (label.includes("Paldea")) return { background: "rgba(210,60,60,0.15)", color: "#8b0000", border: "1px solid rgba(210,60,60,0.4)" };
  if (label.includes("Paradoja (Pasado)")) return { background: "rgba(180,40,60,0.15)", color: "#b3243a", border: "1px solid rgba(180,40,60,0.4)" };
  if (label.includes("Paradoja (Futuro)")) return { background: "rgba(60,40,160,0.15)", color: "#3a24b3", border: "1px solid rgba(60,40,160,0.4)" };
  if (label.includes("Paradoja")) return { background: "rgba(30,30,30,0.10)", color: "#333", border: "1px solid rgba(30,30,30,0.3)" };
  return { background: "rgba(0,0,0,0.08)", color: "#333", border: "1px solid rgba(0,0,0,0.2)" };
}

export default function PokedexModal({ pokemon, onClose, onSelectPokemon }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const { data, loading, error } = usePokemonDetail(pokemon.id);

  const mainType = pokemon.types[0]?.type.name ?? "normal";
  const themeColor = TYPE_COLORS[mainType] ?? "#C2C2A3";
  const sprite =
    pokemon.sprites.other?.["official-artwork"]?.front_default ??
    pokemon.sprites.front_default ??
    "";
  const formInfo = getFormInfo(pokemon.name);
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.7)", backdropFilter: "blur(4px)" }}
    >
      {/* ---- Pokédex Shell ---- */}
      <div
        className="relative w-full max-w-sm rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col"
        style={{
          backgroundColor: themeColor,
          border: "4px solid rgba(0,0,0,0.8)",
          boxShadow: "inset -8px -8px 0px rgba(0,0,0,0.1), 0 25px 50px -12px rgba(0,0,0,0.5)"
        }}
      >
        {/* Header Area with Lens and Curve */}
        <div className="relative h-24 w-full px-6 pt-4 shrink-0">
          {/* Big Blue Lens */}
          <div className="absolute top-4 left-6 z-10 w-16 h-16 rounded-full bg-white border-[3px] border-black flex items-center justify-center shadow-lg">
            <div
              className="w-13 h-13 rounded-full border-2 border-black"
              style={{
                background: "radial-gradient(circle at 30% 30%, #5de0ff 0%, #0089b3 100%)",
                boxShadow: "inset -4px -4px 8px rgba(0,0,0,0.3)"
              }}
            >
              <div className="absolute top-3 left-4 w-4 h-2 bg-white/40 rounded-full rotate-[-45deg]" />
            </div>
          </div>

          {/* Top Curve Silhouette */}
          <div
            className="absolute top-0 right-0 w-full h-full bg-black/10"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 50%, 65% 50%, 45% 100%, 0 100%)",
              opacity: 0.5
            }}
          />

          <div className="absolute top-6 right-16 flex flex-col items-end">
            <span className="text-[10px] font-black tracking-widest text-black/60 uppercase leading-none">
              Pokédex of
            </span>
            <span className="text-[10px] font-black tracking-widest text-black/60 uppercase leading-tight">
              Anomalies
            </span>
          </div>

          {/* Small Pokeball Icon */}
          <div className="absolute top-6 right-6 w-8 h-8 rounded-full border-2 border-black overflow-hidden bg-white shadow-md">
            <div className="h-1/2 w-full bg-red-500 border-b-2 border-black" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border-2 border-black z-10" />
          </div>
        </div>

        {/* Inner Screen Area */}
        <div className="px-6 pb-8 pt-2">
          <div
            className="rounded-xl border-[4px] border-black overflow-hidden shadow-inner flex flex-col"
            style={{ backgroundColor: "#f0f0f0" }}
          >
            {/* Top Display (Sprite and Basic Info) */}
            <div className="p-4 flex flex-col items-center bg-white border-b-2 border-black/10">
              <div className="flex justify-between w-full mb-1">
                <span className="text-[10px] font-mono font-bold text-black/40">
                  {formInfo ? "" : dexNumber}
                </span>
                <div className="flex gap-1">
                  {pokemon.types.map(t => (
                    <div key={t.type.name} className="relative w-12 h-4" title={t.type.name}>
                      <span className="sr-only">{t.type.name}</span>
                      <Image
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/${t.type.url.split("/").slice(-2, -1)[0]}.png`}
                        alt={t.type.name}
                        fill
                        className="object-contain drop-shadow-sm"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              </div>

              <h2 className="text-xl font-black uppercase text-black mb-1 tracking-tighter">
                {pokemon.name}
              </h2>

              {/* Form info badge — only for special forms */}
              {formInfo && (
                <div className="flex flex-col items-center gap-0.5 mb-2">
                  <span
                    className="text-[9px] font-bold px-2.5 py-0.5 rounded-full leading-tight"
                    style={modalBadgeStyle(formInfo.formLabel)}
                  >
                    {formInfo.formLabel}
                  </span>
                  <span className="text-[10px] text-black/50 font-medium">
                    Forma de <span className="font-bold text-black/70">{formInfo.baseName}</span>
                  </span>
                </div>
              )}

              <div className="relative w-40 h-40 flex items-center justify-center bg-black/5 rounded-lg border border-black/5">
                {sprite && (
                  <Image src={sprite} alt={pokemon.name} width={140} height={140} unoptimized className="drop-shadow-md z-10" />
                )}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 0)", backgroundSize: "10px 10px" }} />
              </div>
            </div>

            {/* Bottom Display (Description and Evolutions) */}
            <div className="p-4 flex-1 overflow-y-auto max-h-[220px] custom-scrollbar">
              <div className="mb-4">
                <h3 className="text-[9px] font-black uppercase text-black/40 mb-1">Entrada de la Pokédex</h3>
                {loading ? (
                  <div className="space-y-1">
                    <div className="h-3 bg-black/5 animate-pulse rounded" />
                    <div className="h-3 bg-black/5 animate-pulse rounded w-2/3" />
                  </div>
                ) : error ? (
                  <p className="text-xs text-red-500">Error al cargar datos.</p>
                ) : (
                  <p className="text-xs leading-relaxed text-black/80 font-medium italic min-h-[1rem]">
                    {data?.description ? `"${data.description}"` : ""}
                  </p>
                )}
              </div>

              {data && (
                <div className="pt-3 border-t border-black/5 flex flex-col gap-4">
                  {data.hasEvolutions && (
                    <div>
                      <h3 className="text-[9px] font-black uppercase text-black/40 mb-3">Línea Evolutiva</h3>
                      <div className="flex items-center justify-center flex-wrap gap-2">
                        {data.evolutions.map((step, i) => (
                          <div key={step.id} className="flex items-center gap-1">
                            <div className="w-12 h-12 rounded-lg bg-black/5 border border-black/10 flex items-center justify-center group hover:bg-black/10 transition-colors">
                              <Image src={step.sprite} alt={step.name} width={40} height={40} unoptimized className="drop-shadow-sm" />
                            </div>
                            {i < data.evolutions.length - 1 && (
                              <span className="text-black/20 text-lg">›</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {data.regionalVariants.length > 0 && (
                    <div>
                      <h3 className="text-[9px] font-black uppercase text-black/40 mb-3">Formas Regionales</h3>
                      <div className="flex flex-wrap justify-center gap-4">
                        {data.regionalVariants.map((v) => (
                          <div
                            key={v.name}
                            className={`flex flex-col items-center ${onSelectPokemon && v.detail ? 'cursor-pointer hover:scale-105 transition-transform' : ''}`}
                            onClick={() => {
                              if (onSelectPokemon && v.detail) {
                                onSelectPokemon(v.detail);
                              }
                            }}
                          >
                            <div className="w-12 h-12 rounded-lg bg-black/5 border border-black/10 flex items-center justify-center">
                              <Image src={v.sprite} alt={v.name} width={40} height={40} unoptimized />
                            </div>
                            <span className="text-[9px] text-black/60 font-bold mt-1">{v.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {!data.hasEvolutions && data.regionalVariants.length === 0 && (
                    <p className="text-[10px] text-black/40 italic">Sin formas especiales ni evoluciones.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom red bezel details */}
        <div className="px-10 pb-6 flex justify-between items-center">
          <div className="flex gap-2">
            <div className="w-10 h-2 rounded-full bg-black/20 shadow-inner" />
            <div className="w-10 h-2 rounded-full bg-black/20 shadow-inner" />
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-black/10 border-2 border-black/20 flex items-center justify-center hover:bg-black/20 transition-colors cursor-pointer"
          >
            <div className="w-6 h-6 rounded-full bg-red-600/20 shadow-inner flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-red-600 shadow-sm" />
            </div>
          </button>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.2);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}

