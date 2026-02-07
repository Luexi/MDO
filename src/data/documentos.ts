import { FileText, BookOpen, FileCheck, FilePlus, FileSpreadsheet } from "lucide-react";

export interface Documento {
  id: string;
  titulo: string;
  descripcion: string;
  categoria: string;
  linkDrive: string;
  icono: string;
}

export const documentos: Documento[] = [
  {
    id: "plan-estudios",
    titulo: "Plan de Estudios",
    descripcion: "Documento oficial con la estructura curricular completa del programa de maestría.",
    categoria: "Académico",
    linkDrive: "https://drive.google.com/file/d/PLACEHOLDER_PLAN_ESTUDIOS",
    icono: "BookOpen"
  },
  {
    id: "convocatoria-2026",
    titulo: "Convocatoria 2026",
    descripcion: "Convocatoria vigente con requisitos, fechas y proceso de admisión.",
    categoria: "Admisión",
    linkDrive: "https://drive.google.com/file/d/PLACEHOLDER_CONVOCATORIA",
    icono: "FileText"
  },
  {
    id: "formato-inscripcion",
    titulo: "Formato de Inscripción",
    descripcion: "Formato oficial para el registro de aspirantes al programa.",
    categoria: "Formatos",
    linkDrive: "https://drive.google.com/file/d/PLACEHOLDER_INSCRIPCION",
    icono: "FilePlus"
  },
  {
    id: "carta-exposicion-motivos",
    titulo: "Carta de Exposición de Motivos",
    descripcion: "Formato guía para la elaboración de la carta de motivos.",
    categoria: "Formatos",
    linkDrive: "https://drive.google.com/file/d/PLACEHOLDER_CARTA",
    icono: "FileText"
  },
  {
    id: "formato-protocolo",
    titulo: "Formato de Protocolo de Investigación",
    descripcion: "Guía y formato para la elaboración del protocolo de tesis.",
    categoria: "Formatos",
    linkDrive: "https://drive.google.com/file/d/PLACEHOLDER_PROTOCOLO",
    icono: "FileCheck"
  },
  {
    id: "lineamientos-tesis",
    titulo: "Lineamientos para Tesis",
    descripcion: "Normatividad y requisitos para la elaboración y defensa de tesis.",
    categoria: "Académico",
    linkDrive: "https://drive.google.com/file/d/PLACEHOLDER_LINEAMIENTOS",
    icono: "FileSpreadsheet"
  }
];

export const getDocumentosByCategoria = (categoria: string): Documento[] => {
  return documentos.filter(d => d.categoria === categoria);
};
