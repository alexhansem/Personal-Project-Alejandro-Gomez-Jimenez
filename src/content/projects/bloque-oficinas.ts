import type { Project } from '../types';

const base = '/proyectos/bloque-oficinas';

const lam = (n: string, file: string, alt: string, caption: string, kind: 'plano' | 'detalle' = 'plano') => ({
  src: `${base}/laminas/${file}.png`,
  alt,
  caption: `Plano ${n} · ${caption}`,
  kind,
  ratio: 1.416,
});

const distBaja = lam(
  '2.1',
  '02-1-distribucion-planta-baja',
  'Planta baja: plaza de entrada, porche, vestíbulo de recepción, núcleo de escalera y ascensores, salón de actos, cafetería, patio de bambú y aparcamiento cubierto bajo la planta primera',
  'Distribución planta baja · E 1:100',
);
const distPrimera = lam(
  '2.2',
  '02-2-distribucion-planta-primera',
  'Planta primera: zona de trabajo general con bancadas separadas por mamparas bajas de vidrio, salas de reuniones y de juntas, administración, archivo, aseos y hueco del patio',
  'Distribución planta primera · E 1:100',
);
const distSegunda = lam(
  '2.3',
  '02-3-distribucion-planta-segunda',
  'Planta segunda: despacho de dirección con aseo, secretaría, dos despachos clave, vestíbulo, terraza de dirección y cubiertas no transitables',
  'Distribución planta segunda · E 1:100',
);
const cubiertas = lam(
  '2.4',
  '02-4-cubiertas',
  'Planta de cubiertas dividida en faldones con sus pendientes y sumideros, y cuadro de cada zona de cubierta',
  'Planta de cubiertas · E 1:100',
);
const cotasBaja = lam(
  '3.1',
  '03-1-cotas-superficies-planta-baja',
  'Planta baja acotada con las estancias numeradas y el cuadro de superficies útiles y construidas',
  'Cotas y superficies planta baja · E 1:100',
);
const cotasPrimera = lam(
  '3.2',
  '03-2-cotas-superficies-planta-primera',
  'Planta primera acotada con las estancias numeradas, el cuadro de superficies y el recuento de puestos de trabajo',
  'Cotas y superficies planta primera · E 1:100',
);
const cotasSegunda = lam(
  '3.3',
  '03-3-cotas-superficies-planta-segunda',
  'Planta segunda acotada con las estancias numeradas y el cuadro de superficies',
  'Cotas y superficies planta segunda · E 1:100',
);
const cotasCubierta = lam(
  '3.4',
  '03-4-cotas-superficies-cubiertas',
  'Planta de cubiertas acotada con la superficie, el número de sumideros y la altura de peto de cada zona',
  'Cotas y superficies de cubiertas · E 1:100',
);
const alzados = lam(
  '4',
  '04-alzados',
  'Alzados sur al parque, norte a la calle, este al parque y oeste a la calle principal y la rotonda, con niveles de planta',
  'Alzados · E 1:100',
);
const detalle = lam(
  '5',
  '05-detalle-cerramientos',
  'Encuentro de fachada, pilar y tabique en planta primera a 1:20 y sección horizontal del cerramiento de fachada a 1:5 con sus nueve capas',
  'Detalle de cerramientos · E 1:20 y 1:5',
  'detalle',
);

const portada = {
  src: `${base}/portada/planta-baja-patio.png`,
  alt: 'Fragmento de la planta baja: vestíbulo de recepción, núcleo de escalera y ascensores, salón de actos, cafetería y el patio de bambú en el centro, sobre la retícula de pilares de 5,50 m',
  caption: 'La planta baja alrededor del patio de bambú · E 1:100',
  kind: 'plano' as const,
  ratio: 1.18,
};

const project: Project = {
  slug: 'bloque-oficinas',
  title: 'Edificio de oficinas PB + 2 con patio de bambú',
  demo: false,
  published: true,
  featured: true,
  order: 4,
  sortDate: '2026-11-16',
  period: 'Octubre–noviembre 2026',
  status: 'ejercicio académico',
  location: 'Ejercicio de 2.º CFGS Proyectos de Edificación · I.E.S. Azarquiel, Toledo',
  categories: ['delineacion', 'documentacion', 'edificacion', 'cad-automatizacion', 'ia'],

  summary:
    'Proyecto de un edificio de oficinas de uso administrativo para 90 trabajadores (planta baja + 2) en el módulo de edificación no residencial: diez láminas A1 dibujadas en AutoCAD por Claude Code mediante scripts, con la distribución decidida y revisada por el autor.',

  tagline:
    'Un edificio de oficinas para 90 personas organizado alrededor de un patio de bambú abierto al parque: plantas, cotas y superficies, cubiertas, alzados y detalle de cerramiento.',

  delivered: [
    { value: '10', label: 'láminas A1 a 1:100, 1:20 y 1:5' },
    { value: '94', label: 'puestos de trabajo' },
    { value: '3', label: 'plantas sobre rasante' },
    { value: '1.130,84 m²', label: 'útiles en tres plantas' },
  ],

  skills: [
    {
      area: 'planos',
      text: 'Juego de plantas a 1:100 sobre una retícula de pilares numerada: distribución, cotas y superficies de cada planta y de la cubierta.',
      sample: distPrimera,
    },
    {
      area: 'analisis',
      text: 'Parámetros urbanísticos, puestos por superficie y sumideros de cubierta comprobados contra el enunciado y el CTE DB-HS5.',
      sample: cubiertas,
    },
    {
      area: 'laminas',
      text: 'Diez láminas A1 con un mismo cajetín y numeración por planta, listas para la primera entrega.',
      sample: alzados,
    },
  ],

  highlights: [
    {
      title: 'Un patio de bambú en el centro',
      text: 'El patio de 10,55 × 16,50 m se abre al parque y separa la recepción del salón de actos y la cafetería. En planta baja lo cruza un paso; desde las plantas de arriba se ve como un hueco verde.',
    },
    {
      title: 'Planta libre sobre retícula',
      text: 'Pilares de hormigón armado de 40 × 40 cada 5,50 m en las dos direcciones y ningún muro de carga: la distribución de cada planta queda libre de la estructura.',
    },
    {
      title: 'Ochenta puestos en una sola sala',
      text: 'La zona de trabajo general de la planta primera reúne 80 puestos a 5,27 m² cada uno, dentro de los 5 a 6 m² del enunciado, con mamparas bajas de vidrio de 1,20 m entre bancadas.',
    },
    {
      title: 'Cubiertas que desaguan',
      text: 'Cinco zonas de cubierta, transitables y no transitables, divididas en faldones con su pendiente y un sumidero de 200 × 200 en el centro de cada uno, según el CTE DB-HS5.',
    },
  ],

  figures: [
    { value: '45 %', label: 'Ocupación (máx. 70 %)' },
    { value: '0,88 m²/m²', label: 'Edificabilidad (máx. 1,50)' },
    { value: '5,50 × 5,50 m', label: 'Retícula de pilares' },
    { value: '15', label: 'Sumideros en cubierta' },
  ],

  method: {
    title: 'Cómo se organizó el edificio',
    intro:
      'El enunciado fija el uso, el número de trabajadores y la parcela. A partir de ahí el edificio se ordena por plantas, de lo público a lo privado, y cada planta se comprueba con su cuadro de superficies.',
    steps: [
      {
        title: 'Partir de la retícula',
        text: 'Pilares de 40 × 40 cada 5,50 m, planta a planta de 3,50 m con suelo técnico de 15 cm y falso techo de 40 cm, para dejar 2,65 m de altura libre.',
        value: '2,65 m',
        valueNote: 'altura libre',
      },
      {
        title: 'Planta baja para recibir',
        text: 'Plaza de entrada y porche hacia la rotonda, recepción, salón de actos para 60 personas más 2 plazas PMR, cafetería y 12 plazas de aparcamiento cubierto bajo la planta primera.',
      },
      {
        title: 'Planta primera para trabajar',
        text: 'La zona de trabajo general ocupa la mayor parte de la planta, con salas de reuniones, sala de juntas, administración y archivo alrededor.',
        value: '421,82 m²',
        valueNote: 'zona de trabajo general',
      },
      {
        title: 'Planta segunda para dirigir',
        text: 'Despacho de dirección, secretaría y dos despachos clave, con la terraza de dirección sobre la cubierta de la planta primera.',
      },
      {
        title: 'Comprobar con números',
        text: 'Cuadros de superficies por planta, recuento de puestos, ocupación, edificabilidad y retranqueos frente a los máximos del enunciado.',
        value: '94',
        valueNote: 'puestos para 90 trabajadores',
      },
    ],
  },

  context:
    'Ejercicio del módulo «Desarrollo de proyectos de edificación no residencial» (2.º CFGS Proyectos de Edificación, I.E.S. Azarquiel, Toledo). Edificio de oficinas de uso administrativo, planta baja y dos plantas, para 90 trabajadores, en una parcela entre una calle principal, una calle al norte y un parque.',
  objective:
    'Primera entrega del proyecto en láminas A1: distribución de cada planta y de la cubierta, cotas y superficies, alzados y detalle de cerramientos.',
  problem:
    'Encajar 90 puestos de trabajo, salón de actos, cafetería, aparcamiento y despachos de dirección dentro de la ocupación, la edificabilidad y los retranqueos del enunciado, sin que el edificio pierda luz ni relación con el parque.',

  participation: [
    'Diseño del edificio y decisiones de distribución en cada planta.',
    'Aplicación de los requisitos del enunciado: puestos, superficie por puesto, alturas y parámetros urbanísticos.',
    'Dirección de Claude Code en AutoCAD y revisión de cada lámina antes de darla por buena.',
  ],

  tools: ['Claude Code', 'AutoCAD (dibujo por scripts)', 'CTE DB-HS5 (saneamiento de cubiertas)'],

  methodology: [
    'Fijar la retícula estructural y los niveles de planta.',
    'Distribuir cada planta y dibujarla en el DWG mediante scripts que Claude escribe y AutoCAD ejecuta, con copia de seguridad antes de cada cambio grande.',
    'Calcular superficies, puestos y parámetros urbanísticos y llevarlos a los cuadros de cada lámina.',
    'Maquetar las láminas A1 con su cajetín y plotearlas a PDF.',
  ],

  deliverables: [
    'Juego de 10 láminas A1 en PDF: distribución, cotas y superficies de las tres plantas y la cubierta, alzados y detalle de cerramientos',
    'Archivo DWG del proyecto',
  ],

  cover: portada,

  workflow: [
    {
      title: 'Programa y criterios',
      actor: 'humano',
      description:
        'El autor fija el programa a partir del enunciado (uso, trabajadores, superficie por puesto, parámetros de la parcela) y decide cómo se reparte por plantas.',
      output: 'Programa por plantas',
    },
    {
      title: 'Dibujo en AutoCAD por scripts',
      actor: 'software',
      tool: 'AutoCAD · scripts de Claude Code',
      description:
        'Claude escribe los scripts y AutoCAD dibuja retícula, cerramientos, tabiquería, mobiliario, cotas y superficies en el DWG.',
      input: 'Distribución decidida',
      output: 'DWG actualizado',
      media: distBaja,
    },
    {
      title: 'Cuadros y comprobaciones',
      actor: 'ia',
      tool: 'Claude Code',
      description:
        'Cálculo de superficies útiles y construidas, puestos por planta, ocupación, edificabilidad, retranqueos y sumideros de cubierta.',
      output: 'Cuadros de superficies y parámetros',
      media: cotasPrimera,
    },
    {
      title: 'Láminas y ploteo',
      actor: 'ia',
      tool: 'Claude Code · AutoCAD',
      description: 'Presentaciones A1 con cajetín, ventanas gráficas a escala y ploteo de cada lámina a PDF.',
      output: '10 láminas A1',
    },
    {
      title: 'Revisión de cada lámina',
      actor: 'humano',
      phase: 'revision',
      description:
        'El autor revisa las láminas y pide cambios; por ejemplo, las mamparas bajas de vidrio entre bancadas en la planta primera.',
    },
  ],

  media: [
    portada,
    distBaja,
    distPrimera,
    distSegunda,
    cubiertas,
    cotasBaja,
    cotasPrimera,
    cotasSegunda,
    cotasCubierta,
    alzados,
    detalle,
  ],

  documents: [
    {
      id: 'planos-a1',
      title: 'Juego de planos',
      src: `${base}/documentos/bloque-oficinas-planos-a1.pdf`,
      thumb: `${base}/miniaturas/planos-a1.jpg`,
      description:
        'Distribución, cotas y superficies de planta baja, primera, segunda y cubierta, alzados y detalle de cerramientos.',
      pages: 10,
      sheet: 'A1',
    },
  ],

  tables: [
    {
      title: 'Superficies por planta',
      caption: 'Metros cuadrados, tomados de los planos 3.1, 3.2 y 3.3. La útil no incluye terrazas ni áreas exteriores.',
      columns: ['Planta', 'Uso principal', 'Útil', 'Construida'],
      numeric: [2, 3],
      rows: [
        ['Baja', 'Recepción, salón de actos y cafetería', '293,00', '365,53'],
        ['Primera', 'Zona de trabajo, reuniones y administración', '685,33', '760,85'],
        ['Segunda', 'Dirección y despachos', '152,51', '196,55'],
      ],
      footer: ['Total', '', '1.130,84', '1.322,93'],
    },
    {
      title: 'Cubiertas',
      caption: 'Superficie en proyección horizontal, tomada del plano 3.4.',
      columns: ['Zona', 'Tipo', 'Superficie', 'Sumideros', 'Peto'],
      numeric: [2, 3, 4],
      rows: [
        ['C1 · Oeste (P1)', 'No transitable, grava', '254,76', '4', '0,40'],
        ['C2 · Este (P1)', 'No transitable, grava', '125,95', '3', '0,40'],
        ['T1 · Terraza dirección (P2)', 'Transitable, solado fijo', '183,59', '3', '1,10'],
        ['TP · Terraza 1 (P1)', 'Transitable, solado fijo', '18,30', '2', '1,10'],
        ['C3 · Cubierta (P2)', 'No transitable, grava', '196,55', '3', '0,40'],
      ],
    },
  ],

  results: [
    'Edificio de 1.130,84 m² útiles en tres plantas, con 94 puestos de trabajo para 90 trabajadores.',
    'Ocupación del 45 % y edificabilidad de 0,88 m²/m², por debajo de los máximos del enunciado (70 % y 1,50).',
    'Diez láminas A1 coherentes entre sí: plantas, cotas, cubiertas y alzados salen del mismo DWG.',
  ],

  limitations: [
    'Ejercicio académico: el mobiliario es orientativo.',
    'Esta es la primera entrega del ejercicio (planos de distribución, cotas, alzados y detalle).',
  ],

  checks: [
    'Superficie por puesto frente a los 5 a 6 m² del enunciado.',
    'Ocupación, edificabilidad y retranqueos frente a los máximos del enunciado.',
    'Número de sumideros de cada cubierta según la tabla 4.6 del CTE DB-HS5.',
  ],
};

export default project;
