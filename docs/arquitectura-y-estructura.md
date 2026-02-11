# Arquitectura y Estructura del Proyecto

Esta guia describe **como esta organizado el proyecto**, que hace cada carpeta y como fluye la informacion para futuras modificaciones.

## 1. Arquitectura general

El sitio usa un enfoque **Static Site Generation (SSG)** con Astro:

- Las paginas se renderizan en build a HTML estatico.
- La interactividad puntual se implementa con **islas React** (solo donde es estrictamente necesario).
- Los componentes estaticos (Navbar, tabs de Objetivos) son Astro puro, sin JS en el cliente.
- El contenido editable vive en `src/data/*`.

Resultado: sitio rapido, simple de desplegar y facil de mantener.

## 2. Mapa de carpetas

```text
mdocom/
  public/
    assets/
      galeria/          # imagenes .jpg optimizadas
      logos/             # logos .webp (convertidos desde PNG)
      profesores/        # fotos .jpg/.webp optimizadas (400px max)
    convocatoria.webp
    favicon.webp
    placeholder.svg
    robots.txt

  src/
    components/
      cards/             # ProfesorCard.tsx
      layout/            # Navbar.astro, Footer.astro
      ui/                # Button, PageHeader, ImageCarousel, etc.
    data/                # contenido editable (profesores, tesis, etc.)
    layouts/             # BaseLayout.astro
    lib/
    pages/
      profesores/[slug].astro
    styles/              # global.css (variables, tema)
    test/

  docs/
  vercel.json            # cache headers, cleanUrls
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
  - `<head>` (meta tags, title, Google Fonts async)
  - Navbar (`src/components/layout/Navbar.astro`) componente Astro puro
  - Footer (`src/components/layout/Footer.astro`) estatico
  - `<slot />` para contenido de cada pagina

## 5. Islas React y componentes Astro puros

### Componentes Astro puros (0 JS en cliente)

- `src/components/layout/Navbar.astro` — navegacion con menu movil (script inline vanilla)
- `src/components/ObjetivosTabs.astro` — tabs CSS-only con radio buttons + `peer-checked`
- `src/components/PlanEstudiosTabs.astro` — tabs CSS-only de plan de estudios

### Islas React (se hidratan solo donde se usan)

- `src/components/islands/TesisFiltro.tsx` (`client:idle`) — filtro por generacion
- `src/components/ui/ImageCarousel.tsx` (`client:idle`) — carrusel de galeria

## 6. Capa de contenido (`src/data`)

Los archivos de `src/data` son la fuente principal de informacion editable:

- `src/data/profesores.ts`: listado y detalle de docentes
- `src/data/tesis.ts`: generaciones y tesis
- `src/data/documentos.ts`: documentos y enlaces
- `src/data/instalaciones.ts`: infraestructura
- `src/data/galeria.ts`: imagenes de galeria
- `src/data/vinculacion.ts`: instituciones y mecanismos

## 7. Assets y convenciones

- Logos: `public/assets/logos/` (formato `.webp`)
- Galeria: `public/assets/galeria/` (formato `.jpg`, optimizadas)
- Profesores: `public/assets/profesores/` (formato `.jpg`/`.webp`, max 400px ancho)
- Cualquier archivo en `public/` se publica en la raiz del sitio.

Ejemplo:
- archivo: `public/assets/logos/logo-mdo.webp`
- URL: `/assets/logos/logo-mdo.webp`

### Optimizacion de imagenes

Todas las imagenes fueron optimizadas con sharp:

- Logos PNG convertidos a WebP (-82% a -99%)
- Fotos de profesores redimensionadas a 400px max y comprimidas con mozjpeg
- Imagenes de galeria comprimidas
- Todas las `<img>` below-the-fold usan `loading="lazy"`

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
- `vercel.json`: `cleanUrls`, cache headers inmutables para `_astro/` y `assets/`
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
