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
        label: "Convocatoria",
        href: "/convocatoria",
        descripcion: "Calendario, requisitos y criterios de selección",
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

/**
 * Destino de la llamada a la accion principal, presente en toda la navegacion.
 *
 * La etiqueta incluye el ano porque la convocatoria para la generacion de
 * febrero de 2027 ya esta publicada.
 */
export const ctaPrincipal = {
  label: "Convocatoria 2027",
  labelCorto: "Convocatoria",
  href: "/convocatoria",
} as const;

/** Enlaces del footer, agrupados igual que la navegacion principal. */
export const enlacesFooter = navGrupos;

/**
 * Compara solo la RUTA de `href` con la pagina actual, ignorando el ancla.
 *
 * Los href se declaran sin prefijo ("/objetivos") pero `Astro.url.pathname`
 * SI incluye la base de despliegue ("/MDO/objetivos"), asi que hay que
 * prefijar el destino antes de comparar. Sin esto nada se marcaria como activo
 * mientras el sitio viva en una subruta de GitHub Pages.
 */
function mismaPagina(href: string, rutaActual: string): boolean {
  const normaliza = (ruta: string) => ruta.split("#")[0].replace(/\/+$/, "") || "/";
  return normaliza(withBase(href)) === normaliza(rutaActual);
}

/**
 * Devuelve true si `href` ES la pagina actual, y por tanto merece
 * `aria-current="page"`.
 *
 * Exige que el destino NO lleve ancla. Antes bastaba con que coincidiera la
 * ruta, asi que en /convocatoria se marcaban DOS destinos distintos como
 * pagina actual: "Convocatoria" y "Preguntas frecuentes"
 * (/convocatoria#preguntas-frecuentes). Un lector de pantalla anunciaba
 * "pagina actual" dos veces y el menu movil pintaba dos entradas en azul.
 *
 * Un enlace con ancla apunta a una SECCION de la pagina, no a la pagina. Y el
 * fragmento no llega nunca al servidor, asi que en build no hay forma de saber
 * si esa seccion es la posicion actual: tampoco corresponde
 * `aria-current="location"`. La respuesta correcta es no marcarlo.
 */
export function esRutaActiva(href: string, rutaActual: string): boolean {
  if (href.includes("#")) return false;
  return mismaPagina(href, rutaActual);
}

/**
 * True si algun destino del grupo cae en la pagina actual.
 *
 * Aqui SI cuentan los enlaces con ancla: estando en /convocatoria, el grupo
 * "Admisión" debe seguir resaltado aunque se haya llegado por el enlace de
 * preguntas frecuentes.
 */
export function grupoActivo(grupo: NavGrupo, rutaActual: string): boolean {
  return grupo.items.some((item) => mismaPagina(item.href, rutaActual));
}
