export interface Documento {
  id: string;
  titulo: string;
  descripcion: string;
  categoria: string;
  /**
   * Enlace publico al documento. Es OPCIONAL a proposito: cuando falta, la
   * tarjeta se muestra en estado "En proceso" con el boton inhabilitado, en
   * lugar de ofrecer un boton vivo que lleva a un error de Google Drive.
   *
   * No escribas aqui URLs de marcador: el guard de build
   * (`scripts/check-enlaces.mjs`) falla la compilacion si las encuentra.
   */
  linkDrive?: string;
  icono: string;
}

export const documentos: Documento[] = [
  {
    id: "plan-estudios",
    titulo: "Plan de Estudios",
    descripcion:
      "Documento oficial con la estructura curricular completa del programa de maestría.",
    categoria: "Académico",
    linkDrive:
      "https://drive.google.com/file/d/1CITL6wAc9kgkUomDJmiG33nlxh6IWYoo/view?usp=sharing",
    icono: "BookOpen",
  },
  {
    id: "lineamientos-tesis",
    titulo: "Lineamientos para Tesis",
    descripcion:
      "Normatividad y requisitos para la elaboración y defensa de tesis.",
    categoria: "Académico",
    icono: "FileSpreadsheet",
  },
  {
    id: "convocatoria-2026",
    // Lleva el ano porque identifica a UN documento concreto, el de la
    // generacion que inicio en febrero de 2026, no a un proceso abierto.
    titulo: "Convocatoria, generación febrero 2026",
    descripcion:
      "Convocatoria con requisitos, calendario y criterios de selección.",
    categoria: "Admisión",
    icono: "FileText",
  },
  {
    id: "formato-inscripcion",
    titulo: "Formato de Inscripción",
    descripcion: "Formato oficial para el registro de aspirantes al programa.",
    categoria: "Formatos",
    icono: "FilePlus",
  },
  {
    id: "carta-exposicion-motivos",
    titulo: "Carta de Exposición de Motivos",
    descripcion: "Formato guía para la elaboración de la carta de motivos.",
    categoria: "Formatos",
    icono: "FileText",
  },
  {
    id: "formato-protocolo",
    titulo: "Formato de Protocolo de Investigación",
    descripcion: "Guía y formato para la elaboración del protocolo de tesis.",
    categoria: "Formatos",
    icono: "FileCheck",
  },
];

export const getDocumentosByCategoria = (categoria: string): Documento[] =>
  documentos.filter((documento) => documento.categoria === categoria);

/** Categorias en orden de utilidad para el aspirante, no alfabetico. */
export const categoriasDocumentos = ["Admisión", "Formatos", "Académico"];
