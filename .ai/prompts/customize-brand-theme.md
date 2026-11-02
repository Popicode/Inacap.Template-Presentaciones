# Personalizar el tema de marca

Ajusta tokens, shortcuts o tipografías de la identidad INACAP sin romper la consistencia.

## Procedimiento

1. Revisa `AGENTS.md`, **`BRAND.md`** y la skill `brand-system`.
2. **Colores/shortcuts:** edita `src/uno.config.ts` (deep-merge sobre los presets de
   Slidev). Añade tokens con nombres semánticos (`brand-*`, `primary`, `cream`, `ink`…)
   y shortcuts reutilizables. Recuerda que `uno.config.ts` debe vivir bajo `src/`.
3. **Acentos en runtime:** si añades un acento, actualiza `BrandAccent` y `ACCENTS` en
   `src/components/brand-accents.ts`, y agrégalo a la `safelist` de `uno.config.ts`.
4. **Tipografías:** sólo `INACAP Nueva Sans` / `INACAP Nueva Serif` (`@font-face` en
   `src/styles/fonts.css`). No introduzcas fuentes externas.
5. Nunca hardcodees hex en slides/componentes; consume los tokens.
6. Verifica con `pnpm dev`, `pnpm typecheck`, `pnpm lint` y `pnpm format`.

## Salida

Los tokens/shortcuts/acentos modificados y dónde se consumen.
