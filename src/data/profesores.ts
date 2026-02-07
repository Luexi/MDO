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
    año: string;
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
    area: "Dirección Estratégica",
    linea: "Gestión y desarrollo empresarial",
    email: "rhernandez@uagro.mx",
    semblanza: "Doctor en Ciencias de la Administración con amplia experiencia en investigación y docencia en el área de dirección de organizaciones. Ha participado en proyectos de consultoría para empresas del sector público y privado.",
    historialAcademico: [
      "Doctorado en Ciencias de la Administración - UNAM",
      "Maestría en Administración - UAGro",
      "Licenciatura en Administración de Empresas - UAGro"
    ],
    publicaciones: [
      { titulo: "Estrategias de gestión para PYMES en Guerrero", año: "2024", tipo: "Artículo" },
      { titulo: "Innovación organizacional en contextos emergentes", año: "2023", tipo: "Capítulo de libro" }
    ]
  },
  {
    id: "2",
    slug: "david-antonio-reyes-pena",
    nombre: "David Antonio Reyes Peña",
    grado: "Dr.",
    nombreCompleto: "Dr. David Antonio Reyes Peña",
    area: "Finanzas Corporativas",
    linea: "Gestión y desarrollo empresarial",
    semblanza: "Especialista en finanzas corporativas y análisis financiero. Ha desarrollado investigaciones sobre el impacto financiero en organizaciones regionales.",
    historialAcademico: [
      "Doctorado en Ciencias Administrativas - IPN",
      "Maestría en Finanzas - ITESM",
      "Licenciatura en Contaduría Pública - UAGro"
    ],
    publicaciones: [
      { titulo: "Análisis financiero en empresas guerrerenses", año: "2024", tipo: "Artículo" }
    ]
  },
  {
    id: "3",
    slug: "jose-luis-susano-garcia",
    nombre: "José Luis Susano García",
    grado: "Dr.",
    nombreCompleto: "Dr. José Luis Susano García",
    area: "Gestión Pública",
    linea: "Procesos de gestión y calidad en organizaciones",
    semblanza: "Investigador en el área de gestión pública y políticas organizacionales. Cuenta con experiencia en el sector gubernamental.",
    historialAcademico: [
      "Doctorado en Administración Pública - INAP",
      "Maestría en Gestión Pública - CIDE",
      "Licenciatura en Ciencias Políticas - UNAM"
    ],
    publicaciones: []
  },
  {
    id: "4",
    slug: "irma-amalia-mendez-castrejon",
    nombre: "Irma Amalia Méndez Castrejón",
    grado: "Dra.",
    nombreCompleto: "Dra. Irma Amalia Méndez Castrejón",
    area: "Recursos Humanos",
    linea: "Gestión y desarrollo empresarial",
    semblanza: "Doctora con especialización en gestión del talento humano y desarrollo organizacional. Ha liderado proyectos de capacitación en diversas instituciones.",
    historialAcademico: [
      "Doctorado en Ciencias Administrativas - UNAM",
      "Maestría en Desarrollo Organizacional - UVM",
      "Licenciatura en Psicología Organizacional - UAGro"
    ],
    publicaciones: [
      { titulo: "Gestión del talento en organizaciones educativas", año: "2023", tipo: "Artículo" }
    ]
  },
  {
    id: "5",
    slug: "evelyn-janet-zavaleta-carbajal",
    nombre: "Evelyn Janet Zavaleta Carbajal",
    grado: "Dra.",
    nombreCompleto: "Dra. Evelyn Janet Zavaleta Carbajal",
    area: "Mercadotecnia Estratégica",
    linea: "Gestión y desarrollo empresarial",
    semblanza: "Especialista en estrategias de mercadotecnia y comportamiento del consumidor. Investigadora activa en temas de innovación comercial.",
    historialAcademico: [
      "Doctorado en Ciencias de la Administración - UAGro",
      "Maestría en Mercadotecnia - ITESM",
      "Licenciatura en Mercadotecnia - UAGro"
    ],
    publicaciones: []
  },
  {
    id: "6",
    slug: "yanira-gallardo-moreno",
    nombre: "Yanira Gallardo Moreno",
    grado: "Dra.",
    nombreCompleto: "Dra. Yanira Gallardo Moreno",
    area: "Administración de Operaciones",
    linea: "Procesos de gestión y calidad en organizaciones",
    semblanza: "Doctora en Ciencias Administrativas con enfoque en optimización de procesos y gestión de la calidad en organizaciones.",
    historialAcademico: [
      "Doctorado en Ciencias Administrativas - IPN",
      "Maestría en Ingeniería Industrial - UNAM",
      "Licenciatura en Ingeniería Industrial - UAGro"
    ],
    publicaciones: [
      { titulo: "Mejora continua en PYMES manufactureras", año: "2024", tipo: "Artículo" }
    ]
  },
  {
    id: "7",
    slug: "adriana-miranda-esteban",
    nombre: "Adriana Miranda Esteban",
    grado: "Dra.",
    nombreCompleto: "Dra. Adriana Miranda Esteban",
    area: "Comportamiento Organizacional",
    linea: "Gestión y desarrollo empresarial",
    semblanza: "Investigadora en comportamiento organizacional y liderazgo. Ha colaborado en proyectos de transformación cultural en instituciones públicas.",
    historialAcademico: [
      "Doctorado en Psicología Organizacional - UNAM",
      "Maestría en Desarrollo Humano - UIA",
      "Licenciatura en Psicología - UAGro"
    ],
    publicaciones: []
  },
  {
    id: "8",
    slug: "tania-de-jesus-adame-zambrano",
    nombre: "Tania de Jesús Adame Zambrano",
    grado: "Dra.",
    nombreCompleto: "Dra. Tania de Jesús Adame Zambrano",
    area: "Gestión de la Innovación",
    linea: "Gestión y desarrollo empresarial",
    semblanza: "Especialista en gestión de la innovación y emprendimiento. Ha asesorado startups y proyectos de base tecnológica.",
    historialAcademico: [
      "Doctorado en Ciencias de la Administración - UAGro",
      "Maestría en Innovación Empresarial - ITESM",
      "Licenciatura en Administración - UAGro"
    ],
    publicaciones: [
      { titulo: "Ecosistemas de innovación en regiones emergentes", año: "2023", tipo: "Capítulo de libro" }
    ]
  },
  {
    id: "9",
    slug: "justino-arziga-castanon",
    nombre: "Justino Arziga Castañón",
    grado: "Dr.",
    nombreCompleto: "Dr. Justino Arziga Castañón",
    area: "Economía y Finanzas",
    linea: "Gestión y desarrollo empresarial",
    semblanza: "Doctor en Economía con experiencia en análisis macroeconómico y su impacto en las organizaciones empresariales.",
    historialAcademico: [
      "Doctorado en Economía - UNAM",
      "Maestría en Economía Aplicada - COLMEX",
      "Licenciatura en Economía - UAGro"
    ],
    publicaciones: []
  },
  {
    id: "10",
    slug: "jose-hugo-vazquez-mendoza",
    nombre: "José Hugo Vázquez Mendoza",
    grado: "Dr.",
    nombreCompleto: "Dr. José Hugo Vázquez Mendoza",
    area: "Sistemas de Información",
    linea: "Procesos de gestión y calidad en organizaciones",
    semblanza: "Investigador en sistemas de información gerencial y transformación digital de las organizaciones.",
    historialAcademico: [
      "Doctorado en Sistemas Computacionales - IPN",
      "Maestría en Tecnologías de la Información - ITESM",
      "Licenciatura en Informática - UAGro"
    ],
    publicaciones: [
      { titulo: "Transformación digital en el sector público", año: "2024", tipo: "Artículo" }
    ]
  },
  {
    id: "11",
    slug: "nallely-vazquez-martinez",
    nombre: "Nallely Vázquez Martínez",
    grado: "Dra.",
    nombreCompleto: "Dra. Nallely Vázquez Martínez",
    area: "Contabilidad y Auditoría",
    linea: "Procesos de gestión y calidad en organizaciones",
    semblanza: "Especialista en contabilidad gerencial y auditoría. Ha participado en proyectos de mejora de controles internos.",
    historialAcademico: [
      "Doctorado en Ciencias Contables - UNAM",
      "Maestría en Auditoría - IPN",
      "Licenciatura en Contaduría - UAGro"
    ],
    publicaciones: []
  },
  {
    id: "12",
    slug: "gabriela-del-carmen-rivero-solana",
    nombre: "Gabriela del Carmen Rivero Solana",
    grado: "Dra.",
    nombreCompleto: "Dra. Gabriela del Carmen Rivero Solana",
    area: "Desarrollo Sustentable",
    linea: "Gestión y desarrollo empresarial",
    semblanza: "Investigadora en sustentabilidad organizacional y responsabilidad social empresarial. Ha liderado proyectos de impacto ambiental.",
    historialAcademico: [
      "Doctorado en Desarrollo Sustentable - UNAM",
      "Maestría en Gestión Ambiental - UAGro",
      "Licenciatura en Biología - UAGro"
    ],
    publicaciones: [
      { titulo: "RSE en empresas turísticas de Guerrero", año: "2023", tipo: "Artículo" }
    ]
  },
  {
    id: "13",
    slug: "rosa-alejandra-vazquez-martinez",
    nombre: "Rosa Alejandra Vázquez Martínez",
    grado: "Dra.",
    nombreCompleto: "Dra. Rosa Alejandra Vázquez Martínez",
    area: "Derecho Empresarial",
    linea: "Procesos de gestión y calidad en organizaciones",
    semblanza: "Doctora con especialización en derecho empresarial y normatividad organizacional. Asesora legal de empresas y organismos públicos.",
    historialAcademico: [
      "Doctorado en Derecho - UNAM",
      "Maestría en Derecho Corporativo - UP",
      "Licenciatura en Derecho - UAGro"
    ],
    publicaciones: []
  },
  {
    id: "14",
    slug: "citlalli-arroyo-rosas",
    nombre: "Citlalli Arroyo Rosas",
    grado: "Dra.",
    nombreCompleto: "Dra. Citlalli Arroyo Rosas",
    area: "Metodología de Investigación",
    linea: "Gestión y desarrollo empresarial",
    semblanza: "Especialista en metodología de investigación y análisis cuantitativo. Ha dirigido múltiples tesis de maestría y doctorado.",
    historialAcademico: [
      "Doctorado en Ciencias Sociales - UAGro",
      "Maestría en Metodología de la Ciencia - IPN",
      "Licenciatura en Sociología - UNAM"
    ],
    publicaciones: [
      { titulo: "Métodos mixtos en investigación organizacional", año: "2024", tipo: "Libro" }
    ]
  },
  {
    id: "15",
    slug: "liliana-galeana-camacho",
    nombre: "Liliana Galeana Camacho",
    grado: "Dra.",
    nombreCompleto: "Dra. Liliana Galeana Camacho",
    area: "Gestión del Conocimiento",
    linea: "Procesos de gestión y calidad en organizaciones",
    semblanza: "Investigadora en gestión del conocimiento y aprendizaje organizacional. Ha implementado sistemas de gestión en instituciones educativas.",
    historialAcademico: [
      "Doctorado en Ciencias de la Educación - UAGro",
      "Maestría en Gestión Educativa - UPN",
      "Licenciatura en Pedagogía - UNAM"
    ],
    publicaciones: []
  },
  {
    id: "16",
    slug: "remigio-marin-ibarra",
    nombre: "Remigio Marín Ibarra",
    grado: "Dr.",
    nombreCompleto: "Dr. Remigio Marín Ibarra",
    area: "Planeación Estratégica",
    linea: "Gestión y desarrollo empresarial",
    semblanza: "Doctor con amplia experiencia en planeación estratégica y desarrollo organizacional. Consultor en proyectos de transformación institucional.",
    historialAcademico: [
      "Doctorado en Ciencias Administrativas - UNAM",
      "Maestría en Alta Dirección - IPADE",
      "Licenciatura en Administración - UAGro"
    ],
    publicaciones: [
      { titulo: "Planeación estratégica en instituciones públicas", año: "2024", tipo: "Artículo" }
    ]
  }
];

export const getProfesorBySlug = (slug: string): Profesor | undefined => {
  return profesores.find(p => p.slug === slug);
};
