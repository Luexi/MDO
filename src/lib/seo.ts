import { withoutBase } from "@/lib/paths";

/**
 * Host canonico del sitio.
 *
 * El sitio se publica hoy en DOS destinos a la vez:
 *
 *   - GitHub Pages, en `https://luexi.github.io/MDO`
 *   - Vercel, en `https://mdo-alpha.vercel.app`, porque el QR del cartel
 *     impreso de la convocatoria apunta ahi y no se puede reimprimir.
 *
 * Cada destino se autodeclaraba canonico, asi que los buscadores veian el mismo
 * contenido duplicado en dos dominios sin ninguna señal de cual indexar. Ahora
 * los dos emiten la misma URL canonica: la de GitHub Pages. Vercel sigue
 * sirviendo a quien escanee el QR, pero ya no compite por la indexacion.
 *
 * Al activar el dominio propio basta cambiar `PUBLIC_CANONICAL_URL` en
 * `.github/workflows/deploy.yml` y el valor por defecto de aqui abajo.
 * Ver `docs/despliegue-github-pages.md`.
 */
const CANONICAL_BASE = (
  import.meta.env.PUBLIC_CANONICAL_URL ?? "https://luexi.github.io/MDO"
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
