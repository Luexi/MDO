# MDO UAGro - Sitio Web en Astro

Sitio web estatico de la **Maestria en Direccion de Organizaciones (MDO)** de la Universidad Autonoma de Guerrero.

## 0) Donde vive el sitio (leer antes de tocar dominios)

| Direccion | Que es hoy |
| --- | --- |
| <https://mdo-alpha.vercel.app> | **El sitio publico.** Aqui apunta el QR del cartel impreso de la convocatoria y aqui aterriza el dominio de la UAGro |
| <https://maestriadirecciondeorganizaciones.uagro.mx> | Existe y **redirige** a Vercel. No sirve contenido propio: resuelve a un servidor de la Universidad que reenvia |
| <https://luexi.github.io/MDO> | Compila el mismo sitio, pero **nadie lo enlaza**. Se conserva como respaldo |

El **canonico es Vercel**: es lo que declaran las etiquetas `<link rel="canonical">`
de los dos despliegues y el `sitemap`. La logica esta en `src/lib/seo.ts`.

> Este README describio durante un tiempo GitHub Pages como "produccion" y
> Vercel como algo temporal. No es lo que ocurre en la practica, y esa
> descripcion ya llevo dos veces a apuntar la configuracion al sitio
> equivocado. Si vas a cambiar algo de dominios, comprueba primero a donde
> lleva el QR y a donde redirige el dominio de la UAGro.

**Estado deseable:** que `maestriadirecciondeorganizaciones.uagro.mx` sirva el
sitio en vez de redirigir, y pase a ser el canonico. Depende del area de
sistemas. Ver `docs/despliegue-github-pages.md`.

## 1) Stack y enfoque

- Astro 5 (SSG)
- React solo para islas interactivas
- TypeScript
- Tailwind CSS

## 2) Requisitos

- Node.js 20+
- npm 10+

## 3) Comandos

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
npm run test
npm run check:enlaces
```

- `dev`: servidor local en `http://localhost:8080/MDO`
- `build`: valida enlaces, corre `astro check` y genera el sitio en `dist/`
- `preview`: sirve localmente lo generado en `dist/`
- `check:enlaces`: guard que falla si hay URLs de marcador o anclas vacias

> El sitio vive en la subruta `/MDO` mientras esta en GitHub Pages de proyecto,
> asi que en local tambien. Abrir `http://localhost:8080` sin la subruta da 404,
> y es correcto: reproduce produccion.

## 4) Flujo recomendado de trabajo

1. Crea una rama para el cambio.
2. Edita contenido (normalmente en `src/data/*`) o componentes y paginas.
3. Ejecuta `npm run lint`, `npm run test` y `npm run build`.
4. Valida visualmente en `npm run dev`.
5. Haz commit con mensaje claro y abre PR contra `main`.

## 5) Estructura del proyecto (resumen)

- `src/pages/`: rutas del sitio en Astro.
- `src/layouts/BaseLayout.astro`: layout global (head, navbar, footer, skip link).
- `src/components/layout/`: layout visual reusable.
- `src/components/islands/`: React hidratado para interaccion. Hoy solo el visor de galeria.
- `src/components/cards/`: tarjetas reutilizables por seccion.
- `src/components/ui/`: primitives de UI usadas por cards e islas.
- `src/data/`: contenido editable del sitio (fuente principal).
- `src/assets/`: imagenes y fuentes que Astro optimiza en el build.
- `src/lib/paths.ts`: helper `withBase()` para rutas con base de despliegue.
- `src/lib/seo.ts`: host canonico compartido por los dos destinos de despliegue.
- `src/scripts/`: comportamiento vanilla compartido (navbar, tabs, filtro de tesis).
- `src/styles/`: `global.css` (tokens y tema) y `fonts.css` (tipografia).
- `src/test/`: pruebas de rutas, navegacion, guard de enlaces y datos.
- `public/assets/`: recursos que necesitan una URL estable (logos, fotos de profesores, cartel).
- `scripts/check-enlaces.mjs`: guard de enlaces y marcado previo al build.
- `.github/workflows/deploy.yml`: despliegue a GitHub Pages.
- `docs/`: documentacion tecnica del proyecto.

## 6) Documentacion completa

- Arquitectura y estructura detallada: `docs/arquitectura-y-estructura.md`
- Guia de edicion y mantenimiento: `docs/guia-edicion-y-mantenimiento.md`
- Despliegue y cambio de dominio: `docs/despliegue-github-pages.md`
- Historial de migracion a Astro: `docs/migracion-astro.md`
- Contexto operativo y decisiones recientes: `docs/contexto-operativo.md`

## 7) Reglas que no se negocian

### Rutas internas

Toda ruta interna (imagenes, enlaces, manifest, favicon) se escribe con `withBase()`:

```astro
---
import { withBase } from "@/lib/paths";
---
<a href={withBase("/convocatoria")}>Convocatoria</a>
<img src={withBase("/assets/logos/logo-uagro.webp")} alt="UAGro" />
```

Escribir `/assets/...` directo funciona en local y se rompe en produccion.

### Enlaces a documentos

Si un documento todavia no tiene URL publica, **omite el campo `linkDrive`**. La
tarjeta se renderiza con la insignia "En proceso". No inventes URLs:
`npm run build` falla si detecta marcadores.

### Enlaces con apariencia de boton

Usa `ButtonLink` (`src/components/ui/`, hay version `.tsx` y `.astro`). **Nunca
envuelvas un `Button` en un `<a>`**: `<a>` no admite contenido interactivo, y el
guard de build rechaza ese patron.

```astro
---
import ButtonLink from "@/components/ui/ButtonLink.astro";
import { withBase } from "@/lib/paths";
---
<ButtonLink href={withBase("/convocatoria")} size="lg">Ver convocatoria</ButtonLink>
<ButtonLink href={documento.linkDrive} variant="outline" externo>Abrir en Drive</ButtonLink>
```

`externo` se encarga de `target`, `rel` y del aviso "se abre en una pestaña
nueva" para lectores de pantalla.

### Imagenes

- Fotos de galeria: `src/assets/galeria/`, **importadas** en `src/data/galeria.ts`.
  Astro genera las variantes y el WebP.
- Logos, retratos y el cartel: `public/assets/` con `withBase()`, porque
  necesitan una URL estable.
- Toda `<img>` declara `width` y `height`.

### Datos del Nucleo Academico

- Fuente principal: `profesores/NUCLEO ACADEMICO.pdf`
- Fuente complementaria: `profesores/*.txt` individuales
- Regla de conflicto: si hay diferencia entre ficha individual y PDF, **gana el PDF**

## 8) Deploy

Automatico en cada push a `main` mediante GitHub Actions. Ver
`docs/despliegue-github-pages.md` para la configuracion inicial y para el
procedimiento de cambio al dominio propio.

## 9) Nota importante

No edites archivos dentro de `dist/`. Esa carpeta es salida de build y se
regenera en cada compilacion.
