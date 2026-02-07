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
- Interactividad acotada a islas React:
  - Navbar movil
  - Tabs de Objetivos
  - Filtro por generacion en Tesis
  - Carrusel de Galeria

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
- Se conservaron componentes utiles (`button`, `tabs`, tarjetas, header, carrusel).
- Se eliminaron componentes UI no referenciados tras la migracion.

4. Estilos
- `src/index.css` se movio a `src/styles/global.css`.
- Tailwind actualizado para escanear archivos `.astro` y `.tsx` en `src/`.

5. Metadata
- Se reemplazo metadata generica previa por metadata institucional MDO/UAGro en `BaseLayout.astro`.

## Inventario de limpieza

- Removidos:
  - `.lovable/`
  - `lovable-tagger`
  - `react-router-dom`
  - `@tanstack/react-query`
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
