const API_BASE = "https://pokeapi.co/api/v2/pokemon";

const form = document.getElementById("search-form");
const input = document.getElementById("pokemon-input");
const statusMessage = document.getElementById("status-message");
const pokemonCard = document.getElementById("pokemon-card");
const pokemonImage = document.getElementById("pokemon-image");
const pokemonName = document.getElementById("pokemon-name");
const nationalId = document.getElementById("national-id");
const internationalId = document.getElementById("international-id");
const pokemonTypes = document.getElementById("pokemon-types");
const statsList = document.getElementById("stats-list");
const badge = document.getElementById("pokemon-badge");

const typeColors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD"
};

const statLabels = {
  hp: "PS",
  attack: "Ataque",
  defense: "Defensa",
  "special-attack": "Ataque Especial",
  "special-defense": "Defensa Especial",
  speed: "Velocidad"
};

const typeLabels = {
  normal: "Normal",
  fire: "Fuego",
  water: "Agua",
  electric: "Eléctrico",
  grass: "Planta",
  ice: "Hielo",
  fighting: "Lucha",
  poison: "Veneno",
  ground: "Tierra",
  flying: "Volador",
  psychic: "Psíquico",
  bug: "Bicho",
  rock: "Roca",
  ghost: "Fantasma",
  dragon: "Dragón",
  dark: "Siniestro",
  steel: "Acero",
  fairy: "Hada"
};

function setStatus(message, state = "") {
  statusMessage.textContent = message;
  statusMessage.className = `status-message ${state}`.trim();
}

function renderTypes(types) {
  pokemonTypes.innerHTML = "";

  types.forEach((typeEntry) => {
    const typeName = typeEntry.type.name;
    const pill = document.createElement("span");
    pill.className = "type-pill";
    pill.textContent = typeLabels[typeName] || typeName;
    pill.style.background = typeColors[typeName] || "#6B7280";
    pokemonTypes.appendChild(pill);
  });
}

function renderStats(stats) {
  statsList.innerHTML = "";

  stats.forEach((entry) => {
    const statKey = entry.stat.name;
    const baseValue = entry.base_stat;
    const statName = statLabels[statKey] || statKey.replace("-", " ");

    const item = document.createElement("li");
    item.className = "stat-item";

    const label = document.createElement("span");
    label.className = "stat-name";
    label.textContent = statName;

    const barWrap = document.createElement("div");
    barWrap.className = "stat-bar";

    const fill = document.createElement("div");
    fill.className = "stat-fill";
    fill.style.width = `${Math.min(baseValue, 100)}%`;

    const value = document.createElement("span");
    value.className = "stat-value";
    value.textContent = baseValue;

    barWrap.appendChild(fill);
    item.append(label, barWrap, value);
    statsList.appendChild(item);
  });
}

function renderPokemon(pokemon) {
  const imageUrl = pokemon.sprites?.front_default || "";
  const id = String(pokemon.id).padStart(3, "0");

  pokemonImage.src = imageUrl;
  pokemonImage.alt = pokemon.name;
  pokemonName.textContent = pokemon.name;
  nationalId.textContent = `#${id}`;
  internationalId.textContent = `#${id}`;
  badge.textContent = `#${id}`;

  renderTypes(pokemon.types);
  renderStats(pokemon.stats);

  pokemonCard.classList.remove("hidden");
}

async function fetchPokemon(searchValue) {
  const query = searchValue.trim();

  if (!query) {
    throw new Error("Debes ingresar un nombre o un ID del Pokémon.");
  }

  const url = `${API_BASE}/${encodeURIComponent(query.toLowerCase())}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("No existe ese Pokémon. Intenta con otro nombre o ID.");
  }

  return response.json();
}

async function handleSearch(event) {
  event.preventDefault();

  const searchValue = input.value;

  if (!searchValue.trim()) {
    setStatus("Debes ingresar un nombre o un ID.", "error");
    pokemonCard.classList.add("hidden");
    return;
  }

  setStatus("Cargando...", "loading");

  try {
    const pokemon = await fetchPokemon(searchValue);
    renderPokemon(pokemon);
    setStatus("", "success");
  } catch (error) {
    pokemonCard.classList.add("hidden");
    setStatus(error.message || "Ocurrió un error inesperado.", "error");
  }
}

form.addEventListener("submit", handleSearch);
