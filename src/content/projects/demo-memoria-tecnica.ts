/**
 * CONTENIDO DE DEMOSTRACIÓN — FICTICIO.
 * Ficha mínima: sin imágenes, sin referencia convencional y con un paso sin
 * tiempo. Sirve para comprobar los estados vacíos y "pendiente de medir".
 */
import type { Project } from '../types';

const project: Project = {
  slug: 'demo-memoria-tecnica',
  title: 'Demo · Borrador de memoria descriptiva asistido por IA',
  demo: true,
  published: true,
  order: 3,
  sortDate: '2026-07',
  status: 'en desarrollo',
  categories: ['documentacion', 'edificacion', 'ia'],

  summary:
    'Ejemplo de ficha mínima: sin imágenes y sin referencia convencional. La comparativa aparece como pendiente de medir.',
  objective: 'Texto de ejemplo. Estructurar un borrador de memoria a partir de datos del proyecto.',
  tools: ['Claude (ejemplo)', 'Word (ejemplo)'],

  workflow: [
    { title: 'Recopilación de datos del proyecto', actor: 'humano', output: 'Ficha de datos', time: { minutes: 30, provenance: 'estimado', note: 'Estimación ficticia' } },
    { title: 'Borrador estructurado', actor: 'ia', tool: 'Claude', input: 'Ficha de datos', output: 'Borrador por apartados', time: { minutes: 5, provenance: 'medido', note: 'Dato ficticio' } },
    { title: 'Revisión técnica y normativa', actor: 'humano', phase: 'revision', description: 'Pendiente de cronometrar.' },
  ],

  comparison: {
    task: 'Borrador de memoria descriptiva (tarea ficticia)',
    used: {
      label: 'Borrador asistido por IA (ejemplo)',
      generation: { minutes: 35, provenance: 'estimado', note: 'Ficticio' },
      review: { provenance: 'pendiente' },
    },
  },

  limitations: ['Ejemplo: el borrador requiere comprobar cada referencia normativa a mano.'],
};

export default project;
