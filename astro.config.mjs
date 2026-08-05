import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
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
 *
 * `PUBLIC_CANONICAL_URL` es distinta de `PUBLIC_SITE_URL`: la primera dice cual
 * de los dos destinos debe indexarse, la segunda dice desde donde se sirve esta
 * compilacion. Como el sitio vive hoy en dos hosts, ambos emiten la MISMA URL
 * canonica para que los buscadores no vean contenido duplicado. Ver
 * `src/lib/seo.ts`.
 */
const site = process.env.PUBLIC_SITE_URL ?? "https://mdo-alpha.vercel.app";
const base = process.env.PUBLIC_BASE_PATH ?? "/";

/*
 * Debe coincidir con el valor por defecto de `CANONICAL_BASE` en
 * `src/lib/seo.ts`, que es donde esta explicado por que el canonico es Vercel
 * y no GitHub Pages. Se repite porque este archivo corre en Node antes de que
 * exista el alias `@/`, y duplicar una cadena es preferible a un import que
 * complique la configuracion.
 */
const canonical = (
  process.env.PUBLIC_CANONICAL_URL ?? "https://mdo-alpha.vercel.app"
).replace(/\/+$/, "");

export default defineConfig({
  site,
  base,
  output: "static",
  server: {
    host: true,
    port: 8080,
  },
  integrations: [
    react(),
    tailwind(),
    /*
     * El sitemap lista SIEMPRE las URL canonicas, las emita el host que las
     * emita. Sin esto el despliegue de Vercel publicaba un sitemap con URLs de
     * Vercel que contradecia sus propias etiquetas `<link rel="canonical">`.
     * `public/robots.txt` apunta al sitemap del host canonico.
     */
    sitemap({
      serialize(item) {
        // Prefijo que antepone Astro en ESTA compilacion (`site` + `base`).
        const prefijoLocal = new URL(base, site).href.replace(/\/+$/, "");
        if (item.url.startsWith(prefijoLocal)) {
          item.url = canonical + item.url.slice(prefijoLocal.length);
        }
        return item;
      },
    }),
  ],
});
