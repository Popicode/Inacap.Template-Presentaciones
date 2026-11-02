---
applyTo: '**'
description: 'Estructura del proyecto, regla "todo bajo src/", flujo build/export'
---

# Guía de arquitectura

Deep reference de **dónde vive cada cosa y cómo encaja**. Las reglas de alto nivel están en
[AGENTS.md](../../AGENTS.md); el estilo está en
[coding-standards](coding-standards.instructions.md); las recetas en
[patterns](patterns.instructions.md). Este documento no las repite.

## Filosofía

- **Markdown primero** para el contenido (`src/slides.md`).
- **Componentes Vue** (`src/components/`) sólo para lo **interactivo o animado**.
- **Identidad corporativa** centralizada (colores, tipografías INACAP, logo).

El objetivo de cualquier agente es producir slides bellas, on-brand y mantenibles sin
reinventar estilos ni romper la consistencia visual.

## Estructura del proyecto

```
.
├── package.json · tsconfig.json · eslint.config.js · .prettierrc   # tooling (raíz)
├── shims.d.ts           # tipos ambientales para vue-tsc — raíz
└── src/                 # ← TODO el contenido de la presentación (raíz de Slidev)
    ├── slides.md        # la presentación (Markdown + componentes)
    ├── uno.config.ts    # tokens de marca UnoCSS (colores, shortcuts, safelist)
    ├── components/      # componentes Vue auto-importados en el Markdown
    │   ├── brand-accents.ts # helper de paleta (resolveAccent)
    │   ├── StatCard.vue     # métrica con count-up
    │   ├── ProgressRing.vue # anillo de progreso SVG animado
    │   ├── PhaseTimeline.vue# roadmap/Gantt animado
    │   ├── KanbanBoard.vue  # tablero kanban presentacional
    │   ├── TechStack.vue    # grilla de tecnologías
    │   └── BrandLogo.vue    # isotipo INACAP
    ├── layouts/         # layouts custom (cover, section, statement, end)
    ├── styles/          # fonts.css · layout.css · animations.css · index.ts (auto-cargados)
    ├── global-top.vue · global-bottom.vue  # watermark + número de slide
    └── public/          # fuentes INACAP, logo-inacap.svg, favicon
```

## Regla: todo lo que Slidev/Vite procesa vive bajo `src/`

Slidev trata la carpeta del `slides.md` (`src/`) como su raíz, así que `components/`,
`layouts/`, `styles/`, `global-*.vue`, **`public/`** y **`uno.config.ts`** deben vivir bajo
`src/`. Si dejas `uno.config.ts` en la raíz, **los colores y shortcuts de marca NO se
aplican**. Sólo el tooling (`package.json`, `tsconfig.json`, eslint, prettier) queda en la
raíz del repo.

## Flujo build / export

```
pnpm dev          # desarrollo con HMR (slidev src/slides.md --open)
pnpm build        # build estático → dist/ (en la raíz del proyecto)
pnpm export       # PDF  → .reports/presentation.pdf
pnpm export:pptx  # PPTX → .reports/presentation.pptx
pnpm export:png   # PNG  → .reports/slides/
pnpm preview      # build + vite preview
pnpm typecheck    # vue-tsc --noEmit
pnpm lint         # eslint --fix (cache)
pnpm format       # prettier --write
```

- El build escribe en `dist/` y los exports en `.reports/`; son **artefactos generados**
  (no editar a mano).
- La exportación usa un navegador headless (Slidev/Playwright); si falla, instala el
  Chromium que pida la CLI.

## Componentes auto-importados

Los componentes en `src/components/` se auto-importan en `src/slides.md` (no requieren
`import`). El helper `resolveAccent()` (`src/components/brand-accents.ts`) centraliza la
paleta para que cada componente exponga el mismo contrato de prop `accent`.
