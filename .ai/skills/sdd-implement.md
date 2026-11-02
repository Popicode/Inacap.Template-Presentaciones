# Skill: SDD — Implement (autoría del deck)

Ejecuta la lista de tareas autoreando el Markdown y los componentes Vue on-brand,
reutilizando los prompts y skills existentes del template.

## Cuándo usarla

Después de `/tasks`. Entrada: `specs/NNN-<slug>/tasks.md`.

## Procedimiento

Trabaja las tareas **en orden**. Para cada tarea sin marcar:

1. **Autorea** el contenido. Reutiliza el prompt o skill que corresponda en lugar de
   reinventar patrones:
   - Slide nueva → prompt `create-slide` · skill `slide-authoring`
   - Sección/divisor → prompt `create-section`
   - Componente Vue interactivo → prompt `create-component` · skill `vue-component`
   - Ajuste de marca/tema → prompt `customize-brand-theme` · skill `brand-system`
2. **Markdown primero:** el contenido va en `src/slides.md` separado por `---` con su
   front-matter por slide (`layout`, `transition`). No envuelvas texto plano en Vue.
3. **On-brand siempre:** tokens UnoCSS (`text-brand-pink`, `bg-primary`, `eyebrow`,
   `card`, `brand-gradient`) o `resolveAccent()`; nunca hex hardcodeado; sólo
   tipografías `INACAP Nueva Sans` / `INACAP Nueva Serif`; iconos `i-mdi-*`.
4. **Componentes:** `<script setup lang="ts">`, props con `defineProps<T>()`, sin `any`,
   prop `accent` del contrato común, animaciones con clases `anim-*` y respeto a
   `prefers-reduced-motion`. Archivos `PascalCase.vue`, helpers `kebab-case.ts`.
5. **Accesibilidad:** `alt` en imágenes, jerarquía de headings correcta, contraste
   suficiente, legibilidad a distancia.
6. **Conforma al contrato de lint/formato:** tabs (ancho 4), comillas simples, `;`,
   trailing commas. Corre `pnpm lint` y `pnpm format` a medida que avanzas.
7. **Marca la tarea** en `tasks.md` y sigue con la próxima.

Mantén los cambios mínimos y atómicos. Si la realidad diverge del plan, anótalo y, si
es material, actualiza `plan.md`/`tasks.md` en vez de derivar en silencio.

## Salida

- Resumen de slides/componentes tocados por tarea y estado de render.
- **Siguiente paso:** `/verify` cuando todas las tareas estén marcadas.
