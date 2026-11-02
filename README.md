<br />

<h2 align="center"><b>Modernización de Sistema RBAC — MSC Chile</b></h2>
<h3 align="center"><b>Slidev · INACAP · Proyecto Integrador (TIHV43)</b></h3>

<br />

<p align="center">
  <a href="https://sli.dev" target="blank"><img src="./docs/slidev.svg" width="120" alt="Slidev Logo" /></a>
</p>

<p align="center">
  Propuesta Técnica de Transición y Plataforma Web de Control de Accesos para <b> (MSC Chile)</b>, construida con <a href="https://sli.dev">Slidev</a> bajo identidad corporativa INACAP. Cubre el diagnóstico As-Is, levantamiento de requerimientos con el cliente, RNF (ISO 25010), arquitectura desacoplada To-Be en 3 capas (.NET 10 + React + Redis), patrón fachada para 37 satélites, viabilidad y trazabilidad de valor.
</p>

> **Markdown** para el contenido · **componentes Vue** para lo interactivo ·
> identidad INACAP (colores, tipografías y logo) centralizada.

## 📢 **Resumen**

- **Proyecto**: Modernización de Sistema RBAC — MSC Chile
- **Asignatura**: Proyecto Integrador (TIHV43) · Evaluación 1
- **Docente Guía**: Profesor Edgar López · INACAP
- **Equipo Consultor**: Pablo Herrera, Jesús Rincón, Sabrina Silva, Abraham Tapia, Catalina Cubillos, Jose Morales
- **Tecnología**: Slidev (Vue 3 + Vite + UnoCSS)
- **Lenguaje**: TypeScript estricto
- **Contenido**: `src/slides.md` (Markdown)
- **Marca**: tokens de color rojo/azul INACAP, tipografías INACAP y logo corporativo

## ✒ **Descripción Técnica**

- 🎨 **Identidad INACAP lista:** paleta de marca en `src/uno.config.ts`, tipografías
  `INACAP Nueva Sans` / `INACAP Nueva Serif` (`@font-face`) y logo corporativo.
- 🧩 **Componentes interactivos** auto-importados: `StatCard`, `DailyRoutineSymbols`,
  `AuroraGlow`, `ThemeSwitcher`, `BrandLogo`.
- 🖼️ **Layouts custom:** `cover`, `section`, `statement`, `end`.
- 💫 **Animaciones CSS** fluidas respetando `prefers-reduced-motion`.
- 📊 **Contenido:** 13 slides ejecutivas con diagramas Mermaid integrados (Arquitectura 3 capas, Secuencia de Fachada de SPs, Flujo de Cotejo Manual).

## 📥 **Comenzando**

- Instalar [NodeJS](https://nodejs.org/es/) (`>= 22`).
- Instalar [PNPM](https://pnpm.io/installation) — `npm i -g pnpm`.
- Ejecutar `pnpm install`.
- Ejecutar `pnpm dev` (abre `http://localhost:3030` con HMR).
- Editar [`src/slides.md`](./src/slides.md): los cambios se reflejan en vivo.

## 🧪 **Comandos Disponibles**

```bash
pnpm dev          # desarrollo interactivo con HMR (http://localhost:3030)
pnpm build        # build estático de producción -> dist/
pnpm export       # exportar presentación a PDF -> .reports/presentation.pdf
pnpm export:pptx  # exportar presentación a PowerPoint -> .reports/presentation.pptx
pnpm export:png   # exportar diapositivas individuales a PNG -> .reports/slides/
pnpm preview      # previsualizar build de producción
pnpm typecheck    # validación TypeScript (vue-tsc --noEmit)
pnpm lint         # revisión de código con ESLint
pnpm format       # formateo de código con Prettier
```

## 🗂️ **Estructura del Proyecto**

Todo el contenido vive bajo `src/`; el tooling queda en la raíz.

```
package.json · tsconfig.json · eslint.config.js · .prettierrc   # tooling (raíz)
AGENTS.md · BRAND.md · README.md                                # docs (raíz)
src/
├── slides.md         # la presentación (Markdown + componentes)
├── uno.config.ts     # tokens de marca (colores INACAP, shortcuts UnoCSS)
├── components/       # componentes Vue interactivos
├── layouts/          # cover · section · statement · end
├── styles/           # fonts.css · layout.css · animations.css
├── global-top.vue    # cabecera global con logo INACAP
├── global-bottom.vue # watermark inferior y número de slide
└── public/           # fuentes INACAP oficiales, logo-inacap.png, favicon
```
