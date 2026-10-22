/** Navegación principal. Numeración tipo plano. */
export const nav = [
  { href: '/proyectos/', label: 'Proyectos', code: '01' },
  { href: '/#que-hago', label: 'Qué sé hacer', code: '02' },
  { href: '/#trayectoria', label: 'Sobre mí', code: '03' },
  { href: '/profesionales/', label: 'Para profesionales', code: '04' },
] as const;

/** Secciones técnicas, agrupadas en «Para profesionales». */
export const proNav = [
  { href: '/metodologia/', label: 'Metodología', code: 'M' },
  { href: '/procesos/', label: 'Procesos y herramientas', code: 'H' },
  { href: '/comparativas/', label: 'Comparativas de tiempos', code: 'C' },
] as const;

export const siteTitle = 'Portfolio técnico';

/** Antetítulo de la portada. */
export const siteKicker = `${siteTitle} · Edificación`;
