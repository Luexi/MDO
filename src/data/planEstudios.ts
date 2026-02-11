export interface PlanAreaItem {
  area: string;
  unidades: string[];
}

export interface PlanSemestreRow {
  unidad: string;
  th: number;
  totalCred: number;
}

export interface PlanSemestre {
  semestre: string;
  rows: PlanSemestreRow[];
  totalTh: number;
  totalCred: number;
}

export interface PlanOptativa {
  unidad: string;
  th: number;
  totalCred: number;
}

export const planPorArea: PlanAreaItem[] = [
  {
    area: "Área de formación básica",
    unidades: [
      "Dirección y liderazgo organizacional",
      "Diseño organizacional",
      "Mercadotecnia",
    ],
  },
  {
    area: "Área metodológica",
    unidades: [
      "Métodos y procesos administrativos",
      "Optativa I",
      "Optativa II",
      "Optativa III",
    ],
  },
  {
    area: "Área de desarrollo profesionalizante",
    unidades: [
      "Retribución social",
      "Trabajo de Grado I",
      "Trabajo de Grado II",
      "Trabajo de Grado III",
      "Trabajo de Grado IV",
      "Estancia profesional I",
      "Estancia profesional II",
    ],
  },
];

export const planPorSemestre: PlanSemestre[] = [
  {
    semestre: "I",
    rows: [
      { unidad: "Dirección y liderazgo organizacional", th: 8, totalCred: 8 },
      { unidad: "Diseño organizacional", th: 8, totalCred: 8 },
      { unidad: "Mercadotecnia", th: 8, totalCred: 8 },
      { unidad: "Trabajo de Grado I", th: 8, totalCred: 8 },
    ],
    totalTh: 32,
    totalCred: 32,
  },
  {
    semestre: "II",
    rows: [
      { unidad: "Métodos y procesos administrativos", th: 8, totalCred: 8 },
      { unidad: "Optativa I", th: 8, totalCred: 8 },
      { unidad: "Estancia profesional I", th: 42, totalCred: 18 },
      { unidad: "Trabajo de Grado II", th: 8, totalCred: 8 },
    ],
    totalTh: 66,
    totalCred: 42,
  },
  {
    semestre: "III",
    rows: [
      { unidad: "Optativa II", th: 8, totalCred: 8 },
      { unidad: "Estancia profesional II", th: 42, totalCred: 18 },
      { unidad: "Trabajo de Grado III", th: 8, totalCred: 8 },
    ],
    totalTh: 58,
    totalCred: 34,
  },
  {
    semestre: "IV",
    rows: [
      { unidad: "Optativa III", th: 8, totalCred: 8 },
      { unidad: "Trabajo de Grado IV", th: 8, totalCred: 8 },
      { unidad: "Retribución social", th: 42, totalCred: 18 },
    ],
    totalTh: 58,
    totalCred: 34,
  },
];

export const planOptativas: PlanOptativa[] = [
  { unidad: "Ética y responsabilidad social", th: 8, totalCred: 8 },
  { unidad: "Gestión del capital humano", th: 8, totalCred: 8 },
  { unidad: "Economía y entorno global", th: 8, totalCred: 8 },
  { unidad: "Desarrollo y sustentabilidad", th: 8, totalCred: 8 },
  { unidad: "Emprendimiento", th: 8, totalCred: 8 },
  { unidad: "Cultura y clima organizacional", th: 8, totalCred: 8 },
  { unidad: "Cultura tributaria", th: 8, totalCred: 8 },
];
