import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

/**
 * Despliegue dual temporal: Vercel en la raiz y GitHub Pages en `/MDO`.
 *
 * GitHub Pages fija explicitamente estos valores en el workflow:
 *   PUBLIC_SITE_URL  = https://luexi.github.io
 *   PUBLIC_BASE_PATH = /MDO
 *   URL resultante   -> https://luexi.github.io/MDO
 *
 * Vercel no necesita variables: usa los valores por defecto de abajo para
 * servir el dominio del QR desde la raiz.
 *
 * Ambos valores se fijan en `.github/workflows/deploy.yml`. No hay ninguna ruta
 * de asset cableada en el codigo: todas pasan por `withBase()` en
 * `src/lib/paths.ts`, asi que cambiar de dominio es editar esas dos variables
 * y anadir el archivo `public/CNAME`. Ver `docs/despliegue-github-pages.md`.
 */
const site = process.env.PUBLIC_SITE_URL ?? "https://mdo-alpha.vercel.app";
const base = process.env.PUBLIC_BASE_PATH ?? "/";

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
