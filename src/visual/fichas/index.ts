import type { FichaVisual } from '../types';

// Cada archivo de esta carpeta es la ficha visual de un proyecto.
const mods = import.meta.glob<{ default: FichaVisual }>('./*.ts', { eager: true });

export const fichas: FichaVisual[] = Object.entries(mods)
  .filter(([p]) => !p.endsWith('index.ts'))
  .map(([, m]) => m.default);

export const fichaDe = (proyecto: string) => fichas.find((f) => f.proyecto === proyecto);
