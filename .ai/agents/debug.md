# Modo Debug

> **Fuente de verdad:** defiere a [`AGENTS.md`](../../AGENTS.md) y a los deep refs en
> [`.github/instructions/`](../../.github/instructions/) para stack, reglas, estructura y comandos.

Estás en modo debug para la **Plantilla de Presentaciones INACAP** (Slidev, Vue 3, Vite,
UnoCSS, TypeScript). Tu objetivo es identificar, analizar y resolver problemas de render,
tipado, marca o exportación de forma sistemática.

## Fase 1: Evaluación

1. **Reúne contexto:** lee mensajes de error / salida de `pnpm typecheck`, `pnpm build`
   o `pnpm export`; examina la slide o componente afectado y los cambios recientes.
2. **Reproduce:** corre `pnpm dev` (o el comando que falle) y confirma el síntoma antes de
   tocar nada. Documenta pasos, comportamiento esperado vs. real, y la salida de error.

## Fase 2: Investigación

3. **Causa raíz:** traza el flujo (front-matter de slide → layout → componente → estilos).
   Revisa props mal tipadas, acentos inválidos, clases UnoCSS inexistentes, hex hardcodeado
   o imports rotos.
4. **Hipótesis:** formula causas probables y ordénalas por impacto.

## Fase 3: Resolución

5. **Aplica el fix:** cambios mínimos y dirigidos, alineados con las convenciones (tokens,
   `resolveAccent()`, tipografías INACAP, `prefers-reduced-motion`).
6. **Verifica:** `pnpm typecheck`, `pnpm lint`, `pnpm build` y render en `pnpm dev`; si el
   entregable lo incluye, `pnpm export`.

## Fase 4: Aseguramiento

7. **Calidad:** confirma que no hay regresiones de marca/accesibilidad; busca si el mismo
   patrón de error existe en otras slides.
8. **Reporte final:** qué se arregló, causa raíz y medidas preventivas.

## Patrones de problemas comunes

### El color no se aplica / hex en vez de token

- **Causa:** hex hardcodeado o clase fuera de la safelist; `uno.config.ts` fuera de `src/`.
- **Fix:** usa `text-brand-*` / `bg-primary` o `resolveAccent()`; añade acentos dinámicos a
  la `safelist` de `src/uno.config.ts`; asegura que `uno.config.ts` viva bajo `src/`.

### Falla `pnpm typecheck` en un componente

- **Causa:** `any`, props sin tipar, import sin extensión.
- **Fix:** `defineProps<T>()`, tipos explícitos, imports correctos. Verifica con `vue-tsc`.

### Animación brusca o sin fallback

- **Causa:** `@keyframes` ad-hoc sin respeto a `prefers-reduced-motion`.
- **Fix:** reutiliza clases `anim-*`; define keyframes con prefijo `inacap-` en
  `src/styles/animations.css` con su media query de movimiento reducido.

### La exportación falla

- **Causa:** navegador headless no instalado para Slidev export.
- **Fix:** instala el Chromium que pida la CLI; reintenta `pnpm export`.

## Checklist de verificación

- [ ] `pnpm typecheck` sin errores
- [ ] `pnpm lint` y `pnpm format` limpios
- [ ] `pnpm build` (y `pnpm export` si aplica) OK
- [ ] Sin hex hardcodeado; sólo tipografías INACAP
- [ ] Accesibilidad respetada (contraste, headings, `alt`, movimiento reducido)
