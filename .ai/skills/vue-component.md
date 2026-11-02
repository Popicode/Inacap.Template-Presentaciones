# Skill: Vue component (interactivo/animado)

Decide cuándo construir un componente Vue y cómo escribirlo on-brand, tipado y accesible.

## Cuándo usarla

Sólo cuando una slide necesita **estado, animación con lógica o interactividad** que el
Markdown no cubre. Si es texto/listas estáticas → Markdown (ver skill `slide-authoring`).
Componentes existentes reutilizables: `StatCard`, `ProgressRing`, `PhaseTimeline`,
`KanbanBoard`, `TechStack`, `BrandLogo`.

## Reglas

- **`<script setup lang="ts">` siempre.** Sin `any`; tipa props con `defineProps<T>()`
  y usa `withDefaults` para valores por defecto.
- **Contrato de acento:** expón una prop `accent?: BrandAccent`
  (`'pink' | 'rose' | 'fuchsia' | 'primary'`, por defecto `'pink'`) y resuelve los
  colores con `resolveAccent()` de `./brand-accents`. Nunca hex hardcodeado.
- **Marca:** clases UnoCSS y shortcuts (`card`, `flex-center`, …); tipografías INACAP.
- **Iconos:** clases Iconify MDI (`i-mdi-*`), ya disponibles vía `@iconify-json/mdi`.
- **Animaciones:** clases `anim-*` (`anim-fade-up`, `anim-scale-in`, `anim-float`,
  `anim-pulse-ring`) de `src/styles/animations.css`; respeta `prefers-reduced-motion`.
  Define nuevos `@keyframes` con prefijo `inacap-`.
- **Naming:** archivo de componente `PascalCase.vue`; helpers TS `kebab-case.ts`.
- **JSDoc:** describe el componente y añade un `@example` de uso desde Markdown.
- **Sin texto de contenido dentro del componente** — el texto va en Markdown vía props
  o slots.

## Patrón

```vue
<script setup lang="ts">
  import { computed } from 'vue';
  import { type BrandAccent, resolveAccent } from './brand-accents';

  /**
   * Tarjeta de métrica animada.
   *
   * @example
   * <StatCard :value="98" suffix="%" label="Cobertura" accent="pink" />
   */
  const props = withDefaults(
    defineProps<{ value: number; label: string; accent?: BrandAccent }>(),
    { accent: 'pink' },
  );

  const tokens = computed(() => resolveAccent(props.accent));
</script>

<template>
  <div
    class="card anim-scale-in p-5"
    :style="{ borderTop: `4px solid ${tokens.solid}` }"
  >
    <span class="text-5xl font-extrabold" :style="{ color: tokens.solid }">
      {{ value }}
    </span>
    <span class="text-sm text-gray-600">{{ label }}</span>
  </div>
</template>
```

Los componentes en `src/components/` se **auto-importan** en `src/slides.md`. Verifica
con `pnpm typecheck` y `pnpm lint`.
