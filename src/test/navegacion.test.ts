import { describe, expect, it } from "vitest";

import {
  esRutaActiva,
  grupoActivo,
  navGrupos,
  ctaPrincipal,
} from "@/data/navegacion";

/*
 * `esRutaActiva` gobierna `aria-current="page"` y el resaltado del destino
 * activo. Tuvo un fallo que solo se veia inspeccionando el HTML compilado: al
 * normalizar quitando el ancla, en /convocatoria marcaba DOS destinos como
 * pagina actual, "Convocatoria" y "Preguntas frecuentes". Estas pruebas
 * existen para que ese fallo no pueda volver en silencio.
 *
 * Nota: bajo Vitest, `import.meta.env.BASE_URL` es "/", asi que aqui se prueba
 * el comportamiento con base raiz. La correccion de base la cubre paths.test.ts.
 */
describe("esRutaActiva", () => {
  it("marca la pagina actual", () => {
    expect(esRutaActiva("/convocatoria", "/convocatoria")).toBe(true);
  });

  it("no marca otras paginas", () => {
    expect(esRutaActiva("/objetivos", "/convocatoria")).toBe(false);
  });

  it("ignora la barra final", () => {
    expect(esRutaActiva("/objetivos", "/objetivos/")).toBe(true);
  });

  it("trata la raiz y la cadena vacia como la misma pagina", () => {
    expect(esRutaActiva("/", "/")).toBe(true);
  });

  it("NO marca un destino con ancla como pagina actual", () => {
    // El fallo original: este devolvia true y producia dos aria-current="page".
    expect(
      esRutaActiva("/convocatoria#preguntas-frecuentes", "/convocatoria"),
    ).toBe(false);
  });

  it("deja exactamente un destino activo en cualquier pagina del sitio", () => {
    const rutas = navGrupos.flatMap((grupo) =>
      grupo.items.map((item) => item.href.split("#")[0]),
    );

    for (const ruta of [...new Set(rutas)]) {
      const activos = navGrupos
        .flatMap((grupo) => grupo.items)
        .filter((item) => esRutaActiva(item.href, ruta));

      expect(
        activos.length,
        `${ruta} deja ${activos.length} destinos marcados como pagina actual`,
      ).toBeLessThanOrEqual(1);
    }
  });
});

describe("grupoActivo", () => {
  it("resalta el grupo aunque se haya llegado por un enlace con ancla", () => {
    const admision = navGrupos.find((grupo) => grupo.id === "admision")!;
    expect(grupoActivo(admision, "/convocatoria")).toBe(true);
  });

  it("no resalta grupos ajenos a la pagina actual", () => {
    const comunidad = navGrupos.find((grupo) => grupo.id === "comunidad")!;
    expect(grupoActivo(comunidad, "/convocatoria")).toBe(false);
  });
});

describe("integridad de la navegacion", () => {
  it("no repite destinos entre grupos", () => {
    const hrefs = navGrupos.flatMap((grupo) =>
      grupo.items.map((item) => item.href),
    );
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it("todos los destinos son rutas internas sin prefijo de base", () => {
    const hrefs = [
      ...navGrupos.flatMap((grupo) => grupo.items.map((item) => item.href)),
      ctaPrincipal.href,
    ];
    for (const href of hrefs) {
      expect(href.startsWith("/"), `${href} no empieza en "/"`).toBe(true);
      expect(href.startsWith("/MDO"), `${href} lleva la base cableada`).toBe(
        false,
      );
    }
  });

  it("cada destino declara etiqueta y descripcion", () => {
    for (const grupo of navGrupos) {
      expect(grupo.items.length).toBeGreaterThan(0);
      for (const item of grupo.items) {
        expect(item.label.trim()).not.toBe("");
        expect(item.descripcion.trim()).not.toBe("");
      }
    }
  });
});
