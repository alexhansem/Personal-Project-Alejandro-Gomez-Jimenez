/**
 * CONTENIDO DE DEMOSTRACIÓN — FICTICIO.
 * Proyecto inventado para probar la interfaz. Todos los tiempos y datos son
 * ficticios. Bórralo cuando tengas proyectos reales.
 */
import type { Project } from '../types';

const project: Project = {
  slug: 'demo-vivienda-documentacion',
  title: 'Demo · Documentación gráfica de una vivienda ficticia',
  demo: true,
  published: true,
  featured: true,
  order: 1,
  sortDate: '2026-09',
  period: 'Periodo ficticio',
  status: 'finalizado',
  categories: ['delineacion', 'documentacion', 'ia'],

  summary:
    'Ejemplo de ficha completa: plantas, sección y detalle de un edificio inventado, con la secuencia de trabajo y una comparativa medida (datos ficticios).',
  context:
    'Texto de ejemplo. Aquí se describe el encargo: tipo de edificio, fase del proyecto y para quién se desarrolló la documentación.',
  objective:
    'Texto de ejemplo. Producir el juego de planos básico (planta, sección y detalle) a partir de un croquis acotado.',
  problem:
    'Texto de ejemplo. El croquis de partida tenía cotas incompletas y había que mantener coherencia entre planta y sección.',
  participation: [
    'Ejemplo: interpretación del croquis y definición de criterios de dibujo.',
    'Ejemplo: redacción de instrucciones para la IA y revisión de cada salida.',
    'Ejemplo: corrección final de cotas y maquetación de láminas.',
  ],
  tools: ['AutoCAD (ejemplo)', 'Claude (ejemplo)', 'Script AutoLISP (ejemplo)'],
  methodology: [
    'Lectura del croquis y lista de comprobación de datos que faltan.',
    'Generación asistida de la geometría base y de los rótulos.',
    'Revisión contra el croquis y corrección manual.',
    'Maquetación de láminas y exportación a PDF.',
  ],
  deliverables: ['Planta esquemática (D-01)', 'Sección (D-02)', 'Detalle de cerramiento (D-03)', 'PDF de 3 páginas'],

  workflow: [
    {
      title: 'Lectura del encargo y croquis',
      actor: 'humano',
      input: 'Croquis acotado y requisitos de entrega',
      output: 'Lista de datos y criterios de dibujo',
      phase: 'generacion',
      time: { minutes: 20, provenance: 'medido', note: 'Dato ficticio' },
    },
    {
      title: 'Instrucciones para la IA',
      actor: 'humano',
      tool: 'Claude',
      description: 'Se describen ejes, cotas y capas, y el formato de salida esperado.',
      input: 'Criterios de dibujo',
      output: 'Instrucción estructurada',
      phase: 'generacion',
      time: { minutes: 15, provenance: 'medido', note: 'Dato ficticio' },
    },
    {
      title: 'Generación del script de geometría',
      actor: 'ia',
      tool: 'Claude',
      description: 'La IA propone un script que dibuja ejes, muros y huecos en capas separadas.',
      input: 'Instrucción estructurada',
      output: 'Script AutoLISP',
      phase: 'generacion',
      time: { minutes: 4, provenance: 'medido', note: 'Dato ficticio' },
    },
    {
      title: 'Ejecución en CAD',
      actor: 'software',
      tool: 'AutoCAD',
      input: 'Script AutoLISP',
      output: 'Geometría base en DWG',
      phase: 'generacion',
      time: { minutes: 6, provenance: 'medido', note: 'Dato ficticio' },
      media: { src: '/demo/demo-planta-rev-a.svg', alt: 'Planta esquemática ficticia, revisión A', caption: 'Salida intermedia · REV. A (ficticia)', kind: 'plano', ratio: 2400 / 1700 },
    },
    {
      title: 'Revisión de cotas y coherencia',
      actor: 'humano',
      tool: 'AutoCAD',
      description: 'Comparación con el croquis. Se detectan dos cotas erróneas y una partición que faltaba.',
      input: 'Geometría base',
      output: 'Lista de correcciones',
      phase: 'revision',
      time: { minutes: 25, provenance: 'medido', note: 'Dato ficticio' },
    },
    {
      title: 'Corrección y maquetación',
      actor: 'humano',
      tool: 'AutoCAD',
      input: 'Lista de correcciones',
      output: 'Láminas D-01 a D-03 y PDF',
      phase: 'revision',
      time: { minutes: 35, provenance: 'medido', note: 'Dato ficticio' },
      media: { src: '/demo/demo-planta-rev-b.svg', alt: 'Planta esquemática ficticia, revisión B', caption: 'Resultado · REV. B (ficticia)', kind: 'plano', ratio: 2400 / 1700 },
    },
  ],

  comparison: {
    task: 'Planta, sección y detalle a partir de croquis (tarea ficticia)',
    reference: {
      label: 'Delineación manual (ejemplo)',
      description: 'Dibujo directo en CAD sin asistencia.',
      generation: { minutes: 150, provenance: 'medido', note: 'Dato ficticio' },
      review: { minutes: 30, provenance: 'medido', note: 'Dato ficticio' },
      corrections: '1 corrección menor (ficticio)',
      humanIntervention: 'Total',
    },
    used: {
      label: 'Flujo asistido por IA (ejemplo)',
      description: 'Script generado por IA, ejecutado en CAD y revisado a mano.',
      generation: { minutes: 45, provenance: 'medido', note: 'Dato ficticio' },
      review: { minutes: 60, provenance: 'medido', note: 'Dato ficticio' },
      corrections: '2 cotas y 1 partición (ficticio)',
      humanIntervention: 'Instrucciones, revisión completa y maquetación',
    },
    deliverables: ['3 láminas', 'PDF'],
    quality: 'Ejemplo: resultado equivalente tras la revisión; la revisión llevó más tiempo que en el método manual.',
    observations: 'Ejemplo de cómo la revisión puede consumir parte del tiempo ganado en la generación.',
    limitations: ['Datos ficticios: no representan ninguna medición real.', 'Una sola repetición de la tarea.'],
  },

  media: [
    { src: '/demo/demo-planta-rev-b.svg', alt: 'Planta esquemática ficticia con ejes, cotas y rótulos de estancias', caption: 'Planta esquemática · REV. B (ficticia)', kind: 'plano', ratio: 2400 / 1700, label: 'REV. B', compareWith: { src: '/demo/demo-planta-rev-a.svg', alt: 'Planta esquemática ficticia, revisión A', label: 'REV. A' } },
    { src: '/demo/demo-seccion.svg', alt: 'Sección esquemática ficticia con tres niveles y cubierta a dos aguas', caption: 'Sección esquemática (ficticia)', kind: 'plano', ratio: 2400 / 1500 },
    { src: '/demo/demo-detalle.svg', alt: 'Detalle esquemático de cerramiento con seis capas numeradas', caption: 'Detalle de cerramiento (ficticio)', kind: 'detalle', ratio: 1800 / 1400 },
  ],
  documents: [
    { id: 'documentacion', title: 'Documentación de demostración', src: '/demo/demo-documentacion.pdf', description: 'PDF ficticio de 3 páginas para probar el visor.', pages: 3, sheet: 'A3' },
  ],

  results: ['Ejemplo: juego de 3 láminas coherente entre planta y sección.', 'Ejemplo: script reutilizable para otras plantas.'],
  limitations: ['Ejemplo: el script no resuelve huecos en muros curvos.'],
  checks: ['Ejemplo: cotas parciales suman la cota total.', 'Ejemplo: niveles coinciden entre planta y sección.'],
  notes: 'Este proyecto es una demostración. Ningún dato es real.',
};

export default project;
