# Prompt: Optimizar documentación (JSDoc de componentes)

Audita y ajusta los comentarios JSDoc de los componentes Vue (`src/components/`, `src/layouts/`)
para que sean concisos, precisos y consistentes — sin cambiar comportamiento ni estilos.

## Cuándo usarlo

Cuando los JSDoc de componentes hayan derivado: prosa larga, props sin describir, ejemplos
obsoletos, o estilo inconsistente.

## Entradas (requeridas)

```
Target: <glob, p.ej. src/components/**/*.vue, src/components/*.ts>
Reglas: <opcional; defaults abajo>
```

Si no se da target, pídelo y no edites nada.

## Reglas por defecto

- Estilo JSDoc `/** … */`. Primera frase = resumen de una línea (imperativo, mayúscula inicial).
- Mantén: `@param` (nombre + propósito breve), `@returns`, y cualquier `@example` ejecutable
  (consérvalo literal).
- Recorta: prosa de varios párrafos, info ya expresada por el tipo, "Notas/Avisos" sin valor.
- Añade si falta: resumen de una línea, propósito de cada prop, `@returns`/`@example` en APIs
  públicas no triviales.
- Comentarios de código en **inglés** (política del repo). No toques contenido de slides ni estilos.

## Proceso

1. Resuelve el glob; lee los JSDoc.
2. Aplica las reglas por export/componente. Conserva `@example` literal.
3. Verifica con `pnpm typecheck` y `pnpm lint`.

## Salida

Nota de 2 líneas por archivo (qué cambió, por qué) + mensaje de commit sugerido
(`docs(<área>) 📚: ajusta JSDoc`).

## Alcance

Sólo comentarios JSDoc en componentes/TS. Cualquier otra cosa, recoméndala aparte.
