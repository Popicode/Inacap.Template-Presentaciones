# Plan: <nombre de la presentación>

- **Brief:** ./spec.md
- **Estado:** draft | approved

> Diseño que satisface el brief. Respeta `AGENTS.md` y
> `.github/instructions/architecture-guide.instructions.md`. Sin desglose de tareas
> aquí (eso es `/tasks`).

## Arco narrativo

<Enfoque en pocas frases: cómo fluye la historia de apertura a cierre.>

## Secciones / outline

| #   | Sección   | Layout      | Acento | Mensaje(s) clave |
| --- | --------- | ----------- | ------ | ---------------- |
| 1   | Portada   | `cover`     | pink   | —                |
| 2   | <Sección> | `section`   | <acc>  | #<n>             |
| 3   | <Énfasis> | `statement` | <acc>  | #<n>             |
| ... | ...       | ...         | ...    | ...              |
| N   | Cierre    | `end`       | pink   | —                |

## Componentes necesarios

- **Reutilizar:** <`StatCard`, `ProgressRing`, `PhaseTimeline`, `KanbanBoard`, `TechStack`…>
- **Nuevos (si aplica):** <Nombre.vue — propósito, prop `accent`, animación>.
  Ver skill `vue-component`.

## Marca y animación

- Acentos por sección, shortcuts UnoCSS y tipografías INACAP (skill `brand-system`).
- Reveals con `<v-clicks>` / `v-click`; entradas con clases `anim-*`;
  `prefers-reduced-motion` respetado.

## Riesgos / decisiones

- <Densidad por slide, accesibilidad/contraste, legibilidad a distancia,
  exportación (PDF/PPTX/PNG).>
