import type { Profile } from '../content/types';

/**
 * PERFIL — datos personales y profesionales.
 *
 * Todo lo que hay aquí es provisional (EJEMPLO). Sustitúyelo por tus datos
 * reales y cambia `isExample` a `false`. Mientras `isExample` sea `true`, la web
 * muestra un aviso visible y los datos de contacto no son enlaces activos.
 *
 * Deja vacíos (`[]`) los apartados de los que todavía no tengas datos
 * acreditables: la web los oculta.
 */
export const profile: Profile = {
  isExample: true,

  name: 'Nombre Apellido',

  // Titular propuesto a partir del brief. Revísalo y ajústalo a tu forma de hablar.
  headline:
    'Documentación técnica y soluciones para edificación: delineación, software CAD/BIM y flujos de trabajo asistidos por IA.',

  intro:
    'Desarrollo planos, documentación de proyecto y herramientas auxiliares combinando criterio técnico, software especializado y modelos de IA. Cada trabajo incluye cómo se hizo, cuánto tiempo llevó y qué se comprobó.',

  approach: [
    'Primero el encargo: requisitos, normativa aplicable y formato de entrega.',
    'La IA genera y acelera; el criterio técnico decide y revisa.',
    'Cada tiempo se registra separando generación, revisión y total.',
    'Las limitaciones se documentan igual que los resultados.',
  ],

  email: 'ejemplo@ejemplo.invalid',
  location: undefined,

  links: [
    { label: 'LinkedIn (EJEMPLO)', href: 'https://example.com' },
  ],

  // Solo software que puedas acreditar. Vacío = no se muestra.
  software: [],

  // Solo formación real. Vacío = no se muestra.
  education: [],
};
