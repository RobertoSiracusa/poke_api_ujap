export interface FormInfo {
  formLabel: string;
  baseName: string;
}

function capitalize(s: string): string {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function titleCase(name: string): string {
  return name
    .split("-")
    .map(capitalize)
    .join(" ");
}
const PAST_PARADOX_NAMES = new Set([
  "great-tusk",
  "scream-tail",
  "brute-bonnet",
  "flutter-mane",
  "slither-wing",
  "sandy-shocks",
  "roaring-moon",
  "gouging-fire",
  "raging-bolt",
  "walking-wake",
]);

const FUTURE_PARADOX_PREFIX = "iron-";

export function getFormInfo(rawName: string): FormInfo | null {
  const name = rawName.toLowerCase();

  if (PAST_PARADOX_NAMES.has(name)) {
    return { formLabel: "Pokémon Paradoja (Pasado)", baseName: titleCase(name) };
  }

  if (name.startsWith(FUTURE_PARADOX_PREFIX)) {
    return {
      formLabel: "Pokémon Paradoja (Futuro)",
      baseName: titleCase(name),
    };
  }

  if (name.endsWith("-mega-x")) {
    return {
      formLabel: "Mega Evolución X",
      baseName: titleCase(name.replace("-mega-x", "")),
    };
  }
  if (name.endsWith("-mega-y")) {
    return {
      formLabel: "Mega Evolución Y",
      baseName: titleCase(name.replace("-mega-y", "")),
    };
  }
  if (name.endsWith("-mega")) {
    return {
      formLabel: "Mega Evolución",
      baseName: titleCase(name.replace("-mega", "")),
    };
  }

  if (name.endsWith("-gmax")) {
    return {
      formLabel: "Gigantamax",
      baseName: titleCase(name.replace("-gmax", "")),
    };
  }

  if (name.endsWith("-eternamax")) {
    return {
      formLabel: "Eternamax",
      baseName: titleCase(name.replace("-eternamax", "")),
    };
  }

  if (name.endsWith("-primal")) {
    return {
      formLabel: "Forma Primigenia",
      baseName: titleCase(name.replace("-primal", "")),
    };
  }

  if (name.endsWith("-origin")) {
    return {
      formLabel: "Forma Origen",
      baseName: titleCase(name.replace("-origin", "")),
    };
  }

  if (name.includes("-alola")) {
    return {
      formLabel: "Forma Alola",
      baseName: titleCase(name.replace("-alola", "")),
    };
  }
  if (name.includes("-galar")) {
    return {
      formLabel: "Forma Galar",
      baseName: titleCase(name.replace("-galar", "")),
    };
  }
  if (name.includes("-hisui")) {
    return {
      formLabel: "Forma Hisui",
      baseName: titleCase(name.replace("-hisui", "")),
    };
  }
  if (name.includes("-paldea")) {
    return {
      formLabel: "Forma Paldea",
      baseName: titleCase(name.replace("-paldea", "").replace(/-combat|-aqua|-blaze/g, "")),
    };
  }

  const alternatePatterns: [RegExp, string][] = [
    [/-therian$/, "Forma Tótem"],
    [/-pirouette$/, "Forma Pirouette"],
    [/-resolute$/, "Forma Decidida"],
    [/-complete$/, "Forma Completa"],
    [/-dawn-wings$/, "Forma Alas del Alba"],
    [/-dusk-mane$/, "Forma Melena del Ocaso"],
    [/-ultra$/, "Ultra Forma"],
    [/-crowned$/, "Forma Coronada"],
    [/-noice$/, "Forma Noice Face"],
    [/-battle-bond$/, "Forma Lazo de Combate"],
    [/-ash$/, "Forma Ash"],
    [/-starter$/, "Forma Compañero"],
    [/-zen$/, "Forma Zen"],
    [/-sky$/, "Forma Cielo"],
    [/-incarnate$/, "Forma Encarnación"],
    [/-land$/, "Forma Terrestre"],
    [/-black$/, "Forma Negra"],
    [/-white$/, "Forma Blanca"],
    [/-blade$/, "Forma Espada"],
    [/-shield$/, "Forma Escudo"],
    [/-school$/, "Forma Banco"],
  ];

  for (const [regex, label] of alternatePatterns) {
    if (regex.test(name)) {
      return {
        formLabel: label,
        baseName: titleCase(name.replace(regex, "")),
      };
    }
  }

  return null;
}
