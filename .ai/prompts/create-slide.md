# Crear una slide

Crea una slide nueva en `src/slides.md` siguiendo las convenciones del template.

## Procedimiento

1. Revisa `AGENTS.md` (fuente de verdad) y la skill `slide-authoring`.
2. Decide el **layout** (`cover`, `section`, `statement`, `end` o un built-in de Slidev)
   y la **transición** según el rol de la slide en el arco narrativo.
3. Separa la slide con `---` y escribe su front-matter por slide (`layout`, `transition`,
   `class` si necesitas utilidades UnoCSS).
4. Escribe el contenido en **Markdown** (español). Usa reveals (`<v-clicks>` / `v-click`)
   cuando aporten. Inserta componentes (`StatCard`, `ProgressRing`, …) sólo si hace falta
   interactividad/animación; el texto va en Markdown.
5. Aplica marca: tokens y shortcuts (`eyebrow`, `card`, `brand-gradient`,
   `text-brand-*`); nunca hex crudo; sólo tipografías INACAP.
6. Cuida la accesibilidad: jerarquía de headings, `alt`, contraste, legibilidad.
7. Verifica con `pnpm dev`; corre `pnpm lint` y `pnpm format`.

## Salida

La slide añadida, el layout elegido y cualquier componente usado.
