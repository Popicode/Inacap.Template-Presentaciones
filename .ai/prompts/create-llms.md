# Crear/actualizar llms.txt

Crea o actualiza el archivo `llms.txt` en la raíz del repositorio siguiendo la
especificación oficial de https://llmstxt.org/. Provee a los LLM una guía de alto nivel
sobre dónde encontrar el contenido relevante. Documento en español.

## Directiva principal

Un `llms.txt` que sirva como punto de entrada para que los LLM entiendan y naveguen el
repositorio: legible por humanos y máquinas, conforme a la especificación.

## Pasos

### 1. Analizar el repositorio

- Lee `AGENTS.md`, `README.md`, `.ai/README.md`, `.github/instructions/`, `package.json`
  y la estructura de `src/`.
- Identifica el propósito (plantilla INACAP de presentaciones con Slidev) y los archivos
  clave.

### 2. Formato (según la especificación)

1. **H1**: nombre del proyecto.
2. **Blockquote**: resumen conciso del propósito.
3. **Secciones H2** con listas de enlaces: cada enlace
   `[nombre](ruta-relativa): descripción`.

### 3. Secciones sugeridas

- **Documentation**: `AGENTS.md`, `README.md`, `.ai/README.md`.
- **Deep references**: `.github/instructions/*`.
- **Source**: `src/slides.md`, `src/uno.config.ts`, `src/components/`, `src/layouts/`.
- **Configuration**: `package.json`, `tsconfig.json`, `eslint.config.js`.

### 4. Validación

- Enlaces válidos (rutas relativas), lenguaje claro, cobertura de los archivos esenciales,
  archivo ubicado en la raíz (`/llms.txt`).

## Criterios de éxito

Permite a un LLM entender el propósito del repo y navegar a la documentación esencial,
siguiendo la especificación de llmstxt.org.
