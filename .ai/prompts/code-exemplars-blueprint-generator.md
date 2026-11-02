# Generador de Blueprint de Ejemplares

Escanea el repositorio y genera un `exemplars.md` que identifique ejemplos representativos
y de alta calidad que demuestren los estándares del template. Documento en español;
identificadores en inglés.

## Variables de configuración

${SCAN_DEPTH="Básico|Estándar|Exhaustivo"} <!-- profundidad del análisis -->
${INCLUDE_SNIPPETS=true|false} <!-- incluir fragmentos además de referencias a archivos -->
${MAX_EXAMPLES_PER_CATEGORY=3} <!-- máximo de ejemplos por categoría -->

## Enfoque

### 1. Análisis del repositorio

- Recorre `src/` e identifica archivos con implementación limpia, bien documentada y
  on-brand.

### 2. Categorías de ejemplares

- **Autoría de slides:** bloques representativos de `src/slides.md` (front-matter,
  separadores `---`, reveals `<v-clicks>`).
- **Layouts:** `src/layouts/` (`cover`, `section`, `statement`, `end`).
- **Componentes:** `src/components/` (p. ej. `StatCard.vue` — `defineProps<T>()`,
  prop `accent`, `resolveAccent()`, animación, JSDoc con `@example`).
- **Marca/tokens:** `src/uno.config.ts`, `src/components/brand-accents.ts`.
- **Estilos/animación:** `src/styles/animations.css` (`anim-*`, `@keyframes inacap-*`).

### 3. Para cada ejemplar

- Ruta del archivo, por qué es ejemplar y qué patrón demuestra.
- ${INCLUDE_SNIPPETS ? "Incluye un fragmento conciso y enfocado." : "Sólo referencia + descripción."}
- Limita a ${MAX_EXAMPLES_PER_CATEGORY} ejemplos por categoría.

Incluye cuándo se generó y cómo mantenerlo actualizado.
