import Image from "next/image";
import type { PokemonDetail } from "@/types/pokemon";
import { TYPE_COLORS } from "@/lib/constants";

interface Props {
  p: PokemonDetail;
  onClick: (p: PokemonDetail) => void;
}

export default function PokemonCard({ p, onClick }: Props) {
  const sprite =
    p.sprites.other?.["official-artwork"]?.front_default ??
    p.sprites.front_default ??
    "";

  const mainType = p.types[0]?.type.name;
  const themeColor = TYPE_COLORS[mainType] || "#A8A878";

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
      <p className="mt-1 text-[10px] font-mono text-neutral-600">
        #{String(p.id).padStart(3, "0")}
      </p>
      <h3 className="text-sm font-semibold capitalize text-neutral-800 leading-tight">{p.name}</h3>
      <p className="text-xs capitalize text-neutral-700">
        {p.types.map((t) => t.type.name).join(" · ")}
      </p>
    </article>
  );
}

