# Skill: SDD — Verify (calidad + revisión on-brand)

Confirma que la presentación satisface el brief y las puertas de calidad del proyecto.
**No hay tests unitarios** — la verificación es técnica + revisión on-brand y de
accesibilidad contra el brief.

## Cuándo usarla

Después de `/implement`, cuando todas las tareas están marcadas. Entrada: el `spec.md`

- `tasks.md` de la presentación.

## Procedimiento

1. **Corre la puerta de calidad técnica:**
   ```bash
   pnpm typecheck
   pnpm lint
   pnpm build
   pnpm export        # sólo si el entregable incluye PDF/PPTX/PNG
   ```
   Todas deben pasar. Reporta la salida real — no afirmes "verde" sin ejecutar.
2. **Revisión on-brand** (visual, en `pnpm dev`): sin hex hardcodeados; sólo
   tipografías INACAP; acentos coherentes por sección; shortcuts UnoCSS reutilizados;
   grilla/espaciado consistentes; logo y superficies (cream) correctos.
3. **Revisión de accesibilidad:** contraste suficiente, jerarquía de headings,
   `alt` en imágenes, animaciones con fallback de `prefers-reduced-motion`,
   legibilidad a distancia de proyección.
4. **Traza mensajes clave → slides.** Para cada mensaje clave del `spec.md`, confirma
   que una slide/sección lo entrega (usa la tabla de trazabilidad de `tasks.md`).
   Marca cualquier mensaje no cubierto.
5. **Verifica contra el brief:** audiencia, objetivo, tono y duración estimada
   (número de slides razonable para el tiempo).
6. **Marca el spec como `implemented`** (campo de estado) cuando todo pase.

## Salida

- Pass/fail por puerta técnica con la salida real de los comandos.
- Una tabla mensaje-por-mensaje (cubierto / faltante) + hallazgos de marca/a11y.
- Pendientes o diferidos. Si hay brechas, vuelve a `/tasks` o `/implement`.
