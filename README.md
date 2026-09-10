# JOANA — Architecture / Interiors

Sitio web editorial para el estudio de arquitectura JOANA. Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion.

## Desarrollo

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

```bash
npm run build && npm run start   # build de producción
```

## Estructura

- `lib/projects.ts` — todo el contenido editable: proyectos, servicios y datos del estudio (email, Instagram, ubicación). Agregar un proyecto nuevo es solo añadir un objeto al array `projects`.
- `components/ArchPhoto.tsx` — sistema de fotografía. Mientras no exista una foto real, cada imagen se renderiza como una composición abstracta generativa (determinista por `seed`) en tonos cálidos neutros, para que el layout se vea terminado desde el día uno.
- `components/` — Header, FullscreenMenu, ProjectIndexHome, ProjectGallery, BeforeAfter, About, Services, Contact, Footer, Intro, CustomCursor, Reveal (animaciones de scroll).
- `app/` — rutas: `/`, `/about`, `/services`, `/contact`, `/projects/[slug]`.

## Cómo reemplazar las fotos placeholder por fotografías reales

Cada imagen en `lib/projects.ts` es un objeto `{ seed, ratio, caption?, src? }`.

1. Coloca el archivo en `public/images/...` (por ejemplo `public/images/projects/casa-olivo/01.jpg`).
2. Agrega `src: "/images/projects/casa-olivo/01.jpg"` a esa entrada.

No se requiere ningún otro cambio de código. Si `src` no está definido, o el archivo no existe, se usa automáticamente el placeholder generativo — nunca se muestra una imagen rota.
