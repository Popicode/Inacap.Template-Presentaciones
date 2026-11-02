# Skill: Brand system (UnoCSS + INACAP)

Aplica la identidad corporativa INACAP de forma consistente vía tokens UnoCSS, shortcuts,
tipografías y el helper `resolveAccent()`.

Guía completa de identidad (paleta, tipografías, logo, layouts, contraste): [`BRAND.md`](../../BRAND.md).

## Cuándo usarla

Al elegir colores, tipografías o estilos en cualquier slide o componente, y al ajustar
el tema de marca.

## Reglas (NO negociables)

- **Nunca hardcodees hex** en slides ni en componentes nuevos. Usa clases de marca o,
  para color en runtime dentro de componentes, `resolveAccent()`.
- **Tipografías:** sólo `INACAP Nueva Sans` (sans) y `INACAP Nueva Serif` (serif), ya
  declaradas vía `@font-face` en `src/styles/fonts.css`. No importes fuentes externas.
- **Acentos:** el contrato de marca es `'pink' | 'rose' | 'fuchsia' | 'primary'`.
  El rosa corporativo (`primary` / `brand-pink`) es el acento líder; `cream` es la
  superficie distintiva de portadas y divisores.

## Tokens y shortcuts (definidos en `src/uno.config.ts`)

- **Colores:** `brand-pink` (+ `-alt` / `-dark`), `brand-rose`, `brand-fuchsia`,
  `primary`, `cream` / `cream-alt`, `ink` / `ink-soft`, `warning`, `danger`.
  Úsalos como `text-brand-pink`, `bg-primary`, `from-brand-rose`, `to-brand-fuchsia`.
- **Shortcuts:** `flex-center`, `flex-between`, `abs-center`, `card`, `card-glass`,
  `brand-gradient` (texto con degradé de marca), `eyebrow` (kicker), `chip`.
- **Safelist:** las clases dinámicas `text/bg/from/to-brand-{accent}` ya están en la
  safelist; si añades un acento nuevo, agrégalo allí o no se generará.

## `resolveAccent()` (runtime, en componentes)

```ts
import { resolveAccent, type BrandAccent } from './brand-accents';

const tokens = resolveAccent('primary'); // { solid, soft, dark }
```

Úsalo cuando necesites el hex en estilos inline calculados (gradientes, bordes), no
para clases estáticas que ya cubre UnoCSS.

## Extender el tema

Añade colores/shortcuts nuevos en `src/uno.config.ts` (deep-merge sobre los presets de
Slidev). Mantén `brand-accents.ts` sincronizado con la paleta si añades un acento.
Recuerda que `uno.config.ts` **debe** vivir bajo `src/` o los tokens no se aplican.
