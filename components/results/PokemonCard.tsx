import Image from "next/image";
import type { PokemonDetail } from "@/types/pokemon";

export default function PokemonCard({ p }: { p: PokemonDetail }) {
  const sprite =
    p.sprites.other?.["official-artwork"]?.front_default ??
    p.sprites.front_default ??
    "";
  return (
    <article className="rounded-lg border border-neutral-200 p-3 flex flex-col items-center text-center">
      {sprite && (
        <Image src={sprite} alt={p.name} width={96} height={96} unoptimized />
      )}
      <h3 className="mt-2 text-sm font-medium capitalize">{p.name}</h3>
      <p className="text-xs text-neutral-500 capitalize">
        {p.types.map((t) => t.type.name).join(" · ")}
      </p>
    </article>
  );
}
