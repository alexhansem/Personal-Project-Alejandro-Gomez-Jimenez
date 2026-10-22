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

  plainHeadline: 'Hago planos, modelos 3D y documentación de edificios. Con inteligencia artificial, un proyecto completo en uno o dos días.',

  plainIntro:
    'Técnico en proyectos de edificación en Toledo. La IA dibuja, modela y maqueta siguiendo mis instrucciones; yo decido, reviso y respondo de cada resultado. Abajo puedes abrir los archivos originales de cada trabajo.',

  intro:
    'Estudio el Grado Superior en Proyectos de Edificación en el IES Azarquiel y he trabajado como ayudante de oficina técnica en un estudio de arquitectura, con delineación y modelado BIM en Revit y planos en AutoCAD. Vengo del sector inmobiliario, donde llevo la optimización de procesos y la integración de soluciones tecnológicas. Cada trabajo de esta web muestra cómo se hizo, cuánto tiempo llevó y qué se comprobó.',

  approach: [
    'Primero el encargo: requisitos, normativa aplicable y formato de entrega.',
    'La IA genera y acelera; el criterio técnico decide y revisa.',
    'Cada tiempo se registra separando generación, revisión y total.',
    'Las limitaciones se documentan igual que los resultados.',
  ],

  email: 'alejandro.gomez.jimenez.2000@gmail.com',
  location: 'Toledo, Castilla-La Mancha',

  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/alexhansem/' },
  ],

  // Solo software que puedas acreditar. Vacío = no se muestra.
  software: ['CAD', 'CYPE', 'Revit'],

  // Solo formación real. Vacío = no se muestra.
  education: [
    { title: 'Formación Profesional de Grado Superior, Proyectos de Edificación', center: 'IES Azarquiel', period: '2025 – 2027 · en curso' },
    { title: 'Técnico en Mercados Financieros', center: 'IEB', period: '2020' },
    { title: 'Curso Superior: Análisis Bursátil y Value Investing', center: 'IEB', period: '2020' },
    { title: 'Curso para pymes: emprendimiento', center: 'Instituto de Formación Empresarial de la Cámara de Comercio de Madrid', period: '2019' },
  ],

  // Solo experiencia real (perfil de LinkedIn exportado por Alex, 20/10/2026).
  experience: [
    {
      role: 'Ayudante de Oficina Técnica',
      org: 'Corroto Arquitectura SL · Toledo',
      period: 'may. – jun. 2026',
      text: 'Proyectos de ejecución: delineación y modelado BIM con Revit, elaboración y modificación de planos en AutoCAD, documentación gráfica y detalles constructivos para proyectos de edificación.',
    },
    {
      role: 'Manager de Desarrollo de Negocio y Marca',
      org: 'SOLEY Servicios Inmobiliarios · Toledo',
      period: 'oct. 2023 – actualidad',
      text: 'Optimización de procesos internos e integración de soluciones tecnológicas; gestión y resolución de operaciones complejas.',
    },
    {
      role: 'Administrativo y Gestor de cuentas',
      org: 'SOLEY Servicios Inmobiliarios · Toledo',
      period: 'sept. 2022 – actualidad',
      text: 'Gestión de clientes, CRM y bases de datos, facturación, contratos y documentación.',
    },
    {
      role: 'Promotor de Marcas y Marketing de Ventas',
      org: 'grupoSky · Madrid',
      period: 'feb. 2019 – sept. 2022',
    },
  ],

  certifications: ['Agente Profesional Inmobiliario (API)', 'Gestor Financiero de la Empresa', 'Técnico en Mercados Financieros'],
};
