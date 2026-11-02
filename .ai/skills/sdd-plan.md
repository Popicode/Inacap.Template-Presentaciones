# Skill: SDD — Plan (outline y arco narrativo)

Convierte un brief aprobado en un **diseño de la presentación**. **Cómo, anclado en
la arquitectura de este template.**

## Cuándo usarla

Después de `/specify`, una vez que `spec.md` está aprobado. Entrada: `specs/NNN-<slug>/spec.md`.

## Procedimiento

1. **Lee el brief** y `AGENTS.md` + `.github/instructions/architecture-guide.instructions.md`.
   Revisa los layouts (`src/layouts/`), componentes (`src/components/`) y estilos
   (`src/styles/`) existentes antes de diseñar.
2. **Escribe `specs/NNN-<slug>/plan.md`** desde `.ai/templates/plan.template.md`.
3. **Diseña dentro de las convenciones del template:**
   - **Arco narrativo:** apertura (`cover`), desarrollo por secciones (`section`),
     momentos de énfasis (`statement`) y cierre (`end`). Define el orden y la
     transición de cada bloque.
   - **Markdown primero:** el contenido vive en `src/slides.md`; cada slide se separa
     con `---` y lleva su front-matter (`layout`, `transition`).
   - **Componentes sólo cuando aportan:** identifica qué slides necesitan un componente
     Vue interactivo/animado (`StatCard`, `ProgressRing`, `PhaseTimeline`,
     `KanbanBoard`, `TechStack`) y cuáles son Markdown puro. Ver skill `vue-component`.
   - **Marca:** acentos por sección (`pink | rose | fuchsia | primary`), shortcuts
     UnoCSS (`card`, `eyebrow`, `brand-gradient`), tipografías INACAP. Nunca hex crudo.
     Ver skill `brand-system`.
   - **Animaciones:** reveals con `<v-clicks>` / `v-click`; clases `anim-*` para
     entradas; respeta `prefers-reduced-motion`.
4. **Mapea mensajes clave → secciones/slides.** Cada mensaje clave del brief debe tener
   al menos un bloque que lo entregue.
5. **Señala riesgos/decisiones:** densidad de contenido por slide, accesibilidad
   (contraste, jerarquía de headings, `alt`), legibilidad a distancia, exportación
   (PDF/PPTX/PNG) si aplica.
6. **Mantente minimal (YAGNI).** Sin lista de tareas todavía — eso es `/tasks`.

## Salida

- La ruta del plan y un resumen del arco narrativo + secciones afectadas.
- Señala cualquier ambigüedad del brief (vuelve a `/specify` si hace falta).
- **Siguiente paso:** `/tasks`.
