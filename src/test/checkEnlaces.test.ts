import { describe, expect, it } from "vitest";

// Se importa el script tal cual se ejecuta en el build, sin duplicar su logica.
import { analizar } from "../../scripts/check-enlaces.mjs";

interface Hallazgo {
  regla: string;
  linea: number;
  coincidencia: string;
}

const reglas = (texto: string): string[] =>
  (analizar(texto) as Hallazgo[]).map((h) => h.regla);

/*
 * El guard de build es lo unico que impide reeditar los errores que ya
 * estuvieron en produccion: once URLs de marcador, anclas muertas y, mas
 * recientemente, seis enlaces envolviendo un boton. Si el guard se rompe, se
 * rompe en silencio y nadie se entera hasta que el fallo vuelve a publicarse.
 */
describe("regla placeholder", () => {
  it("detecta una URL de marcador", () => {
    expect(
      reglas('linkDrive: "https://drive.google.com/file/d/PLACEHOLDER_TESIS"'),
    ).toContain("placeholder");
  });

  it("no molesta a una URL real de Drive", () => {
    expect(
      reglas('linkDrive: "https://drive.google.com/file/d/1CITL6wAc9kg/view"'),
    ).toEqual([]);
  });
});

describe("regla ancla-vacia", () => {
  it("detecta un enlace que no lleva a ninguna parte", () => {
    expect(reglas('<a href="#">Ver mas</a>')).toContain("ancla-vacia");
  });

  it("acepta un ancla con destino", () => {
    expect(reglas('<a href="#preguntas-frecuentes">Dudas</a>')).toEqual([]);
  });
});

describe("regla host-cableado", () => {
  it("detecta un host cableado dentro de href", () => {
    expect(reglas('<a href="https://luexi.github.io/MDO/tesis">Tesis</a>')).toContain(
      "host-cableado",
    );
  });

  it("detecta un host cableado dentro de src", () => {
    expect(
      reglas('<img src="https://mdo-alpha.vercel.app/convocatoria.webp" />'),
    ).toContain("host-cableado");
  });

  it("NO molesta cuando el host se menciona en prosa o en configuracion", () => {
    // Esto es exactamente lo que hace `src/lib/seo.ts`, y la regla anterior lo
    // bloqueaba: prohibia el dominio del que depende el QR del cartel impreso.
    expect(
      reglas('// El sitio tambien se publica en mdo-alpha.vercel.app'),
    ).toEqual([]);
    expect(
      reglas('const CANONICAL = "https://luexi.github.io/MDO";'),
    ).toEqual([]);
  });
});

describe("regla boton-en-enlace", () => {
  it("detecta el patron en una sola linea", () => {
    expect(reglas('<a href="/x"><Button>Ir</Button></a>')).toContain(
      "boton-en-enlace",
    );
  });

  it("detecta el patron repartido en varias lineas", () => {
    const codigo = [
      "<a",
      '  href={documento.linkDrive}',
      '  target="_blank"',
      ">",
      '  <Button variant="outline">',
      "    Abrir",
      "  </Button>",
      "</a>",
    ].join("\n");
    expect(reglas(codigo)).toContain("boton-en-enlace");
  });

  it("acepta un enlace con apariencia de boton", () => {
    expect(
      reglas('<ButtonLink href="/convocatoria">Ver convocatoria</ButtonLink>'),
    ).toEqual([]);
  });

  it("acepta un boton suelto", () => {
    expect(reglas("<button type=\"button\">Filtrar</button>")).toEqual([]);
  });
});

describe("marca de escape", () => {
  it("ignora la linea marcada con check-enlaces-ok", () => {
    expect(
      reglas('<a href="#"> </a> // check-enlaces-ok: ejemplo de documentacion'),
    ).toEqual([]);
  });
});

describe("reporte", () => {
  it("indica la linea del hallazgo", () => {
    const hallazgos = analizar('linea 1\nlinea 2\n<a href="#">roto</a>') as Hallazgo[];
    expect(hallazgos[0].linea).toBe(3);
  });
});
