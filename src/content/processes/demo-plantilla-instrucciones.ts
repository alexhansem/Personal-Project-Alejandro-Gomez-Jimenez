/**
 * CONTENIDO DE DEMOSTRACIÓN — FICTICIO.
 */
import type { ProcessEntry } from '../types';

const entry: ProcessEntry = {
  slug: 'demo-plantilla-instrucciones',
  title: 'Demo · Plantilla de instrucciones para documentación',
  demo: true,
  published: true,
  order: 2,
  type: 'Metodología (ejemplo)',
  summary: 'Ejemplo de entrada sin código: una forma de trabajo explicada con pasos, límites y aplicaciones.',
  problem: 'Texto de ejemplo. Las respuestas de la IA varían mucho si la instrucción no fija formato y criterios.',
  solution: 'Texto de ejemplo. Una plantilla con datos de partida, criterios, formato de salida y lista de comprobación.',
  workflow: [
    { title: 'Rellenar datos de partida', actor: 'humano', time: { minutes: 10, provenance: 'estimado', note: 'Ficticio' } },
    { title: 'Generar borrador', actor: 'ia', tool: 'Claude', time: { minutes: 2, provenance: 'medido', note: 'Ficticio' } },
    { title: 'Revisar con la lista de comprobación', actor: 'humano', phase: 'revision', time: { minutes: 15, provenance: 'estimado', note: 'Ficticio' } },
  ],
  limitations: ['Ejemplo: no sustituye la revisión técnica ni la comprobación normativa.'],
  applications: ['Ejemplo: memorias, fichas justificativas, listados de documentación.'],
  relatedProjects: ['demo-memoria-tecnica'],
};

export default entry;
