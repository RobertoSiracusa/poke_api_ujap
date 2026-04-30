import Image from "next/image";
import type { PokemonDetail } from "@/types/pokemon";
import { TYPE_COLORS } from "@/lib/constants";
import { getFormInfo } from "@/lib/formInfo";

interface Props {
  p: PokemonDetail;
  onClick: (p: PokemonDetail) => void;
}

// Badge colors per form type keyword
function formBadgeStyle(label: string): React.CSSProperties {
  if (label.includes("Mega"))       return { background: "rgba(180,0,220,0.75)", color: "#fff" };
  if (label.includes("Gigantamax")) return { background: "rgba(220,30,60,0.80)", color: "#fff" };
  if (label.includes("Eternamax"))  return { background: "rgba(220,30,60,0.80)", color: "#fff" };
  if (label.includes("Primigenia")) return { background: "rgba(200,100,0,0.80)", color: "#fff" };
  if (label.includes("Origen"))     return { background: "rgba(60,80,200,0.80)", color: "#fff" };
  if (label.includes("Alola"))      return { background: "rgba(255,165,0,0.80)", color: "#fff" };
  if (label.includes("Galar"))      return { background: "rgba(120,0,180,0.80)", color: "#fff" };
  if (label.includes("Hisui"))      return { background: "rgba(80,140,60,0.85)", color: "#fff" };
  if (label.includes("Paldea"))     return { background: "rgba(210,60,60,0.80)", color: "#fff" };
  if (label.includes("Paradoja (Pasado)")) return { background: "rgba(180,40,60,0.85)", color: "#ffcccc" };
  if (label.includes("Paradoja (Futuro)")) return { background: "rgba(60,40,160,0.85)", color: "#d9ccff" };
  if (label.includes("Paradoja"))   return { background: "rgba(30,30,30,0.82)", color: "#e0e0e0" };
  return { background: "rgba(0,0,0,0.55)", color: "#fff" };
}

export default function PokemonCard({ p, onClick }: Props) {
  const sprite =
    p.sprites.other?.["official-artwork"]?.front_default ??
    p.sprites.front_default ??
    "";

  const mainType = p.types[0]?.type.name;
  const themeColor = TYPE_COLORS[mainType] || "#A8A878";
  const formInfo = getFormInfo(p.name);

  return (
    <article
      className="rounded-lg border p-3 flex flex-col items-center text-center transition-all cursor-pointer hover:scale-105 hover:shadow-lg"
      style={{
        backgroundColor: themeColor,
        borderColor: themeColor,
      }}
      onClick={() => onClick(p)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter") onClick(p); }}
    >
      {sprite && (
        <Image src={sprite} alt={p.name} width={96} height={96} unoptimized />
      )}
      <p className="mt-1 text-[10px] font-mono text-neutral-600 min-h-[14px]">
        {formInfo ? "" : `#${String(p.id).padStart(3, "0")}`}
      </p>
      <h3 className="text-sm font-semibold capitalize text-neutral-800 leading-tight">{p.name}</h3>
      <div className="flex gap-1 mt-1 justify-center">
        {p.types.map((t) => (
          <div key={t.type.name} className="relative w-12 h-4" title={t.type.name}>
            <span className="sr-only">{t.type.name}</span>
            <Image
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/${t.type.url.split("/").slice(-2, -1)[0]}.png`}
              alt={t.type.name}
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        ))}
      </div>

      {/* Form badge — only shown for special forms (except wishiwashi-school per request) */}
      {formInfo && p.name !== "wishiwashi-school" && (
        <div className="mt-1.5 w-full flex flex-col items-center gap-0.5">
          <span
            className="text-[9px] font-bold px-2 py-0.5 rounded-full leading-tight"
            style={formBadgeStyle(formInfo.formLabel)}
          >
            {formInfo.formLabel}
          </span>
          <span className="text-[9px] text-neutral-700 font-medium">
            de {formInfo.baseName}
          </span>
        </div>
      )}
    </article>
  );
}

