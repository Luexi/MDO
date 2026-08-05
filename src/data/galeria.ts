import type { ImageMetadata } from "astro";

import evento1 from "@/assets/galeria/evento-1.jpg";
import evento2 from "@/assets/galeria/evento-2.jpg";
import evento3 from "@/assets/galeria/evento-3.jpg";
import evento4 from "@/assets/galeria/evento-4.jpg";
import evento5 from "@/assets/galeria/evento-5.jpg";

export interface ImagenGaleria {
  id: string;
  /**
   * Imagen importada, no una ruta.
   *
   * Antes eran cadenas apuntando a `public/assets/galeria/*.jpg`, que el
   * navegador descargaba tal cual: cinco JPEG de 1200x900 y ~800 KB en total
   * para pintar miniaturas de 400 px. Al importarlas, Astro conoce sus
   * dimensiones reales, genera las variantes que hagan falta y las convierte a
   * un formato moderno. Ver `src/pages/galeria.astro`.
   */
  src: ImageMetadata;
  /** Descripcion para lectores de pantalla. Debe describir la imagen, no numerarla. */
  alt: string;
  titulo: string;
  descripcion: string;
}

/**
 * Los textos describen lo que se ve en cada fotografia.
 *
 * Antes las cinco imagenes compartian el mismo `titulo` ("Galería MDO"), la
 * misma `descripcion` y un `alt` numerado ("Galería MDO - imagen 1"), de modo
 * que un lector de pantalla anunciaba cinco veces lo mismo y el carrusel
 * repetia el mismo rotulo en cada diapositiva.
 *
 * Si conoces el nombre, la fecha o la sede exacta de alguno de estos eventos,
 * este es el lugar donde precisarlo.
 */
export const imagenesGaleria: ImagenGaleria[] = [
  {
    id: "1",
    src: evento1,
    alt: "Fotografía grupal de estudiantes y personal académico en el auditorio de la Facultad de Contaduría y Administración.",
    titulo: "Encuentro de la comunidad académica",
    descripcion:
      "Estudiantes y personal docente en el auditorio de la Facultad de Contaduría y Administración.",
  },
  {
    id: "2",
    src: evento2,
    alt: "Sesión de clase en aula con proyección y un expositor de pie frente al grupo, junto a un pendón de la Maestría en Dirección de Organizaciones.",
    titulo: "Sesión de trabajo en aula",
    descripcion:
      "Presentación de avances de investigación ante el grupo, en las instalaciones de la Facultad.",
  },
  {
    id: "3",
    src: evento3,
    alt: "Tres integrantes de la comunidad MDO posando en un andador arbolado de un campus universitario.",
    titulo: "Movilidad académica",
    descripcion:
      "Integrantes del programa durante una estancia académica fuera de la Universidad.",
  },
  {
    id: "4",
    src: evento4,
    alt: "Estudiantes y profesores de la MDO frente a un pendón de la Universidad Autónoma de Coahuila.",
    titulo: "Colaboración interinstitucional",
    descripcion:
      "Participación del programa en una actividad académica en la Universidad Autónoma de Coahuila.",
  },
  {
    id: "5",
    src: evento5,
    alt: "Grupo de seis integrantes del programa frente al edificio de una unidad académica universitaria.",
    titulo: "Actividad de vinculación",
    descripcion:
      "Representación del programa en una actividad de vinculación con otra unidad académica.",
  },
];
