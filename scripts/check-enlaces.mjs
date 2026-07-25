#!/usr/bin/env node
/**
 * Guard de build: impide volver a publicar enlaces rotos.
 *
 * El sitio estuvo en produccion con once URLs de marcador
 * (`drive.google.com/file/d/PLACEHOLDER_CONVOCATORIA` y similares) en sus dos
 * llamadas a la accion principales, en los seis documentos del repositorio y en
 * tres de las cinco tesis. Un aspirante que pulsaba "Descargar convocatoria"
 * aterrizaba en un error de Google Drive fuera del dominio y sin retorno.
 *
 * Este script corre antes de `astro build` y falla la compilacion si detecta
 * marcadores o anclas vacias. La forma correcta de expresar "todavia no hay
 * documento" es omitir el campo `linkDrive`, que hace que la tarjeta se
 * renderice en estado "En proceso" con el boton inhabilitado.
 *
 * Uso: node scripts/check-enlaces.mjs
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = fileURLToPath(new URL("..", import.meta.url));
const DIRECTORIOS = ["src"];
const EXTENSIONES = [".astro", ".ts", ".tsx", ".js", ".jsx", ".md", ".json"];

const REGLAS = [
  {
    id: "placeholder",
    patron: /PLACEHOLDER[A-Z0-9_]*/g,
    mensaje:
      'URL de marcador. Omite el campo `linkDrive` en vez de apuntar a un destino inexistente: la tarjeta mostrara "En proceso" con el boton inhabilitado.',
  },
  {
    id: "ancla-vacia",
    patron: /href\s*=\s*["']#["']/g,
    mensaje:
      "Enlace que no lleva a ninguna parte. Publica el destino real o retira el enlace.",
  },
  {
    id: "dominio-vercel",
    patron: /mdo-alpha\.vercel\.app/g,
    mensaje:
      "Referencia al hosting anterior. El sitio se publica en GitHub Pages; usa PUBLIC_SITE_URL.",
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

const hallazgos = [];

for (const dir of DIRECTORIOS) {
  for (const ruta of archivos(join(RAIZ, dir))) {
    const contenido = readFileSync(ruta, "utf8");
    const lineas = contenido.split(/\r?\n/);

    for (const regla of REGLAS) {
      lineas.forEach((linea, indice) => {
        // El propio guard y la documentacion mencionan los patrones a proposito.
        if (linea.includes("check-enlaces")) return;
        const coincidencias = linea.match(regla.patron);
        if (!coincidencias) return;
        hallazgos.push({
          archivo: relative(RAIZ, ruta).replace(/\\/g, "/"),
          linea: indice + 1,
          regla: regla.id,
          coincidencia: coincidencias[0],
          mensaje: regla.mensaje,
        });
      });
    }
  }
}

if (hallazgos.length === 0) {
  console.log("check-enlaces: sin marcadores ni anclas vacias.");
  process.exit(0);
}

console.error(`\ncheck-enlaces: ${hallazgos.length} enlace(s) invalido(s).\n`);
for (const h of hallazgos) {
  console.error(`  ${h.archivo}:${h.linea}  [${h.regla}]  ${h.coincidencia}`);
  console.error(`    ${h.mensaje}\n`);
}
process.exit(1);
