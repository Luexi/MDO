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
    nombre: "Ruben Hernandez Chavarria",
    grado: "Dr.",
    nombreCompleto: "Dr. Ruben Hernandez Chavarria",
    area: "UAGro-CA-229",
    linea: "Gestion y comportamiento organizacional",
    email: "rhernandez@uagro.mx",
    foto: "/assets/profesores/ruben-hernandez-chavarria.jpeg",
    semblanza:
      "Doctor en administracion publica por el Instituto Internacional del Derecho y del Estado. Miembro SNI candidato y coordinador de la Red de Educacion para el Desarrollo Regional y Sostenibilidad de la UAGro.",
    historialAcademico: [
      "Ultimo grado (PDF NA): Doctor en administracion publica - Instituto Internacional del Derecho y del Estado",
      "Cuerpo academico (PDF NA): UAGro-CA-229 Gestion y comportamiento organizacional",
      "Red de colaboracion (PDF NA): Red de Educacion para el Desarrollo Regional y Sostenibilidad de la UAGro",
    ],
    publicaciones: [
      {
        titulo:
          "El perfil del emprendedor universitario y su influencia para el desarrollo economico regional en Guerrero",
        anio: "2024",
        tipo: "Articulo",
      },
    ],
  },
{
    id: "2",
    slug: "david-antonio-reyes-pena",
    nombre: "David Antonio Reyes Pena",
    grado: "Dr.",
    nombreCompleto: "Dr. David Antonio Reyes Pena",
    area: "UAGro-CA-252",
    linea: "Innovacion y responsabilidad social en las organizaciones",
    foto: "/assets/profesores/david-antonio-reyes-pena.jpg",
    semblanza:
      "Doctor en administracion por la UAGro. Integrante del SNI nivel 1 e integrante de la Red Mexicana de Investigadores en Estudios Organizacionales.",
    historialAcademico: [
      "Ultimo grado (PDF NA): Doctor en administracion - UAGro",
      "Cuerpo academico (PDF NA): UAGro-CA-252 Innovacion y responsabilidad social en las organizaciones",
      "Red de colaboracion (PDF NA): Red Mexicana de Investigadores en Estudios Organizacionales",
    ],
    publicaciones: [
      {
        titulo:
          "El trabajo colaborativo, eje fundamental para el fortalecimiento de los cuerpos academicos",
        anio: "2023",
        tipo: "Articulo",
      },
    ],
  },
{
    id: "4",
    slug: "irma-amalia-mendez-castrejon",
    nombre: "Irma Amalia Mendez Castrejon",
    grado: "Dra.",
    nombreCompleto: "Dra. Irma Amalia Mendez Castrejon",
    area: "UAGro-CA-252",
    linea: "Innovacion y responsabilidad social en las organizaciones",
    foto: "/assets/profesores/irma-amalia-mendez-castrejon.jpg",
    semblanza:
      "Doctora en ciencias de la educacion por el Colegio Mayor de San Carlos. SNI candidata e integrante de la Red Nacional de Productividad, Innovacion y Competitividad Empresarial.",
    historialAcademico: [
      "Ultimo grado (PDF NA): Doctora en ciencias de la educacion - Colegio Mayor de San Carlos",
      "Cuerpo academico (PDF NA): UAGro-CA-252 Innovacion y responsabilidad social en las organizaciones",
      "Red de colaboracion (PDF NA): Red Nacional de Productividad, Innovacion y Competitividad Empresarial",
    ],
    publicaciones: [
      {
        titulo: "El comercio electronico como estrategia para la permanencia de MiPyMes",
        anio: "2023",
        tipo: "Capitulo de libro",
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
    linea: "Educacion virtual y responsabilidad social",
    foto: "/assets/profesores/evelyn-janet-zavaleta-carbajal.jpeg",
    semblanza:
      "Doctora en administracion publica por el Instituto Internacional del Derecho y del Estado. Integrante SNI candidata, Perfil PRODEP y coordinadora del cuerpo academico UAGro-CA-227.",
    historialAcademico: [
      "Ultimo grado (PDF NA): Doctora en administracion publica - Instituto Internacional del Derecho y del Estado",
      "Cuerpo academico (PDF NA): UAGro-CA-227 Educacion virtual y responsabilidad social",
      "Red de colaboracion (PDF NA): Red de Educacion para el Desarrollo Regional y Sostenibilidad de la UAGro",
    ],
    publicaciones: [
      {
        titulo: "El comercio electronico como estrategia para la permanencia de MiPyMes",
        anio: "2023",
        tipo: "Capitulo de libro",
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
    linea: "Innovacion y responsabilidad social en las organizaciones",
    foto: "/assets/profesores/yanira-gallardo-moreno.jpg",
    semblanza:
      "Doctora en administracion por la Universidad Americana de Acapulco. SNI candidata, Perfil PRODEP e integrante de la Red de Educacion para el Desarrollo Regional y Sostenibilidad de la UAGro.",
    historialAcademico: [
      "Ultimo grado (PDF NA): Doctora en administracion - Universidad Americana de Acapulco",
      "Cuerpo academico (PDF NA): UAGro-CA-252 Innovacion y responsabilidad social en las organizaciones",
      "Red de colaboracion (PDF NA): Red de Educacion para el Desarrollo Regional y Sostenibilidad de la UAGro",
    ],
    publicaciones: [
      {
        titulo: "El comercio electronico como estrategia para la permanencia de MiPyMes",
        anio: "2023",
        tipo: "Capitulo de libro",
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
    linea: "Gestion y comportamiento organizacional",
    foto: "/assets/profesores/gabriela-del-carmen-rivero-solana.jpg",
    semblanza:
      "Doctora en administracion publica por el Instituto Internacional del Derecho y del Estado. Perfil PRODEP e integrante de la Red de Educacion para el Desarrollo Regional y Sostenibilidad de la UAGro.",
    historialAcademico: [
      "Ultimo grado (PDF NA): Doctora en administracion publica - Instituto Internacional del Derecho y del Estado",
      "Cuerpo academico (PDF NA): UAGro-CA-229 Gestion y comportamiento organizacional",
      "Red de colaboracion (PDF NA): Red de Educacion para el Desarrollo Regional y Sostenibilidad de la UAGro",
    ],
    publicaciones: [
      {
        titulo:
          "El perfil del emprendedor universitario y su influencia para el desarrollo economico regional en Guerrero",
        anio: "2024",
        tipo: "Articulo",
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
    linea: "Gestion y comportamiento organizacional",
    foto: "/assets/profesores/citlalli-arroyo-rosas.jpg",
    semblanza:
      "Doctora en administracion publica por el Instituto Internacional del Derecho y del Estado. Perfil PRODEP e integrante de la Red de Educacion para el Desarrollo Regional y Sostenibilidad de la UAGro.",
    historialAcademico: [
      "Ultimo grado (PDF NA): Doctora en administracion publica - Instituto Internacional del Derecho y del Estado",
      "Cuerpo academico (PDF NA): UAGro-CA-229 Gestion y comportamiento organizacional",
      "Red de colaboracion (PDF NA): Red de Educacion para el Desarrollo Regional y Sostenibilidad de la UAGro",
    ],
    publicaciones: [
      {
        titulo:
          "El perfil del emprendedor universitario y su influencia para el desarrollo economico regional en Guerrero",
        anio: "2024",
        tipo: "Articulo",
      },
    ],
  },
{
    id: "16",
    slug: "remigio-marin-ibarra",
    nombre: "Remigio Marin Ibarra",
    grado: "Dr.",
    nombreCompleto: "Dr. Remigio Marin Ibarra",
    area: "UAGro-CA-210",
    linea: "Gestion, desarrollo y aspectos financieros de las empresas",
    foto: "/assets/profesores/remigio-marin-ibarra.jpg",
    semblanza:
      "Doctor en administracion por Atlantic International University (Honolulu, Hawaii). Integrante del cuerpo academico UAGro-CA-210 y de la Red de Educacion para el Desarrollo Regional y Sostenibilidad de la UAGro.",
    historialAcademico: [
      "Ultimo grado (PDF NA): Doctor en administracion - Atlantic International University",
      "Cuerpo academico (PDF NA): UAGro-CA-210 Gestion, desarrollo y aspectos financieros de las empresas",
      "Red de colaboracion (PDF NA): Red de Educacion para el Desarrollo Regional y Sostenibilidad de la UAGro",
    ],
    publicaciones: [
      {
        titulo:
          "Importancia de que los futuros contadores conozcan las IA utiles en su formacion profesional",
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
    linea: "Educacion virtual y responsabilidad social",
    foto: "/assets/profesores/liliana-galeana-camacho.jpg",
    semblanza:
      "Doctora en administracion publica por el Instituto Internacional del Derecho y del Estado. Perfil PRODEP e integrante del cuerpo academico UAGro-CA-227.",
    historialAcademico: [
      "Ultimo grado (PDF NA): Doctora en administracion publica - Instituto Internacional del Derecho y del Estado",
      "Cuerpo academico (PDF NA): UAGro-CA-227 Educacion virtual y responsabilidad social",
      "Red de colaboracion (PDF NA): Red de Educacion para el Desarrollo Regional y Sostenibilidad de la UAGro",
    ],
    publicaciones: [
      {
        titulo: "Factores asociados a la retribucion social de estudiantes de posgrado",
        anio: "2025",
        tipo: "Capitulo de libro (en prensa)",
      },
    ],
  },
{
    id: "3",
    slug: "jose-luis-susano-garcia",
    nombre: "Jose Luis Susano Garcia",
    grado: "Dr.",
    nombreCompleto: "Dr. Jose Luis Susano Garcia",
    area: "UAGro-CA-209",
    linea: "Responsabilidad social y gestion de las organizaciones",
    foto: "/assets/profesores/jose-luis-susano-garcia.jpeg",
    semblanza:
      "Doctor en administracion y gestion empresarial por la Universidad del Centro del Bajio. Integrante del SNI nivel 1 y presidente de la Red Academica de Gestion de Mercadotecnia del Consorcio de Universidades Mexicanas.",
    historialAcademico: [
      "Ultimo grado (PDF NA): Doctor en administracion y gestion empresarial - Universidad del Centro del Bajio",
      "Cuerpo academico (PDF NA): UAGro-CA-209 Responsabilidad social y gestion de las organizaciones",
      "Red de colaboracion (PDF NA): Red Academica de Gestion de Mercadotecnia (CUMex)",
    ],
    publicaciones: [
      {
        titulo: "Estilo de vida de consumidores generacionales en la ciudad de Chilpancingo",
        anio: "2024",
        tipo: "Capitulo de libro",
      },
    ],
  },
{
    id: "13",
    slug: "rosa-alejandra-vazquez-martinez",
    nombre: "Rosa Alejandra Vazquez Martinez",
    grado: "Dra.",
    nombreCompleto: "Dra. Rosa Alejandra Vazquez Martinez",
    area: "UAGro-CA-227",
    linea: "Educacion virtual y responsabilidad social",
    foto: "/assets/profesores/rosa-alejandra-vazquez-martinez.jpeg",
    semblanza:
      "Doctora en administracion por la Universidad IEXPRO. Perfil PRODEP e integrante de la Red de Educacion para el Desarrollo Regional y Sostenibilidad de la UAGro.",
    historialAcademico: [
      "Ultimo grado (PDF NA): Doctora en administracion - Universidad IEXPRO",
      "Cuerpo academico (PDF NA): UAGro-CA-227 Educacion virtual y responsabilidad social",
      "Red de colaboracion (PDF NA): Red de Educacion para el Desarrollo Regional y Sostenibilidad de la UAGro",
    ],
    publicaciones: [
      {
        titulo: "Linea de publicaciones sobre responsabilidad social y emprendimiento universitario",
        anio: "2024",
        tipo: "Publicacion conjunta",
      },
    ],
  },
{
    id: "9",
    slug: "justino-arziga-castanon",
    nombre: "Justino Arziga Castanon",
    grado: "Dr.",
    nombreCompleto: "Dr. Justino Arziga Castanon",
    area: "UAGro-CA-14",
    linea: "Turismo sustentable",
    foto: "/assets/profesores/justino-arziga-castanon.jpg",
    semblanza:
      "Doctor en ciencias del desarrollo regional por la UAGro. De acuerdo con el PDF del Nucleo Academico, figura como candidato SNI a partir de 2026.",
    historialAcademico: [
      "Ultimo grado (PDF NA): Doctor en ciencias del desarrollo regional - UAGro",
      "Cuerpo academico (PDF NA): UAGro-CA-14 Turismo sustentable",
      "Red de colaboracion (PDF NA): Red Latinoamericana de Estudios Subnacionales de la UAGro",
      "Nota: informacion individual no actualizada por el profesor.",
    ],
    publicaciones: [
      {
        titulo: "Educacion para el desarrollo regional",
        anio: "En prensa",
        tipo: "Capitulo de libro",
      },
    ],
  },
{
    id: "8",
    slug: "tania-de-jesus-adame-zambrano",
    nombre: "Tania de Jesus Adame Zambrano",
    grado: "Dra.",
    nombreCompleto: "Dra. Tania de Jesus Adame Zambrano",
    area: "UAGro-224",
    linea: "Biotecnologia y econometria de los sistemas agroalimentarios",
    email: "17021@uagro.mx",
    foto: "/assets/profesores/tania-de-jesus-adame-zambrano.png",
    semblanza:
      "Doctora en Direccion de Organizaciones por la Universidad del Distrito Federal. SNI candidata e integrante de redes de difusion y divulgacion en ciencias y humanidades.",
    historialAcademico: [
      "Ultimo grado (PDF NA): Doctora en Direccion de Organizaciones - Universidad del Distrito Federal",
      "Cuerpo academico (PDF NA): UAGro-224 Biotecnologia y econometria de los sistemas agroalimentarios",
      "Red de colaboracion (PDF NA): Red de Difusion y Divulgacion de Investigaciones en Ciencias y Humanidades",
    ],
    publicaciones: [
      {
        titulo: "Educacion para el desarrollo regional",
        anio: "En prensa",
        tipo: "Capitulo de libro",
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
    linea: "Educacion y sustentabilidad",
    foto: "/assets/profesores/adriana-miranda-esteban.jpg",
    semblanza:
      "Doctora en ciencias ambientales por la UAGro. SNI candidata e integrante del cuerpo academico UAGro-CA-185 Educacion y sustentabilidad.",
    historialAcademico: [
      "Ultimo grado (PDF NA): Doctora en ciencias ambientales - UAGro",
      "Cuerpo academico (PDF NA): UAGro-CA-185 Educacion y sustentabilidad",
      "Red de colaboracion (PDF NA): Red de Educacion para el Desarrollo Regional y Sostenibilidad de la UAGro",
    ],
    publicaciones: [
      {
        titulo: "Educacion para el desarrollo regional: estudio de caso en estudiantes de posgrado",
        anio: "En prensa",
        tipo: "Capitulo de libro",
      },
    ],
  },
{
    id: "10",
    slug: "jose-hugo-vazquez-mendoza",
    nombre: "Jose Hugo Vazquez Mendoza",
    grado: "Dr.",
    nombreCompleto: "Dr. Jose Hugo Vazquez Mendoza",
    area: "UAGro-CA-227",
    linea: "Educacion virtual y responsabilidad social",
    foto: "/assets/profesores/jose-hugo-vazquez-mendoza.jpeg",
    semblanza:
      "Doctor en administracion por la UAGro (candidato SNI a partir de 2026). Integrante del cuerpo academico UAGro-CA-227.",
    historialAcademico: [
      "Ultimo grado (PDF NA): Doctor en administracion - UAGro",
      "Cuerpo academico (PDF NA): UAGro-CA-227 Educacion virtual y responsabilidad social",
      "Red de colaboracion (PDF NA): Red de Educacion para el Desarrollo Regional y Sostenibilidad de la UAGro",
    ],
    publicaciones: [
      {
        titulo: "Responsabilidad social corporativa: un motor para el emprendimiento universitario en Guerrero",
        anio: "2024",
        tipo: "Capitulo",
      },
    ],
  },
{
    id: "11",
    slug: "nallely-vazquez-martinez",
    nombre: "Nallely Vazquez Martinez",
    grado: "Dra.",
    nombreCompleto: "Dra. Nallely Vazquez Martinez",
    area: "UAGro-CA-227",
    linea: "Educacion virtual y responsabilidad social",
    foto: "/assets/profesores/nallely-vazquez-martinez.jpg",
    semblanza:
      "Doctora en Direccion de Organizaciones por la UPAEP. Perfil PRODEP e integrante del cuerpo academico UAGro-CA-227.",
    historialAcademico: [
      "Ultimo grado (PDF NA): Doctora en direccion de organizaciones - UPAEP",
      "Cuerpo academico (PDF NA): UAGro-CA-227 Educacion virtual y responsabilidad social",
      "Red de colaboracion (PDF NA): Red Nacional de Productividad, Innovacion y Competitividad Empresarial",
    ],
    publicaciones: [
      {
        titulo: "Linea de publicacion sobre responsabilidad social corporativa y emprendimiento universitario",
        anio: "2024",
        tipo: "Publicacion conjunta",
      },
    ],
  }
];

export const getProfesorBySlug = (slug: string): Profesor | undefined => {
  return profesores.find((p) => p.slug === slug);
};
