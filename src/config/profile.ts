import type { Profile } from '../content/types';

/**
 * PERFIL — datos personales y profesionales.
 *
 * Nombre, titular y contacto viven solo aquí (y el nombre de la web en
 * config/site.ts): para pasar a una marca personal basta con cambiar estos campos.
 * Con `isExample: true` la web marca los datos como EJEMPLO, no enlaza el contacto
 * y pide a los buscadores que no la indexen.
 *
 * Deja vacíos (`[]`) los apartados de los que todavía no tengas datos
 * acreditables: la web los oculta.
 */
export const profile: Profile = {
  isExample: false,

  name: 'Alejandro Gómez Jiménez',

  headline: 'Técnico en Proyectos de Edificación · IA y Automatización',

  intro:
    'Desarrollo planos, documentación de proyecto y herramientas auxiliares combinando criterio técnico, software especializado y modelos de IA. Cada trabajo incluye cómo se hizo, cuánto tiempo llevó y qué se comprobó.',

  approach: [
    'Primero el encargo: requisitos, normativa aplicable y formato de entrega.',
    'La IA genera y acelera; el criterio técnico decide y revisa.',
    'Cada tiempo se registra separando generación, revisión y total.',
    'Las limitaciones se documentan igual que los resultados.',
  ],

  email: 'alejandro.gomez.jimenez.2000@gmail.com',
  location: undefined,

  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/alexhansem/' },
  ],

  // Solo software que puedas acreditar. Vacío = no se muestra.
  software: ['CAD', 'CYPE', 'Revit'],

  // Solo formación real. Vacío = no se muestra.
  education: [],
};
