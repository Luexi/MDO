/**
 * Datos del proceso de admision. Fuente unica para la portada y para
 * /convocatoria.
 *
 * FUENTE RECTORA: `public/convocatoria.webp`, el cartel oficial publicado por
 * el programa. Si algo de este archivo difiere del cartel, gana el cartel. Es
 * la misma regla que el proyecto aplica al nucleo academico con su PDF.
 *
 * Al publicar una convocatoria nueva: sustituye la imagen, actualiza este
 * archivo contra ella y revisa `convocatoriaVigente`.
 */

export interface HitoCalendario {
  fecha: string;
  evento: string;
  descripcion: string;
  /**
   * Marca la etapa en curso. Como maximo una debe estar activa.
   * Si ninguna lo esta, la portada omite el bloque de etapa vigente en lugar
   * de senalar una etapa que ya paso.
   */
  activo: boolean;
}

export interface CriterioSeleccion {
  criterio: string;
  ponderacion: number;
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

/**
 * Estado de la convocatoria publicada en el cartel.
 *
 * La convocatoria para la generacion febrero de 2027 ya esta publicada. El
 * pre-registro comienza el 19 de octubre de 2026, por lo que todavia no hay una
 * etapa vigente que deba destacarse en la portada.
 */
export const convocatoriaVigente = {
  generacion: "Generación febrero 2027",
  modalidad: "Escolarizada",
  cerrada: false,
  nota: "La convocatoria para la generación febrero de 2027 está publicada. El pre-registro inicia el 19 de octubre de 2026.",
} as const;

/** Perfil de aspirante al que se dirige la convocatoria, segun el cartel. */
export const dirigidoA =
  "Personas egresadas en contaduría, administración, turismo, economía, mercadotecnia y áreas disciplinares afines, con disposición para el trabajo colaborativo, la investigación aplicada y la solución de problemas organizacionales, alto sentido ético y responsabilidad social.";

/** Calendario tal como aparece en el cartel oficial. */
export const calendarioAdmision: HitoCalendario[] = [
  {
    fecha: "19 al 30 de octubre de 2026",
    evento: "Pre-registro, registro electrónico y entrega de fichas",
    descripcion: "Apertura del proceso y recepción de documentación.",
    activo: false,
  },
  {
    fecha: "14 de noviembre de 2026",
    evento: "Aplicación del examen EXANI-III",
    descripcion: "Examen nacional de ingreso al posgrado, aplicado por el Ceneval.",
    activo: false,
  },
  {
    fecha: "21 y 28 de noviembre de 2026",
    evento: "Curso propedéutico",
    descripcion: "Sesiones de nivelación previas a la selección.",
    activo: false,
  },
  {
    fecha: "25 al 27 de noviembre de 2026",
    evento: "Entrevistas",
    descripcion: "Entrevistas de los aspirantes con el comité de selección.",
    activo: false,
  },
  {
    fecha: "11 de diciembre de 2026",
    evento: "Consulta de resultados y aspirantes aceptados",
    descripcion: "Difusión de resultados del proceso de selección.",
    activo: false,
  },
  {
    fecha: "18 al 22 de enero de 2027",
    evento: "Periodo de inscripciones",
    descripcion: "Inscripción de las personas aceptadas al programa.",
    activo: false,
  },
];

/**
 * La etapa en curso, o `undefined` si ninguna esta marcada.
 *
 * Devolver `undefined` en vez de caer al primer hito es deliberado: sin etapa
 * en curso, la portada prefiere no decir nada antes que senalar una que ya paso.
 */
export const etapaVigente: HitoCalendario | undefined =
  calendarioAdmision.find((hito) => hito.activo);

/**
 * Ponderacion del proceso de seleccion, segun el cartel.
 *
 * Este dato solo existia dentro de la imagen, donde es ilegible en movil y no
 * lo alcanza un lector de pantalla. Es de los primeros que consulta un
 * aspirante para saber donde jugarse el ingreso.
 */
export const criteriosSeleccion: CriterioSeleccion[] = [
  { criterio: "Examen EXANI-III", ponderacion: 20 },
  {
    criterio: "Conocimientos en metodología de investigación (curso propedéutico)",
    ponderacion: 30,
  },
  { criterio: "Entrevista", ponderacion: 30 },
  { criterio: "Currículo profesional", ponderacion: 20 },
];

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
      "El pre-registro incluye la entrega de fichas. Después se aplica el examen nacional de ingreso al posgrado.",
    icono: "PenLine",
  },
  {
    numero: 3,
    titulo: "Curso propedéutico, entrevista e inscripción",
    descripcion:
      "La selección pondera el EXANI-III, los conocimientos en metodología de investigación, la entrevista y el currículo profesional. Las personas aceptadas se inscriben antes del inicio de cursos.",
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
      "Personas egresadas en contaduría, administración, turismo, economía, mercadotecnia y áreas disciplinares afines. Se requiere un promedio mínimo de 8.0 en el certificado de calificaciones.",
  },
  {
    pregunta: "¿Cuál es la modalidad del programa?",
    respuesta:
      "Escolarizada, según lo indica la convocatoria oficial. Para conocer horarios y sedes de clase, contacta a la coordinación.",
  },
  {
    pregunta: "¿Cómo se selecciona a los aspirantes?",
    respuesta:
      "La selección se pondera así: examen EXANI-III 20%, conocimientos en metodología de investigación (curso propedéutico) 30%, entrevista 30% y currículo profesional 20%.",
  },
  {
    pregunta: "¿Qué es el EXANI-III?",
    respuesta:
      "Es el examen nacional de ingreso al posgrado que aplica el Ceneval y que la convocatoria exige como parte del proceso de selección.",
  },
  {
    pregunta: "¿Ser admitido garantiza una beca?",
    respuesta:
      "No. La admisión al programa y la asignación de beca son procesos distintos. Las becas las otorga SECIHTI de acuerdo con el presupuesto del ejercicio fiscal correspondiente.",
  },
  {
    pregunta: "¿Cuándo inicia el proceso de admisión?",
    respuesta:
      "El pre-registro, registro electrónico y entrega de fichas se realizarán del 19 al 30 de octubre de 2026. El periodo de inscripción para las personas aceptadas será del 18 al 22 de enero de 2027.",
  },
  {
    pregunta: "¿Cuánto cuesta el programa?",
    respuesta:
      "Las cuotas vigentes las determina la Universidad para cada ciclo escolar. Escribe o llama a la coordinación del programa para confirmar el monto aplicable.",
  },
  {
    pregunta: "¿Dónde entrego mi documentación?",
    respuesta:
      "La recepción de documentos se realiza a través de la coordinación del programa durante el periodo de registro. Contacta a la coordinación para confirmar sede, horario y modalidad de entrega.",
  },
];
