#!/usr/bin/env node
/**
 * Guard de build: impide volver a publicar enlaces rotos o mal construidos.
 *
 * El sitio estuvo en produccion con once URLs de marcador
 * (`drive.google.com/file/d/PLACEHOLDER_CONVOCATORIA` y similares) en sus dos
 * llamadas a la accion principales, en los seis documentos del repositorio y en
 * tres de las cinco tesis. Un aspirante que pulsaba "Descargar convocatoria"
 * aterrizaba en un error de Google Drive fuera del dominio y sin retorno.
 *
 * Este script corre antes de `astro build` y falla la compilacion si detecta
 * cualquiera de las reglas de abajo. La forma correcta de expresar "todavia no
 * hay documento" es omitir el campo `linkDrive`, que hace que la tarjeta se
 * renderice con la insignia "En proceso".
 *
 * ESCAPE: si una linea menciona un patron a proposito (documentacion, la
 * configuracion del host canonico), marcala con el comentario
 * `check-enlaces-ok` y el guard la ignora.
 *
 * Uso: node scripts/check-enlaces.mjs
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

// Perezoso a proposito: las pruebas importan `analizar()` desde un entorno
// jsdom donde `import.meta.url` no es una URL `file:`, y resolverlo al cargar
// el modulo hacia fallar el import antes de ejecutar nada.
const raiz = () => fileURLToPath(new URL("..", import.meta.url));
const DIRECTORIOS = ["src"];
const EXTENSIONES = [".astro", ".ts", ".tsx", ".js", ".jsx", ".md", ".json"];
/*
 * Las pruebas contienen a proposito ejemplos de todo lo que este guard
 * prohibe: son las fixtures con las que se verifica que cada regla dispara.
 */
const EXCLUIDOS = ["src/test/"];
export const MARCA_ESCAPE = "check-enlaces-ok";

/** Reglas que se evaluan linea a linea. */
export const REGLAS_LINEA = [
  {
    id: "placeholder",
    patron: /PLACEHOLDER[A-Z0-9_]*/g,
    mensaje:
      'URL de marcador. Omite el campo `linkDrive` en vez de apuntar a un destino inexistente: la tarjeta mostrara "En proceso".',
  },
  {
    id: "ancla-vacia",
    patron: /href\s*=\s*["']#["']/g,
    mensaje:
      "Enlace que no lleva a ninguna parte. Publica el destino real o retira el enlace.",
  },
  {
    id: "host-cableado",
    /*
     * Solo dispara dentro de `href`/`src`, no en prosa.
     *
     * La regla anterior prohibia `mdo-alpha.vercel.app` en cualquier posicion
     * con el mensaje "El sitio se publica en GitHub Pages". Eso dejo de ser
     * cierto: Vercel volvio a produccion porque el QR del cartel impreso apunta
     * ahi (ver docs/contexto-operativo.md). El guard prohibia justamente el
     * dominio del que depende la convocatoria en papel, y bloqueaba tambien la
     * declaracion del host canonico en `src/lib/seo.ts`.
     *
     * Lo que si sigue siendo un error es cablear un host en un enlace o en un
     * `src`: eso rompe al cambiar de dominio. Toda ruta interna pasa por
     * `withBase()`.
     */
    patron:
      /(?:href|src|srcset)\s*=\s*["'`{][^"'`]*(?:mdo-alpha\.vercel\.app|luexi\.github\.io)/g,
    mensaje:
      "Host cableado en un enlace o recurso. Usa `withBase()` para rutas internas; el host solo se declara en `src/lib/seo.ts` y en el workflow.",
  },
];

/**
 * Reglas que necesitan ver el archivo completo porque el patron cruza lineas.
 */
export const REGLAS_ARCHIVO = [
  {
    id: "boton-en-enlace",
    /*
     * `<a>` envolviendo un boton. El modelo de contenido de `<a>` excluye
     * contenido interactivo: el resultado es HTML invalido y dos controles
     * anidados para una sola accion, que los lectores de pantalla anuncian de
     * forma inconsistente.
     *
     * Este patron llego a estar en seis sitios del proyecto a la vez, asi que
     * se vigila. La pieza correcta es `ButtonLink` (`.tsx` para islas React,
     * `.astro` para paginas).
     */
    patron: /<a(?:\s[^>]*)?>\s*<[Bb]utton\b/g,
    mensaje:
      "`<a>` no admite contenido interactivo. Usa `ButtonLink` (src/components/ui/) en vez de envolver un boton en un enlace.",
  },
];

function archivos(dir) {
  const salida = [];
  for (const entrada of readdirSync(dir)) {
    const ruta = join(dir, entrada);
    if (statSync(ruta).isDirectory()) {
      salida.push(...archivos(ruta));
    } else if (EXTENSIONES.some((ext) => entrada.endsWith(ext))) {
      salida.push(ruta);
    }
  }
  return salida;
}

/**
 * Aplica todas las reglas a un texto y devuelve los hallazgos.
 *
 * Se exporta para poder probarlo (`src/test/checkEnlaces.test.ts`) sin tener
 * que ejecutar el proceso ni tocar el disco.
 */
export function analizar(contenido, archivo = "(memoria)") {
  const hallazgos = [];
  const lineas = contenido.split(/\r?\n/);

  for (const regla of REGLAS_LINEA) {
    lineas.forEach((linea, indice) => {
      if (linea.includes(MARCA_ESCAPE)) return;
      const coincidencias = linea.match(regla.patron);
      if (!coincidencias) return;
      hallazgos.push({
        archivo,
        linea: indice + 1,
        regla: regla.id,
        coincidencia: coincidencias[0],
        mensaje: regla.mensaje,
      });
    });
  }

  for (const regla of REGLAS_ARCHIVO) {
    for (const m of contenido.matchAll(regla.patron)) {
      const linea = contenido.slice(0, m.index).split(/\r?\n/).length;
      if (lineas[linea - 1]?.includes(MARCA_ESCAPE)) continue;
      hallazgos.push({
        archivo,
        linea,
        regla: regla.id,
        coincidencia: m[0].replace(/\s+/g, " ").slice(0, 60),
        mensaje: regla.mensaje,
      });
    }
  }

  return hallazgos;
}

function ejecutar() {
  const hallazgos = [];
  const RAIZ = raiz();

  for (const dir of DIRECTORIOS) {
    for (const ruta of archivos(join(RAIZ, dir))) {
      const archivo = relative(RAIZ, ruta).replace(/\\/g, "/");
      if (EXCLUIDOS.some((prefijo) => archivo.startsWith(prefijo))) continue;
      hallazgos.push(...analizar(readFileSync(ruta, "utf8"), archivo));
    }
  }

  if (hallazgos.length === 0) {
    console.log(
      "check-enlaces: sin marcadores, anclas vacias ni hosts cableados.",
    );
    return 0;
  }

  console.error(`\ncheck-enlaces: ${hallazgos.length} hallazgo(s).\n`);
  for (const h of hallazgos) {
    console.error(`  ${h.archivo}:${h.linea}  [${h.regla}]  ${h.coincidencia}`);
    console.error(`    ${h.mensaje}\n`);
  }
  return 1;
}

// Solo corre como CLI; al importarlo desde las pruebas no hace nada.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  process.exit(ejecutar());
}
