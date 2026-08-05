import { withoutBase } from "@/lib/paths";

/**
 * Host canonico del sitio.
 *
 * El sitio se compila hacia DOS destinos:
 *
 *   - Vercel, en `https://mdo-alpha.vercel.app`
 *   - GitHub Pages, en `https://luexi.github.io/MDO`
 *
 * El canonico es **Vercel**, y no por preferencia tecnica sino porque es donde
 * aterriza la gente:
 *
 *   1. El QR del cartel IMPRESO de la convocatoria apunta ahi. Ya se
 *      distribuyo; no se puede reimprimir.
 *   2. `maestriadirecciondeorganizaciones.uagro.mx` redirige ahi. El dominio
 *      resuelve a un servidor de la Universidad (200.4.142.12) que reenvia a
 *      Vercel, o sea que no sirve contenido propio.
 *
 * GitHub Pages compila el mismo sitio, pero nadie enlaza a esa direccion. Emite
 * este mismo canonico para no competir por la indexacion.
 *
 * CUIDADO: la documentacion del repositorio describio un tiempo GitHub Pages
 * como "produccion" y Vercel como algo temporal. No es lo que pasa en la
 * practica, y esa confusion ya provoco una vez que el canonico apuntara al
 * sitio equivocado: la pagina del QR pedia a los buscadores que indexaran otra.
 * Antes de tocar este valor, comprueba a donde va el QR y a donde redirige el
 * dominio de la UAGro.
 *
 * ESTADO DESEABLE: que `maestriadirecciondeorganizaciones.uagro.mx` sirva el
 * sitio en vez de redirigir, y pase a ser el canonico. Depende del area de
 * sistemas. Ver `docs/despliegue-github-pages.md`.
 */
const CANONICAL_BASE = (
  import.meta.env.PUBLIC_CANONICAL_URL ?? "https://mdo-alpha.vercel.app"
).replace(/\/+$/, "");

/**
 * URL canonica absoluta de una ruta, independiente del host que la sirva.
 *
 * Recibe `Astro.url.pathname` (que incluye la base local) y devuelve la URL
 * equivalente en el host canonico (que puede tener otra base).
 */
export function canonical(pathname: string): string {
  const ruta = withoutBase(pathname);
  return `${CANONICAL_BASE}${ruta === "/" ? "/" : ruta.replace(/\/+$/, "")}`;
}

/** Origen canonico sin ruta, para recursos absolutos como la imagen de Open Graph. */
export function canonicalBase(): string {
  return CANONICAL_BASE;
}
