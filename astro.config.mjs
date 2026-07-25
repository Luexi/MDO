import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

/**
 * Despliegue: GitHub Pages.
 *
 * Estado actual (temporal, mientras se configura el DNS):
 *   PUBLIC_SITE_URL  = https://luexi.github.io
 *   PUBLIC_BASE_PATH = /MDO
 *   URL resultante   -> https://luexi.github.io/MDO
 *
 * Estado definitivo (cuando el dominio propio quede apuntado):
 *   PUBLIC_SITE_URL  = https://maestriadirecciondeorganizaciones.uagro.mx
 *   PUBLIC_BASE_PATH = /
 *
 * Ambos valores se fijan en `.github/workflows/deploy.yml`. No hay ninguna ruta
 * de asset cableada en el codigo: todas pasan por `withBase()` en
 * `src/lib/paths.ts`, asi que cambiar de dominio es editar esas dos variables
 * y anadir el archivo `public/CNAME`. Ver `docs/despliegue-github-pages.md`.
 */
const site = process.env.PUBLIC_SITE_URL ?? "https://luexi.github.io";
const base = process.env.PUBLIC_BASE_PATH ?? "/MDO";

export default defineConfig({
  site,
  base,
  output: "static",
  server: {
    host: true,
    port: 8080,
  },
  integrations: [react(), tailwind()],
});
