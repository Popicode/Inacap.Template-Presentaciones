# Crear una sección

Crea un divisor de sección (y, opcionalmente, su bloque de slides) coherente con el arco
narrativo.

## Procedimiento

1. Revisa `AGENTS.md` y la skill `slide-authoring`.
2. Usa el layout `section` para el divisor; asigna un **acento** consistente a toda la
   sección (`pink | rose | fuchsia | primary`).
3. Front-matter por slide del divisor (`layout: section`, `transition`); título con
   `eyebrow` (kicker) + headline.
4. Si creas el bloque completo, encadena las slides de contenido tras el divisor con
   `---`, reutilizando layouts y componentes.
5. Mantén la marca y la accesibilidad (ver skills `brand-system` / `slide-authoring`).
6. Verifica con `pnpm dev`; corre `pnpm lint` y `pnpm format`.

## Salida

El divisor (y slides) añadidos y el acento elegido para la sección.
