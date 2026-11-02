# Instructions

Estos son los **documentos de referencia profunda** para asistentes de IA y desarrolladores.
El punto de entrada canónico, neutral a la herramienta, es [`AGENTS.md`](../../AGENTS.md) en
la raíz del repo — empieza ahí. Estos archivos guardan el detalle de largo formato que aquél
enlaza, cada uno con un alcance único y sin solape:

| Archivo                                                                    | Alcance                                                                 |
| -------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| [`architecture-guide.instructions.md`](architecture-guide.instructions.md) | Estructura del proyecto, regla "todo bajo `src/`", flujo build/export   |
| [`coding-standards.instructions.md`](coding-standards.instructions.md)     | Marca/tokens/fuentes, formato, naming, JSDoc, TypeScript, accesibilidad |
| [`patterns.instructions.md`](patterns.instructions.md)                     | Recetas: crear slide, layouts, contrato de componentes, animaciones     |

Cada archivo lleva frontmatter `applyTo` para que GitHub Copilot lo aplique como instrucción
con alcance de ruta; las demás herramientas los leen como documentación enlazada desde
`AGENTS.md`.

Directorios relacionados:

- [`../prompts/`](../prompts/) — prompts de tarea (crear slide/sección/componente, marca, reviews).
- [`../agents/`](../agents/) — definiciones de agentes (`blueprint`, `debug`, `mentor`, `slidev`).

GitHub Copilot lee `AGENTS.md` de forma nativa; Claude, Gemini y Codex llegan a él vía sus
archivos de contexto raíz.
