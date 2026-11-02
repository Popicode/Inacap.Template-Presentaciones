# Skill: SDD — Specify (brief de la presentación)

Convierte una idea de presentación en un **brief escrito**. **Qué y por qué, nunca cómo.**

## Cuándo usarla

Primer paso de cualquier presentación nueva. Entrada: una idea o encargo en una línea.
Salida: un archivo de brief.

## Procedimiento

1. **Ubica/asigna la carpeta de la presentación.** Busca el `specs/NNN-*` más alto;
   usa el siguiente número con cero a la izquierda. Slugifica el nombre →
   `specs/NNN-<slug>/`.
2. **Aclara si falta información.** Si la audiencia, el objetivo o el alcance no están
   claros, haz **hasta 3** preguntas enfocadas antes de escribir. No inventes
   requisitos en silencio.
3. **Escribe `specs/NNN-<slug>/spec.md`** desde `.ai/templates/spec.template.md`.
   Completa cada sección: **audiencia, objetivo, mensajes clave, duración estimada,
   tono y restricciones de marca**. Los criterios de aceptación se redactan como
   "La presentación logra X cuando…" para poder verificarlos luego en `/verify`.
4. **Respeta `AGENTS.md`** — sobre todo la política de idioma (contenido en español,
   código/identificadores en inglés) y las reglas de marca (sin hex hardcodeados,
   sólo tipografías INACAP).
5. **Sin detalles de implementación.** Nada de nombres de layouts, componentes ni
   estructura de slides aquí — eso es `/plan`. Captura sólo el mensaje y las
   restricciones observables.

## Salida

- La ruta del brief creado y un párrafo con el alcance + número de mensajes clave.
- Lista las preguntas abiertas sin resolver.
- **Siguiente paso:** ejecuta `/plan` cuando el brief esté aprobado.
