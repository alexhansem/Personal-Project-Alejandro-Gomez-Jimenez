import type { Project } from '../types';

const base = '/proyectos/vivienda-daniel';

const project: Project = {
  slug: 'vivienda-daniel',
  title: 'Vivienda unifamiliar «Daniel»',
  demo: false,
  published: true,
  featured: true,
  order: 2,
  sortDate: '2026-11-10',
  period: 'Octubre–noviembre 2026',
  status: 'ejercicio académico',
  location: 'Ejercicio de clase · CFGS Proyectos de Edificación, módulo Representaciones de Construcción',
  categories: ['delineacion', 'documentacion', 'edificacion', 'ia', 'cad-automatizacion'],

  summary:
    'Proyecto de vivienda unifamiliar de clase, rehecho y mejorado con Claude Code sobre el propio DWG: de siete láminas A4 sueltas a un juego A3 coherente, con cuadros de superficies y de pilares y zapatas, y la fachada acristalada redibujada para que coincida con la estructura.',

  tagline:
    'Los planos de una vivienda hecha en clase, revisados y vueltos a dibujar: mismo proyecto, ahora en un juego A3 ordenado, completo y coherente entre plantas, alzados y estructura.',

  delivered: [
    { value: '7', label: 'planos A3 a escala' },
    { value: '2', label: 'rondas de revisión antes de la entrega' },
    { value: '1', label: 'juego completo en PDF' },
  ],

  skills: [
    {
      area: 'planos',
      text: 'Plantas, cubierta, alzados, secciones, estructura y cimentación a 1:100, con detalles a 1:50 y 1:20.',
      lead: true,
      sample: {
        src: `${base}/planos/02-planta-baja.png`,
        alt: 'Plano A3 de planta baja: vestíbulo, dormitorio, aseo y salón-comedor-cocina de 71 m², aparcamiento, piscina y cuadro de superficies',
        caption: 'Plano 2 · Planta baja · E 1:100',
        kind: 'plano',
        ratio: 1.414,
      },
    },
    {
      area: 'laminas',
      text: 'Un solo cajetín, numeración y escalas en todas las hojas: el juego se entrega e imprime de una vez.',
      sample: {
        src: `${base}/miniaturas/planos-a3.jpg`,
        alt: 'Primera hoja del juego de planos A3 con el cajetín común del proyecto',
        caption: 'Juego de planos A3 · 7 hojas',
        kind: 'esquema',
        ratio: 1.414,
      },
    },
    {
      area: 'analisis',
      text: 'Estructura y fachada cuadradas entre sí: el ventanal se redibujó de pilar a pilar y la cimentación lleva su cuadro.',
      sample: {
        src: `${base}/planos/08-cimentacion.png`,
        alt: 'Plano de cimentación con 13 pilares y sus zapatas, cuadro de pilares y zapatas y detalles de esquina y pilar-zapata',
        caption: 'Plano 8 · Cimentación · E 1:100, 1:50 y 1:20',
        kind: 'plano',
        ratio: 1.414,
      },
    },
  ],

  highlights: [
    {
      title: 'De láminas sueltas a un juego de planos',
      text: 'Los planos de clase eran hojas A4 en vertical con el dibujo girado. La versión mejorada pasa a A3 apaisado, con el mismo cajetín, escala y número de plano en cada hoja.',
    },
    {
      title: 'Lo que faltaba, añadido',
      text: 'Cuadro de superficies útiles y construidas por estancia, cuadro de pilares y zapatas, bajantes y canalones en cubierta, pórticos tipo y detalles de esquina y de pilar-zapata.',
    },
    {
      title: 'La fachada obedece a la estructura',
      text: 'El ventanal de la fachada noreste estaba dibujado en cinco módulos que no casaban con los pilares. Se redibujó en el DWG en cuatro módulos de pilar a pilar, con la viga y el zuncho vistos.',
    },
  ],

  figures: [
    { value: '136,15 m²', label: 'Superficie útil' },
    { value: '155,95 m²', label: 'Superficie construida' },
    { value: '13', label: 'Pilares de 30 × 30 cm' },
    { value: '18,2 / 19,2 %', label: 'Pendientes de cubierta' },
  ],

  context:
    'Proyecto de vivienda unifamiliar de dos plantas hecho en clase (CFGS Proyectos de Edificación, módulo Representaciones de Construcción): salón-comedor-cocina a doble altura, dormitorio y aseo en planta baja, dormitorio principal con baño en planta primera, aparcamiento y piscina en la parcela.',
  objective:
    'Dejar la documentación gráfica del proyecto lista para entregar: un juego A3 completo, ordenado y sin contradicciones entre plantas, alzados, secciones y estructura.',
  problem:
    'Las láminas originales estaban en A4 vertical con el dibujo girado, sin cuadros de superficies ni de cimentación, y el ventanal del alzado no coincidía con los pilares del plano de estructura.',

  participation: [
    'Autor del proyecto y de los planos originales de clase.',
    'Dirección de Claude Code en cada ronda de mejora y revisión de las láminas.',
    'Decisión de que en el ventanal mande el plano de estructura: cinco pilares y cuatro módulos.',
  ],

  tools: ['AutoCAD', 'Claude Code', 'Python (lectura del DWG exportado a DXF)', 'Scripts de AutoCAD (LISP)'],

  methodology: [
    'Partir del DWG de clase sin tocar los originales: todo el trabajo nuevo en una copia aparte.',
    'Revisar el juego completo y corregirlo en dos rondas, cada una con su juego de PDF.',
    'Maquetar en A3 apaisado con cajetín común y añadir cuadros de superficies, de pilares y zapatas y detalles.',
    'Medir el DWG para cuadrar alzado y estructura, y redibujar por script el ventanal de la fachada noreste.',
    'Volver a trazar el plano de alzados y regenerar el juego completo en PDF.',
  ],

  deliverables: [
    'Juego de planos A3: planta baja, planta primera, cubierta, alzados, secciones, estructura y cimentación',
    'Planos en DWG (versión mejorada)',
    'Planos originales de clase, para comparar',
  ],

  cover: {
    src: `${base}/planos/02-planta-baja.png`,
    alt: 'Plano A3 de planta baja de la vivienda con la parcela, piscina, aparcamiento y cuadro de superficies',
    caption: 'Plano 2 · Planta baja · E 1:100',
    kind: 'plano',
    ratio: 1.414,
  },

  workflow: [
    {
      title: 'Planos de clase',
      actor: 'humano',
      tool: 'AutoCAD',
      description: 'Proyecto y planos originales en láminas A4: plantas, cubierta, alzados, secciones, estructura y detalle de patio.',
      output: '7 láminas A4/A3',
      time: { provenance: 'pendiente' },
      media: {
        src: `${base}/original/planta-baja.png`,
        alt: 'Lámina original de planta baja en A4, con el dibujo girado y el cajetín en el lateral',
        caption: 'Original de clase · Planta baja',
        kind: 'plano',
        ratio: 1.414,
      },
    },
    {
      title: 'Primera ronda de revisión',
      actor: 'ia',
      tool: 'Claude Code · AutoCAD',
      description: 'Copia de trabajo del DWG, revisión de todas las hojas y primer juego corregido.',
      output: '6 planos en PDF',
      time: { provenance: 'pendiente' },
    },
    {
      title: 'Segunda ronda de revisión',
      actor: 'ia',
      tool: 'Claude Code · AutoCAD',
      description: 'Correcciones sobre la primera ronda, revisadas por el autor.',
      output: '6 planos en PDF',
      time: { provenance: 'pendiente' },
    },
    {
      title: 'Juego final A3',
      actor: 'ia',
      tool: 'Claude Code · AutoCAD',
      description:
        'Maquetación en A3 apaisado con cajetín común, cuadro de superficies, cuadro de pilares y zapatas, bajantes y canalones, pórticos y detalles.',
      output: 'Juego de planos A3',
      time: { provenance: 'pendiente' },
    },
    {
      title: 'Alzado del ventanal cuadrado con la estructura',
      actor: 'software',
      tool: 'Python + script de AutoCAD',
      description:
        'Un script lee el DWG exportado a DXF, sitúa los cinco pilares de la fachada noreste y genera el ventanal de cuatro módulos (puerta de dos hojas, paño fijo y retícula de cinco filas), con la viga de atado y el zuncho. AutoCAD lo aplica sin abrir la interfaz y vuelve a trazar el plano.',
      input: 'DWG de la versión mejorada',
      output: 'Plano 5 · Alzados corregido',
      time: { provenance: 'pendiente' },
      media: {
        src: `${base}/planos/05-alzados.png`,
        alt: 'Plano de alzados con el ventanal de la fachada noreste en cuatro módulos entre pilares',
        caption: 'Plano 5 · Alzados · E 1:100',
        kind: 'plano',
        ratio: 1.414,
      },
    },
    {
      title: 'Revisión del autor',
      actor: 'humano',
      phase: 'revision',
      description: 'Revisión de cada ronda y decisiones de diseño, como que el ventanal siga al plano de estructura.',
      time: { provenance: 'pendiente' },
    },
  ],

  media: [
    { src: `${base}/planos/02-planta-baja.png`, alt: 'Planta baja con estancias, superficies, aparcamiento, piscina y cuadro de superficies', caption: 'Plano 2 · Planta baja · E 1:100', kind: 'plano', ratio: 1.414 },
    { src: `${base}/planos/03-planta-primera.png`, alt: 'Planta primera con dormitorio principal, baño, distribuidor y vacío sobre el salón', caption: 'Plano 3 · Planta primera · E 1:100', kind: 'plano', ratio: 1.414 },
    { src: `${base}/planos/04-cubierta.png`, alt: 'Planta de cubierta a dos faldones con pendientes de 18,2 % y 19,2 %, canalones, bajantes y detalle de capas', caption: 'Plano 4 · Cubierta · E 1:100', kind: 'plano', ratio: 1.414 },
    { src: `${base}/planos/05-alzados.png`, alt: 'Alzados A, B y C con cotas de altura y plano guía', caption: 'Plano 5 · Alzados · E 1:100', kind: 'plano', ratio: 1.414 },
    { src: `${base}/planos/06-secciones.png`, alt: 'Secciones A-A’ y B-B’ por el salón a doble altura y la escalera, con plano guía', caption: 'Plano 6 · Secciones · E 1:100', kind: 'plano', ratio: 1.414 },
    { src: `${base}/planos/07-estructura.png`, alt: 'Estructura y ejes de replanteo con pórtico tipo y pórtico longitudinal', caption: 'Plano 7 · Estructura y ejes · E 1:100', kind: 'plano', ratio: 1.414 },
    { src: `${base}/planos/08-cimentacion.png`, alt: 'Planta de cimentación con zapatas, cuadro de pilares y zapatas y detalles', caption: 'Plano 8 · Cimentación · E 1:100', kind: 'plano', ratio: 1.414 },
    { src: `${base}/original/planta-baja.png`, alt: 'Lámina original de clase: planta baja en A4', caption: 'Original de clase · Planta baja', kind: 'plano', ratio: 1.414 },
    { src: `${base}/original/planta-primera.png`, alt: 'Lámina original de clase: planta primera en A4', caption: 'Original de clase · Planta primera', kind: 'plano', ratio: 1.414 },
    { src: `${base}/original/cubierta.png`, alt: 'Lámina original de clase: planta de cubierta y detalle en A4', caption: 'Original de clase · Cubierta', kind: 'plano', ratio: 1.414 },
    { src: `${base}/original/alzados.png`, alt: 'Lámina original de clase: alzados en A4', caption: 'Original de clase · Alzados', kind: 'plano', ratio: 1.414 },
    { src: `${base}/original/secciones.png`, alt: 'Lámina original de clase: secciones en A4', caption: 'Original de clase · Secciones', kind: 'plano', ratio: 1.414 },
    { src: `${base}/original/estructura.png`, alt: 'Lámina original de clase: estructura, ejes y cimentación en A3', caption: 'Original de clase · Estructura y cimentación', kind: 'plano', ratio: 1.414 },
    { src: `${base}/original/detalle-patio.png`, alt: 'Lámina original de clase: detalle del patio en A4', caption: 'Original de clase · Detalle de patio', kind: 'detalle', ratio: 1.414 },
  ],

  documents: [
    {
      id: 'planos-a3',
      title: 'Juego de planos A3',
      src: `${base}/documentos/vivienda-daniel-planos-a3.pdf`,
      thumb: `${base}/miniaturas/planos-a3.jpg`,
      description: 'Versión mejorada: plantas, cubierta, alzados, secciones, estructura y cimentación, con cajetín común.',
      pages: 7,
      sheet: 'A3',
    },
    {
      id: 'originales',
      title: 'Planos originales de clase',
      src: `${base}/documentos/vivienda-daniel-originales.pdf`,
      thumb: `${base}/miniaturas/originales.jpg`,
      description: 'Las láminas de partida, tal como se entregaron en clase, para comparar con la versión mejorada.',
      pages: 7,
      sheet: 'A4 / A3',
    },
  ],

  tables: [
    {
      title: 'Cuadro de superficies',
      caption: 'Tomado del plano 2 de la versión mejorada.',
      columns: ['Planta', 'Estancia', 'Superficie útil (m²)'],
      numeric: [2],
      rows: [
        ['Baja', 'Salón-comedor-cocina', '71,06'],
        ['Baja', 'Vestíbulo', '16,38'],
        ['Baja', 'Dormitorio', '6,80'],
        ['Baja', 'Aseo', '4,41'],
        ['Primera', 'Dormitorio principal', '25,09'],
        ['Primera', 'Baño', '8,61'],
        ['Primera', 'Distribuidor', '3,81'],
      ],
      footer: ['', 'Total útil · construida', '136,15 · 155,95'],
    },
  ],

  results: [
    'Juego A3 de siete planos con cajetín, escalas y numeración comunes.',
    'Cuadros de superficies y de pilares y zapatas que antes no estaban.',
    'Alzado del ventanal coherente con el plano de estructura: cinco pilares y cuatro módulos.',
  ],

  limitations: [
    'Ejercicio académico: el canto y el armado de las zapatas quedan «según cálculo».',
    'Los canalones de cubierta se dibujan como propuesta.',
    'El modelo BIM del proyecto está en preparación y no se muestra todavía.',
  ],

  notes:
    'Ejercicio de clase del CFGS Proyectos de Edificación. Se muestran la versión mejorada y las láminas originales para comparar.',
};

export default project;
