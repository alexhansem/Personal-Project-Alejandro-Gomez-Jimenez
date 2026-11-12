import type { Project } from '../types';

const base = '/proyectos/casa-piloto';

const lam = (n: string, file: string, alt: string, caption: string, kind: 'plano' | 'detalle' = 'plano') => ({
  src: `${base}/laminas/${n}-${file}.png`,
  alt,
  caption: `Plano ${n} · ${caption}`,
  kind,
  ratio: 1.414,
});

const distribucion = lam(
  '02',
  'distribucion',
  'Plano de distribución: planta baja con salón, comedor, cocina y aseo; planta primera con dos dormitorios, dos baños y despacho; planta del jardín',
  'Distribución · E 1:50',
);
const cotas = lam('03', 'cotas', 'Plantas baja y primera acotadas para obra, con notas de replanteo', 'Cotas · E 1:50');
const superficies = lam(
  '04',
  'superficies',
  'Plantas con cada estancia rellena en gris y su superficie útil, y cuadro de superficies útiles y construidas',
  'Superficies · E 1:50',
);
const alzados = lam(
  '05',
  'alzados',
  'Alzado norte a la calle con la fachada de vidrio en U de la escalera y alzado sur al jardín con las lamas de la zona de tendido',
  'Alzados · E 1:50',
);
const seccionAA = lam(
  '06',
  'seccion-aa',
  'Sección longitudinal por la escalera: peldaños volados desde la medianera, hueco a doble altura y cubierta inclinada con lucernario',
  'Sección A-A · E 1:50',
);
const seccionBB = lam(
  '07',
  'seccion-bb',
  'Sección transversal por el aseo, el vestíbulo, el baño 1 y el hueco de escalera',
  'Sección B-B · E 1:50',
);
const detalles = lam(
  '08',
  'detalles',
  'Seis detalles constructivos a 1:10: peto y cubierta plana, cubierta inclinada ventilada, ventana y alféizar, lamas, cimentación y suelo húmedo con bote sifónico',
  'Detalles constructivos · E 1:10',
  'detalle',
);
const carpinteria = lam(
  '09',
  'carpinteria',
  'Cuadro de carpintería con cada ventana, puerta, corredera, la fachada de vidrio en U y el lucernario, con medidas y mecanismo',
  'Carpintería · E 1:50',
);
const seccionCC = lam('10', 'seccion-cc', 'Sección longitudinal por el vuelo norte: cocina, salón y aseo en planta baja, dormitorios y distribuidor arriba, y el vuelo de 1,80 m sobre el acceso', 'Sección C-C · E 1:50');
const cubierta = lam(
  '11',
  'cubierta',
  'Planta de cubierta: cubierta plana no transitable con sumideros y pendientes, y cubierta inclinada ventilada sobre la escalera',
  'Planta de cubierta · E 1:50',
);
const patios = lam(
  '12',
  'patios',
  'Patio de acceso y jardín con pavimentos, plantación y drenaje, y detalle del patio de acceso por la puerta de entrada',
  'Patios · varias escalas',
);

const escalera = {
  src: `${base}/portada/seccion-escalera.png`,
  alt: 'Fragmento de la sección A-A: escalera de peldaños volados desde la medianera, abierta al salón, bajo una cubierta inclinada con lucernario',
  caption: 'La escalera vista, en la sección A-A · E 1:50',
  kind: 'detalle' as const,
  ratio: 1.289,
};

const bocetoBaja = {
  src: `${base}/proceso/boceto-planta-baja.png`,
  alt: 'Boceto sin escala de la planta baja y del alzado sur, hecho para decidir la distribución antes de pasarla al DWG',
  caption: 'Boceto para decidir · planta baja y alzado sur',
  kind: 'esquema' as const,
  ratio: 1.15,
};

const bocetoPrimera = {
  src: `${base}/proceso/boceto-planta-primera.png`,
  alt: 'Boceto sin escala de la planta primera con dormitorios, baños con retícula de azulejo, despacho y lavadero',
  caption: 'Boceto para decidir · planta primera',
  kind: 'esquema' as const,
  ratio: 0.652,
};

const project: Project = {
  slug: 'casa-piloto',
  title: 'Casa piloto entre medianeras con escalera vista',
  demo: false,
  published: true,
  featured: true,
  order: 3,
  sortDate: '2026-11-09',
  period: 'Octubre–noviembre 2026',
  status: 'ejercicio académico',
  location: 'Ejercicio de 2.º CFGS Proyectos de Edificación · I.E.S. Azarquiel, Toledo',
  categories: ['delineacion', 'documentacion', 'edificacion', 'cad-automatizacion', 'ia'],

  summary:
    'Proyecto de una vivienda unifamiliar entre medianeras (PB + 1, 6,08 m de frente) para el módulo de edificación residencial: once planos A3 dibujados en AutoCAD por Claude Code a través de scripts, con la distribución decidida y corregida por el autor ronda a ronda.',

  tagline:
    'Una casa estrecha entre medianeras, diseñada para que la escalera se vea desde el salón y le llegue luz desde arriba: once planos para obra, de la distribución a los detalles constructivos.',

  delivered: [
    { value: '11', label: 'planos A3 a 1:50 y 1:10' },
    { value: '6', label: 'detalles constructivos' },
    { value: '3', label: 'secciones' },
    { value: '99,77 m²', label: 'útiles en dos plantas' },
  ],

  skills: [
    {
      area: 'planos',
      text: 'Juego completo de vivienda a 1:50: distribución, cotas, superficies, alzados, tres secciones, cubierta y patios.',
      sample: distribucion,
    },
    {
      area: 'analisis',
      text: 'Detalles constructivos a 1:10 resueltos a la vez que la planta: cubierta, ventana con alféizar, cimentación y baño.',
      sample: detalles,
    },
    {
      area: 'laminas',
      text: 'Once láminas A3 con un mismo cajetín, numeradas y referenciadas entre sí, listas para entregar.',
      sample: seccionAA,
    },
  ],

  highlights: [
    {
      title: 'Una escalera que se ve',
      text: 'El primer tramo arranca de obra hasta una meseta a +0,725; el segundo son doce peldaños de 8 cm volados desde la medianera, con barandilla de pletina. Sin almacén debajo: el hueco queda abierto al salón.',
    },
    {
      title: 'Luz desde arriba y desde la calle',
      text: 'La caja de escalera tiene una fachada de vidrio en U de 1,81 × 5,50 m a la calle y un lucernario al sur con alero de sombra, de modo que la luz baja hasta la planta baja.',
    },
    {
      title: 'Planos al gusto de obra',
      text: 'Criterio del profesor, aparejador: una sola línea fina, muros en relleno sólido y el resto en grises, pocas cotas y cerca de lo que miden, sin textos solapados ni muebles tapando puertas.',
    },
    {
      title: 'AutoCAD manejado por código',
      text: 'Claude Code dibuja en el DWG a través de scripts (PowerShell y COM), maqueta las láminas y las plotea a PDF. Cada ronda de cambios se hace sobre una copia de seguridad del archivo.',
    },
  ],

  figures: [
    { value: '16', label: 'Tabicas de 18,1 cm' },
    { value: '12', label: 'Peldaños volados' },
    { value: '121,74 m²', label: 'Construidos' },
    { value: '1,81 × 5,50 m', label: 'Fachada de vidrio en U' },
  ],

  method: {
    title: 'Cómo se decidió la casa',
    intro:
      'La distribución no se dibujó de una vez: se fue cerrando por rondas. En cada una el autor revisa, corrige y decide, y Claude lo pasa al DWG y regenera las láminas afectadas.',
    steps: [
      {
        title: 'Partir de las condiciones',
        text: 'Parcela entre medianeras de 6,08 m de frente, planta baja y primera, altura libre de 2,60 m y forjados de 30 cm. Fachada a la calle al norte y jardín al sur.',
        value: '6,08 m',
        valueNote: 'frente de parcela',
      },
      {
        title: 'Bocetar antes de dibujar',
        text: 'Cada cambio grande se enseña primero en un boceto sin escala, fuera del DWG. Solo cuando el autor lo aprueba se pasa al plano.',
      },
      {
        title: 'Corregir por rondas',
        text: 'Cocina con triángulo de trabajo, baños más holgados con criterio Neufert, armarios empotrados en los dos dormitorios, despacho en lugar de estar y zona de tendido con lamas.',
      },
      {
        title: 'Hacer visible la escalera',
        text: 'Se quita el almacén bajo la escalera, el segundo tramo pasa a peldaños volados desde la medianera y el hueco se abre al salón.',
        value: '18,125 / 27 cm',
        valueNote: 'tabica / huella',
      },
      {
        title: 'Resolver lo que no se ve en planta',
        text: 'Con la planta cerrada se dibujan alzados, tres secciones, cubierta, carpintería, patios y seis detalles a 1:10, todos con la misma geometría.',
      },
    ],
  },

  context:
    'Ejercicio del módulo «Desarrollo de proyectos de edificación residencial» (2.º CFGS Proyectos de Edificación, I.E.S. Azarquiel, Toledo). Vivienda piloto, tipo N, versión 2: una casa unifamiliar entre medianeras con fachada a la calle al norte y jardín al sur.',
  objective:
    'Entregar el juego de planos de la vivienda en A3: distribución, cotas y superficies; alzados y secciones; cubierta; carpintería; patios y detalles constructivos.',
  problem:
    'En 6 m de ancho hay que meter salón, comedor, cocina, aseo, dos dormitorios, dos baños y un despacho sin que nada quede apretado, con una escalera que no robe luz ni espacio al salón.',

  participation: [
    'Diseño de la vivienda y todas las decisiones de distribución, rondas de corrección incluidas.',
    'Traslado de los criterios del profesor: planos limpios, fáciles de usar en obra, sin grosores de línea.',
    'Dirección de Claude Code en AutoCAD y revisión de cada lámina antes de darla por buena.',
  ],

  tools: ['Claude Code', 'AutoCAD 2026 (COM desde PowerShell)', 'Python (geometría y bocetos)', 'DWG To PDF (ploteo)'],

  methodology: [
    'Definir la geometría de cada planta en coordenadas locales de la parcela, en metros.',
    'Bocetar las alternativas fuera del DWG y decidir con el autor.',
    'Dibujar en el DWG por scripts que Claude escribe y AutoCAD ejecuta, con copia de seguridad antes de cada cambio.',
    'Maquetar cada lámina A3 con su cajetín y plotearla a PDF.',
    'Comprobar textos solapados y entidades sueltas fuera de las zonas de trabajo.',
  ],

  deliverables: [
    'Juego de 11 planos A3 en PDF (distribución, cotas, superficies, alzados, secciones A-A, B-B y C-C, detalles, carpintería, cubierta y patios)',
    'Archivo DWG del proyecto',
  ],

  cover: escalera,

  workflow: [
    {
      title: 'Condiciones y correcciones',
      actor: 'humano',
      description:
        'El autor fija el programa, aporta los criterios del profesor y corrige la propuesta por rondas: cocina, baños, armarios, despacho, zona de tendido y escalera.',
      output: 'Lista de cambios de cada ronda',
    },
    {
      title: 'Bocetos para decidir',
      actor: 'ia',
      tool: 'Claude Code · Python',
      description: 'Antes de tocar el DWG, Claude dibuja un boceto sin escala de la planta y el alzado afectados para que el autor decida.',
      output: 'Bocetos aprobados',
      media: bocetoBaja,
    },
    {
      title: 'Dibujo en AutoCAD por scripts',
      actor: 'software',
      tool: 'AutoCAD 2026 vía COM',
      description:
        'Claude escribe los scripts y AutoCAD dibuja muros, carpinterías, mobiliario, cotas y superficies en el DWG. Antes de cada ronda se guarda una copia del archivo.',
      input: 'Geometría aprobada',
      output: 'DWG actualizado',
    },
    {
      title: 'Láminas y ploteo',
      actor: 'ia',
      tool: 'Claude Code · DWG To PDF',
      description: 'Presentaciones A3 con cajetín, ventanas gráficas a escala y ploteo de cada lámina a PDF.',
      output: '11 planos A3',
      media: seccionAA,
    },
    {
      title: 'Revisión de cada lámina',
      actor: 'humano',
      phase: 'revision',
      description: 'El autor revisa las láminas y devuelve lo que no se lee bien. Ejemplo: las superficies de los patios no se veían y se rehicieron.',
    },
  ],

  media: [
    escalera,
    distribucion,
    cotas,
    superficies,
    alzados,
    seccionAA,
    seccionBB,
    seccionCC,
    cubierta,
    carpinteria,
    detalles,
    patios,
    bocetoBaja,
    bocetoPrimera,
  ],

  documents: [
    {
      id: 'planos-a3',
      title: 'Juego de planos',
      src: `${base}/documentos/casa-piloto-planos-a3.pdf`,
      thumb: `${base}/miniaturas/planos-a3.jpg`,
      description:
        'Distribución, cotas, superficies, alzados, secciones A-A, B-B y C-C, detalles constructivos, carpintería, cubierta y patios.',
      pages: 11,
      sheet: 'A3',
    },
  ],

  tables: [
    {
      title: 'Superficies útiles',
      caption: 'Metros cuadrados, tomados del plano 04.',
      columns: ['Planta', 'Estancia', 'Superficie'],
      numeric: [2],
      rows: [
        ['Baja', 'Salón', '19,28'],
        ['Baja', 'Cocina', '8,10'],
        ['Baja', 'Comedor', '5,76'],
        ['Baja', 'Vestíbulo', '4,98'],
        ['Baja', 'Aseo', '4,00'],
        ['Baja', 'Escalera', '3,98'],
        ['Baja', 'Armario', '2,04'],
        ['Primera', 'Dormitorio 1', '10,33'],
        ['Primera', 'Dormitorio 2', '9,21'],
        ['Primera', 'Despacho', '7,30'],
        ['Primera', 'Distribuidor', '5,50'],
        ['Primera', 'Baño 1', '4,90'],
        ['Primera', 'Baño 2', '4,90'],
        ['Primera', 'Escalera', '4,78'],
        ['Primera', 'Armarios 1, 2 y 3', '3,97'],
        ['Primera', 'Lavadero', '0,74'],
      ],
      footer: ['Total', 'Útil (PB 48,14 + P1 51,63)', '99,77'],
    },
  ],

  results: [
    'Vivienda de 99,77 m² útiles y 121,74 m² construidos en una parcela de 6,08 m de frente.',
    'Escalera vista con el segundo tramo volado desde la medianera y luz cenital por el lucernario.',
    'Once planos A3 coherentes entre sí: plantas, alzados, secciones y detalles salen de la misma geometría.',
  ],

  limitations: [
    'Ejercicio académico: la estructura (peldaños volados, pilares del hueco HEB-140, rebaje del forjado de los baños) está predimensionada y marcada «a calcular».',
    'Las instalaciones no se han dibujado todavía, por decisión del ejercicio.',
  ],

  checks: [
    'Comprobación automática de textos solapados en los PDF.',
    'Comprobación de que no quedan entidades sueltas fuera de las zonas de trabajo del DWG.',
  ],
};

export default project;
