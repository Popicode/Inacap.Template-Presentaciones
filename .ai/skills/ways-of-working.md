# Ways of working — autonomía, calidad y usuarios no técnicos

El manual operativo que todo agente sigue en este repo, sobre [`AGENTS.md`](../../AGENTS.md).
Existe para que entregues presentaciones **on-brand y listas para mostrar** con el **mínimo de
idas y vueltas**, incluso cuando quien te pide ayuda **no es técnico**.

Léelo primero. Los demás roles (`.ai/agents/*`) y las skills SDD apuntan aquí para la política de
autonomía, la Definition of Done y cómo hablar con el usuario.

## 1. Para quién trabajas

- Asume que quien pide suele ser **no técnico**: describe el **mensaje**, la **audiencia** y el
  resultado ("presentar el avance del proyecto al comité", "una propuesta de 10 minutos para
  gerencia"), no la implementación. Es **tu** trabajo traducir esa intención a los patrones de
  esta plantilla (layouts, componentes, tokens de marca).
- **Espeja el idioma del usuario** en todo lo que le _dices_ (preguntas, resúmenes, "cómo verlo").
  El contenido de las slides va en **español (es-CL)**; el código/identificadores/comentarios, en
  **inglés** (ver `AGENTS.md`).
- Explica en términos simples. Sin jerga. Si nombras algo técnico, añade una frase de qué hace.

## 2. Por defecto, actúa (política de autonomía)

- **Sesga a hacer, no a preguntar.** Toma cada decisión _técnica_ por tu cuenta desde §3 y los
  patrones existentes de la plantilla.
- Pregunta **sólo** cuando la respuesta cambia _qué se construye_ (una decisión de mensaje o
  contenido) y de verdad no puedes inferirla. Entonces haz **1–3 preguntas cortas y en lenguaje
  llano**, juntas, cada una con una opción recomendada.
- Para todo lo demás: elige el default sensato, **declara el supuesto** en tu cierre ("asumí X —
  dime si no es así") y avanza.
- Nunca te bloquees en una decisión que estás capacitado para tomar. Nunca inventes un hecho de
  _contenido_ en silencio — exponlo como supuesto.

## 3. Decide las bifurcaciones técnicas por tu cuenta (defaults)

Cuando surja una elección técnica, toma el default de abajo en vez de preguntar. Son los patrones
establecidos de la plantilla — las skills de buenas prácticas en `.ai/skills/` tienen el detalle.

| Bifurcación            | Default en esta plantilla                                                                                         |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Código/markup nuevo    | Parte del layout o componente existente que más se acerque (`src/layouts/`, `src/components/`)                    |
| Contenido de una slide | **Markdown** en `src/slides.md`. Un componente Vue **sólo** si hay estado, animación con lógica o interactividad  |
| Una nueva slide        | Elige un layout existente (`cover`/`section`/`statement`/`end`/built-ins); revelados con `v-click`                |
| Un divisor de sección  | Layout `section` (crema + barra verde + watermark `§`)                                                            |
| Color                  | Tokens UnoCSS (`text-brand-pink`, `bg-primary`…) o `resolveAccent()`; **nunca hex crudo**. Guía: `BRAND.md`       |
| Tipografía             | Sólo `INACAP Nueva Sans` / `INACAP Nueva Serif`; nunca fuentes externas                                           |
| Un componente nuevo    | `<script setup lang="ts">`, `defineProps<T>()`, sin `any`, auto-importado desde `src/components/`; consume tokens |
| Iconos                 | Clases Iconify MDI (`i-mdi-*`)                                                                                    |
| Animación              | Reutiliza `anim-*` de `src/styles/animations.css`; siempre con fallback `prefers-reduced-motion`                  |
| Acentos de marca       | Contrato `pink \| rose \| fuchsia \| primary`; verde líder, crema superficie                                      |
| Entregar / exportar    | `pnpm build` (estático), `pnpm export` (PDF), `pnpm export:pptx`, `pnpm export:png`                               |

Si una bifurcación no está aquí, lee la skill relevante (`slide-authoring`, `brand-system`,
`vue-component`, `export-build`) y sigue el código existente.

## 4. Ajusta la ceremonia al cambio

El loop SDD (`AGENTS.md`) es la columna vertebral. **Escala la ceremonia al cambio** y siempre
expón **checkpoints en lenguaje llano** que el usuario pueda juzgar:

- **Trivial / obvio** (ajuste de copy, un retoque): hazlo, pasa la Definition of Done, cierra en
  una línea.
- **Cambio pequeño y claro:** plantea un plan breve en lenguaje llano, constrúyelo, pasa la puerta.
- **No trivial / ambiguo / deck o sección nueva:** corre el loop SDD (specify → plan → tasks →
  implement → verify). Presenta cada checkpoint en el idioma del usuario — _"esto entendí / esto
  construiré / esto construí / cómo verlo"_. El usuario aprueba **con sus palabras**; nunca le
  hagas leer specs.

## 5. Definition of Done (la única puerta de calidad)

Un cambio está **DONE** sólo cuando se cumplen **todos**. Esta es _la_ checklist — los demás roles
la referencian en vez de tener su propia copia.

- ☑️ `pnpm typecheck` limpio (vue-tsc), `pnpm lint` y `pnpm format` aplicados
- ☑️ `pnpm build` (y `pnpm export` si se entrega PDF/PPTX) sin errores
- ☑️ **On-brand:** sin hex hardcodeado, sólo fuentes INACAP, tokens/shortcuts — contra `BRAND.md`
- ☑️ Sin `any`; componentes con `defineProps<T>()`
- ☑️ **Accesible:** `alt`, jerarquía de headings, contraste (verde sólo en display),
  `prefers-reduced-motion`
- ☑️ **Una idea por slide;** el contenido va en Markdown, no envuelto en Vue
- ☑️ **Funciona de verdad:** revisado en `pnpm dev`, no sólo el diff
- ☑️ **Cierre para el usuario** entregado (§7), en su idioma

No entregues trabajo parcial o roto. Si una puerta falla, arréglala y vuelve a correr (§6).

## 6. Arregla tus propias fallas

- Si `typecheck` / `lint` / `build` fallan, **es tuyo**: lee el error, halla la causa raíz, arregla,
  vuelve a correr. Itera hasta verde.
- **No** silencies con `any`, no desactives reglas de lint ni metas hex crudo para "que pase".
  Resuelve el problema real.
- Para bugs tercos usa el enfoque sistemático del rol `debug` (reproduce → aísla causa → arregla →
  verifica).
- Si de verdad te atascas tras intentos honestos, detente y explica —en lenguaje llano— qué te
  bloquea y las opciones que ves.

## 7. Cierra en lenguaje llano

Termina cada tarea con un resumen breve **en el idioma del usuario**. Lidera con lo que le importa,
no con rutas de archivos:

```
✅ Qué puedes mostrar ahora: <la nueva slide/sección, en una frase>
▶️ Cómo verlo: corre `pnpm dev` y abre la presentación (o `pnpm export` para el PDF)
⚠️ No incluido / asumí: <límites + supuestos que tomaste>
```

Menciona detalles técnicos (archivos, exports) sólo si los piden, o brevemente al final para un
revisor técnico. El usuario debe saber siempre **qué cambió para él, cómo verlo y qué falta** — sin
leer código.
