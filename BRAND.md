# Identidad de marca INACAP — plantilla Slidev

> Fuente única de verdad de la **identidad corporativa oficial de INACAP** en esta plantilla de
> presentaciones. El código consume estos valores vía tokens; este documento explica **qué**
> usar y **cuándo**. Las reglas las hace cumplir `AGENTS.md` (Reglas críticas) y la skill
> [`brand-system`](.ai/skills/brand-system.md); la receta para cambiarlas vive en el prompt
> [`customize-brand-theme`](.ai/prompts/customize-brand-theme.md).

## Identidad en una línea

El **Rojo corporativo INACAP (`#E11927`)** lidera; el **gris suave técnico / blanco puro** es la superficie distintiva. Lenguaje **plano, sobrio, formal y editorial** con un toque moderno contenido (glow sutil, animaciones de entrada fluidas). Sin degradados pesados ni efectos distractores.

## Paleta de color

La **misma** paleta se define en **tres** archivos que **deben permanecer sincronizados**:

| Fuente                                                               | Para qué              | Cómo se consume                                                      |
| -------------------------------------------------------------------- | --------------------- | -------------------------------------------------------------------- |
| [`src/uno.config.ts`](src/uno.config.ts)                             | Tokens UnoCSS         | Clases: `text-primary`, `bg-brand-red`, `text-brand-red-dark`…       |
| [`src/components/brand-accents.ts`](src/components/brand-accents.ts) | Hex en runtime        | `resolveAccent('red')` → `{ solid, soft, dark }` para estilos inline |
| [`src/styles/layout.css`](src/styles/layout.css)                     | Custom properties CSS | `var(--inacap-red)`, `var(--inacap-primary)`…                        |

### Líder y superficies

| Token       | Hex       | Rol / cuándo usarlo                                                         |
| ----------- | --------- | --------------------------------------------------------------------------- |
| `primary`   | `#E11927` | **Rojo oficial INACAP.** Títulos, enlaces, acentos clave, estado destacado. |
| `cream`     | `#F8FAFC` | Superficie limpia institucional — portadas y divisores de sección.          |
| `cream-alt` | `#F1F5F9` | Superficie neutra secundaria.                                               |
| `ink`       | `#1E293B` | Texto de cuerpo (alto contraste y legibilidad).                             |
| `ink-soft`  | `#64748B` | Texto secundario / etiquetas atenuadas.                                     |

### Acentos (contrato: `red | navy | crimson | primary`)

| Acento    | solid     | soft (`-alt`) | dark (`-dark`) | Rol                                         |
| --------- | --------- | ------------- | -------------- | ------------------------------------------- |
| `red`     | `#E11927` | `#FCA5A5`     | `#991B1B`      | Rojo oficial INACAP (Pantone 485 C)         |
| `primary` | `#E11927` | `#FCA5A5`     | `#991B1B`      | Alias de `red` para coherencia global       |
| `crimson` | `#991B1B` | `#FECACA`     | `#450A0A`      | Granate oscuro corporativo (alto contraste) |
| `navy`    | `#0A2540` | `#93C5FD`     | `#030D18`      | Azul técnico institucional complementario   |

> **Retrocompatibilidad:** los tokens históricos `pink`, `rose` y `fuchsia` están mapeados a la paleta oficial roja/grafito para garantizar que diapositivas previas conserven su funcionamiento sin errores visuales.

### Estado (tablas, badges)

| Token     | Hex       | Significado                    |
| --------- | --------- | ------------------------------ |
| `warning` | `#f59e0b` | En proceso / atención (ámbar). |
| `danger`  | `#be123c` | Retrasado / error (carmesí).   |

**Regla de oro:** nunca hardcodees hex en slides ni componentes. Usa las clases UnoCSS (`text-brand-red`, `bg-primary`, `text-brand-red-dark`…) o `resolveAccent()` para color calculado en runtime.

## Tipografía

- **Sans (primaria):** **INACAP Nueva Sans** — pesos Light 300 → ExtraBold 800. Cuerpo y UI.
- **Serif (editorial):** **INACAP Nueva Serif** — Light 300 → Bold 700. Úsala con moderación para énfasis editorial (statements, citas).
- **Código:** JetBrains Mono (fallback monospace).
- **Auto-hospedadas** en `src/styles/fonts.css` (`@font-face`) desde `src/public/fonts/`.
- **Títulos:** color `primary` (rojo oficial) o `accent-dark` (granate), peso 700, `letter-spacing: -0.02em`. H1 `2.6rem`/`1.05`.
- **Cuerpo:** `ink` (`#1E293B`); secundario `ink-soft` (`#64748B`).

## Logo

- **Activo:** [`src/public/logo-inacap.png`](src/public/logo-inacap.png) — logotipo oficial (bloque rojo + wordmark negro), color fijo. Se renderiza con el componente `BrandLogo.vue` (`alt="INACAP"`, no arrastrable) y en la cabecera global (`global-top.vue`).
- **Sin variantes por acento:** el logotipo real **nunca** cambia de color — se usa tal cual en toda la plantilla.
- **Colocación:** portada → izquierda o cabecera global → arriba-derecha, tamaño chico; cierre → centrado.
- **Espacio de respeto:** deja a su alrededor al menos la altura del isotipo; no lo apiñes.
- **Tamaño mínimo:** ~20px de alto en slide; nunca por debajo de la legibilidad.
- **No:** recolorear, distorsionar, rotar, añadir sombras/efectos, ni ponerlo sobre fondos de bajo contraste.

## Lenguaje de layouts

| Layout                | Superficie   | Marca                                                                  |
| --------------------- | ------------ | ---------------------------------------------------------------------- |
| `cover`               | crema plano  | isotipo a la izquierda, bloque de título a la derecha, glow rojo suave |
| contenido (`default`) | blanco/claro | título rojo bold, logo INACAP chico arriba-derecha                     |
| `section`             | crema        | barra de acento roja, watermark `§` grande, glow sutil                 |
| `statement`           | blanco       | tipografía serif, glow rojo, texto rojo/ink                            |
| `end`                 | crema        | logo centrado, `pulse-ring` rojo                                       |

## Movimiento

- **Entrada:** `fade-up` / `scale-in` (sutil, 0.6–0.8s). **Ambiente:** `float`, `pulse-ring`, `gradient-pan` (lentos). Definidos en `src/styles/animations.css`.
- **Siempre** respeta `prefers-reduced-motion: reduce` (animaciones desactivadas). No introduzcas animaciones sin ese fallback.

## Accesibilidad y contraste

- **Cuerpo `ink` (`#1E293B`) sobre blanco/crema:** contraste excepcional (>12:1) — apto para texto. ✅
- **Rojo corporativo `primary` (`#E11927`) sobre blanco:** ratio de contraste ~4.6:1 (cumple WCAG AA para texto grande y títulos).
- **Rojo oscuro `brand-red-dark` (`#991B1B`) sobre blanco:** ratio de contraste >7:1 (cumple WCAG AAA). Utilízalo para texto pequeño o elementos críticos.
- **No dependas solo del color** para el significado: acompaña `warning`/`danger` con un icono o etiqueta.
- Provee `alt` en imágenes, jerarquía semántica de headings y foco/teclado en lo interactivo.

## Do / Don't

**Hazlo:** consumir tokens; sólo fuentes INACAP; reutilizar layouts/shortcuts; una idea por slide; respetar `prefers-reduced-motion`; mantener el rojo oficial y neutros de alto contraste.

**Evítalo:** hex hardcodeado; fuentes externas; recolorear/deformar el logo; usar el color como único indicador; degradados agresivos.
