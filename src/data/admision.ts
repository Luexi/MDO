/**
 * Datos del proceso de admision. Fuente unica para la portada y para
 * /convocatoria.
 *
 * Antes vivian dentro del frontmatter de `convocatoria.astro`, asi que la
 * portada no podia mostrar ni una fecha ni un requisito y el aspirante tenia
 * que navegar para encontrar lo unico que venia a buscar.
 *
 * IMPORTANTE: aqui solo se registran hechos verificables del programa. Los
 * datos que la coordinacion aun no ha proporcionado (costos y sede de entrega
 * de documentos) NO se inventan: se enrutan al contacto oficial.
 */

/**
 * ATENCION: EL CALENDARIO DE ABAJO NO COINCIDE CON EL CARTEL OFICIAL.
 *
 * `public/convocatoria.webp` es el documento rector publicado por el programa
 * y registra estas fechas para la generacion que inicio en febrero de 2026:
 *
 *   Pre-registro y entrega de fichas    20 al 30 de octubre de 2025
 *   Aplicacion del EXANI-III            15 de noviembre de 2025
 *   Curso propedeutico                  22 y 29 de noviembre de 2025
 *   Entrevistas                         24 al 26 de noviembre de 2025
 *   Publicacion de lista de aceptados   15 de diciembre de 2025
 *   Periodo de inscripciones            19 al 23 de enero de 2026
 *   Inicio de cursos                    febrero de 2026 (modalidad escolarizada)
 *
 * El cartel documenta ademas la ponderacion de seleccion, que el sitio no
 * publica en texto: EXANI-III 20%, entrevistas 25%, curso propedeutico 25%,
 * curriculo academico y profesional 30%.
 *
 * Las fechas del array son las que ya estaban en el sitio antes de esta
 * revision y se conservan sin modificar, porque corregirlas exige saber si
 * existe una convocatoria nueva. Mientras tanto NINGUNA etapa se marca como
 * vigente, para no afirmar en portada algo que el propio cartel contradice.
 *
 * Al confirmar el calendario correcto: actualiza el array, marca `activo: true`
 * en la etapa que corresponda y sustituye `public/convocatoria.webp`.
 */

export interface HitoCalendario {
  fecha: string;
  evento: string;
  descripcion: string;
  /**
   * Marca la etapa vigente del proceso. Como maximo una debe estar activa.
   * Si ninguna lo esta, la portada omite el bloque de etapa vigente en lugar
   * de inventar una.
   */
  activo: boolean;
}

export interface PasoAdmision {
  numero: number;
  titulo: string;
  descripcion: string;
  icono: string;
}

export interface PreguntaFrecuente {
  pregunta: string;
  respuesta: string;
}

export const calendarioAdmision: HitoCalendario[] = [
  {
    fecha: "Enero a marzo de 2026",
    evento: "Publicación de convocatoria y registro de aspirantes",
    descripcion: "Apertura del proceso de admisión y recepción de documentos.",
    activo: false,
  },
  {
    fecha: "Abril de 2026",
    evento: "Examen EXANI-III (Ceneval)",
    descripcion: "Aplicación del examen nacional de ingreso al posgrado.",
    activo: false,
  },
  {
    fecha: "Mayo de 2026",
    evento: "Publicación de resultados",
    descripcion: "Difusión de la lista de aspirantes aceptados.",
    activo: false,
  },
  {
    fecha: "Agosto de 2026",
    evento: "Inicio de cursos",
    descripcion: "Bienvenida e inicio del primer semestre.",
    activo: false,
  },
];

/**
 * La etapa vigente del proceso, o `undefined` si ninguna esta marcada.
 *
 * Devolver `undefined` en vez de caer al primer hito es deliberado: sin dato
 * confirmado, la portada prefiere no decir nada antes que senalar como vigente
 * una etapa que ya paso.
 */
export const etapaVigente: HitoCalendario | undefined =
  calendarioAdmision.find((hito) => hito.activo);

export const pasosAdmision: PasoAdmision[] = [
  {
    numero: 1,
    titulo: "Revisa requisitos y reúne documentos",
    descripcion:
      "Confirma que cumples el perfil de ingreso y prepara los nueve documentos que pide la convocatoria.",
    icono: "ClipboardCheck",
  },
  {
    numero: 2,
    titulo: "Regístrate y presenta el EXANI-III",
    descripcion:
      "El registro abre de enero a marzo de 2026. El examen se aplica en abril.",
    icono: "PenLine",
  },
  {
    numero: 3,
    titulo: "Consulta resultados e inscríbete",
    descripcion:
      "Los resultados se publican en mayo de 2026 y los cursos inician en agosto.",
    icono: "GraduationCap",
  },
];

export const requisitosAdmision: string[] = [
  "Título de licenciatura en áreas afines (original y copia)",
  "Certificado de calificaciones con promedio mínimo de 8.0",
  "Acta de nacimiento (original y copia)",
  "CURP ampliada",
  "Carta de exposición de motivos",
  "Curriculum vitae actualizado",
  "2 cartas de recomendación académica",
  "Fotografías tamaño infantil (4 a color)",
  "Comprobante de pago de derechos",
];

export const preguntasFrecuentes: PreguntaFrecuente[] = [
  {
    pregunta: "¿Quién puede postular al programa?",
    respuesta:
      "Egresadas y egresados de licenciaturas afines: administración, economía, contaduría, mercadotecnia, turismo y áreas relacionadas. La convocatoria pide un promedio mínimo de 8.0 en el certificado de calificaciones.",
  },
  {
    pregunta: "¿Qué es el EXANI-III?",
    respuesta:
      "Es el examen nacional de ingreso al posgrado que aplica el Ceneval y que la convocatoria exige como parte del proceso de admisión. Se aplica en abril de 2026.",
  },
  {
    pregunta: "¿Ser admitido garantiza una beca?",
    respuesta:
      "No. La admisión al programa y la asignación de beca son procesos distintos. Las becas las otorga SECIHTI de acuerdo con el presupuesto del ejercicio fiscal correspondiente.",
  },
  {
    pregunta: "¿Cuándo inician las clases?",
    respuesta:
      "El primer semestre inicia en agosto de 2026, después de la publicación de resultados en mayo.",
  },
  {
    pregunta: "¿Dónde se imparte la maestría?",
    respuesta:
      "En la Facultad de Contaduría y Administración de la Universidad Autónoma de Guerrero, en Ciudad Universitaria, Chilpancingo.",
  },
  {
    pregunta: "¿Cuánto cuesta el programa?",
    respuesta:
      "Las cuotas vigentes las determina la Universidad para cada ciclo escolar. Escribe o llama a la coordinación del programa para confirmar el monto aplicable a la generación 2026.",
  },
  {
    pregunta: "¿Dónde entrego mi documentación?",
    respuesta:
      "La recepción de documentos se realiza a través de la coordinación del programa durante el periodo de registro. Contacta a la coordinación para confirmar sede, horario y modalidad de entrega.",
  },
];
