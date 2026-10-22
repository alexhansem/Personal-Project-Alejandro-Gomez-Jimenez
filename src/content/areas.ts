/**
 * Áreas de trabajo en lenguaje llano para la vista general («Qué sé hacer»).
 * Cada proyecto declara en `skills` qué áreas demuestra y con qué muestra; un
 * área sin proyectos no se muestra.
 */
export const areas = [
  {
    id: 'planos',
    title: 'Planos',
    text: 'Plantas, alzados y secciones a escala, acotados y listos para imprimir o abrir en AutoCAD.',
  },
  {
    id: 'modelo-3d',
    title: 'Modelo 3D (BIM)',
    text: 'El edificio construido en el ordenador, pieza a pieza. De él salen los planos, las vistas y las mediciones.',
  },
  {
    id: 'imagenes',
    title: 'Imágenes realistas',
    text: 'Vistas fotorrealistas sacadas del propio modelo, para enseñar el edificio a quien no lee planos.',
  },
  {
    id: 'laminas',
    title: 'Láminas y presentaciones',
    text: 'La documentación maquetada para entregar, exponer o convencer: láminas, dosieres y diapositivas.',
  },
  {
    id: 'analisis',
    title: 'Análisis técnico',
    text: 'Deducir lo que no se ve y comprobar lo que se dibuja: medidas, estructura y normativa.',
  },
  {
    id: 'presupuesto',
    title: 'Presupuesto y viabilidad',
    text: 'Cuánto cuesta la obra, partida a partida, y si la operación sale a cuenta.',
  },
] as const;

export type AreaId = (typeof areas)[number]['id'];
export type Area = (typeof areas)[number];

export function getArea(id: AreaId): Area {
  const found = areas.find((a) => a.id === id);
  if (!found) throw new Error(`Área desconocida: ${id}`);
  return found;
}
