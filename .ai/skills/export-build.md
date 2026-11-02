# Skill: Export & build

Flujo de desarrollo, verificación y exportación de la presentación con los scripts
reales del template.

## Cuándo usarla

Al previsualizar, verificar o entregar la presentación (PDF/PPTX/PNG).

## Comandos (de `package.json`)

| Acción                | Comando            | Notas                                    |
| --------------------- | ------------------ | ---------------------------------------- |
| Desarrollo (HMR)      | `pnpm dev`         | abre `src/slides.md` con recarga en vivo |
| Build estático        | `pnpm build`       | sale a `dist/` (en la raíz del proyecto) |
| Exportar PDF          | `pnpm export`      | `.reports/presentation.pdf`              |
| Exportar PPTX         | `pnpm export:pptx` | `.reports/presentation.pptx`             |
| Exportar PNG (slides) | `pnpm export:png`  | `.reports/slides/`                       |
| Preview del build     | `pnpm preview`     | build + `vite preview`                   |
| Type-check            | `pnpm typecheck`   | `vue-tsc --noEmit`                       |
| Lint + fix            | `pnpm lint`        | ESLint con cache                         |
| Formato               | `pnpm format`      | Prettier sobre `ts/vue/css/json/md/yaml` |

## Puerta de calidad antes de cerrar

```bash
pnpm typecheck
pnpm lint
pnpm build
pnpm export   # sólo si el entregable incluye PDF/PPTX/PNG
```

## Notas

- La exportación usa Playwright/Chromium bajo el capó (Slidev); si falla, instala el
  navegador que pida la CLI de Slidev.
- El build escribe en `dist/` y los exports en `.reports/`; **no edites** esas carpetas
  a mano — son artefactos generados.
- Slidev trata la carpeta de `slides.md` (`src/`) como su raíz: `components/`,
  `layouts/`, `styles/`, `public/` y `uno.config.ts` deben vivir bajo `src/`.
