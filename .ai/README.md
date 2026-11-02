# `.ai/` — Capa de autoría de presentaciones asistida por IA

Hogar canónico, neutral a la herramienta, de **todos** los prompts de tarea, agentes, el
flujo **spec-driven (SDD)** adaptado a autoría de decks, y las skills de buenas prácticas.
Esta es la fuente de verdad de cada procedimiento; cada herramienta de IA recibe un adapter
delgado que apunta aquí (misma filosofía que [`AGENTS.md`](../AGENTS.md)).

> **Empieza por el manual de trabajo:** [`skills/ways-of-working.md`](skills/ways-of-working.md)
> es la guía operativa de la plantilla — política de **autonomía** (decide por defecto, pregunta
> sólo el mensaje), la **Definition of Done** de un cambio, y cómo comunicarte con un **usuario no
> técnico**. Léela antes de tocar nada.

## Estructura

```
.ai/
  prompts/         cuerpos canónicos de los prompts de tarea (los procedimientos reales)
    create-slide.md  create-section.md  create-component.md  customize-brand-theme.md
    review-and-refactor.md  architecture-blueprint-generator.md  …  create-llms.md
    optimize-documentation.md  update-instructions.md   (mantenimiento de instrucciones/JSDoc)
  agents/          definiciones canónicas de agentes (los cuerpos reales)
    blueprint.md  debug.md  mentor.md  slidev.md
  skills/          cuerpos canónicos de skills (los procedimientos reales)
    ways-of-working.md   (manual de trabajo — léelo primero)
    sdd-specify.md  sdd-plan.md  sdd-tasks.md  sdd-implement.md  sdd-verify.md
    slide-authoring.md  brand-system.md  vue-component.md  export-build.md
  templates/       plantillas de artefacto usadas por las skills SDD
    spec.template.md  plan.template.md  tasks.template.md
specs/             artefactos generados, una carpeta por presentación (NNN-slug/)
```

## El loop SDD (adaptado a autoría de decks, SIN TDD/tests)

Aquí no hay tests unitarios: el ciclo construye una **presentación**, y la verificación es
técnica (`typecheck`/`lint`/`build`) + **revisión on-brand y de accesibilidad** contra el brief.

```
AGENTS.md (constitución)
  → /specify   idea       → specs/NNN-slug/spec.md   (brief: audiencia, objetivo,
                                                       mensajes clave, duración, tono)
  → /plan      spec.md     → specs/NNN-slug/plan.md   (outline, arco narrativo, secciones,
                                                       layouts y componentes)
  → /tasks     plan.md     → specs/NNN-slug/tasks.md  (tareas atómicas por slide/sección)
  → /implement tasks.md    → Markdown + componentes Vue on-brand
  → /verify    deck        → typecheck + lint + build (+ export) + revisión on-brand/a11y
```

El paso `implement` reutiliza los prompts canónicos en `.ai/prompts/` (`create-slide`,
`create-section`, `create-component`, `customize-brand-theme`) y las skills de buenas
prácticas (`slide-authoring`, `brand-system`, `vue-component`, `export-build`) en vez de
redefinir patrones. Cada paso respeta `AGENTS.md` y los deep refs en `.github/instructions/`.

## Cómo llega cada herramienta a estos archivos

Hay **una** copia canónica de cada procedimiento aquí. Sólo GitHub Copilot mantiene
archivos adapter en el repo; las demás herramientas leen `.ai/` directamente vía su archivo
de contexto raíz.

| Herramienta    | Cómo llega a `.ai/`                                                                                                                                                           |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GitHub Copilot | Punteros delgados bajo `.github/`: `prompts/spec-*.prompt.md` (SDD), `prompts/*.prompt.md` (tareas), `agents/*.agent.md`. Se invocan como `/spec-specify`, `/create-slide`, … |
| Claude Code    | `CLAUDE.md` enlaza aquí — apunta el agente a `.ai/skills/sdd-<paso>.md`, `.ai/prompts/<tarea>.md` o `.ai/agents/<rol>.md`.                                                    |
| Gemini CLI     | `GEMINI.md` enlaza aquí — igual que Claude.                                                                                                                                   |
| Codex          | `AGENTS.md` enlaza aquí. Para slash commands nativos: `mkdir -p ~/.codex/prompts && cp .ai/skills/sdd-*.md .ai/prompts/*.md ~/.codex/prompts/`.                               |

## Regla de edición

Cambia un procedimiento **una vez** en su hogar canónico (`.ai/prompts/`, `.ai/agents/` o
`.ai/skills/`). Al añadir un prompt, agente o skill nuevo, agrega su cuerpo canónico aquí y
un puntero de una línea bajo `.github/` para Copilot — las demás herramientas lo recogen
automáticamente vía su archivo de contexto raíz.
