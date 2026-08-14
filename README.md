# Pokédex Search

Proyecto recreado con HTML, CSS y JavaScript puro para consultar la API de PokeAPI.

## Stack tecnológico

- HTML
- CSS
- JavaScript
- PokeAPI

## Requisitos cumplidos

- Búsqueda por nombre o ID
- Muestra de imagen front_default
- Nombre del Pokémon
- ID nacional
- ID internacional
- Tipo(s)
- 6 stats base
- Manejo de error si no existe
- Mensaje de "Cargando..." mientras espera

## Estructura

```text
index.html
styles.css
script.js
```

## Cómo ejecutar

### Opción 1: con Python

```bash
python3 -m http.server 4173
```

Luego abre:

```text
http://localhost:4173
```

### Opción 2: sin Python

Si tienes Node.js instalado, puedes usar:

```bash
npx serve .
```

Y luego abrir:

```text
http://localhost:3000
```

## Uso

Escribe el nombre o el número del Pokémon y presiona Buscar. Si el dato no existe, se mostrará un mensaje de error; mientras se consulta la API, aparece el estado de carga.
