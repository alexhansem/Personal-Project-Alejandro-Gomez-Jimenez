/**
 * Modelo de datos del portfolio.
 *
 * Todo el contenido (perfil, proyectos, procesos y comparativas) se define con
 * estos tipos. Los componentes solo leen datos: para añadir un proyecto no hay
 * que tocar ningún componente.
 *
 * Casi todos los campos son opcionales. La interfaz solo muestra lo que existe,
 * sin etiquetas vacías.
 */

import type { CategoryId } from './categories';

/* ------------------------------------------------------------------ */
/* Procedencia de un dato                                              */
/* ------------------------------------------------------------------ */

/**
 * - `medido`: registrado con reloj o registro de tiempos real.
 * - `estimado`: aproximación razonada, no medida.
 * - `pendiente`: todavía no hay dato.
 */
export type Provenance = 'medido' | 'estimado' | 'pendiente';

export interface TimeValue {
  /** Minutos. Omitir si `provenance` es `pendiente`. */
  minutes?: number;
  provenance: Provenance;
  /** Cómo se obtuvo el dato (cronómetro, registro de horas, estimación…). */
  note?: string;
}

/* ------------------------------------------------------------------ */
/* Medios y documentos                                                 */
/* ------------------------------------------------------------------ */

export type MediaKind =
  | 'plano'
  | 'detalle'
  | 'captura'
  | 'modelo'
  | 'esquema'
  | 'tabla'
  | 'foto';

export interface MediaItem {
  /**
   * Ruta dentro de `public/`, por ejemplo `/proyectos/mi-proyecto/planta-baja.png`.
   * Si se omite, se dibuja un marcador de posición neutro.
   */
  src?: string;
  /** Texto alternativo obligatorio: describe lo que se ve. */
  alt: string;
  /** Pie de imagen (referencia, escala, fase…). */
  caption?: string;
  kind?: MediaKind;
  /** Proporción ancho/alto (ej. 1.414 para A-series apaisado). Evita saltos de maquetación. */
  ratio?: number;
  /** Imagen de comparación "antes" para el comparador de versiones. */
  compareWith?: { src: string; alt: string; label?: string };
  /** Etiqueta de la versión actual en el comparador. */
  label?: string;
}

export interface DocumentItem {
  /** Identificador usado en la URL del visor: `/proyectos/<slug>/documentos/<id>/`. */
  id: string;
  title: string;
  /** Ruta del PDF dentro de `public/`. */
  src: string;
  description?: string;
  pages?: number;
  /** Formato de hoja, ej. "A3", "A1". */
  sheet?: string;
}

export interface DataTable {
  title?: string;
  caption?: string;
  columns: string[];
  rows: (string | number)[][];
  /** Índices de columnas numéricas (se alinean a la derecha). */
  numeric?: number[];
  /** Fila de totales opcional. */
  footer?: (string | number)[];
}

export interface CodeSnippet {
  title?: string;
  /** Lenguaje para el resaltado: python, csharp, lisp, js, ts, json… */
  lang: string;
  code: string;
  /** Contexto: qué hace y dónde se usa. El código nunca va sin explicación. */
  description?: string;
}

/* ------------------------------------------------------------------ */
/* Comparativas de productividad                                       */
/* ------------------------------------------------------------------ */

export interface MethodRecord {
  /** Nombre del método, ej. "Delineación manual en AutoCAD". */
  label: string;
  description?: string;
  /** Tiempo de producción / generación. */
  generation: TimeValue;
  /** Tiempo de comprobación y corrección. */
  review: TimeValue;
  /**
   * Tiempo total medido directamente. Si se omite, se calcula como
   * generación + revisión (solo si ambos tienen valor).
   */
  total?: TimeValue;
  /** Número o tipo de correcciones necesarias. */
  corrections?: string;
  /** Intervención humana necesaria. */
  humanIntervention?: string;
}

export interface Comparison {
  /** Tarea concreta que se compara. */
  task: string;
  /** Método convencional de referencia. Si no existe, la comparación queda pendiente. */
  reference?: MethodRecord;
  /** Método de trabajo utilizado. */
  used: MethodRecord;
  deliverables?: string[];
  /** Calidad y utilidad del resultado. */
  quality?: string;
  observations?: string;
  limitations?: string[];
}

/* ------------------------------------------------------------------ */
/* Secuencia de trabajo (cómo se desarrolla el proyecto)               */
/* ------------------------------------------------------------------ */

/**
 * Quién ejecuta el paso:
 * - `ia`: lo produce un modelo de IA (Claude u otro) a partir de instrucciones.
 * - `humano`: criterio, decisión, revisión o corrección propia.
 * - `software`: herramienta especializada (AutoCAD, Revit, script…) ejecutada o
 *   manejada directamente.
 */
export type Actor = 'ia' | 'humano' | 'software';

export interface WorkflowStep {
  title: string;
  actor: Actor;
  /** Herramienta concreta del paso. */
  tool?: string;
  description?: string;
  /** Qué entra al paso (datos, croquis, normativa, instrucción…). */
  input?: string;
  /** Qué sale del paso. */
  output?: string;
  /** Duración del paso. */
  time?: TimeValue;
  /** Tipo de paso para el desglose de tiempos. Por defecto: `generacion`. */
  phase?: 'generacion' | 'revision';
  /** Imagen opcional del resultado intermedio. */
  media?: MediaItem;
}

/* ------------------------------------------------------------------ */
/* Proyectos                                                           */
/* ------------------------------------------------------------------ */

export type ProjectStatus =
  | 'finalizado'
  | 'en desarrollo'
  | 'en revisión'
  | 'propuesta'
  | 'ejercicio académico';

export interface Highlight {
  title: string;
  text: string;
}

export interface MethodStep {
  title: string;
  text: string;
  /** Valor real que resume el paso (ej. "15 mm/px"). */
  value?: string;
  /** Aclaración del valor (fuente, tolerancia). */
  valueNote?: string;
}

export interface ProjectMethod {
  title: string;
  intro?: string;
  steps: MethodStep[];
}

/** Una fase del encargo, de la toma de datos a la entrega. */
export interface ScopeStage {
  title: string;
  text: string;
  /** Qué produce la fase (formatos, láminas, documentos). */
  outputs?: string[];
}

/** Para quién está pensado el resultado y qué recibe. */
export interface ScopeAudience {
  /** Destinatario, ej. "Inversor". */
  audience: string;
  title: string;
  text: string;
  items?: string[];
}

/** Alcance completo del proyecto: sus fases y a quién sirve. */
export interface ProjectScope {
  title: string;
  intro?: string;
  stages: ScopeStage[];
  audiences?: ScopeAudience[];
}

/** Modelo 3D navegable (GLB) con su IFC descargable opcional. */
export interface ProjectModel {
  /** Ruta del GLB dentro de `public/`. Los nodos se nombran `<planta>__<material>`. */
  src: string;
  /** IFC descargable, si existe. */
  ifc?: string;
  /** Imagen fija que se muestra antes de cargar el modelo. */
  poster?: string;
  alt: string;
  caption?: string;
  /** Peso aproximado para avisar antes de descargar, ej. "0,3 MB". */
  size?: string;
  /** Plantas en orden de abajo arriba, con la clave usada en los nodos del GLB. */
  storeys?: { key: string; label: string }[];
}

export interface Project {
  /** Identificador para la URL. Solo minúsculas, números y guiones. */
  slug: string;
  title: string;
  /**
   * `true` para contenido de demostración. Nunca se publica en la build de
   * producción salvo que se active a propósito (`npm run build:demo`).
   */
  demo: boolean;
  /** `false` mantiene el proyecto como borrador: solo visible en desarrollo. */
  published: boolean;
  /** Aparece en la portada. */
  featured?: boolean;
  /** Orden manual (menor primero). Si no, por fecha de `sortDate`. */
  order?: number;
  /** Fecha ISO para ordenar (AAAA-MM o AAAA-MM-DD). */
  sortDate?: string;

  categories: CategoryId[];
  /** Fecha o periodo legible, ej. "Mar–Abr 2026". */
  period?: string;
  status?: ProjectStatus;
  /** Ubicación o tipo de encargo, si procede. */
  location?: string;

  /** Resumen de una o dos líneas para tarjetas y metadatos. */
  summary: string;
  /**
   * Lo que hace especial al proyecto: 3 o 4 claves con título y explicación.
   * Se muestran justo después de la imagen principal.
   */
  highlights?: Highlight[];
  /** Cifras reales del proyecto (ej. "10" · "cajas"). Sustituyen a los tiempos mientras no haya. */
  figures?: { value: string; label: string }[];
  /**
   * Método propio que da sentido al proyecto, explicado paso a paso con valores
   * reales (ej. cómo se dedujeron las cotas sin medir). Se muestra como sección
   * destacada antes del encargo.
   */
  method?: ProjectMethod;
  /**
   * Alcance del encargo cuando va más allá de un ejercicio: fases cubiertas y
   * destinatarios del resultado. Se muestra como primera sección.
   */
  scope?: ProjectScope;
  /** Modelo 3D navegable. Se muestra como sección propia tras el alcance. */
  model?: ProjectModel;
  context?: string;
  objective?: string;
  problem?: string;
  /** Participación concreta. */
  participation?: string[];
  tools?: string[];
  methodology?: string[];
  deliverables?: string[];

  /** Imagen principal. Si falta, se usa la primera de `media`. */
  cover?: MediaItem;
  media?: MediaItem[];
  documents?: DocumentItem[];
  tables?: DataTable[];
  code?: CodeSnippet[];

  /**
   * Secuencia de trabajo paso a paso: qué hace la IA, qué hace la persona y qué
   * hace el software, con sus tiempos. Es la parte central de cada ficha.
   */
  workflow?: WorkflowStep[];

  comparison?: Comparison;

  results?: string[];
  limitations?: string[];
  /** Comprobaciones realizadas. */
  checks?: string[];
  notes?: string;
}

/* ------------------------------------------------------------------ */
/* Procesos y herramientas                                             */
/* ------------------------------------------------------------------ */

export interface ProcessEntry {
  slug: string;
  title: string;
  demo: boolean;
  published: boolean;
  order?: number;
  /** Tipo de entrada: script, plantilla, flujo de trabajo, rutina… */
  type: string;
  summary: string;
  problem?: string;
  previousProcess?: string;
  solution?: string;
  tools?: string[];
  /** Pasos de funcionamiento. */
  howItWorks?: string[];
  /** Secuencia detallada con actores y tiempos (opcional). */
  workflow?: WorkflowStep[];
  example?: { input: string; output: string; note?: string };
  media?: MediaItem[];
  code?: CodeSnippet[];
  limitations?: string[];
  applications?: string[];
  /** Proyectos relacionados (por slug). */
  relatedProjects?: string[];
}

/* ------------------------------------------------------------------ */
/* Perfil                                                              */
/* ------------------------------------------------------------------ */

export interface ProfileLink {
  label: string;
  href: string;
}

export interface Profile {
  /** Marca los datos de perfil como provisionales. Se muestra un aviso "EJEMPLO". */
  isExample: boolean;
  name: string;
  /** Titular profesional breve. */
  headline: string;
  /** Introducción de dos o tres líneas. */
  intro: string;
  /** Enfoque de trabajo para la portada. */
  approach: string[];
  email?: string;
  location?: string;
  links: ProfileLink[];
  /** Software que realmente se utiliza. Solo lo acreditable. */
  software: string[];
  /** Formación, solo si es real. */
  education: { title: string; center?: string; period?: string }[];
  /** Experiencia, solo la acreditable. Vacío = no se muestra. */
  experience?: { role: string; org: string; period?: string; text?: string }[];
  /** Certificaciones. */
  certifications?: string[];
}
