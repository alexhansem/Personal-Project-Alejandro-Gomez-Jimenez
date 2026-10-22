import type { DocumentItem, FileGroup, MediaItem, Project, ProjectModel } from '../content/types';
import { areas, type Area } from '../content/areas';
import { projects } from './content';

/**
 * Archivos de un proyecto agrupados para la vista general: imágenes, planos,
 * documentos PDF y modelo 3D. Solo se devuelven los grupos con contenido.
 */

export const fileGroupLabels: Record<FileGroup | 'documentos' | 'modelo', string> = {
  imagenes: 'Imágenes 3D',
  planos: 'Planos',
  presentacion: 'Dosier',
  documentos: 'Documentos PDF',
  modelo: 'Modelo 3D',
};

function groupOf(m: MediaItem): FileGroup {
  if (m.group) return m.group;
  return m.kind === 'modelo' || m.kind === 'foto' || m.kind === 'captura' ? 'imagenes' : 'planos';
}

export type FileSection =
  | { id: FileGroup; label: string; kind: 'media'; items: MediaItem[] }
  | { id: 'documentos'; label: string; kind: 'documentos'; items: DocumentItem[] }
  | { id: 'modelo'; label: string; kind: 'modelo'; model: ProjectModel };

/** Todas las imágenes publicables del proyecto, portada incluida, sin repetir. */
export function projectImages(p: Project): MediaItem[] {
  const all = [...(p.cover ? [p.cover] : []), ...(p.media ?? [])];
  const seen = new Set<string>();
  return all.filter((m) => {
    if (!m.src || seen.has(m.src)) return false;
    seen.add(m.src);
    return true;
  });
}

export function projectFiles(p: Project): FileSection[] {
  const images = projectImages(p);
  const order: FileGroup[] = ['imagenes', 'planos', 'presentacion'];
  const sections: FileSection[] = [];
  if (p.model) sections.push({ id: 'modelo', label: fileGroupLabels.modelo, kind: 'modelo', model: p.model });
  for (const g of order) {
    const items = images.filter((m) => groupOf(m) === g);
    if (items.length) sections.push({ id: g, label: fileGroupLabels[g], kind: 'media', items });
    // Las láminas y documentos maquetados van justo después de las imágenes: son lo más visual tras ellas.
    if (g === 'imagenes' && p.documents?.length) {
      sections.push({ id: 'documentos', label: fileGroupLabels.documentos, kind: 'documentos', items: p.documents });
    }
  }
  return sections;
}

/** Recuento legible de un grupo, ej. "12 planos". */
export function fileCount(s: FileSection): string {
  if (s.kind === 'modelo') return s.model.ifc ? 'navegable + IFC' : 'navegable';
  const n = s.items.length;
  const unit: Record<string, [string, string]> = {
    imagenes: ['imagen', 'imágenes'],
    planos: ['plano', 'planos'],
    presentacion: ['diapositiva', 'diapositivas'],
    documentos: ['PDF', 'PDF'],
  };
  const [one, many] = unit[s.id];
  return `${n} ${n === 1 ? one : many}`;
}

export interface AreaShowcase {
  area: Area;
  samples: { project: Project; text: string; sample: MediaItem; lead: boolean }[];
}

/** Áreas con al menos un proyecto que las demuestre, con sus muestras. */
export const areaShowcase: AreaShowcase[] = areas
  .map((area) => ({
    area,
    samples: projects.flatMap((project) =>
      (project.skills ?? [])
        .filter((s) => s.area === area.id)
        .map((s) => ({ project, text: s.text, sample: s.sample, lead: !!s.lead })),
    ),
  }))
  .filter((a) => a.samples.length > 0)
  .map((a) => {
    const lead = a.samples.findIndex((x) => x.lead);
    return lead > 0 ? { ...a, samples: [a.samples[lead], ...a.samples.filter((_, i) => i !== lead)] } : a;
  });
