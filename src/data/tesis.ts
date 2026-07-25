export interface Tesis {
  id: string;
  titulo: string;
  autor: string;
  generacion: string;
  director?: string;
  /**
   * Enlace publico al PDF. Es OPCIONAL a proposito: sin el, `TesisCard` muestra
   * el boton inhabilitado "En proceso" en lugar de un enlace vivo que termina
   * en un error de Google Drive.
   *
   * No escribas aqui URLs de marcador: el guard de build
   * (`scripts/check-enlaces.mjs`) falla la compilacion si las encuentra.
   */
  linkDrive?: string;
  resumen?: string;
}

/**
 * El `id` y la `label` usan el mismo guion normal a proposito. Antes la etiqueta
 * visible usaba guion medio ("2023–2025") y el identificador guion normal, de
 * modo que el mismo rango de generacion se escribia de dos formas en la misma
 * pantalla: guion medio en los filtros y guion normal en las insignias.
 */
export const generaciones = [
  { id: "2023-2025", label: "2023-2025" },
  { id: "2024-2026", label: "2024-2026" },
  { id: "2025-2027", label: "2025-2027" },
];

export const tesis: Tesis[] = [
  // Generación 2023-2025
  {
    id: "t1",
    titulo:
      "Estrategias de gestión del talento humano en PYMES del sector servicios en Acapulco",
    autor: "María Elena García Rodríguez",
    generacion: "2023-2025",
    director: "Dr. Rubén Hernández Chavarría",
    resumen:
      "Estudio sobre las prácticas de gestión del talento humano en pequeñas y medianas empresas del sector servicios en Acapulco, Guerrero.",
  },
  {
    id: "t2",
    titulo:
      "Impacto de la transformación digital en la competitividad de empresas turísticas",
    autor: "Carlos Alberto López Mendoza",
    generacion: "2023-2025",
    director: "Dr. José Hugo Vázquez Mendoza",
    resumen:
      "Análisis del impacto de la adopción de tecnologías digitales en la competitividad de empresas del sector turístico en Guerrero.",
  },
  {
    id: "t3",
    titulo:
      "Liderazgo transformacional y clima organizacional en instituciones educativas",
    autor: "Ana Patricia Sánchez Flores",
    generacion: "2023-2025",
    director: "Dra. Adriana Miranda Esteban",
    resumen:
      "Investigación sobre la relación entre el liderazgo transformacional y el clima organizacional en instituciones de educación superior.",
  },

  // Generación 2024-2026
  {
    id: "t4",
    titulo:
      "Responsabilidad social empresarial en el sector hotelero de Ixtapa-Zihuatanejo",
    autor: "Roberto Martínez Villarreal",
    generacion: "2024-2026",
    director: "Dra. Gabriela del Carmen Rivero Solana",
    resumen: "En proceso de elaboración.",
  },
  {
    id: "t5",
    titulo: "Innovación en modelos de negocio para emprendimientos sociales",
    autor: "Laura Fernanda Torres Aguilar",
    generacion: "2024-2026",
    director: "Dra. Tania de Jesús Adame Zambrano",
    resumen: "En proceso de elaboración.",
  },

  // Generación 2025-2027: sin trabajos registrados todavía.
];

export const getTesisByGeneracion = (generacion: string): Tesis[] =>
  tesis.filter((item) => item.generacion === generacion);
