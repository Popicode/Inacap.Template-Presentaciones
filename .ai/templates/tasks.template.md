# Tareas: <nombre de la presentación>

- **Brief:** ./spec.md · **Plan:** ./plan.md
- **Estado:** draft | in progress | done

> Tareas atómicas y ordenadas, una por slide/sección o componente. "Listo cuando" =
> **renderiza on-brand** + `pnpm typecheck` y `pnpm lint` OK. Marca a medida que avanzas.

## Tareas

- [ ] **T1 — <título>**
  - Slide/sección o componente: `<layout / archivo>`
  - Entrega mensaje clave #<n>
  - Listo cuando: renderiza on-brand en `pnpm dev` + typecheck/lint OK
- [ ] **T2 — <título>**
  - ...
  - Listo cuando: ...
- [ ] ...

## Trazabilidad

Cada mensaje clave del `spec.md` debe estar cubierto por al menos una tarea.

| Mensaje clave | Tarea(s) |
| ------------- | -------- |
| #1            | T?       |
| #2            | T?       |

## Definición de listo

- [ ] Todas las tareas marcadas; el deck renderiza completo en `pnpm dev`.
- [ ] `pnpm typecheck` y `pnpm lint` limpios; `pnpm format` aplicado.
- [ ] `pnpm build` OK (y `pnpm export` si el entregable lo incluye).
- [ ] Revisión on-brand (tokens/tipografías/acentos) y de accesibilidad (contraste,
      headings, `alt`, `prefers-reduced-motion`).
- [ ] Cada mensaje clave traza a una slide/sección.
