# Generador de Blueprint de Arquitectura

Genera un `architecture.md` que documente la arquitectura de esta presentación Slidev
para mantener consistencia. Idioma del documento: español; identificadores en inglés.

## Variables de configuración

${DETAIL_LEVEL="Alto nivel|Detallado|Exhaustivo"} <!-- nivel de detalle -->
${INCLUDE_DIAGRAMS=true|false} <!-- incluir diagramas (Mermaid) -->
${INCLUDE_EXAMPLES=true|false} <!-- incluir fragmentos representativos -->

## Enfoque

### 1. Detección y análisis

- Identifica el stack real (Slidev / Vue 3 / Vite / UnoCSS / TypeScript) leyendo
  `package.json`, `uno.config.ts`, `tsconfig.json` y la estructura de `src/`.
- Determina la convención clave: **todo lo que Slidev/Vite procesa vive bajo `src/`**
  (la carpeta de `slides.md` es la raíz de Slidev); el tooling vive en la raíz del repo.

### 2. Visión general

- Filosofía: **Markdown primero** para contenido; **componentes Vue** sólo para
  interactividad/animación; identidad de marca centralizada (tokens, tipografías, logo).
- Límites: contenido (`src/slides.md`) ↔ presentación (layouts/estilos) ↔ interacción
  (componentes).

### 3. Componentes arquitectónicos

Para cada pieza descubierta documenta propósito, estructura y cómo se conecta:

- **Contenido:** `src/slides.md` (Markdown + front-matter por slide, separadores `---`).
- **Layouts:** `src/layouts/` (`cover`, `section`, `statement`, `end`).
- **Componentes:** `src/components/` (auto-importados) + `brand-accents.ts` (`resolveAccent`).
- **Estilos:** `src/styles/` (`fonts.css`, `layout.css`, `animations.css`, `index.ts`).
- **Marca/tokens:** `src/uno.config.ts` (paleta, shortcuts, safelist).
- **Globales:** `global-top.vue` / `global-bottom.vue` (watermark, número de slide).
- **Assets:** `src/public/` (fuentes INACAP, logo, favicon).

### 4. Flujos transversales

- **Marca:** cómo los tokens y `resolveAccent()` garantizan consistencia de color.
- **Animación:** clases `anim-*`, `@keyframes` con prefijo `inacap-`, `prefers-reduced-motion`.
- **Accesibilidad:** jerarquía de headings, `alt`, contraste.
- **Build/export:** `dev` → `build` (`dist/`) → `export` PDF/PPTX/PNG (`.reports/`).

### 5. Diagramas

${INCLUDE_DIAGRAMS ? "Incluye diagramas Mermaid del flujo contenido→layout→render y del pipeline build/export." : "Describe las relaciones en texto."}

### 6. Blueprint para nuevo contenido

- Cómo añadir una slide, una sección o un componente sin romper marca/estructura.
- Errores comunes a evitar (hex hardcodeado, fuentes externas, `uno.config.ts` fuera de `src/`).

Incluye cuándo se generó y cómo mantenerlo actualizado.
