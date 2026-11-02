---
applyTo: '**'
description: 'Recetas: crear slide, layouts, contrato de componentes, animaciones'
---

# Patrones

Recetas copy-paste para tareas comunes. Las reglas de alto nivel están en
[AGENTS.md](../../AGENTS.md); la estructura en
[architecture-guide](architecture-guide.instructions.md); el estilo en
[coding-standards](coding-standards.instructions.md).

## Crear una slide

Separa cada slide con `---` en su propia línea. El front-matter por slide va inmediatamente
antes del contenido:

```md
---
layout: default
transition: slide-left
---

# Título de la slide

Contenido en **Markdown**. Usa componentes cuando aporten valor:

<StatCard :value="98" suffix="%" label="Satisfacción" accent="pink" icon="i-mdi-emoticon-happy" />
```

## Layouts

Custom del template: `cover`, `section`, `statement`, `end`. Built-ins de Slidev:
`default`, `center`, `two-cols`, `two-cols-header`, `image-right`, `image-left`, …

```md
---
layout: section
class: text-center
---

<div class="eyebrow">Resultados</div>

# Impacto 2025
```

Crea un layout nuevo en `src/layouts/<name>.vue` con `<slot />` para el contenido Markdown
(ver `cover.vue` como referencia: superficie `bg-cream`, glow `anim-float`, logo + slot).

## Reveals (animación por clic)

```md
<v-clicks>

- Primer punto
- Segundo punto

</v-clicks>

<div v-click class="card p-4">Elemento suelto</div>
```

## Contrato de componente

Todos los componentes de marca aceptan una prop `accent`
(`'pink' | 'rose' | 'fuchsia' | 'primary'`). Para color en runtime:

```ts
import { resolveAccent, type BrandAccent } from './brand-accents';

const tokens = resolveAccent('primary'); // { solid, soft, dark }
```

Componente mínimo on-brand:

```vue
<script setup lang="ts">
  import { computed } from 'vue';
  import { type BrandAccent, resolveAccent } from './brand-accents';

  /**
   * Tarjeta de métrica.
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

Reglas: archivo `PascalCase.vue`; `<script setup lang="ts">`; `defineProps<T>()` sin `any`;
iconos `i-mdi-*`; el texto entra por props/slots (no se escribe dentro del componente).

## Animaciones

- **CSS reutilizable:** clases `anim-fade-up`, `anim-fade-in`, `anim-scale-in`,
  `anim-float`, `anim-pulse-ring` (ver `src/styles/animations.css`). Escalona con
  `style="animation-delay: 120ms"`.
- **Fondo animado:** clase `bg-inacap-mesh` (usada por `cover`/`end`).
- Define nuevos `@keyframes` con prefijo `inacap-` y añádelos a `animations.css` con su media
  query de `prefers-reduced-motion`.

## Marca / tokens

- Tokens y shortcuts en `src/uno.config.ts`; acentos en `src/components/brand-accents.ts`.
- Clases dinámicas `text/bg/from/to-brand-{accent}` ya están en la `safelist`; añade nuevas
  allí si introduces un acento.
