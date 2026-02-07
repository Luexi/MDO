export interface InstitucionConvenio {
  id: string;
  nombre: string;
  tipo: "universidad" | "gobierno" | "empresa" | "organismo";
  pais?: string;
}

export const institucionesConvenio: InstitucionConvenio[] = [
  { id: "1", nombre: "Universidad Nacional Autónoma de México (UNAM)", tipo: "universidad", pais: "México" },
  { id: "2", nombre: "Instituto Politécnico Nacional (IPN)", tipo: "universidad", pais: "México" },
  { id: "3", nombre: "Universidad Autónoma Metropolitana (UAM)", tipo: "universidad", pais: "México" },
  { id: "4", nombre: "Instituto Tecnológico de Monterrey (ITESM)", tipo: "universidad", pais: "México" },
  { id: "5", nombre: "Universidad de Guadalajara", tipo: "universidad", pais: "México" },
  { id: "6", nombre: "Benemérita Universidad Autónoma de Puebla (BUAP)", tipo: "universidad", pais: "México" },
  { id: "7", nombre: "Universidad Veracruzana", tipo: "universidad", pais: "México" },
  { id: "8", nombre: "El Colegio de México (COLMEX)", tipo: "universidad", pais: "México" },
  { id: "9", nombre: "Universidad de La Habana", tipo: "universidad", pais: "Cuba" },
  { id: "10", nombre: "Universidad de Buenos Aires", tipo: "universidad", pais: "Argentina" },
  { id: "11", nombre: "Gobierno del Estado de Guerrero", tipo: "gobierno", pais: "México" },
  { id: "12", nombre: "Secretaría de Turismo de Guerrero", tipo: "gobierno", pais: "México" },
  { id: "13", nombre: "Cámara Nacional de Comercio (CANACO) Acapulco", tipo: "organismo", pais: "México" },
  { id: "14", nombre: "Consejo Coordinador Empresarial de Guerrero", tipo: "organismo", pais: "México" },
];

export const mecanismosVinculacion = [
  {
    titulo: "Convenios de Colaboración",
    descripcion: "Acuerdos formales con instituciones nacionales e internacionales para el intercambio académico, investigación conjunta y desarrollo de proyectos."
  },
  {
    titulo: "Movilidad Estudiantil",
    descripcion: "Programas de intercambio que permiten a estudiantes realizar estancias en universidades nacionales y extranjeras."
  },
  {
    titulo: "Estancias de Investigación",
    descripcion: "Oportunidades para que estudiantes y profesores realicen estancias en centros de investigación y empresas."
  },
  {
    titulo: "Eventos Académicos",
    descripcion: "Organización de congresos, seminarios y coloquios con participación de expertos nacionales e internacionales."
  },
  {
    titulo: "Proyectos de Consultoría",
    descripcion: "Colaboración con organizaciones públicas y privadas para el desarrollo de proyectos de mejora organizacional."
  }
];
