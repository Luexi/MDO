import { describe, expect, it } from "vitest";

import { isExternal, link, withBase, withoutBase } from "@/lib/paths";

/*
 * `withBase()` es la pieza de la que depende que el sitio no se rompa al
 * cambiar de dominio: toda ruta interna pasa por aqui. Bajo Vitest,
 * `import.meta.env.BASE_URL` vale "/", asi que estas pruebas fijan el
 * comportamiento con base raiz, que es tambien el del despliegue de Vercel.
 */
describe("withBase", () => {
  it("normaliza una ruta absoluta", () => {
    expect(withBase("/convocatoria")).toBe("/convocatoria");
  });

  it("anade la barra inicial cuando falta", () => {
    expect(withBase("convocatoria")).toBe("/convocatoria");
  });

  it("no duplica barras", () => {
    expect(withBase("/")).toBe("/");
    expect(withBase("/assets/logos/logo-uagro.webp")).toBe(
      "/assets/logos/logo-uagro.webp",
    );
  });

  it("conserva anclas y parametros", () => {
    expect(withBase("/convocatoria#preguntas-frecuentes")).toBe(
      "/convocatoria#preguntas-frecuentes",
    );
  });
});

describe("withoutBase", () => {
  it("es la inversa de withBase", () => {
    for (const ruta of ["/", "/convocatoria", "/profesores/alguien"]) {
      expect(withoutBase(withBase(ruta))).toBe(ruta);
    }
  });

  it("deja intacta una ruta que no lleva la base", () => {
    expect(withoutBase("/convocatoria")).toBe("/convocatoria");
  });
});

describe("isExternal", () => {
  it("reconoce destinos fuera del sitio", () => {
    expect(isExternal("https://drive.google.com/file/d/abc")).toBe(true);
    expect(isExternal("http://ejemplo.mx")).toBe(true);
    expect(isExternal("//ejemplo.mx")).toBe(true);
    expect(isExternal("mailto:mdo@uagro.mx")).toBe(true);
    expect(isExternal("tel:+527441340900")).toBe(true);
  });

  it("reconoce destinos internos", () => {
    expect(isExternal("/convocatoria")).toBe(false);
    expect(isExternal("#preguntas-frecuentes")).toBe(false);
  });
});

describe("link", () => {
  it("prefija solo las rutas internas", () => {
    expect(link("/convocatoria")).toBe(withBase("/convocatoria"));
    expect(link("mailto:mdo@uagro.mx")).toBe("mailto:mdo@uagro.mx");
    expect(link("https://uagro.mx")).toBe("https://uagro.mx");
  });
});
