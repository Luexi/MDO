# Migracion a Astro y limpieza de origen generado

## Referencias complementarias

- Estructura completa del proyecto: `docs/arquitectura-y-estructura.md`
- Guia operativa de cambios: `docs/guia-edicion-y-mantenimiento.md`

## Objetivo

Migrar el sitio MDO desde una SPA en React + Vite a una arquitectura **Astro + islas React**, eliminando la huella de la herramienta de generacion inicial del runtime y la configuracion ejecutable.

## Arquitectura antes

- SPA con `react-router-dom`.
- Entrada unica por `src/main.tsx` y `src/App.tsx`.
- Configuracion de Vite y tagger de desarrollo de la plataforma original.
- Gran set de componentes UI no utilizados en runtime final.

## Arquitectura despues

- Ruteo por archivos en `src/pages/*.astro`.
- Ruta dinamica de profesores con `src/pages/profesores/[slug].astro` + `getStaticPaths()`.
- Layout global en `src/layouts/BaseLayout.astro`.
- Componentes Astro puros (0 JS): Navbar, ObjetivosTabs, PlanEstudiosTabs.
- Islas React solo donde es estrictamente necesario:
  - Filtro por generacion en Tesis (`client:idle`)
  - Carrusel de Galeria (`client:idle`)

## Cambios tecnicos clave

1. Toolchain
- Se elimino Vite como runtime de app.
- Se agrego Astro con integraciones React y Tailwind.
- Scripts npm actualizados a `astro dev/build/preview`.

2. Routing
- Se removio `react-router-dom`.
- Se conservaron URLs existentes:
  - `/`
  - `/objetivos`
  - `/nucleo-academico`
  - `/profesores/[slug]`
  - `/lies`
  - `/repositorio`
  - `/tesis`
  - `/instalaciones`
  - `/galeria`
  - `/vinculacion`
  - `/convocatoria`

3. UI y componentes

- Se conservaron componentes utiles (`button`, tarjetas, header, carrusel).
- Se convirtieron Navbar y tabs de Objetivos de React a Astro puro (CSS-only tabs con radio buttons).
- Se elimino `@radix-ui/react-tabs` y componentes UI no referenciados.

4. Estilos
- `src/index.css` se movio a `src/styles/global.css`.
- Tailwind actualizado para escanear archivos `.astro` y `.tsx` en `src/`.

5. Metadata
- Se reemplazo metadata generica previa por metadata institucional MDO/UAGro en `BaseLayout.astro`.

## Fase de optimizacion de peso y rendimiento

Posterior a la migracion, se realizo una fase de optimizacion:

### Reduccion de peso (5.5MB → 2.3MB, -58%)

- Imagenes comprimidas con sharp (4.2MB → 1.1MB, -75%)
- Logos PNG convertidos a WebP
- Fotos de profesores redimensionadas a 400px max
- Google Fonts cargadas async (no render-blocking)
- Navbar convertido de React a Astro puro (elimina React+ReactDOM ~136KB de todas las paginas)
- Tabs de Objetivos convertidos de Radix UI React a CSS-only (radio buttons + `peer-checked`)
- Se elimino `@radix-ui/react-tabs`

### Reduccion de edge requests

- `vercel.json` con `cleanUrls: true` y cache inmutable para `_astro/` y `assets/`
- `loading="lazy"` en imagenes de profesores, galeria y footer
- Convocatoria convertida de JPEG a WebP

### Archivos eliminados en optimizacion

- `src/components/layout/Navbar.tsx` (reemplazado por `Navbar.astro`)
- `src/components/islands/ObjetivosTabs.tsx` (reemplazado por `ObjetivosTabs.astro`)
- `src/components/islands/PlanEstudiosTabs.tsx` (reemplazado por `PlanEstudiosTabs.astro`)
- `src/components/ui/tabs.tsx` (ya no se usa sin Radix UI)

## Inventario de limpieza

- Removidos:
  - `.lovable/`
  - `lovable-tagger`
  - `react-router-dom`
  - `@tanstack/react-query`
  - `@radix-ui/react-tabs`
  - `src/App.tsx`, `src/main.tsx`, `index.html`, `vite.config.ts`
  - componentes y hooks no usados

## Validacion esperada

- `npm run lint`
- `npm run test`
- `npm run build`
- Smoke manual en `npm run dev` sobre rutas e interacciones

## Notas

- Esta migracion mantiene contenido y placeholders existentes.
- El deploy objetivo es estatico en Vercel usando `dist/`.
