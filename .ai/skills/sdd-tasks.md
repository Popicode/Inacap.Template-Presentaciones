# Skill: SDD — Tasks (tareas por slide/sección)

Descompone un plan aprobado en tareas atómicas, ordenadas y verificables, una por
slide o sección.

## Cuándo usarla

Después de `/plan`. Entrada: `specs/NNN-<slug>/plan.md` (+ `spec.md`).

## Procedimiento

1. **Lee** el plan y el brief.
2. **Escribe `specs/NNN-<slug>/tasks.md`** desde `.ai/templates/tasks.template.md`.
3. **Haz cada tarea atómica y verificable:**
   - Una unidad coherente: una slide, una sección, o un componente Vue nuevo
     (lo bastante pequeña como para autorearla y revisarla de forma aislada).
   - Cada tarea nombra el **layout** que usa y el **mensaje clave** del brief que
     entrega.
   - "Listo cuando" explícito: **renderiza on-brand** en `pnpm dev` + `pnpm typecheck`
     y `pnpm lint` limpios (y un componente nuevo compila sin `any`).
4. **Ordena por dependencia:** tokens/estilos de marca → componentes Vue nuevos →
   layouts → slides que los consumen → revisión global de arco y accesibilidad.
   Una tarea no debe depender de otra posterior.
5. **Trazabilidad total:** cada mensaje clave del `spec.md` mapea a ≥ 1 tarea en la
   tabla de trazabilidad. Sin mensajes huérfanos, sin tareas sin mensaje.
6. **Mantén el alcance honesto:** si una tarea es grande o vaga, divídela. Anota lo
   diferido.

## Salida

- La ruta de tasks, el número de tareas y la confirmación de que la tabla de
  trazabilidad cubre cada mensaje clave.
- **Siguiente paso:** `/implement`.
