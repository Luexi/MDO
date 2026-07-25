# MDO UAGro - Sitio Web en Astro

Sitio web estatico de la **Maestria en Direccion de Organizaciones (MDO)** de la Universidad Autonoma de Guerrero.

- Produccion (temporal): <https://luexi.github.io/MDO>
- Produccion (definitiva, pendiente de DNS): <https://maestriaendirecciondeorganizaciones.uagro.mx>

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
- `src/components/islands/`: React hidratado para interaccion.
- `src/components/cards/`: tarjetas reutilizables por seccion.
- `src/components/ui/`: primitives de UI usadas por cards e islas.
- `src/data/`: contenido editable del sitio (fuente principal).
- `src/lib/paths.ts`: helper `withBase()` para rutas con base de despliegue.
- `src/scripts/`: comportamiento vanilla compartido (navbar, tabs).
- `src/styles/global.css`: tokens y estilos globales.
- `public/assets/`: imagenes y recursos publicos.
- `scripts/check-enlaces.mjs`: guard de enlaces previo al build.
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
tarjeta se renderiza en estado "En proceso" con el boton inhabilitado. No
inventes URLs: `npm run build` falla si detecta marcadores.

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
