export default function Header() {
  return (
    <header className="border-b border-neutral-200">
      <div className="mx-auto max-w-5xl px-4 py-4">
        <h1 className="text-xl font-semibold tracking-tight">PokéSearch</h1>
        <p className="text-sm text-neutral-500">
          Search by name, type, or generation.
        </p>
      </div>
    </header>
  );
}
