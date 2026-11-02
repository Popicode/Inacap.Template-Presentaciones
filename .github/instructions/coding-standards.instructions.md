---
applyTo: '**'
description: 'Marca/tokens/fuentes, formato, naming, JSDoc, accesibilidad'
---

# Estándares de código

Deep reference de **cómo debe verse el código y aplicarse la marca**. Las reglas de alto
nivel están en [AGENTS.md](../../AGENTS.md); la estructura en
[architecture-guide](architecture-guide.instructions.md); las recetas en
[patterns](patterns.instructions.md). Este documento no las repite.

## Idioma

- **Contenido en español (es-CL)** (texto de slides).
- **Código/identificadores en inglés**: nombres de props, componentes, variables,
  comentarios técnicos.

## Formato

- **Indentación:** tabs, ancho 4 (nunca espacios).
- **Comillas:** simples.
- **Punto y coma:** siempre.
- **Trailing commas:** en todos los constructos multilínea.
- **printWidth:** ~80.
- **Salto de línea final** en cada archivo.
- Corre `pnpm format` y `pnpm lint` antes de cerrar.

## Naming

- **Componentes:** archivo `PascalCase.vue` (`StatCard.vue`).
- **Helpers TS:** `kebab-case.ts` (`brand-accents.ts`).
- **Tipos/interfaces:** `PascalCase` (`BrandAccent`, `AccentTokens`).
- **Variables/funciones:** `camelCase` (`resolveAccent`).

## TypeScript

- `<script setup lang="ts">` siempre en componentes.
- Sin `any` (prefiere `unknown` + narrowing o tipos explícitos).
- Tipa props con `defineProps<T>()` y usa `withDefaults` para valores por defecto.
- Exporta interfaces/tipos cuando aporten (p. ej. `BrandAccent`).

## Marca (NO negociable)

- **Fuente de verdad de marca:** la guía consolidada de identidad (paleta, tipografías, logo,
  layouts, contraste) es [`BRAND.md`](../../BRAND.md).
- **Nunca hardcodees hex** en slides ni componentes nuevos. Usa tokens UnoCSS
  (`text-brand-pink`, `bg-primary`, `from-brand-rose`…) o `resolveAccent()` para color en
  runtime.
- **Tipografías:** sólo `INACAP Nueva Sans` (sans) y `INACAP Nueva Serif` (serif), ya
  declaradas vía `@font-face` en `src/styles/fonts.css`. No importes fuentes externas.
- **Acentos:** contrato `'pink' | 'rose' | 'fuchsia' | 'primary'`. Rosa corporativo es el
  acento líder; `cream` es la superficie distintiva.
- **Shortcuts:** reutiliza `flex-center`, `card`, `card-glass`, `eyebrow`, `brand-gradient`,
  `chip` (definidos en `src/uno.config.ts`); no rompas la grilla/espaciado.
- **Iconos:** clases Iconify MDI (`i-mdi-*`).

## Comentarios (JSDoc)

- Descripción principal en **mayúscula inicial**; `@param`/`@returns` en minúscula.
- Comentarios inline en minúscula. Secciones con `// SECTION: …`.
- En componentes, incluye un `@example` de uso desde Markdown.

## Accesibilidad

- `alt` en imágenes; jerarquía de headings correcta (un `#` por slide como mucho).
- Contraste suficiente; texto legible a distancia de proyección.
- Respeta `prefers-reduced-motion` (ya cubierto en `src/styles/animations.css`).

## Anti-patrones (evita)

- Texto de contenido dentro de componentes Vue (va en Markdown).
- Hex hardcodeados, fuentes externas, `any`, estilos inline con colores crudos.
- Romper la grilla/espaciado en vez de reutilizar shortcuts.
- Animaciones agresivas o sin fallback de movimiento reducido.
- Mezclar idiomas: contenido en español, código en inglés.
