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
    assets/
      fonts/               # woff2 auto-hospedadas
      galeria/             # fotos que Astro optimiza
    components/
      cards/               # ProfesorCard, TesisCard, DocumentoCard, InstalacionCard
      islands/             # GaleriaLightbox (unica isla React)
      layout/              # Navbar.astro, Footer.astro
      ui/                  # Button, ButtonLink (.tsx y .astro), buttonVariants,
                           # EstadoEnProceso, PageHeader, TabGroup
      ObjetivosTabs.astro
      PlanEstudiosTabs.astro
    data/                  # contenido editable
    layouts/               # BaseLayout.astro
    lib/
      paths.ts             # withBase(), withoutBase(), link(), isExternal()
      seo.ts               # canonical() y host canonico
      utils.ts
    pages/
      profesores/[slug].astro
    scripts/               # navbar.ts, tabs.ts, filtroTesis.ts (vanilla)
    styles/                # global.css (tokens y tema), fonts.css
    test/                  # paths, navegacion, checkEnlaces, contenido

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

- `islands/GaleriaLightbox.tsx` (`client:idle`) — rejilla con visor modal

Es la unica. `TesisFiltro.tsx` tambien lo era y se revirtio a
`src/scripts/filtroTesis.ts`: traia 54 KB comprimidos de React a `/tesis` para
gestionar una sola cadena de estado, incumpliendo la regla 2 de la seccion 14 de
este mismo documento. Las tarjetas de las tres generaciones se renderizan ahora
en el servidor y el script solo conmuta `hidden`.

El visor de galeria si justifica React: dialogo modal, contencion de foco,
navegacion por teclado y estado de indice.

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

Hay dos ubicaciones y la diferencia importa:

| Carpeta | Que va aqui | Procesamiento |
| --- | --- | --- |
| `src/assets/` | Lo que Astro debe optimizar | Variantes, WebP, hash y base automaticos |
| `public/` | Lo que debe conservar una URL estable | Se copia tal cual; necesita `withBase()` |

- `src/assets/galeria/` — fotos de galeria. Se importan en `src/data/galeria.ts` y `galeria.astro` genera 400/800 px para la rejilla y 900/1400 para el visor.
- `src/assets/fonts/` — las cuatro `.woff2` auto-hospedadas.
- `public/assets/logos/` (`.webp`) — dimensionados para 2x en su mayor uso.
- `public/assets/profesores/` (`.jpg`/`.webp`, max 400px ancho).
- `public/convocatoria*.webp` — el cartel. Vive en `public/` porque la tarjeta enlaza al archivo completo con URL estable; las variantes de 640 y 900 px acompañan al original en un `srcset`.

Toda `<img>` declara `width` y `height` para reservar espacio y evitar saltos de maquetacion. Cuando el contenedor fija la proporcion, se usan dimensiones nominales con esa misma relacion.

## 8b. Tipografia

Inter y Playfair Display se auto-hospedan desde `src/assets/fonts/`, en sus
versiones variables y limitadas a los subconjuntos `latin` y `latin-ext`.

Antes se pedian a `fonts.googleapis.com` de forma asincrona. Como Playfair es la
cara de todos los encabezados, cada pagina los pintaba primero en Georgia y
luego saltaba: reflujo en el `h1`, que es el elemento LCP.

`src/styles/fonts.css` declara ademas dos familias de reserva
("Inter Fallback" y "Playfair Display Fallback") con `size-adjust`,
`ascent-override` y `descent-override` calculados de los archivos reales, de
modo que la cara del sistema ocupa exactamente el mismo espacio que la webfont y
el intercambio no mueve nada. Las pilas completas se declaran una sola vez, en
`tailwind.config.ts`.

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

`--muted-foreground` es el color de casi todo el cuerpo de texto, asi que hay
que verificarlo contra **todas** las superficies donde cae, no contra una:

| Superficie | Contraste | |
| --- | --- | --- |
| `--background` | 4.89:1 | AA |
| `--card` | 5.29:1 | AA |
| `--muted` | 4.82:1 | AA |
| `bg-primary/5` | 4.46:1 | **falla** |

Sobre `bg-primary/5` se usa `text-foreground/80` (8.5:1). Esa cuarta superficie
paso inadvertida cuando se corrigio el token, y estuvo publicada en `/tesis` y
`/lies`.

### Superficies del navegador

Seleccion de texto, cursor, barra de desplazamiento y separacion del subrayado
se tematizan desde los tokens en `global.css`. Son las partes que el navegador
dibuja por su cuenta y que, sin declararlas, llegan con los grises del sistema.

## 10. Base de despliegue y canonico

El sitio vive en una subruta de GitHub Pages (`/MDO`) y migrara a un dominio propio, donde la base vuelve a ser `/`. Astro prefija lo que empaqueta, pero no los `src` ni `href` escritos a mano ni lo que vive en `public/`.

Por eso **toda ruta interna pasa por `withBase()`** (`src/lib/paths.ts`).

Aparte de la base esta el **host canonico**. El sitio se publica a la vez en
GitHub Pages y en Vercel (el QR del cartel impreso apunta a Vercel), y antes
cada destino se autodeclaraba canonico: contenido duplicado en dos dominios sin
señal de cual indexar. `src/lib/seo.ts` hace que ambos emitan la misma URL
canonica y el mismo sitemap. Ver `docs/despliegue-github-pages.md`.

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
