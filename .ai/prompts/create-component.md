# Crear un componente Vue

Crea un componente interactivo/animado en `src/components/` siguiendo el contrato del
template.

## Procedimiento

1. Confirma que **se necesita un componente** (estado, animación con lógica o
   interactividad). Si es texto/listas estáticas, va en Markdown. Ver skill `vue-component`.
2. Revisa si un componente existente ya resuelve el caso (`StatCard`, `ProgressRing`,
   `PhaseTimeline`, `KanbanBoard`, `TechStack`, `BrandLogo`).
3. Crea `PascalCase.vue` con `<script setup lang="ts">`:
   - Props tipadas con `defineProps<T>()` + `withDefaults`; sin `any`.
   - Prop `accent?: BrandAccent` por defecto `'pink'`; colores vía `resolveAccent()`.
   - Iconos `i-mdi-*`; animación con clases `anim-*`; respeta `prefers-reduced-motion`.
   - JSDoc con un `@example` de uso desde Markdown.
4. Mantén el texto fuera del componente (entra por props/slots).
5. Verifica con `pnpm typecheck`, `pnpm lint` y `pnpm format`; pruébalo desde una slide.

## Salida

El componente creado, su contrato de props y un ejemplo de uso desde Markdown.
