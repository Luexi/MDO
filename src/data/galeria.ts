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
    alt: "Galeria MDO - imagen 1",
    titulo: "Galeria MDO",
    descripcion: "Actividad academica del programa",
  },
  {
    id: "2",
    src: "/assets/galeria/evento-2.jpg",
    alt: "Galeria MDO - imagen 2",
    titulo: "Galeria MDO",
    descripcion: "Actividad academica del programa",
  },
  {
    id: "3",
    src: "/assets/galeria/evento-3.jpg",
    alt: "Galeria MDO - imagen 3",
    titulo: "Galeria MDO",
    descripcion: "Actividad academica del programa",
  },
  {
    id: "4",
    src: "/assets/galeria/evento-4.jpg",
    alt: "Galeria MDO - imagen 4",
    titulo: "Galeria MDO",
    descripcion: "Actividad academica del programa",
  },
  {
    id: "5",
    src: "/assets/galeria/evento-5.jpg",
    alt: "Galeria MDO - imagen 5",
    titulo: "Galeria MDO",
    descripcion: "Actividad academica del programa",
  },
];
