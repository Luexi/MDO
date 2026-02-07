export interface Tesis {
  id: string;
  titulo: string;
  autor: string;
  generacion: string;
  director?: string;
  linkDrive?: string;
  resumen?: string;
}

export const generaciones = [
  { id: "2023-2025", label: "2023–2025" },
  { id: "2024-2026", label: "2024–2026" },
  { id: "2025-2027", label: "2025–2027" },
];

export const tesis: Tesis[] = [
  // Generación 2023-2025
  {
    id: "t1",
    titulo: "Estrategias de gestión del talento humano en PYMES del sector servicios en Acapulco",
    autor: "María Elena García Rodríguez",
    generacion: "2023-2025",
    director: "Dr. Rubén Hernández Chavarría",
    linkDrive: "https://drive.google.com/file/d/PLACEHOLDER_1",
    resumen: "Estudio sobre las prácticas de gestión del talento humano en pequeñas y medianas empresas del sector servicios en Acapulco, Guerrero."
  },
  {
    id: "t2",
    titulo: "Impacto de la transformación digital en la competitividad de empresas turísticas",
    autor: "Carlos Alberto López Mendoza",
    generacion: "2023-2025",
    director: "Dr. José Hugo Vázquez Mendoza",
    linkDrive: "https://drive.google.com/file/d/PLACEHOLDER_2",
    resumen: "Análisis del impacto de la adopción de tecnologías digitales en la competitividad de empresas del sector turístico en Guerrero."
  },
  {
    id: "t3",
    titulo: "Liderazgo transformacional y clima organizacional en instituciones educativas",
    autor: "Ana Patricia Sánchez Flores",
    generacion: "2023-2025",
    director: "Dra. Adriana Miranda Esteban",
    linkDrive: "https://drive.google.com/file/d/PLACEHOLDER_3",
    resumen: "Investigación sobre la relación entre el liderazgo transformacional y el clima organizacional en instituciones de educación superior."
  },
  
  // Generación 2024-2026
  {
    id: "t4",
    titulo: "Responsabilidad social empresarial en el sector hotelero de Ixtapa-Zihuatanejo",
    autor: "Roberto Martínez Villarreal",
    generacion: "2024-2026",
    director: "Dra. Gabriela del Carmen Rivero Solana",
    resumen: "En proceso de elaboración."
  },
  {
    id: "t5",
    titulo: "Innovación en modelos de negocio para emprendimientos sociales",
    autor: "Laura Fernanda Torres Aguilar",
    generacion: "2024-2026",
    director: "Dra. Tania de Jesús Adame Zambrano",
    resumen: "En proceso de elaboración."
  },
  
  // Generación 2025-2027 (sin tesis aún)
];

export const getTesisByGeneracion = (generacion: string): Tesis[] => {
  return tesis.filter(t => t.generacion === generacion);
};
