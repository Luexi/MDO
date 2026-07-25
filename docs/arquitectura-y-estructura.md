# Arquitectura y Estructura del Proyecto

Esta guia describe **como esta organizado el proyecto**, que hace cada carpeta y como fluye la informacion para futuras modificaciones.

## 1. Arquitectura general

El sitio usa un enfoque **Static Site Generation (SSG)** con Astro:

- Las paginas se renderizan en build a HTML estatico.
- La interactividad puntual se implementa con **islas React** (solo donde es estrictamente necesario).
- El comportamiento compartido (navbar, pestañas) es JavaScript vanilla en `src/scripts/`, cargado una sola vez desde el layout.
- El contenido editable vive en `src/data/*`.

Resultado: sitio rapido, simple de desplegar y facil de mantener.

## 2. Mapa de carpetas

```text
MDO/
  .github/
    workflows/deploy.yml   # despliegue a GitHub Pages

  public/
    assets/
      galeria/             # imagenes .jpg optimizadas
      logos/               # logos .webp
      profesores/          # fotos .jpg/.webp (400px max)
    convocatoria.webp
    favicon.svg
    robots.txt
    site.webmanifest

  scripts/
    check-enlaces.mjs      # guard de enlaces previo al build

  src/
    components/
      cards/               # ProfesorCard, TesisCard, DocumentoCard, InstalacionCard
      islands/             # TesisFiltro, GaleriaLightbox (React hidratado)
      layout/              # Navbar.astro, Footer.astro
      ui/                  # Button, PageHeader, TabGroup
      ObjetivosTabs.astro
      PlanEstudiosTabs.astro
    data/                  # contenido editable
    layouts/               # BaseLayout.astro
    lib/
      paths.ts             # withBase(), link(), isExternal()
      utils.ts
    pages/
      profesores/[slug].astro
    scripts/               # navbar.ts, tabs.ts (comportamiento vanilla)
    styles/                # global.css (tokens y tema)
    test/

  docs/
```

## 3. Ruteo (Astro file-based)

Cada archivo en `src/pages/` define una ruta:

- `index.astro` -> `/`
- `objetivos.astro` -> `/objetivos`
- `plan-estudios.astro` -> `/plan-estudios`
- `nucleo-academico.astro` -> `/nucleo-academico`
- `lies.astro` -> `/lies`
- `repositorio.astro` -> `/repositorio`
- `tesis.astro` -> `/tesis`
- `instalaciones.astro` -> `/instalaciones`
- `galeria.astro` -> `/galeria`
- `vinculacion.astro` -> `/vinculacion`
- `convocatoria.astro` -> `/convocatoria`
- `profesores/[slug].astro` -> `/profesores/:slug`
- `404.astro` -> pagina 404

Las URLs publicas llevan ademas la base de despliegue (`/MDO` hoy). Ver la seccion 10.

### Ruta dinamica de profesores

`src/pages/profesores/[slug].astro` usa `getStaticPaths()` para generar una pagina por profesor en build, tomando los datos de `src/data/profesores.ts`.

## 4. Arquitectura de navegacion

La navegacion agrupa los destinos en tres bloques, uno por cada pregunta real de las audiencias del programa. Se define en `src/data/navegacion.ts` y la consumen el Navbar y el Footer, de modo que no pueden desincronizarse.

| Grupo | Pregunta que responde | Destinos |
| --- | --- | --- |
| Admisión | ¿cómo entro? | Convocatoria, Preguntas frecuentes, Documentos y formatos |
| Programa | ¿es serio esto? | Objetivos y perfiles, Plan de estudios, Líneas de investigación |
| Comunidad | ¿quiénes son? | Núcleo académico, Tesis, Vinculación, Instalaciones, Galería |

Las URLs no cambiaron al reagrupar: solo cambio la forma de llegar a ellas, para no romper el SEO ya indexado.

## 5. Layout y composicion visual

`src/layouts/BaseLayout.astro` monta:

- Enlace de salto al contenido (`skip link`), primer elemento tabulable de cada pagina
- `<head>`: meta tags, canonical, Open Graph, JSON-LD en la portada, fuentes async
- Navbar (`src/components/layout/Navbar.astro`)
- `<main id="contenido-principal">` con `<slot />`
- Footer (`src/components/layout/Footer.astro`)
- Un unico `<script>` que inicializa `initNavbar()` e `initTabs()`

## 6. Islas React y componentes Astro

### Componentes Astro (0 JS de framework en cliente)

- `layout/Navbar.astro` — navegacion agrupada; el comportamiento vive en `src/scripts/navbar.ts`
- `ui/TabGroup.astro` — patron WAI-ARIA de pestañas; comportamiento en `src/scripts/tabs.ts`
- `ObjetivosTabs.astro` y `PlanEstudiosTabs.astro` — consumen `TabGroup`

### Islas React (se hidratan solo donde se usan)

- `islands/TesisFiltro.tsx` (`client:idle`) — filtro por generacion
- `islands/GaleriaLightbox.tsx` (`client:idle`) — rejilla con visor modal

### Patron de pestañas

`TabGroup.astro` recibe `tabs` y expone slots **estaticos** (`panel-1`, `panel-2`, `panel-3`), porque el compilador de Astro exige que `slot[name]` sea una cadena literal. El estado activo se deriva de `aria-selected` con la variante `aria-*` de Tailwind, de modo que lo que se ve y lo que anuncia un lector de pantalla son el mismo atributo y no pueden divergir. Sin JavaScript, un bloque `<noscript>` revela todos los paneles y oculta la barra, para que el contenido nunca quede inalcanzable.

## 7. Capa de contenido (`src/data`)

- `profesores.ts`: listado y detalle de docentes
- `tesis.ts`: generaciones y tesis
- `documentos.ts`: documentos y enlaces
- `instalaciones.ts`: infraestructura
- `galeria.ts`: imagenes con texto alternativo descriptivo
- `vinculacion.ts`: instituciones y mecanismos
- `admision.ts`: calendario, pasos, requisitos y preguntas frecuentes
- `contacto.ts`: fuente unica de correo, telefono, domicilio y redes
- `navegacion.ts`: arquitectura de navegacion y estado activo

`linkDrive` es **opcional** en `documentos.ts` y `tesis.ts`. Omitirlo hace que la tarjeta se renderice en estado "En proceso" con el boton inhabilitado. Es la unica forma correcta de expresar "todavia no hay documento".

## 8. Assets y convenciones

- Logos: `public/assets/logos/` (`.webp`)
- Galeria: `public/assets/galeria/` (`.jpg` optimizadas)
- Profesores: `public/assets/profesores/` (`.jpg`/`.webp`, max 400px ancho)

Toda `<img>` declara `width` y `height` para reservar espacio y evitar saltos de maquetacion. Cuando el contenedor fija la proporcion, se usan dimensiones nominales con esa misma relacion.

## 9. Estilos y design system

- `src/styles/global.css`: tokens de color en HSL, estilos base, guarda de movimiento reducido y utilidades
- `tailwind.config.ts`: escaneo de clases y tema extendido

### Escala de radios

Se usa la escala por defecto de Tailwind, sin sobrescribir:

```text
sm 0.125 · md 0.375 · lg 0.5 · xl 0.75 · 2xl 1 · 3xl 1.5   (rem)
```

Convencion del proyecto:

- `rounded-lg`: elementos pequeños (enlaces de nav, insignias, cajas de icono)
- `rounded-xl`: controles (botones, campos, celdas de lista)
- `rounded-2xl`: contenedores (tarjetas, paneles, secciones)
- `rounded-full`: elementos circulares o en pastilla

### Contraste

`--muted-foreground` da 4.87:1 sobre el fondo de pagina y 5.22:1 sobre tarjeta. Es el color de casi todo el cuerpo de texto, asi que cualquier cambio en ese token debe verificarse contra ambas superficies, no solo contra una.

## 10. Base de despliegue

El sitio vive en una subruta de GitHub Pages (`/MDO`) y migrara a un dominio propio, donde la base vuelve a ser `/`. Astro prefija lo que empaqueta, pero no los `src` ni `href` escritos a mano ni lo que vive en `public/`.

Por eso **toda ruta interna pasa por `withBase()`** (`src/lib/paths.ts`). Cambiar de dominio es editar dos variables en el workflow. Ver `docs/despliegue-github-pages.md`.

## 11. Configuracion clave

- `astro.config.mjs`: integraciones, output estatico, `site` y `base` desde variables de entorno
- `.github/workflows/deploy.yml`: lint, pruebas, build y publicacion en Pages
- `scripts/check-enlaces.mjs`: guard de enlaces, corre antes de `astro build`
- `tsconfig.json`: alias `@/*` a `src/*`
- `postcss.config.js`: Tailwind + Autoprefixer
- `eslint.config.js`: reglas lint
- `vitest.config.ts`: tests unitarios

## 12. Build y despliegue

- Build local: `npm run build` (guard de enlaces + `astro check` + `astro build`)
- Salida: `dist/`
- Despliegue: automatico en push a `main` via GitHub Actions

## 13. Que NO editar

- `dist/`: artefactos de compilacion
- `.astro/`: archivos generados por Astro
- `package-lock.json`: no editar a mano

## 14. Reglas de evolucion del proyecto

1. Prioriza cambios de contenido en `src/data/*`.
2. Si hay nueva interaccion, evalua primero un `<script>` en `src/scripts/`; crea isla React solo si necesitas estado complejo.
3. Manten rutas estables para no romper enlaces.
4. Toda ruta interna nueva usa `withBase()`.
5. Ejecuta `lint + test + build` antes de merge.
