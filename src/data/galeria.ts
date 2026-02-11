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
    alt: "Galería MDO - imagen 1",
    titulo: "Galería MDO",
    descripcion: "Actividad académica del programa",
  },
  {
    id: "2",
    src: "/assets/galeria/evento-2.jpg",
    alt: "Galería MDO - imagen 2",
    titulo: "Galería MDO",
    descripcion: "Actividad académica del programa",
  },
  {
    id: "3",
    src: "/assets/galeria/evento-3.jpg",
    alt: "Galería MDO - imagen 3",
    titulo: "Galería MDO",
    descripcion: "Actividad académica del programa",
  },
  {
    id: "4",
    src: "/assets/galeria/evento-4.jpg",
    alt: "Galería MDO - imagen 4",
    titulo: "Galería MDO",
    descripcion: "Actividad académica del programa",
  },
  {
    id: "5",
    src: "/assets/galeria/evento-5.jpg",
    alt: "Galería MDO - imagen 5",
    titulo: "Galería MDO",
    descripcion: "Actividad académica del programa",
  },
];
