export default function Header() {
  return (
    <header className="border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
      <div className="mx-auto max-w-5xl px-4 py-4">
        <h1 className="text-xl font-semibold tracking-tight text-white">PokéSearch</h1>
        <p className="text-sm text-slate-400">
          Search by name, type, or generation.
        </p>
      </div>
    </header>
  );
}
