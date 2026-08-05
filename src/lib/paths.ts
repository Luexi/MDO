/**
 * Prefija una ruta absoluta del sitio con la base de despliegue.
 *
 * El sitio vive temporalmente en una subruta de GitHub Pages
 * (`luexi.github.io/MDO`) y migrara al dominio propio
 * `maestriadirecciondeorganizaciones.uagro.mx`, donde la base vuelve a ser `/`.
 *
 * Astro prefija por su cuenta los assets que empaqueta (`/_astro/*`) y las rutas
 * de pagina, pero NO reescribe los `src` ni los `href` que escribimos a mano ni
 * lo que vive en `public/`. Todo eso pasa por aqui.
 *
 * Cambiar de dominio es cambiar `PUBLIC_BASE_PATH` en el workflow de despliegue.
 */
const RAW_BASE = import.meta.env.BASE_URL ?? "/";

export function withBase(path: string): string {
  const base = RAW_BASE.endsWith("/") ? RAW_BASE.slice(0, -1) : RAW_BASE;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${base}${clean}`;
}

/**
 * Inversa de `withBase()`: quita la base de despliegue de una ruta ya servida.
 *
 * `Astro.url.pathname` llega con la base incluida ("/MDO/convocatoria"). Para
 * construir la URL canonica hace falta la ruta desnuda ("/convocatoria"),
 * porque el host canonico puede tener una base distinta.
 */
export function withoutBase(pathname: string): string {
  const base = RAW_BASE.endsWith("/") ? RAW_BASE.slice(0, -1) : RAW_BASE;
  if (base && pathname.startsWith(base)) {
    return pathname.slice(base.length) || "/";
  }
  return pathname;
}

/** True si `href` apunta fuera del sitio y por tanto no debe prefijarse. */
export function isExternal(href: string): boolean {
  return /^(https?:)?\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
}

/** Prefija solo si la ruta es interna. Util para listas mixtas de enlaces. */
export function link(href: string): string {
  return isExternal(href) ? href : withBase(href);
}
