# GEMINI.md

Las instrucciones completas, neutrales a la herramienta, viven en **[AGENTS.md](./AGENTS.md)**.
Léelo primero y trátalo como la fuente única de verdad.

Capacidades reutilizables en [`.ai/`](./.ai/README.md) — lee el archivo relevante cuando aplique:

- `.ai/skills/` — el **manual de trabajo** (`ways-of-working`, léelo primero), el flujo spec-driven (`sdd-specify` → `plan` → `tasks` → `implement` → `verify`) y skills de buenas prácticas (`slide-authoring`, `brand-system`, `vue-component`, `export-build`).
- `.ai/prompts/` — playbooks de tarea (`create-slide`, `create-section`, `create-component`, `customize-brand-theme`, reviews, generadores) y mantenimiento (`optimize-documentation`, `update-instructions`).
- `.ai/agents/` — roles de agente (`blueprint`, `debug`, `mentor`, `slidev`).

Para correr el loop spec-driven, sigue `.ai/skills/sdd-<paso>.md`. No dupliques guías aquí —
actualiza `AGENTS.md` o los archivos `.ai/`.
