/**
 * Arquitectura de navegacion del sitio.
 *
 * La navegacion pasa de nueve destinos planos a tres grupos, uno por cada
 * pregunta real de las audiencias del programa:
 *
 *  - Admisión  -> "¿cómo entro?"        (aspirantes)
 *  - Programa  -> "¿es serio esto?"     (aspirantes y evaluadores del SNP)
 *  - Comunidad -> "¿quiénes son?"       (evaluadores y estudiantes)
 *
 * Ninguna URL cambia: los destinos son los mismos y solo se reagrupan, para no
 * romper el SEO ya indexado ni la memoria muscular de quien ya usaba el sitio.
 */
import { withBase } from "@/lib/paths";

export interface NavItem {
  label: string;
  href: string;
  /** Frase corta que explica el destino. Se muestra en el menu de escritorio. */
  descripcion: string;
}

export interface NavGrupo {
  id: string;
  label: string;
  items: NavItem[];
}

export const navGrupos: NavGrupo[] = [
  {
    id: "admision",
    label: "Admisión",
    items: [
      {
        label: "Convocatoria 2026",
        href: "/convocatoria",
        descripcion: "Fechas, requisitos y proceso de ingreso",
      },
      {
        label: "Preguntas frecuentes",
        href: "/convocatoria#preguntas-frecuentes",
        descripcion: "Dudas comunes sobre el ingreso",
      },
      {
        label: "Documentos y formatos",
        href: "/repositorio",
        descripcion: "Formatos oficiales y normatividad",
      },
    ],
  },
  {
    id: "programa",
    label: "Programa",
    items: [
      {
        label: "Objetivos y perfiles",
        href: "/objetivos",
        descripcion: "Objetivo general, metas y perfil de egreso",
      },
      {
        label: "Plan de estudios",
        href: "/plan-estudios",
        descripcion: "Unidades por área de formación y semestre",
      },
      {
        label: "Líneas de investigación",
        href: "/lies",
        descripcion: "Líneas de generación y aplicación del conocimiento",
      },
    ],
  },
  {
    id: "comunidad",
    label: "Comunidad",
    items: [
      {
        label: "Núcleo académico",
        href: "/nucleo-academico",
        descripcion: "Profesorado, líneas y producción",
      },
      {
        label: "Tesis",
        href: "/tesis",
        descripcion: "Trabajos de grado por generación",
      },
      {
        label: "Vinculación",
        href: "/vinculacion",
        descripcion: "Convenios y movilidad",
      },
      {
        label: "Instalaciones",
        href: "/instalaciones",
        descripcion: "Infraestructura de la Facultad",
      },
      {
        label: "Galería",
        href: "/galeria",
        descripcion: "Actividades y eventos del programa",
      },
    ],
  },
];

/** Destino de la llamada a la accion principal, presente en toda la navegacion. */
export const ctaPrincipal = {
  label: "Convocatoria 2026",
  labelCorto: "Convocatoria",
  href: "/convocatoria",
} as const;

/** Enlaces del footer, agrupados igual que la navegacion principal. */
export const enlacesFooter = navGrupos;

/**
 * Devuelve true si `href` corresponde a la pagina actual.
 *
 * Los href se declaran sin prefijo ("/objetivos") pero `Astro.url.pathname`
 * SI incluye la base de despliegue ("/MDO/objetivos"), asi que hay que
 * prefijar el destino antes de comparar. Sin esto, `aria-current="page"` y el
 * resaltado del grupo activo no se aplicarian nunca mientras el sitio viva en
 * una subruta de GitHub Pages.
 *
 * Ignora anclas, para que "/convocatoria#preguntas-frecuentes" marque
 * /convocatoria como activa.
 */
export function esRutaActiva(href: string, rutaActual: string): boolean {
  const normaliza = (ruta: string) => ruta.split("#")[0].replace(/\/+$/, "") || "/";
  const destino = normaliza(withBase(href));
  const actual = normaliza(rutaActual);
  return destino === actual;
}

/** True si algun destino del grupo corresponde a la pagina actual. */
export function grupoActivo(grupo: NavGrupo, rutaActual: string): boolean {
  return grupo.items.some((item) => esRutaActiva(item.href, rutaActual));
}
