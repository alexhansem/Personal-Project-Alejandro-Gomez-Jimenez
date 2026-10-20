/**
 * Categorías de trabajo. Solo aparecen como filtro las que tienen al menos un
 * proyecto visible, así que no hace falta inventar proyectos para rellenarlas.
 */
export const categories = [
  { id: 'delineacion', code: 'DL', label: 'Delineación y planos' },
  { id: 'documentacion', code: 'DT', label: 'Documentación técnica' },
  { id: 'edificacion', code: 'PE', label: 'Desarrollo de proyectos de edificación' },
  { id: 'cad-automatizacion', code: 'CA', label: 'CAD y automatización' },
  { id: 'bim', code: 'BM', label: 'BIM' },
  { id: 'ia', code: 'IA', label: 'Flujos de trabajo asistidos por IA' },
  { id: 'productividad', code: 'PR', label: 'Productividad y mejora de procesos' },
] as const;

export type CategoryId = (typeof categories)[number]['id'];
export type Category = (typeof categories)[number];

export function getCategory(id: CategoryId): Category {
  const found = categories.find((c) => c.id === id);
  if (!found) throw new Error(`Categoría desconocida: ${id}`);
  return found;
}
