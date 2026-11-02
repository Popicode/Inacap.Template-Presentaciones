# Generador de Blueprint del Stack Tecnológico

Analiza el repositorio y genera un blueprint del stack que documente tecnologías y
patrones de uso para generar contenido consistente. Documento en español; identificadores
en inglés.

## Variables de configuración

${DEPTH_LEVEL="Básico|Estándar|Exhaustivo"} <!-- profundidad -->
${INCLUDE_VERSIONS=true|false} <!-- incluir versiones (desde package.json) -->
${INCLUDE_USAGE_PATTERNS=true|false} <!-- incluir patrones de uso -->

## Enfoque

### 1. Identificación de tecnologías

- Lee `package.json` (deps, scripts, engines), `uno.config.ts`, `tsconfig.json`,
  `eslint.config.js`, `.prettierrc`.
- Núcleo esperado: **Slidev (`@slidev/cli`)**, **Vue 3**, **Vite**, **UnoCSS**,
  **TypeScript** (`vue-tsc`), temas `@slidev/theme-default` / `-seriph`,
  iconos `@iconify-json/mdi`. Gestor: **pnpm** (Node ≥ 22).

### 2. Categorías

- **Presentación:** Slidev + temas + layouts custom.
- **UI/Estilo:** UnoCSS (tokens de marca, shortcuts, presetIcons), CSS de `src/styles/`.
- **Componentes:** Vue 3 `<script setup lang="ts">`, auto-import, `resolveAccent()`.
- **Tipado/calidad:** TypeScript estricto, ESLint (+ plugins vue/unicorn/sonarjs/
  perfectionist/regexp/promise), Prettier.
- **Build/export:** scripts `dev`, `build`, `export`, `export:pptx`, `export:png`,
  `preview`, `typecheck`, `lint`, `format`.

### 3. Patrones de uso

${INCLUDE_USAGE_PATTERNS ? "Documenta: cómo se autorea una slide (front-matter + `---`), el contrato de componente (`defineProps<T>()`, prop `accent`), el uso de tokens/`resolveAccent()`, animaciones `anim-*`, e iconos `i-mdi-*`." : "Resume los patrones principales."}

### 4. Convenciones

- Contenido en español, código en inglés; tabs (ancho 4), comillas simples, `;`,
  trailing commas; `PascalCase.vue` / `kebab-case.ts`.
- Todo bajo `src/`; nunca hex hardcodeado; sólo tipografías INACAP.

${INCLUDE_VERSIONS ? "Incluye las versiones exactas leídas de package.json." : ""}

Incluye cuándo se generó y cómo mantenerlo actualizado.
