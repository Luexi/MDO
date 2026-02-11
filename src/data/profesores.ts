export interface Profesor {
  id: string;
  slug: string;
  nombre: string;
  grado: string;
  nombreCompleto: string;
  area?: string;
  linea?: string;
  email?: string;
  foto?: string;
  semblanza?: string;
  historialAcademico?: string[];
  publicaciones?: {
    titulo: string;
    anio: string;
    tipo: string;
  }[];
}

export const profesores: Profesor[] = [
{
    id: "1",
    slug: "ruben-hernandez-chavarria",
    nombre: "Rubén Hernández Chavarría",
    grado: "Dr.",
    nombreCompleto: "Dr. Rubén Hernández Chavarría",
    area: "UAGro-CA-229",
    linea: "Gestión y comportamiento organizacional",
    email: "rhernandez@uagro.mx",
    foto: "/assets/profesores/ruben-hernandez-chavarria.jpeg",
    semblanza:
      "Doctor en administración pública por el Instituto Internacional del Derecho y del Estado. Miembro SNI candidato y coordinador de la Red de Educación para el Desarrollo Regional y Sostenibilidad de la UAGro.",
    historialAcademico: [
      "Último grado (PDF NA): Doctor en administración pública - Instituto Internacional del Derecho y del Estado",
      "Cuerpo académico (PDF NA): UAGro-CA-229 Gestión y comportamiento organizacional",
      "Red de colaboración (PDF NA): Red de Educación para el Desarrollo Regional y Sostenibilidad de la UAGro",
    ],
    publicaciones: [
      {
        titulo:
          "El perfil del emprendedor universitario y su influencia para el desarrollo económico regional en Guerrero",
        anio: "2024",
        tipo: "Artículo",
      },
    ],
  },
{
    id: "2",
    slug: "david-antonio-reyes-pena",
    nombre: "David Antonio Reyes Peña",
    grado: "Dr.",
    nombreCompleto: "Dr. David Antonio Reyes Peña",
    area: "UAGro-CA-252",
    linea: "Innovación y responsabilidad social en las organizaciones",
    foto: "/assets/profesores/david-antonio-reyes-pena.jpg",
    semblanza:
      "Doctor en administración por la UAGro. Integrante del SNI nivel 1 e integrante de la Red Mexicana de Investigadores en Estudios Organizacionales.",
    historialAcademico: [
      "Último grado (PDF NA): Doctor en administración - UAGro",
      "Cuerpo académico (PDF NA): UAGro-CA-252 Innovación y responsabilidad social en las organizaciones",
      "Red de colaboración (PDF NA): Red Mexicana de Investigadores en Estudios Organizacionales",
    ],
    publicaciones: [
      {
        titulo:
          "El trabajo colaborativo, eje fundamental para el fortalecimiento de los cuerpos académicos",
        anio: "2023",
        tipo: "Artículo",
      },
    ],
  },
{
    id: "4",
    slug: "irma-amalia-mendez-castrejon",
    nombre: "Irma Amalia Méndez Castrejón",
    grado: "Dra.",
    nombreCompleto: "Dra. Irma Amalia Méndez Castrejón",
    area: "UAGro-CA-252",
    linea: "Innovación y responsabilidad social en las organizaciones",
    foto: "/assets/profesores/irma-amalia-mendez-castrejon.jpg",
    semblanza:
      "Doctora en ciencias de la educación por el Colegio Mayor de San Carlos. SNI candidata e integrante de la Red Nacional de Productividad, Innovación y Competitividad Empresarial.",
    historialAcademico: [
      "Último grado (PDF NA): Doctora en ciencias de la educación - Colegio Mayor de San Carlos",
      "Cuerpo académico (PDF NA): UAGro-CA-252 Innovación y responsabilidad social en las organizaciones",
      "Red de colaboración (PDF NA): Red Nacional de Productividad, Innovación y Competitividad Empresarial",
    ],
    publicaciones: [
      {
        titulo: "El comercio electrónico como estrategia para la permanencia de MiPyMes",
        anio: "2023",
        tipo: "Capítulo de libro",
      },
    ],
  },
{
    id: "5",
    slug: "evelyn-janet-zavaleta-carbajal",
    nombre: "Evelyn Janet Zavaleta Carbajal",
    grado: "Dra.",
    nombreCompleto: "Dra. Evelyn Janet Zavaleta Carbajal",
    area: "UAGro-CA-227",
    linea: "Educación virtual y responsabilidad social",
    foto: "/assets/profesores/evelyn-janet-zavaleta-carbajal.jpeg",
    semblanza:
      "Doctora en administración pública por el Instituto Internacional del Derecho y del Estado. Integrante SNI candidata, Perfil PRODEP y coordinadora del cuerpo académico UAGro-CA-227.",
    historialAcademico: [
      "Último grado (PDF NA): Doctora en administración pública - Instituto Internacional del Derecho y del Estado",
      "Cuerpo académico (PDF NA): UAGro-CA-227 Educación virtual y responsabilidad social",
      "Red de colaboración (PDF NA): Red de Educación para el Desarrollo Regional y Sostenibilidad de la UAGro",
    ],
    publicaciones: [
      {
        titulo: "El comercio electrónico como estrategia para la permanencia de MiPyMes",
        anio: "2023",
        tipo: "Capítulo de libro",
      },
    ],
  },
{
    id: "6",
    slug: "yanira-gallardo-moreno",
    nombre: "Yanira Gallardo Moreno",
    grado: "Dra.",
    nombreCompleto: "Dra. Yanira Gallardo Moreno",
    area: "UAGro-CA-252",
    linea: "Innovación y responsabilidad social en las organizaciones",
    foto: "/assets/profesores/yanira-gallardo-moreno.jpg",
    semblanza:
      "Doctora en administración por la Universidad Americana de Acapulco. SNI candidata, Perfil PRODEP e integrante de la Red de Educación para el Desarrollo Regional y Sostenibilidad de la UAGro.",
    historialAcademico: [
      "Último grado (PDF NA): Doctora en administración - Universidad Americana de Acapulco",
      "Cuerpo académico (PDF NA): UAGro-CA-252 Innovación y responsabilidad social en las organizaciones",
      "Red de colaboración (PDF NA): Red de Educación para el Desarrollo Regional y Sostenibilidad de la UAGro",
    ],
    publicaciones: [
      {
        titulo: "El comercio electrónico como estrategia para la permanencia de MiPyMes",
        anio: "2023",
        tipo: "Capítulo de libro",
      },
    ],
  },
{
    id: "12",
    slug: "gabriela-del-carmen-rivero-solana",
    nombre: "Gabriela del Carmen Rivero Solana",
    grado: "Dra.",
    nombreCompleto: "Dra. Gabriela del Carmen Rivero Solana",
    area: "UAGro-CA-229",
    linea: "Gestión y comportamiento organizacional",
    foto: "/assets/profesores/gabriela-del-carmen-rivero-solana.jpg",
    semblanza:
      "Doctora en administración pública por el Instituto Internacional del Derecho y del Estado. Perfil PRODEP e integrante de la Red de Educación para el Desarrollo Regional y Sostenibilidad de la UAGro.",
    historialAcademico: [
      "Último grado (PDF NA): Doctora en administración pública - Instituto Internacional del Derecho y del Estado",
      "Cuerpo académico (PDF NA): UAGro-CA-229 Gestión y comportamiento organizacional",
      "Red de colaboración (PDF NA): Red de Educación para el Desarrollo Regional y Sostenibilidad de la UAGro",
    ],
    publicaciones: [
      {
        titulo:
          "El perfil del emprendedor universitario y su influencia para el desarrollo económico regional en Guerrero",
        anio: "2024",
        tipo: "Artículo",
      },
    ],
  },
{
    id: "14",
    slug: "citlalli-arroyo-rosas",
    nombre: "Citlalli Arroyo Rosas",
    grado: "Dra.",
    nombreCompleto: "Dra. Citlalli Arroyo Rosas",
    area: "UAGro-CA-229",
    linea: "Gestión y comportamiento organizacional",
    foto: "/assets/profesores/citlalli-arroyo-rosas.jpg",
    semblanza:
      "Doctora en administración pública por el Instituto Internacional del Derecho y del Estado. Perfil PRODEP e integrante de la Red de Educación para el Desarrollo Regional y Sostenibilidad de la UAGro.",
    historialAcademico: [
      "Último grado (PDF NA): Doctora en administración pública - Instituto Internacional del Derecho y del Estado",
      "Cuerpo académico (PDF NA): UAGro-CA-229 Gestión y comportamiento organizacional",
      "Red de colaboración (PDF NA): Red de Educación para el Desarrollo Regional y Sostenibilidad de la UAGro",
    ],
    publicaciones: [
      {
        titulo:
          "El perfil del emprendedor universitario y su influencia para el desarrollo económico regional en Guerrero",
        anio: "2024",
        tipo: "Artículo",
      },
    ],
  },
{
    id: "16",
    slug: "remigio-marin-ibarra",
    nombre: "Remigio Marín Ibarra",
    grado: "Dr.",
    nombreCompleto: "Dr. Remigio Marín Ibarra",
    area: "UAGro-CA-210",
    linea: "Gestión, desarrollo y aspectos financieros de las empresas",
    foto: "/assets/profesores/remigio-marin-ibarra.jpg",
    semblanza:
      "Doctor en administración por Atlantic International University (Honolulu, Hawaii). Integrante del cuerpo académico UAGro-CA-210 y de la Red de Educación para el Desarrollo Regional y Sostenibilidad de la UAGro.",
    historialAcademico: [
      "Último grado (PDF NA): Doctor en administración - Atlantic International University",
      "Cuerpo académico (PDF NA): UAGro-CA-210 Gestión, desarrollo y aspectos financieros de las empresas",
      "Red de colaboración (PDF NA): Red de Educación para el Desarrollo Regional y Sostenibilidad de la UAGro",
    ],
    publicaciones: [
      {
        titulo:
          "Importancia de que los futuros contadores conozcan las IA útiles en su formación profesional",
        anio: "2023",
        tipo: "Memoria de congreso",
      },
    ],
  },
{
    id: "15",
    slug: "liliana-galeana-camacho",
    nombre: "Liliana Galeana Camacho",
    grado: "Dra.",
    nombreCompleto: "Dra. Liliana Galeana Camacho",
    area: "UAGro-CA-227",
    linea: "Educación virtual y responsabilidad social",
    foto: "/assets/profesores/liliana-galeana-camacho.jpg",
    semblanza:
      "Doctora en administración pública por el Instituto Internacional del Derecho y del Estado. Perfil PRODEP e integrante del cuerpo académico UAGro-CA-227.",
    historialAcademico: [
      "Último grado (PDF NA): Doctora en administración pública - Instituto Internacional del Derecho y del Estado",
      "Cuerpo académico (PDF NA): UAGro-CA-227 Educación virtual y responsabilidad social",
      "Red de colaboración (PDF NA): Red de Educación para el Desarrollo Regional y Sostenibilidad de la UAGro",
    ],
    publicaciones: [
      {
        titulo: "Factores asociados a la retribución social de estudiantes de posgrado",
        anio: "2025",
        tipo: "Capítulo de libro (en prensa)",
      },
    ],
  },
{
    id: "3",
    slug: "jose-luis-susano-garcia",
    nombre: "José Luis Susano García",
    grado: "Dr.",
    nombreCompleto: "Dr. José Luis Susano García",
    area: "UAGro-CA-209",
    linea: "Responsabilidad social y gestión de las organizaciones",
    foto: "/assets/profesores/jose-luis-susano-garcia.jpeg",
    semblanza:
      "Doctor en administración y gestión empresarial por la Universidad del Centro del Bajío. Integrante del SNI nivel 1 y presidente de la Red Académica de Gestión de Mercadotecnia del Consorcio de Universidades Mexicanas.",
    historialAcademico: [
      "Último grado (PDF NA): Doctor en administración y gestión empresarial - Universidad del Centro del Bajío",
      "Cuerpo académico (PDF NA): UAGro-CA-209 Responsabilidad social y gestión de las organizaciones",
      "Red de colaboración (PDF NA): Red Académica de Gestión de Mercadotecnia (CUMex)",
    ],
    publicaciones: [
      {
        titulo: "Estilo de vida de consumidores generacionales en la ciudad de Chilpancingo",
        anio: "2024",
        tipo: "Capítulo de libro",
      },
    ],
  },
{
    id: "13",
    slug: "rosa-alejandra-vazquez-martinez",
    nombre: "Rosa Alejandra Vázquez Martínez",
    grado: "Dra.",
    nombreCompleto: "Dra. Rosa Alejandra Vázquez Martínez",
    area: "UAGro-CA-227",
    linea: "Educación virtual y responsabilidad social",
    foto: "/assets/profesores/rosa-alejandra-vazquez-martinez.jpeg",
    semblanza:
      "Doctora en administración por la Universidad IEXPRO. Perfil PRODEP e integrante de la Red de Educación para el Desarrollo Regional y Sostenibilidad de la UAGro.",
    historialAcademico: [
      "Último grado (PDF NA): Doctora en administración - Universidad IEXPRO",
      "Cuerpo académico (PDF NA): UAGro-CA-227 Educación virtual y responsabilidad social",
      "Red de colaboración (PDF NA): Red de Educación para el Desarrollo Regional y Sostenibilidad de la UAGro",
    ],
    publicaciones: [
      {
        titulo: "Línea de publicaciones sobre responsabilidad social y emprendimiento universitario",
        anio: "2024",
        tipo: "Publicación conjunta",
      },
    ],
  },
{
    id: "9",
    slug: "justino-arziga-castanon",
    nombre: "Justino Arziga Castañón",
    grado: "Dr.",
    nombreCompleto: "Dr. Justino Arziga Castañón",
    area: "UAGro-CA-14",
    linea: "Turismo sustentable",
    foto: "/assets/profesores/justino-arziga-castanon.jpg",
    semblanza:
      "Doctor en ciencias del desarrollo regional por la UAGro. De acuerdo con el PDF del Núcleo Académico, figura como candidato SNI a partir de 2026.",
    historialAcademico: [
      "Último grado (PDF NA): Doctor en ciencias del desarrollo regional - UAGro",
      "Cuerpo académico (PDF NA): UAGro-CA-14 Turismo sustentable",
      "Red de colaboración (PDF NA): Red Latinoamericana de Estudios Subnacionales de la UAGro",
      "Nota: información individual no actualizada por el profesor.",
    ],
    publicaciones: [
      {
        titulo: "Educación para el desarrollo regional",
        anio: "En prensa",
        tipo: "Capítulo de libro",
      },
    ],
  },
{
    id: "8",
    slug: "tania-de-jesus-adame-zambrano",
    nombre: "Tania de Jesús Adame Zambrano",
    grado: "Dra.",
    nombreCompleto: "Dra. Tania de Jesús Adame Zambrano",
    area: "UAGro-224",
    linea: "Biotecnología y econometría de los sistemas agroalimentarios",
    email: "17021@uagro.mx",
    foto: "/assets/profesores/tania-de-jesus-adame-zambrano.webp",
    semblanza:
      "Doctora en Dirección de Organizaciones por la Universidad del Distrito Federal. SNI candidata e integrante de redes de difusión y divulgación en ciencias y humanidades.",
    historialAcademico: [
      "Último grado (PDF NA): Doctora en Dirección de Organizaciones - Universidad del Distrito Federal",
      "Cuerpo académico (PDF NA): UAGro-224 Biotecnología y econometría de los sistemas agroalimentarios",
      "Red de colaboración (PDF NA): Red de Difusión y Divulgación de Investigaciones en Ciencias y Humanidades",
    ],
    publicaciones: [
      {
        titulo: "Educación para el desarrollo regional",
        anio: "En prensa",
        tipo: "Capítulo de libro",
      },
    ],
  },
{
    id: "7",
    slug: "adriana-miranda-esteban",
    nombre: "Adriana Miranda Esteban",
    grado: "Dra.",
    nombreCompleto: "Dra. Adriana Miranda Esteban",
    area: "UAGro-CA-185",
    linea: "Educación y sustentabilidad",
    foto: "/assets/profesores/adriana-miranda-esteban.jpg",
    semblanza:
      "Doctora en ciencias ambientales por la UAGro. SNI candidata e integrante del cuerpo académico UAGro-CA-185 Educación y sustentabilidad.",
    historialAcademico: [
      "Último grado (PDF NA): Doctora en ciencias ambientales - UAGro",
      "Cuerpo académico (PDF NA): UAGro-CA-185 Educación y sustentabilidad",
      "Red de colaboración (PDF NA): Red de Educación para el Desarrollo Regional y Sostenibilidad de la UAGro",
    ],
    publicaciones: [
      {
        titulo: "Educación para el desarrollo regional: estudio de caso en estudiantes de posgrado",
        anio: "En prensa",
        tipo: "Capítulo de libro",
      },
    ],
  },
{
    id: "10",
    slug: "jose-hugo-vazquez-mendoza",
    nombre: "José Hugo Vázquez Mendoza",
    grado: "Dr.",
    nombreCompleto: "Dr. José Hugo Vázquez Mendoza",
    area: "UAGro-CA-227",
    linea: "Educación virtual y responsabilidad social",
    foto: "/assets/profesores/jose-hugo-vazquez-mendoza.jpeg",
    semblanza:
      "Doctor en administración por la UAGro (candidato SNI a partir de 2026). Integrante del cuerpo académico UAGro-CA-227.",
    historialAcademico: [
      "Último grado (PDF NA): Doctor en administración - UAGro",
      "Cuerpo académico (PDF NA): UAGro-CA-227 Educación virtual y responsabilidad social",
      "Red de colaboración (PDF NA): Red de Educación para el Desarrollo Regional y Sostenibilidad de la UAGro",
    ],
    publicaciones: [
      {
        titulo: "Responsabilidad social corporativa: un motor para el emprendimiento universitario en Guerrero",
        anio: "2024",
        tipo: "Capítulo",
      },
    ],
  },
{
    id: "11",
    slug: "nallely-vazquez-martinez",
    nombre: "Nallely Vázquez Martínez",
    grado: "Dra.",
    nombreCompleto: "Dra. Nallely Vázquez Martínez",
    area: "UAGro-CA-227",
    linea: "Educación virtual y responsabilidad social",
    foto: "/assets/profesores/nallely-vazquez-martinez.jpg",
    semblanza:
      "Doctora en Dirección de Organizaciones por la UPAEP. Perfil PRODEP e integrante del cuerpo académico UAGro-CA-227.",
    historialAcademico: [
      "Último grado (PDF NA): Doctora en dirección de organizaciones - UPAEP",
      "Cuerpo académico (PDF NA): UAGro-CA-227 Educación virtual y responsabilidad social",
      "Red de colaboración (PDF NA): Red Nacional de Productividad, Innovación y Competitividad Empresarial",
    ],
    publicaciones: [
      {
        titulo: "Línea de publicación sobre responsabilidad social corporativa y emprendimiento universitario",
        anio: "2024",
        tipo: "Publicación conjunta",
      },
    ],
  }
];

export const getProfesorBySlug = (slug: string): Profesor | undefined => {
  return profesores.find((p) => p.slug === slug);
};
