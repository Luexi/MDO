export interface ImagenGaleria {
  id: string;
  src: string;
  alt: string;
  titulo?: string;
  descripcion?: string;
}

export const imagenesGaleria: ImagenGaleria[] = [
  {
    id: "1",
    src: "/assets/galeria/evento-1.jpg",
    alt: "Evento académico MDO",
    titulo: "Jornada Académica 2025",
    descripcion: "Ceremonia de apertura de la jornada académica del programa"
  },
  {
    id: "2",
    src: "/assets/galeria/evento-2.png",
    alt: "Actividades del programa",
    titulo: "Actividades Estudiantiles",
    descripcion: "Participación de estudiantes en actividades del programa"
  },
  {
    id: "3",
    src: "/placeholder.svg",
    alt: "Graduación MDO",
    titulo: "Ceremonia de Graduación",
    descripcion: "Generación 2023-2025"
  },
  {
    id: "4",
    src: "/placeholder.svg",
    alt: "Conferencia magistral",
    titulo: "Conferencia Magistral",
    descripcion: "Expositores invitados nacionales e internacionales"
  },
  {
    id: "5",
    src: "/placeholder.svg",
    alt: "Instalaciones FCA",
    titulo: "Instalaciones",
    descripcion: "Facultad de Contaduría y Administración"
  }
];
