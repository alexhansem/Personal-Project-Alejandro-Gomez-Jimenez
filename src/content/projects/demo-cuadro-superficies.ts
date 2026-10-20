/**
 * CONTENIDO DE DEMOSTRACIÓN — FICTICIO.
 * Muestra una comparativa con referencia ESTIMADA: la web no calcula el ahorro.
 */
import type { Project } from '../types';

const project: Project = {
  slug: 'demo-cuadro-superficies',
  title: 'Demo · Cuadro de superficies a partir de un plano',
  demo: true,
  published: true,
  featured: true,
  order: 2,
  sortDate: '2026-08',
  period: 'Periodo ficticio',
  status: 'en revisión',
  categories: ['cad-automatizacion', 'ia', 'productividad'],

  summary:
    'Ejemplo de extracción automática de superficies a una tabla. La referencia es una estimación, así que la web no calcula el ahorro.',
  objective: 'Texto de ejemplo. Obtener superficies útiles y construidas por estancia sin medir a mano.',
  problem: 'Texto de ejemplo. Medir polilínea a polilínea es lento y propenso a errores de transcripción.',
  tools: ['AutoCAD (ejemplo)', 'Python (ejemplo)', 'Claude (ejemplo)'],
  deliverables: ['Tabla CSV', 'Cuadro de superficies maquetado'],

  workflow: [
    { title: 'Preparación de capas', actor: 'humano', tool: 'AutoCAD', output: 'Polilíneas cerradas por estancia', time: { minutes: 12, provenance: 'medido', note: 'Dato ficticio' } },
    { title: 'Generación del script de extracción', actor: 'ia', tool: 'Claude', output: 'Script Python', time: { minutes: 3, provenance: 'medido', note: 'Dato ficticio' } },
    { title: 'Ejecución y exportación', actor: 'software', tool: 'Python', input: 'DXF', output: 'CSV de superficies', time: { minutes: 1, provenance: 'medido', note: 'Dato ficticio' } },
    { title: 'Comprobación de totales', actor: 'humano', phase: 'revision', output: 'Tabla validada', time: { minutes: 14, provenance: 'medido', note: 'Dato ficticio' } },
  ],

  comparison: {
    task: 'Cuadro de superficies de una planta (tarea ficticia)',
    reference: {
      label: 'Medición manual (ejemplo)',
      generation: { minutes: 60, provenance: 'estimado', note: 'Estimación ficticia' },
      review: { minutes: 15, provenance: 'estimado', note: 'Estimación ficticia' },
    },
    used: {
      label: 'Script asistido por IA (ejemplo)',
      generation: { minutes: 16, provenance: 'medido', note: 'Dato ficticio' },
      review: { minutes: 14, provenance: 'medido', note: 'Dato ficticio' },
      corrections: 'Ninguna (ficticio)',
      humanIntervention: 'Preparación de capas y comprobación',
    },
    limitations: ['La referencia es una estimación: hace falta medir el método manual para comparar.'],
  },

  media: [
    { src: '/demo/demo-tabla-superficies.svg', alt: 'Tabla ficticia de superficies por estancia con totales', caption: 'Salida del script (ficticia)', kind: 'tabla', ratio: 1.6 },
  ],
  tables: [
    {
      title: 'Cuadro de superficies (ficticio)',
      columns: ['Estancia', 'S. útil (m²)', 'S. construida (m²)'],
      numeric: [1, 2],
      rows: [
        ['Estancia A', '22,40', '25,10'],
        ['Estancia B', '21,85', '24,60'],
        ['Espacio C', '46,10', '51,30'],
        ['Estancia D', '22,40', '25,10'],
        ['E1', '10,20', '11,70'],
        ['E2', '10,05', '11,55'],
      ],
      footer: ['Total', '133,00', '149,35'],
    },
  ],
  checks: ['Ejemplo: la suma de superficies útiles coincide con la medición de control.'],
};

export default project;
