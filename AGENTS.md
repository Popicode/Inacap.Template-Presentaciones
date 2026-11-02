# AGENTS.md — Plantilla de Presentaciones INACAP (Slidev)

> Fuente única de verdad, neutral a la herramienta, para **todos** los asistentes de IA
> (GitHub Copilot, Claude, Gemini, Codex y cualquier agente que lea `AGENTS.md`).
> `CLAUDE.md` y `GEMINI.md` son punteros delgados a este documento; Copilot lo lee de forma
> nativa. Si editas las reglas, edítalas **aquí** — no las dupliques en los punteros.

Plantilla **corporativa INACAP** para construir presentaciones empresariales con
[Slidev](https://sli.dev) (Vue 3 + Vite + UnoCSS) de forma **escalable y reutilizable**:
**Markdown primero** para el contenido (`src/slides.md`), **componentes Vue** (`src/components/`)
sólo para lo interactivo o animado, e **identidad corporativa** centralizada (colores,
tipografías INACAP, logo). El objetivo de cualquier agente es **producir slides bellas, on-brand y
mantenibles** sin reinventar estilos ni romper la consistencia visual.

## Cómo usar este documento

- Este archivo es el contrato de alto nivel (stack, reglas, convenciones). El detalle de largo
  formato vive en los **deep refs** (al final); enlaza a ellos en vez de repetir.
- **Manual de trabajo:** lee primero [`.ai/skills/ways-of-working.md`](.ai/skills/ways-of-working.md)
  — la política de autonomía, la Definition of Done y cómo hablar con un usuario (a menudo no
  técnico).
- Las instrucciones del usuario siempre tienen prioridad — ver Orden de prioridad.

## Orden de prioridad

Cuando haya conflicto, resuelve en este orden:

1. **Instrucciones del usuario** — una petición directa en el chat.
2. **Este archivo (`AGENTS.md`)** — el contrato canónico, neutral a la herramienta.
3. **Deep references** en [`.github/instructions/`](.github/instructions/) y la guía de marca
   [`BRAND.md`](BRAND.md).
4. **Patrones existentes** en el código bajo `src/`.

## Stack

| Área            | Elección                                            |
| --------------- | --------------------------------------------------- |
| Motor de slides | Slidev (`@slidev/cli`)                              |
| UI              | Vue 3 (`<script setup lang="ts">`)                  |
| Build           | Vite                                                |
| Estilos/tokens  | UnoCSS (paleta de marca, shortcuts, `presetIcons`)  |
| Iconos          | Iconify MDI (`@iconify-json/mdi`, clases `i-mdi-*`) |
| Tipado          | TypeScript estricto (`vue-tsc`)                     |
| Tooling         | ESLint + Prettier, pnpm                             |
| Runtime         | Node `>=22`, pnpm `>=10`                            |

## Comandos

```bash
pnpm dev          # desarrollo con HMR (slidev src/slides.md --open)
pnpm build        # build estático → dist/
pnpm export       # exportar PDF  → .reports/presentation.pdf
pnpm export:pptx  # exportar PPTX → .reports/presentation.pptx
pnpm export:png   # exportar PNG  → .reports/slides/
pnpm preview      # build + vite preview
pnpm typecheck    # vue-tsc --noEmit
pnpm lint         # ESLint --fix (cache)
pnpm format       # Prettier --write
```

Corre `pnpm typecheck && pnpm lint && pnpm build` antes de cerrar cambios no triviales.

## Estructura del proyecto

```
.
├── package.json · tsconfig.json · eslint.config.js · .prettierrc   # tooling (raíz)
├── AGENTS.md · BRAND.md · README.md                                # contrato, marca, docs (raíz)
└── src/                 # ← TODO lo que Slidev/Vite procesa (raíz de Slidev)
    ├── slides.md        # la presentación (Markdown + componentes)
    ├── uno.config.ts    # tokens de marca UnoCSS (colores, shortcuts, safelist)
    ├── components/      # componentes Vue auto-importados (+ brand-accents.ts)
    ├── layouts/         # layouts custom (cover, section, statement, end)
    ├── styles/          # fonts.css · layout.css · animations.css (auto-cargados)
    ├── global-top.vue · global-bottom.vue
    └── public/          # fuentes INACAP, logo, favicon
```

**Regla clave:** todo lo que Slidev/Vite procesa vive bajo `src/` (incluido `uno.config.ts` y
`public/`); si `uno.config.ts` queda en la raíz, los tokens de marca **no se aplican**. Detalle
completo: **architecture-guide**.

## Principios

- **On-brand siempre** — tokens, tipografías INACAP y shortcuts; cero hex crudo. Guía: **BRAND.md**.
- **Una idea por slide** — claridad y jerarquía sobre densidad.
- **Reutiliza antes de crear** — layouts (`cover`/`section`/`statement`/`end`), shortcuts y los
  componentes existentes (`StatCard`, `ProgressRing`, `PhaseTimeline`, `KanbanBoard`, `TechStack`,
  `BrandLogo`).
- **Decide por defecto, pregunta sólo el mensaje** — autonomía técnica según el manual de trabajo;
  espeja el idioma del usuario al hablarle.
- **Accesible y mantenible** — animaciones con fallback, contenido en Markdown.
- **YAGNI** — cambios mínimos y atómicos.

## Reglas críticas (NO negociables)

1. **Idioma:** contenido en **español (es-CL)**; código/identificadores/comentarios en **inglés**.
2. **Markdown primero.** Crea componentes Vue sólo cuando necesites estado, animación con lógica o
   interactividad. No envuelvas texto plano en Vue.
3. **Nunca hardcodees colores hex.** Usa tokens UnoCSS (`text-brand-pink`, `bg-primary`…) o
   `resolveAccent()` de `src/components/brand-accents.ts`. **Guía completa de marca: [`BRAND.md`](BRAND.md).**
4. **Tipografías:** sólo `INACAP Nueva Sans` y `INACAP Nueva Serif` (`@font-face` en
   `src/styles/fonts.css`). No importes fuentes externas.
5. **TypeScript estricto.** `<script setup lang="ts">`, props con `defineProps<T>()`, sin `any`.
6. **Accesibilidad:** `alt`, jerarquía de headings, contraste (el verde sólo en display, no en
   texto pequeño — ver BRAND.md), `prefers-reduced-motion`.
7. **Formato:** tabs (ancho 4), comillas simples, `;`, trailing commas.

## Estilo de código

Tabs (ancho 4), comillas simples, punto y coma, trailing commas; corre `pnpm format` y `pnpm lint`
antes de terminar. Naming, JSDoc, contrato de componentes y anti-patrones completos:
**coding-standards**.

## Verificación

**No hay TDD/tests unitarios.** La verificación de un cambio es técnica + revisión on-brand y de
accesibilidad contra el brief:

- **Técnica:** `pnpm typecheck` (vue-tsc), `pnpm lint`, `pnpm build` (y `pnpm export` si se entrega).
- **On-brand:** sin hex crudo, sólo fuentes INACAP, tokens/shortcuts — contra [`BRAND.md`](BRAND.md).
- **Accesibilidad:** `alt`, headings jerárquicos, contraste, `prefers-reduced-motion`.
- **Funciona de verdad:** revisado en `pnpm dev`, no sólo el diff.

## Convenciones de commit

Usa **Conventional Commits con Gitmoji**: `<tipo>(<scope opcional>) <gitmoji>: <descripción>`.

```
feat(cover) ✨: portada con isotipo a la izquierda
fix(section) 🐛: corrige el contraste del watermark
style(brand) 🎨: ajusta el token de acento púrpura
docs(brand) 📚: documenta la paleta en BRAND.md
refactor(StatCard) ♻️: usa resolveAccent en vez de hex
```

Tipos comunes: `feat` ✨, `fix` 🐛, `docs` 📚, `style` 🎨, `refactor` ♻️, `perf` ⚡, `chore` 🔧,
`build` 📦, `ci`. Sujeto en imperativo y ≤ 72 caracteres.

## Spec-driven development (SDD) para decks

Construye presentaciones con un loop spec-first. `AGENTS.md` es la constitución; los procedimientos
viven en [`.ai/skills/`](.ai/skills/). **No hay TDD/tests** — la verificación es técnica + revisión
on-brand y de accesibilidad contra el brief.

```
/specify   idea       → specs/NNN-slug/spec.md   (brief: audiencia, objetivo, mensajes
                                                   clave, duración, tono)
/plan      spec.md     → specs/NNN-slug/plan.md   (outline, arco narrativo, secciones,
                                                   layouts y componentes)
/tasks     plan.md     → specs/NNN-slug/tasks.md  (tareas atómicas por slide/sección)
/implement tasks.md    → Markdown + componentes Vue on-brand
/verify    deck        → typecheck + lint + build (+ export) + revisión on-brand/a11y
```

`/implement` reutiliza los prompts canónicos en [`.ai/prompts/`](.ai/prompts/) (`create-slide`,
`create-section`, `create-component`, `customize-brand-theme`) y las skills de buenas prácticas
(`slide-authoring`, `brand-system`, `vue-component`, `export-build`). **Ajusta la ceremonia al
cambio** (ver el manual de trabajo): un ajuste trivial se hace y pasa la Definition of Done; un deck
o sección nueva corre el loop completo. Presenta checkpoints en lenguaje del usuario.

GitHub Copilot expone estos pasos como prompts `/spec-*` bajo `.github/prompts/`; Claude, Gemini y
Codex siguen los archivos de procedimiento directamente — apunta el agente a `.ai/skills/sdd-<paso>.md`.

## Deep references

| Documento                                                                     | Alcance                                                                        |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [Manual de trabajo](.ai/skills/ways-of-working.md)                            | Autonomía, decisiones por defecto, Definition of Done, usuarios no técnicos    |
| [Guía de marca (BRAND.md)](BRAND.md)                                          | Paleta INACAP, tipografías, logo, layouts, movimiento, accesibilidad/contraste |
| [Architecture guide](.github/instructions/architecture-guide.instructions.md) | Estructura del proyecto, regla "todo bajo `src/`", flujo build/export          |
| [Coding standards](.github/instructions/coding-standards.instructions.md)     | Marca/tokens/fuentes, formato, naming, JSDoc, TypeScript, accesibilidad        |
| [Patterns](.github/instructions/patterns.instructions.md)                     | Recetas: crear slide, layouts, contrato de componentes, animaciones            |
| [README](README.md)                                                           | Documentación humana del proyecto y puesta en marcha                           |

## Índice `.ai/`

Capacidades reutilizables en [`.ai/`](.ai/README.md) — lee el archivo relevante cuando aplique:

- `.ai/skills/` — el **manual de trabajo** (`ways-of-working`, léelo primero), el flujo SDD
  (`sdd-specify` → `plan` → `tasks` → `implement` → `verify`) y skills de buenas prácticas
  (`slide-authoring`, `brand-system`, `vue-component`, `export-build`).
- `.ai/prompts/` — playbooks de tarea (`create-slide`, `create-section`, `create-component`,
  `customize-brand-theme`, `review-and-refactor`, generadores de blueprint, `create-llms`,
  y mantenimiento `optimize-documentation` / `update-instructions`).
- `.ai/agents/` — roles de agente (`blueprint`, `debug`, `mentor`, `slidev`).
- `.ai/templates/` — plantillas de brief/outline/tareas para el loop SDD.

Los prompts y agentes son canónicos en `.ai/`; GitHub Copilot los expone vía punteros delgados en
`.github/prompts/` y `.github/agents/`; Claude, Gemini y Codex leen los archivos `.ai/`
directamente (ver `CLAUDE.md`, `GEMINI.md` y este archivo).
