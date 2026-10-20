import type { Project, ProcessEntry } from '../content/types';
import { categories, type CategoryId } from '../content/categories';

/**
 * Carga automática de contenido: cada archivo de `src/content/projects/` y
 * `src/content/processes/` exporta `default` con una entrada. Añadir un archivo
 * es suficiente para que aparezca en la web.
 */

/**
 * Contenido de demostración: visible en desarrollo (`npm run dev`) y en
 * `npm run build:demo`. Excluido en `npm run build` salvo SHOW_DEMO=true.
 */
export const showDemo: boolean =
  import.meta.env.DEV || import.meta.env.MODE === 'demo' || import.meta.env.SHOW_DEMO === 'true';

/** Borradores (`published: false`): solo en desarrollo. */
const showDrafts: boolean = import.meta.env.DEV;

const projectModules = import.meta.glob<{ default: Project }>('../content/projects/*.ts', {
  eager: true,
});
const processModules = import.meta.glob<{ default: ProcessEntry }>('../content/processes/*.ts', {
  eager: true,
});

function isVisible(entry: { demo: boolean; published: boolean }): boolean {
  if (entry.demo && !showDemo) return false;
  if (!entry.published && !showDrafts) return false;
  return true;
}

function validateSlugs(items: { slug: string }[], kind: string): void {
  const seen = new Set<string>();
  for (const { slug } of items) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      throw new Error(`[${kind}] slug no válido: "${slug}". Usa minúsculas, números y guiones.`);
    }
    if (seen.has(slug)) throw new Error(`[${kind}] slug duplicado: "${slug}"`);
    seen.add(slug);
  }
}

function byOrder<T extends { order?: number; sortDate?: string; title: string }>(a: T, b: T): number {
  const oa = a.order ?? Number.POSITIVE_INFINITY;
  const ob = b.order ?? Number.POSITIVE_INFINITY;
  if (oa !== ob) return oa - ob;
  const da = a.sortDate ?? '';
  const db = b.sortDate ?? '';
  if (da !== db) return db.localeCompare(da);
  return a.title.localeCompare(b.title, 'es');
}

const allProjects = Object.values(projectModules).map((m) => m.default);
const allProcesses = Object.values(processModules).map((m) => m.default);
validateSlugs(allProjects, 'proyectos');
validateSlugs(allProcesses, 'procesos');

const validCategoryIds = new Set<string>(categories.map((c) => c.id));
for (const p of allProjects) {
  for (const c of p.categories) {
    if (!validCategoryIds.has(c)) throw new Error(`[proyectos] "${p.slug}" usa una categoría desconocida: ${c}`);
  }
}

export const projects: Project[] = allProjects.filter(isVisible).sort(byOrder);
export const processes: ProcessEntry[] = allProcesses
  .filter(isVisible)
  .sort((a, b) => byOrder({ ...a, sortDate: undefined }, { ...b, sortDate: undefined }));

export const featuredProjects: Project[] = (() => {
  const featured = projects.filter((p) => p.featured);
  return (featured.length ? featured : projects).slice(0, 4);
})();

/** Categorías con al menos un proyecto visible, con su número de proyectos. */
export const activeCategories = categories
  .map((c) => ({ ...c, count: projects.filter((p) => p.categories.includes(c.id as CategoryId)).length }))
  .filter((c) => c.count > 0);

export function projectIndex(slug: string): number {
  return projects.findIndex((p) => p.slug === slug);
}

/** Código de hoja tipo plano: P-01, P-02… */
export function sheetCode(prefix: string, index: number): string {
  return `${prefix}-${String(index + 1).padStart(2, '0')}`;
}

export const hasDemoContent: boolean =
  projects.some((p) => p.demo) || processes.some((p) => p.demo);
