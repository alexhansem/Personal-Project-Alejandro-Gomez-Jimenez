/**
 * Moldes visuales replicables.
 *
 * Cada molde se dibuja solo a partir de una ficha de datos. Para un proyecto
 * nuevo se rellena una ficha en `src/visual/fichas/` (ver `_PLANTILLA.ts.txt`)
 * y no hay que diseñar nada otra vez.
 *
 * Regla: todo dato sale de una lámina del proyecto y lleva su `fuente`.
 * Si un dato no consta, no se dibuja (o se dibuja como línea) y se dice en `notas`.
 */

/** Rango horizontal en metros, medido desde el primer eje. */
export type Tramo = [number, number];

/* ------------------------------------------------------------------ */
/* Molde «Sección viva» (con montaje por orden de obra)                */
/* ------------------------------------------------------------------ */

export type CapaSeccion =
  | 'reticula'
  | 'pilares'
  | 'forjados'
  | 'petos'
  | 'fondo'
  | 'cerramientos'
  | 'detalle'
  | 'vacios';

export interface SeccionViva {
  titulo: string;
  /** Qué lámina o enunciado respalda los datos. */
  fuente: string;
  ejes: { nombre: string; x: number }[];
  /** Cotas de nivel en metros (±0,00 = planta baja). */
  niveles: { cota: number; etiqueta: string }[];
  pilares?: { x: number[]; ancho: number; hasta: number; etiqueta: string };
  /** Forjados cortados. Si el canto no consta, se dibujan como línea. */
  forjados?: { cota: number; tramos: Tramo[] }[];
  forjadoEtiqueta?: string;
  petos?: { tramo: Tramo; cota: number; alto: number }[];
  cerramientos?: { tramo: Tramo; desde: number; hasta: number }[];
  /** Volúmenes vistos al fondo, no cortados (línea discontinua). */
  fondo?: { tramo: Tramo; desde: number; hasta: number; etiqueta: string }[];
  /** Huecos abiertos (patios). */
  vacios?: {
    tramo: Tramo;
    etiqueta: string;
    cota?: string;
    vegetacion?: { tipo: 'bambu'; alturaMax: number };
  }[];
  /** Detalle constructivo que se abre con una lupa en una fachada. */
  detalle?: {
    titulo: string;
    fuente: string;
    /** Punto de la sección donde se coloca la lupa. */
    en: { x: number; cota: number };
    /** Capas de interior a exterior, espesor en cm. */
    capas: { nombre: string; cm: number; destacar?: boolean; hueco?: boolean }[];
  };
  /** Orden de montaje al hacer scroll. Cada paso añade capas. */
  pasos: { titulo: string; capas: CapaSeccion[] }[];
  notas?: string[];
}

/* ------------------------------------------------------------------ */
/* Molde «Radiografía»                                                 */
/* ------------------------------------------------------------------ */

/** Máscaras PNG (alfa) generadas con tools/visual/mascaras.py. */
export interface Mascaras {
  /** Líneas oscuras del plano → color de texto. */
  lineas: string;
  /** Elementos en color frío (tramas, carpinterías) → azul apagado. */
  frio?: string;
  /** Elementos en color cálido (lo que se quiere resaltar) → naranja. */
  calido?: string;
  /** Proporción ancho/alto del recorte. */
  ratio: number;
}

export interface Radiografia {
  etiqueta: string;
  pregunta: string;
  /** Parte de la pregunta en naranja. */
  preguntaResaltada?: string;
  cifra: string;
  cifraTexto: string;
  texto: string;
  aviso: string;
  fuente: string;
  plano: Mascaras & { pie: string };
  /** Gráfico alineado debajo del plano (mismo eje x). */
  grafico?: Mascaras & {
    pie: string;
    /** Alineación del plano sobre el gráfico, en fracción del ancho del gráfico. */
    planoIzquierda: number;
    planoAncho: number;
  };
}

/* ------------------------------------------------------------------ */
/* Molde «Plantas apiladas»                                            */
/* ------------------------------------------------------------------ */

export interface PlantasApiladas {
  /** Proporción ancho/alto de las máscaras de planta. */
  ratio: number;
  plantas: { mascara: string; nombre: string; dato: string }[];
  /** Zona destacada (patio). Porcentajes sobre la planta. */
  destacado?: {
    left: number;
    top: number;
    width: number;
    height: number;
    nombre: string;
    medida: string;
    vegetacion?: 'bambu';
  };
  fuente: string;
}

/* ------------------------------------------------------------------ */
/* Molde «Expediente»                                                  */
/* ------------------------------------------------------------------ */

export interface Expediente {
  cajetin: { clave: string; valor: string }[];
  hoja: string;
  pregunta: string;
  preguntaResaltada?: string;
  entradilla: string;
  hojas: {
    n: string;
    titulo: string;
    dato: string;
    imagen?: string;
    alt?: string;
    pie?: string;
  }[];
  /** Índice de la hoja abierta al cargar. */
  activa: number;
  sello?: { texto: string; firma: string };
  presupuesto?: {
    titulo: string;
    capitulos: { nombre: string; importe: number }[];
    /** Cuántos capítulos se muestran; el resto se agrupa. */
    mostrar: number;
  };
  notas?: string[];
}

/* ------------------------------------------------------------------ */
/* Molde «Modelo 3D en líneas»                                         */
/* ------------------------------------------------------------------ */

export interface ModeloLineas {
  glb: string;
  /** Ángulo de las aristas que se dibujan (grados). */
  angulo?: number;
  /** Posición de cámara relativa al tamaño del modelo. */
  camara?: [number, number, number];
  pie: string;
  descarga?: { etiqueta: string; src: string };
}

/* ------------------------------------------------------------------ */
/* Ficha de un proyecto                                                */
/* ------------------------------------------------------------------ */

export interface FichaVisual {
  proyecto: string;
  nombre: string;
  seccion?: SeccionViva;
  radiografia?: Radiografia;
  apiladas?: PlantasApiladas;
  expediente?: Expediente;
  modelo?: ModeloLineas;
}
