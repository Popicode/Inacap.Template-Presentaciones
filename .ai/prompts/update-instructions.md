# Prompt: Actualizar instrucciones de IA

Mantén los assets de instrucciones de esta plantilla consistentes con la implementación real, con
una jerarquía de fuente-de-verdad clara.

## Archivos en alcance

- `AGENTS.md` — el contrato canónico
- `BRAND.md` — la guía de marca (si cambian tokens/tipografías/logo)
- `llms.txt` — entrypoint compacto (si existe)
- `.github/instructions/*.instructions.md`
- `.github/prompts/*.prompt.md` (sólo los de mantenimiento de instrucciones)
- `CLAUDE.md` / `GEMINI.md` / `.ai/README.md` — punteros delgados (mantenlos delgados)

## Objetivos

1. Quita contradicciones y ejemplos obsoletos (comandos, rutas, nombres de skills/prompts/agentes).
2. Reduce reglas duplicadas entre archivos.
3. Mantén el orden de fuente-de-verdad: usuario → `AGENTS.md` → `.github/instructions/` + `BRAND.md`
   → patrones existentes en `src/`.
4. Alinea las instrucciones con los patrones reales en `src/` (slides, layouts, componentes, tokens).

## Proceso

1. Escanea y compara los archivos; lee los scripts de `package.json` y el contenido de `.ai/`.
2. Valida cada comando y nombre contra lo que existe en disco (sin scripts inventados ni enlaces rotos).
3. Propón un set de edición mínimo pero completo.
4. Aplica con redacción concisa y enlaces relativos estables.
5. Verifica: cada skill/prompt/agente nombrado en los punteros existe; cada enlace resuelve;
   `pnpm lint` limpio.

## Reglas de sincronización

- Las reglas canónicas viven en `AGENTS.md`; la identidad de marca, en `BRAND.md`.
- `llms.txt` es sólo un índice/entrypoint compacto.
- Los punteros delgados (`CLAUDE.md`, `GEMINI.md`, `.github/`) nunca duplican guías — enlazan.

## Salida

Qué cambió y por qué (por archivo), más seguimientos pendientes.
