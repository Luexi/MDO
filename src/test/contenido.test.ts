import { describe, expect, it } from "vitest";

import { documentos } from "@/data/documentos";
import { generaciones, tesis } from "@/data/tesis";
import { profesores } from "@/data/profesores";
import { imagenesGaleria } from "@/data/galeria";
import { contacto } from "@/data/contacto";

/*
 * Invariantes de la capa de contenido.
 *
 * `src/data/*` lo edita gente que no necesariamente ejecuta el sitio, y un dato
 * mal puesto no rompe la compilacion: solo publica algo incorrecto. Estas
 * pruebas fijan lo que ya se corrigio a mano una vez, para que no vuelva.
 */
const esUrlPublica = (url: string) =>
  /^https:\/\//.test(url) && !/PLACEHOLDER/i.test(url);

describe("documentos", () => {
  it("no tiene identificadores repetidos", () => {
    const ids = documentos.map((d) => d.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("solo declara linkDrive cuando es una URL publica real", () => {
    for (const documento of documentos) {
      if (documento.linkDrive === undefined) continue;
      expect(
        esUrlPublica(documento.linkDrive),
        `${documento.id}: omite el campo en vez de poner "${documento.linkDrive}"`,
      ).toBe(true);
    }
  });

  it("cada documento tiene titulo y descripcion", () => {
    for (const documento of documentos) {
      expect(documento.titulo.trim()).not.toBe("");
      expect(documento.descripcion.trim()).not.toBe("");
    }
  });
});

describe("tesis", () => {
  it("no tiene identificadores repetidos", () => {
    const ids = tesis.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("cada tesis pertenece a una generacion declarada", () => {
    const validas = new Set(generaciones.map((g) => g.id));
    for (const item of tesis) {
      expect(
        validas.has(item.generacion),
        `${item.id}: generacion "${item.generacion}" no esta en generaciones`,
      ).toBe(true);
    }
  });

  it("solo declara linkDrive cuando es una URL publica real", () => {
    for (const item of tesis) {
      if (item.linkDrive === undefined) continue;
      expect(esUrlPublica(item.linkDrive), `${item.id}`).toBe(true);
    }
  });

  it("el id y la etiqueta de cada generacion usan el mismo guion", () => {
    // Antes convivian "2023–2025" (guion medio) y "2023-2025" en la misma
    // pantalla: el filtro y la insignia escribian distinto el mismo rango.
    for (const generacion of generaciones) {
      expect(generacion.label).toBe(generacion.id);
    }
  });
});

describe("profesores", () => {
  it("no tiene slugs repetidos: cada uno genera una pagina", () => {
    const slugs = profesores.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("los slugs son seguros para una URL", () => {
    for (const profesor of profesores) {
      expect(profesor.slug, `${profesor.nombre}`).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it("no arrastra marcas de la captura del PDF", () => {
    // Se eliminaron 48 marcas "(PDF NA)" del historial academico; esta prueba
    // impide que vuelvan al reimportar las fichas.
    for (const profesor of profesores) {
      const texto = [
        profesor.semblanza ?? "",
        ...(profesor.historialAcademico ?? []),
      ].join(" ");
      expect(texto, `${profesor.nombre}`).not.toMatch(/PDF\s*NA/i);
    }
  });
});

describe("galeria", () => {
  it("cada imagen tiene texto alternativo propio y descriptivo", () => {
    const alts = imagenesGaleria.map((i) => i.alt);
    expect(new Set(alts).size).toBe(alts.length);
    for (const imagen of imagenesGaleria) {
      expect(imagen.alt.length, `imagen ${imagen.id}`).toBeGreaterThan(20);
      expect(imagen.alt).not.toMatch(/imagen \d/i);
    }
  });

  it("cada imagen tiene titulo propio", () => {
    const titulos = imagenesGaleria.map((i) => i.titulo);
    expect(new Set(titulos).size).toBe(titulos.length);
  });
});

describe("contacto", () => {
  it("declara un correo con formato valido", () => {
    expect(contacto.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it("el href del telefono coincide con el telefono mostrado", () => {
    const soloDigitos = (s: string) => s.replace(/\D/g, "");
    expect(soloDigitos(contacto.telefonoHref)).toContain(
      soloDigitos(contacto.telefono).slice(0, 10),
    );
  });
});
