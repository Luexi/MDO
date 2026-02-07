export interface Instalacion {
  id: string;
  nombre: string;
  cantidad: number;
  descripcion: string;
  icono: string;
}

export const instalaciones: Instalacion[] = [
  {
    id: "aulas",
    nombre: "Aulas",
    cantidad: 8,
    descripcion: "Aulas equipadas con tecnología audiovisual y mobiliario ergonómico",
    icono: "Building2"
  },
  {
    id: "salas-computo",
    nombre: "Salas de Cómputo",
    cantidad: 3,
    descripcion: "Laboratorios con equipos de última generación y acceso a internet de alta velocidad",
    icono: "Monitor"
  },
  {
    id: "cubiculos",
    nombre: "Cubículos",
    cantidad: 12,
    descripcion: "Espacios privados para asesorías y trabajo de investigación",
    icono: "Users"
  },
  {
    id: "auditorios",
    nombre: "Auditorios",
    cantidad: 2,
    descripcion: "Auditorios con capacidad para 100 personas cada uno",
    icono: "Presentation"
  },
  {
    id: "salas-videoconferencia",
    nombre: "Salas de Videoconferencia",
    cantidad: 2,
    descripcion: "Equipadas para sesiones virtuales y eventos híbridos",
    icono: "Video"
  },
  {
    id: "bibliotecas",
    nombre: "Bibliotecas Especializadas",
    cantidad: 2,
    descripcion: "Acervo especializado en administración, economía y ciencias sociales",
    icono: "Library"
  },
  {
    id: "cafeterias",
    nombre: "Cafeterías",
    cantidad: 2,
    descripcion: "Espacios de convivencia con servicios de alimentos",
    icono: "Coffee"
  },
  {
    id: "sanitarios",
    nombre: "Sanitarios",
    cantidad: 3,
    descripcion: "Instalaciones sanitarias por género en cada edificio",
    icono: "Bath"
  },
  {
    id: "areas-verdes",
    nombre: "Áreas Verdes",
    cantidad: 7,
    descripcion: "Espacios al aire libre para estudio y recreación",
    icono: "Trees"
  }
];
