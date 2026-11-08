// Ignored Build Step de Vercel (`ignoreCommand` en vercel.json): exit 0 salta
// el deploy y exit 1 construye. Corre antes de `npm install`, asi que solo usa
// Node y git. Salta unicamente si TODO lo cambiado desde el ultimo deploy es
// documentacion (`*.md`/`*.MD` de la raiz o archivos bajo `docs/`; un `.md` en
// otra carpeta, como `src/`, puede ser contenido publicado y se construye);
// ante cualquier duda (sin deploy previo, historia corta, error de git)
// construye.
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const DOCS_ONLY = [/^docs\//u, /^[^/]+\.md$/iu];

export function isDocsPath(path) {
    return DOCS_ONLY.some((pattern) => pattern.test(path));
}

export function decideVercelBuild(changedPaths) {
    if (!Array.isArray(changedPaths) || changedPaths.length === 0) return "build";
    return changedPaths.every(isDocsPath) ? "skip" : "build";
}

function changedSince(previousSha) {
    if (!/^[0-9a-f]{40}$/u.test(previousSha ?? "")) return null;
    try {
        // --no-renames: mover un archivo fuera de docs/ debe listar tambien su origen.
        const output = execFileSync("git", ["diff", "--name-only", "--no-renames", previousSha, "HEAD"], {
            encoding: "utf8",
            stdio: ["ignore", "pipe", "ignore"],
        });
        return output.split("\n").map((line) => line.trim()).filter(Boolean);
    } catch {
        return null;
    }
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
    const decision = decideVercelBuild(changedSince(process.env.VERCEL_GIT_PREVIOUS_SHA));
    console.log(decision === "skip"
        ? "Solo cambia documentacion desde el ultimo deploy: se omite el build."
        : "Hay cambios del sitio (o no se pudo comprobar): se construye.");
    process.exit(decision === "skip" ? 0 : 1);
}
