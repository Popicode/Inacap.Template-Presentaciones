# Generador de README

Genera (o actualiza) el `README.md` del repositorio analizando las fuentes canónicas de
documentación. Documento en español; identificadores en inglés.

## Pasos

1. Lee las fuentes reales, en orden de prioridad:
   - `AGENTS.md` (raíz) — fuente única de verdad: stack, principios, reglas, comandos,
     estructura.
   - `.github/instructions/architecture-guide.instructions.md` — arquitectura y estructura.
   - `.github/instructions/coding-standards.instructions.md` — marca, formato, naming.
   - `.github/instructions/patterns.instructions.md` — recetas (slide, layout, componente).
   - `package.json` — nombre, scripts, dependencias y versiones.
   - `src/` — `slides.md`, `components/`, `layouts/`, `styles/`, `uno.config.ts`.

2. Actualiza el README (créalo si no existe) con estas secciones:

## Nombre y descripción del proyecto

- Qué es: plantilla corporativa INACAP de presentaciones con Slidev (Vue + Vite + UnoCSS).

## Características

- Markdown primero, componentes Vue interactivos, layouts custom, identidad INACAP, export.

## Empezar

- Requisitos (Node ≥ 22, pnpm), instalación y `pnpm dev`.

## Comandos

- Tabla con los scripts reales de `package.json`.

## Estructura

- Resumen de `src/` y la regla "todo bajo `src/`".

## Marca y componentes

- Tokens/tipografías, `resolveAccent()`, lista de componentes y layouts.

## Documentación para IA

- `AGENTS.md` + `.ai/` + `.github/` + `llms.txt`.

Mantén el README conciso y enlazado a las fuentes canónicas, sin duplicar su detalle.
