# Arquitectura y Estructura del Proyecto

Esta guia describe **como esta organizado el proyecto**, que hace cada carpeta y como fluye la informacion para futuras modificaciones.

## 1. Arquitectura general

El sitio usa un enfoque **Static Site Generation (SSG)** con Astro:

- Las paginas se renderizan en build a HTML estatico.
- La interactividad puntual se implementa con **islas React**.
- El contenido editable vive en `src/data/*`.

Resultado: sitio rapido, simple de desplegar y facil de mantener.

## 2. Mapa de carpetas

```text
mdocom/
  public/
    assets/
      galeria/
      logos/
    favicon.ico
    placeholder.svg
    robots.txt

  src/
    components/
      cards/
      islands/
      layout/
      ui/
    data/
    layouts/
    lib/
    pages/
      profesores/[slug].astro
    styles/
    test/

  docs/
    arquitectura-y-estructura.md
    guia-edicion-y-mantenimiento.md
    migracion-astro.md
```

## 3. Ruteo (Astro file-based)

Cada archivo en `src/pages/` define una ruta:

- `src/pages/index.astro` -> `/`
- `src/pages/objetivos.astro` -> `/objetivos`
- `src/pages/nucleo-academico.astro` -> `/nucleo-academico`
- `src/pages/lies.astro` -> `/lies`
- `src/pages/repositorio.astro` -> `/repositorio`
- `src/pages/tesis.astro` -> `/tesis`
- `src/pages/instalaciones.astro` -> `/instalaciones`
- `src/pages/galeria.astro` -> `/galeria`
- `src/pages/vinculacion.astro` -> `/vinculacion`
- `src/pages/convocatoria.astro` -> `/convocatoria`
- `src/pages/profesores/[slug].astro` -> `/profesores/:slug`
- `src/pages/404.astro` -> pagina 404

### Ruta dinamica de profesores

`src/pages/profesores/[slug].astro` usa `getStaticPaths()` para generar una pagina por profesor en build, tomando los datos de `src/data/profesores.ts`.

## 4. Layout y composicion visual

- `src/layouts/BaseLayout.astro`
  - `<head>` (meta tags, title)
  - Navbar (`src/components/layout/Navbar.tsx`) como isla React
  - Footer (`src/components/layout/Footer.astro`) estatico
  - `<slot />` para contenido de cada pagina

## 5. Islas React (interactividad)

Se usan solo donde aporta valor UX:

- `src/components/layout/Navbar.tsx` (`client:load`)
  - menu movil y estado activo
- `src/components/islands/ObjetivosTabs.tsx` (`client:idle`)
  - tabs de perfil ingreso/egreso
- `src/components/islands/TesisFiltro.tsx` (`client:idle`)
  - filtro por generacion
- `src/components/ui/ImageCarousel.tsx` (`client:idle`)
  - carrusel de galeria

## 6. Capa de contenido (`src/data`)

Los archivos de `src/data` son la fuente principal de informacion editable:

- `src/data/profesores.ts`: listado y detalle de docentes
- `src/data/tesis.ts`: generaciones y tesis
- `src/data/documentos.ts`: documentos y enlaces
- `src/data/instalaciones.ts`: infraestructura
- `src/data/galeria.ts`: imagenes de galeria
- `src/data/vinculacion.ts`: instituciones y mecanismos

## 7. Assets y convenciones

- Logos: `public/assets/logos/`
- Galeria: `public/assets/galeria/`
- Cualquier archivo en `public/` se publica en la raiz del sitio.

Ejemplo:
- archivo: `public/assets/logos/logo-mdo.png`
- URL: `/assets/logos/logo-mdo.png`

## 8. Estilos y design system

- `src/styles/global.css`
  - variables CSS (colores, radios, gradientes)
  - base styles
  - utilidades custom
- `tailwind.config.ts`
  - escaneo de clases
  - tema extendido

## 9. Configuracion clave

- `astro.config.mjs`: integraciones, output estatico, host/port
- `tsconfig.json`: alias `@/*` a `src/*`
- `postcss.config.js`: Tailwind + Autoprefixer
- `eslint.config.js`: reglas lint
- `vitest.config.ts`: tests unitarios

## 10. Build y despliegue

- Build local: `npm run build`
- Salida: `dist/`
- Deploy estatico recomendado: Vercel con output `dist`

## 11. Que NO editar

- `dist/`: artefactos de compilacion
- `.astro/`: archivos generados por Astro
- `package-lock.json`: no editar a mano

## 12. Reglas de evolucion del proyecto

1. Prioriza cambios de contenido en `src/data/*`.
2. Si hay nueva interaccion, crear isla en `src/components/islands/`.
3. Mantener rutas estables para no romper enlaces.
4. Ejecutar `lint + build` antes de merge/deploy.
