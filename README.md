# MDO UAGro - Sitio Web en Astro

Sitio web estatico de la **Maestria en Direccion de Organizaciones (MDO)** de la Universidad Autonoma de Guerrero.

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
```

- `dev`: servidor local en `http://localhost:8080`
- `build`: genera sitio estatico en `dist/`
- `preview`: sirve localmente lo generado en `dist/`

## 4) Flujo recomendado de trabajo

1. Crea una rama para el cambio.
2. Edita contenido (normalmente en `src/data/*`) o componentes/paginas.
3. Ejecuta `npm run lint` y `npm run build`.
4. Valida visualmente en `npm run dev`.
5. Haz commit con mensaje claro.

## 5) Estructura del proyecto (resumen)

- `src/pages/`: rutas del sitio en Astro.
- `src/layouts/BaseLayout.astro`: layout global (head, navbar, footer).
- `src/components/layout/`: layout visual reusable.
- `src/components/islands/`: React hidratado para interaccion.
- `src/components/cards/`: tarjetas reutilizables por seccion.
- `src/components/ui/`: primitives de UI usadas por cards/islas.
- `src/data/`: contenido editable del sitio (fuente principal).
- `src/styles/global.css`: tokens y estilos globales.
- `public/assets/`: imagenes y recursos publicos.
- `docs/`: documentacion tecnica del proyecto.

## 6) Documentacion completa

- Arquitectura y estructura detallada: `docs/arquitectura-y-estructura.md`
- Guia de edicion y mantenimiento: `docs/guia-edicion-y-mantenimiento.md`
- Historial de migracion a Astro: `docs/migracion-astro.md`
- Contexto operativo y decisiones recientes: `docs/contexto-operativo.md`

## 7) Regla de datos del Nucleo Academico

- Fuente principal para el nucleo: `profesores/NUCLEO ACADEMICO.pdf`
- Fuente complementaria: `profesores/*.txt` individuales
- Regla de conflicto: si hay diferencia entre ficha individual y PDF, **gana el PDF**

## 8) Deploy (Vercel estatico)

1. Conecta el repo en Vercel.
2. Install command: `npm install`
3. Build command: `npm run build`
4. Output directory: `dist`

Con `output: "static"` en `astro.config.mjs`, no se necesita servidor Node en produccion.

## 9) Nota importante

No edites archivos dentro de `dist/`. Esa carpeta es salida de build y se regenera en cada compilacion.
