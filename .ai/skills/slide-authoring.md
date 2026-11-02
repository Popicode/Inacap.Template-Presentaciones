# Skill: Slide authoring (Markdown)

Autorea slides en `src/slides.md` con Markdown primero, front-matter por slide y los
layouts del template.

## Cuándo usarla

Al crear o editar cualquier slide de contenido. El contenido **siempre** vive en
Markdown; recurre a un componente Vue sólo para interactividad o animación con lógica
(ver skill `vue-component`).

## Reglas

- **Separa cada slide con `---`** en su propia línea. El front-matter por slide va
  inmediatamente antes del contenido.
- **Front-matter útil por slide:** `layout`, `transition`, y `class` cuando necesites
  utilidades UnoCSS a nivel de slide.
- **Contenido en español, código/identificadores en inglés** (props, nombres de
  componentes, clases).
- **Marca:** usa tokens y shortcuts (`text-brand-pink`, `bg-primary`, `eyebrow`,
  `card`, `brand-gradient`); nunca hex crudo. Ver skill `brand-system`.
- **Reveals:** usa `<v-clicks>` para listas y `v-click` para elementos sueltos.
  Escalona con `style="animation-delay: 120ms"` cuando combines con clases `anim-*`.
- **Accesibilidad:** un solo `#` (h1) por slide como mucho; jerarquía descendente;
  `alt` en imágenes; texto legible a distancia.

## Layouts disponibles

Custom del template: `cover`, `section`, `statement`, `end`. Built-ins de Slidev:
`default`, `center`, `two-cols`, `two-cols-header`, `image-right`, `image-left`, …

## Patrón

```md
---
layout: section
transition: slide-left
class: text-center
---

<div class="eyebrow">Resultados 2025</div>

# Impacto en seguridad laboral

<v-clicks>

- Reducción de accidentes del 18 %
- Cobertura nacional ampliada

</v-clicks>

<StatCard :value="98" suffix="%" label="Satisfacción" accent="pink" icon="i-mdi-emoticon-happy" />
```

## Notas de lint/formato

Tabs (ancho 4), comillas simples en código, trailing commas, salto de línea final.
Corre `pnpm format` y `pnpm lint`.
