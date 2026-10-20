import type { Project } from '../types';

const base = '/proyectos/rehabilitacion-toledo';

const project: Project = {
  slug: 'rehabilitacion-toledo',
  title: 'Rehabilitación de un edificio de viviendas de 1969',
  demo: false,
  published: true,
  featured: true,
  order: 0,
  sortDate: '2026-10-19',
  period: 'Octubre 2026',
  status: 'en desarrollo',
  location: 'Edificio plurifamiliar en esquina · Toledo',
  categories: ['bim', 'edificacion', 'documentacion', 'ia', 'cad-automatizacion'],

  summary:
    'Rehabilitación integral de un edificio real de 1969, desde el plano existente hasta el estudio de viabilidad y el preproyecto completo: estado actual en CAD y BIM, estructura oculta deducida por probabilidad, normativa, escenarios, distribución y presupuesto medido partida a partida. Preparado para presentarlo a inversores o para que lo firme un técnico competente.',

  highlights: [
    {
      title: 'Un proyecto completo, no un ejercicio',
      text: 'Cubre todo el recorrido de una operación real: qué hay, qué se puede hacer, qué conviene hacer y cuánto cuesta. El mismo trabajo sirve para decidir una inversión y como base del proyecto que firma el arquitecto.',
    },
    {
      title: 'Una estructura que no se ve, deducida',
      text: 'Los pilares y jácenas metálicos están ocultos tras los tabiques. Su posición se dedujo de pistas en el CAD y simulando 300 veces cómo habría calculado el constructor de 1969, para ordenar las catas en lugar de abrir a ciegas.',
    },
    {
      title: 'El CAD se convierte solo en modelo',
      text: 'Los muros se reconocen automáticamente como pares de líneas paralelas y su espesor dice qué son. Un único archivo de datos regenera DXF, DWG, el modelo IFC y las láminas en menos de un minuto.',
    },
    {
      title: 'Cada dato, contrastado',
      text: 'El CAD se revisa antes de modelar y se superpone a la huella oficial del Catastro: la fachada confirma el CAD frente al croquis de obra y el fondo explica la diferencia de superficies.',
    },
  ],

  figures: [
    { value: '300', label: 'Escenarios simulados' },
    { value: '91 %', label: 'Esquema estructural más probable' },
    { value: '144', label: 'Elementos constructivos en el IFC' },
    { value: '202', label: 'Partidas medidas con precios CYPE' },
  ],

  scope: {
    title: 'Del plano existente al proyecto para firma',
    intro:
      'El encargo no se quedó en levantar el edificio. Se llegó hasta el estudio de viabilidad completo y un preproyecto con presupuesto por mediciones, con dos salidas: un dosier para decidir la inversión y la documentación técnica para que un arquitecto la revise y la firme.',
    stages: [
      {
        title: 'Estado actual',
        text: 'El CAD de partida se revisa, se contrasta con el Catastro y se convierte en planos limpios y en un modelo BIM del edificio tal como está.',
        outputs: ['DXF / DWG', 'IFC4', '8 láminas A3'],
      },
      {
        title: 'Estructura supuesta',
        text: 'Pilares y jácenas ocultos deducidos con criterios de 1969 y 300 simulaciones, con su probabilidad y un plan de catas para la visita de obra.',
        outputs: ['ES-01', 'ES-02', '8 catas'],
      },
      {
        title: 'Viabilidad urbanística y legal',
        text: 'Ordenanza de zona, condiciones de vivienda mínima, patios, accesibilidad, aparcamiento y propiedad horizontal, aplicados al edificio concreto.',
        outputs: ['Marco normativo', 'Riesgos legales'],
      },
      {
        title: 'Escenarios de programa',
        text: 'Tres alternativas medidas sobre la geometría real: mantener dos viviendas por planta, pasar a tres, o ganar el sótano y las casetas. Se recomienda la primera con argumentos.',
        outputs: ['V-01', 'V-02', 'V-03'],
      },
      {
        title: 'Proyecto básico: distribución',
        text: 'Planta tipo amueblada en dos versiones, con ascensor en el patio, portal accesible y ventilación mecánica donde el patio no da luces suficientes.',
        outputs: ['Variantes B1 y B2'],
      },
      {
        title: 'Mediciones y presupuesto',
        text: 'Cada partida medida desde las estancias del modelo y valorada con el generador de precios de CYPE para esta obra, en 15 capítulos y exportada a BC3.',
        outputs: ['202 partidas', 'BC3', 'PEM por capítulos'],
      },
      {
        title: 'Viabilidad económica',
        text: 'Modelo de compra, obra, financiación, venta y ayudas, con su sensibilidad: qué precio de venta hace falta, qué precio de compra se sostiene y qué puede torcer la operación.',
        outputs: ['Método residual', 'Sensibilidad', 'Ayudas'],
      },
      {
        title: 'Dosier de presentación',
        text: 'Toda la información anterior ordenada en una propuesta de 32 diapositivas, con una lectura para cada perfil: general, inversor y técnico.',
        outputs: ['32 diapositivas', 'Anexo técnico'],
      },
    ],
    audiences: [
      {
        audience: 'Para el inversor',
        title: 'Una decisión con números que se pueden defender',
        text: 'El dosier explica la operación en dos minutos y la desarrolla en quince: de dónde sale el resultado, con qué metros se cuenta, qué riesgos tiene y qué ayudas encajan. Cada cifra remite a una medición, no a un ratio.',
        items: [
          'Superficie vendible justificada frente al Catastro',
          'Presupuesto medido, con ofertas reales comparables a ±10 %',
          'Sensibilidad al precio de venta y riesgos con su cobertura',
        ],
      },
      {
        audience: 'Para el técnico que firma',
        title: 'Documentación de trabajo lista para revisar',
        text: 'El arquitecto recibe la documentación en sus formatos de trabajo y con cada hipótesis señalada. Solo con el título de Técnico Superior no se puede firmar: el objetivo es dejarle hecho el 80-90 % y que revise y firme.',
        items: [
          'DWG por capas, IFC4 y láminas A3 regenerables',
          'Presupuesto en BC3 para abrir en CYPE o Presto',
          'Sellos de hipótesis, pendiente de verificar en obra y a firmar',
        ],
      },
    ],
  },

  model: {
    src: `${base}/modelo/estado-actual.glb`,
    ifc: `${base}/modelo/estado-actual.ifc`,
    poster: `${base}/modelo/estado-actual.jpg`,
    alt: 'Modelo 3D del estado actual del edificio: fachada en esquina con balcones volados, terraza plana con pretil rematado en teja, casetas y torreón de escalera',
    caption:
      'Estado actual regenerado desde la tabla de datos del CAD: muros con sus huecos, forjados, escalera, balcones y terraza de cubierta. Alturas de casetas, pretil y ventanas de escalera según hipótesis del proyecto.',
    size: '0,2 MB',
    storeys: [
      { key: 'sotano', label: 'Sótano' },
      { key: 'pb', label: 'Baja' },
      { key: 'p1', label: '1ª' },
      { key: 'p2', label: '2ª' },
      { key: 'p3', label: '3ª' },
      { key: 'cubierta', label: 'Cubierta' },
    ],
  },

  method: {
    title: 'Cómo se dedujo la estructura sin abrir catas',
    intro:
      'Del edificio solo se sabía que las fachadas son de carga y que el interior es metálico. Dónde están los pilares no aparece en ningún plano. Se razonó como lo habría hecho el constructor de la época y se midió cuánto de seguro es cada pilar.',
    steps: [
      {
        value: '7,36 m',
        valueNote: 'libres entre fachadas',
        title: 'Hace falta un apoyo intermedio',
        text: 'Una vigueta de 1969 salvaba como mucho unos 5 m. Con 7,36 m entre fachadas tiene que existir una línea de jácenas paralela a la fachada.',
      },
      {
        value: 'y ≈ 4,70 m',
        valueNote: '3 pistas en la misma línea',
        title: 'Buscar pistas en el CAD',
        text: 'Un tabique de 0,20 m entre tabiques de 0,10 (forra una jácena), machones de 0,26 × 0,33 m en las esquinas del patio y la escalera (pilar forrado) y un cruce de tabiques. Las tres caen en la misma línea.',
      },
      {
        value: 'IPN 160–240',
        valueNote: 'MV-101/1962 · MV-102/1964',
        title: 'Aplicar las reglas de la época',
        text: 'Cargas y acero A42 de la normativa de los años 60, cálculo por tensiones admisibles y perfiles IPN de producción nacional. Cada tramo de jácena recibe el perfil que habría elegido el constructor.',
      },
      {
        value: '300',
        valueNote: 'escenarios Monte Carlo',
        title: 'Simular al constructor',
        text: 'Sobrecarga, tensión admisible, flecha, continuidad y coste de un pilar se sortean. En cada escenario se busca la colocación de pilares de menor coste, con una condición física: un pilar solo puede estar dentro de un muro o como machón en un tabique, nunca en mitad de una estancia.',
      },
      {
        value: '91 %',
        valueNote: 'esquema con jácena central',
        title: 'Leer el resultado',
        text: 'El esquema de viguetas perpendiculares a fachada con jácena en y ≈ 4,70 explica el tabique de 0,20 y los balcones volados. Lo más probable son 5 pilares por planta (34 %); que haya más de 4, un 78 %.',
      },
      {
        value: '8 catas',
        valueNote: 'ordenadas por probabilidad',
        title: 'Decidir dónde mirar primero',
        text: 'El cálculo no sustituye a las catas, pero las ordena: primero el tabique de 0,20 y los cruces de tabiques de la vivienda derecha. Incluye el ensayo de cemento aluminoso en viguetas, usado hasta 1977.',
      },
    ],
  },

  context:
    'Edificio residencial real de 1969 en esquina, con sótano, planta baja, tres plantas tipo de dos viviendas en torno a escalera y patio, y cubierta en terraza con casetas y torreón de escalera. Trabajo propio para una operación real: comprar el edificio, rehabilitar siete viviendas con ascensor y venderlas. La octava vivienda es de otro propietario y queda fuera del alcance.',
  objective:
    'Comprobar hasta dónde se llega en un proyecto completo de reforma: desde el plano existente hasta un estudio de viabilidad y un preproyecto que sirvan a la vez para presentar la operación a inversores y para que un arquitecto lo revise y lo firme.',
  problem:
    'El plano de partida tenía tres versiones mezcladas de la planta tipo, no tenía cotas de altura y sus superficies no coincidían con las oficiales. La estructura interior no se veía y la normativa aplicable estaba repartida entre un plan de 1986 y sus modificaciones.',

  cover: {
    src: `${base}/imagenes/modelo-frontal.jpg`,
    alt: 'Modelo 3D del edificio en esquina: cuatro plantas de fachada ocre, balcones volados con barandilla, terraza de cubierta, casetas y torreón',
    caption: 'Modelo 3D del estado actual · vista frontal',
    kind: 'modelo',
    ratio: 1.5,
  },

  workflow: [
    {
      title: 'Material de partida',
      actor: 'humano',
      tool: 'Obra · AutoCAD · Catastro',
      description:
        'Plano CAD de la planta, croquis con las medidas tomadas en obra, foto de fachada y datos catastrales. Datos propios de la estructura: fachadas de carga e interior metálico.',
      output: 'Encargo y criterios: manda el CAD',
    },
    {
      title: 'Revisión del CAD antes de modelar',
      actor: 'ia',
      tool: 'Claude Code · ezdxf',
      description:
        'El DXF tenía tres copias distintas de la planta tipo. Se elige la final por tres motivos: es la impresa, sus elementos son los más recientes del archivo y coincide con la foto. Se detectan 12 líneas duplicadas y que los rótulos de superficie son construidas, no útiles.',
      output: 'Informe de incoherencias con decisiones',
      media: {
        src: `${base}/imagenes/r2-copias-planta-tipo.png`,
        alt: 'Superposición de las dos copias de la planta tipo con las diferencias de ventanas marcadas en rojo y azul',
        caption: 'R2 · Diferencias entre las copias de la planta tipo',
        kind: 'esquema',
        ratio: 2.178,
      },
    },
    {
      title: 'Contraste con el Catastro',
      actor: 'ia',
      tool: 'Datos oficiales GML/WMS',
      description:
        'La huella catastral se superpone al CAD. La fachada coincide (19,37 frente a 19,21 m) y descarta el croquis (18,17 m). El fondo no coincide (6,80–7,49 frente a 7,96 m) y explica la mayor parte del exceso de superficie sobre la cifra oficial.',
      output: 'Diferencias documentadas para el arquitecto',
      media: {
        src: `${base}/imagenes/r1-cad-vs-catastro.png`,
        alt: 'Planta tipo del CAD con la parcela y la huella catastral superpuestas y cuatro diferencias numeradas',
        caption: 'R1 · CAD frente a Catastro',
        kind: 'esquema',
        ratio: 1.22,
      },
    },
    {
      title: 'Estado actual en CAD y BIM desde un solo archivo',
      actor: 'software',
      tool: 'Python · ezdxf · shapely · IFC4',
      description:
        'Los muros se detectan como pares de líneas paralelas separadas entre 6 y 36 cm, y el espesor los clasifica: 0,30 fachada, 0,20 escalera, 0,21 patio, 0,10 tabique. Las alturas se miden en el alzado: 2,93 m entre plantas, libre de 2,60 m, que coincide con el croquis. Con todo ello se generan el DXF/DWG por capas, un primer IFC4 y 8 láminas A3.',
      input: 'CAD original',
      output: 'DXF/DWG por capas y láminas de estado actual',
    },
    {
      title: 'Modelo 3D rehecho tras la revisión',
      actor: 'ia',
      phase: 'revision',
      tool: 'Python · shapely · trimesh · IfcOpenShell · three.js',
      description:
        'El primer IFC no convencía: muros troceados en cientos de piezas, cantos de forjado asomando en fachada y una cubierta mal resuelta. Se rehace desde la misma tabla de datos: los muros se fusionan por tipo y planta, se rellenan bajo y sobre cada hueco y se abren por franjas de altura; los forjados acaban en la cara interior de la fachada; la cubierta es una terraza plana transitable con pretil rematado en teja, y solo el torreón de la escalera lleva tejado a cuatro aguas.',
      input: 'Tabla de datos del estado actual',
      output: 'IFC4 validado sin errores (144 elementos constructivos y 71 espacios) y modelo web por plantas',
      media: {
        src: `${base}/imagenes/modelo-corte-p1.jpg`,
        alt: 'Modelo 3D cortado por encima de la planta primera: tabiquería de las dos viviendas, escalera y patio',
        caption: 'Modelo cortado sobre la planta 1ª',
        kind: 'modelo',
        ratio: 1.5,
      },
    },
    {
      title: 'Estructura supuesta y probabilidad de pilares',
      actor: 'ia',
      tool: 'Claude Code · Python',
      description:
        'Razonamiento con criterios de 1969 y simulación de 300 escenarios. Cada pilar deducido queda marcado «supuesto, verificar con cata» y cada elemento del modelo lleva su origen y su estado.',
      output: 'Láminas ES-01 y ES-02 con 8 catas propuestas',
      media: {
        src: `${base}/planos/es02-probabilidad-pilares.png`,
        alt: 'Lámina con la línea de jácenas, los pilares probables con su porcentaje y gráficos de probabilidad por tramo',
        caption: 'ES-02 · Probabilidad de ubicación de pilares',
        kind: 'plano',
        ratio: 1.414,
      },
    },
    {
      title: 'Revisión con datos de obra',
      actor: 'humano',
      phase: 'revision',
      description:
        'Correcciones propias sobre el modelo: el patio lo cierra una tapia de la finca trasera y la esquina trasera derecha es un dormitorio, no un patio. Se regenera todo y las superficies cambian en consecuencia.',
      output: 'Modelo corregido',
    },
    {
      title: 'Marco normativo y escenarios',
      actor: 'ia',
      tool: 'Normas urbanísticas · CTE · LPH',
      description:
        'Lectura de la ordenanza de zona y de las condiciones de vivienda mínima. Tres escenarios: A, dos viviendas por planta mejoradas y con ascensor en el patio; B, tres por planta; C, sótano y casetas. Se recomienda A.',
      output: 'Láminas V-01 a V-03',
      media: {
        src: `${base}/planos/v02-escenario-b.png`,
        alt: 'Lámina del escenario B con el mejor reparto posible de la vivienda derecha en dos unidades y sus superficies',
        caption: 'V-02 · Escenario B: por qué no cabe',
        kind: 'plano',
        ratio: 1.414,
      },
    },
    {
      title: 'Propuesta de distribución',
      actor: 'humano',
      tool: 'AutoCAD',
      description:
        'Distribución propia de la planta tipo dibujada en AutoCAD, que se lee y se comprueba: un dormitorio quedaba en 5,90 m² y se ajusta a 6,06 m². En paralelo, una variante para la vivienda derecha con un quiebro de entrada que hace visible el balcón desde el 71 % del recibidor.',
      output: 'Variantes B1 y B2 de la planta tipo',
      media: {
        src: `${base}/imagenes/propuestas-planta-tipo.png`,
        alt: 'Dos plantas tipo amuebladas: la versión propia y la variante con quiebro de entrada en la vivienda derecha',
        caption: 'Propuestas de distribución B1 y B2',
        kind: 'plano',
        ratio: 0.742,
      },
    },
    {
      title: 'Presupuesto por mediciones',
      actor: 'software',
      tool: 'Generador de precios CYPE · BC3',
      description:
        'Mediciones calculadas desde las estancias del escenario A y los huecos del CAD, con precios del generador de CYPE para esta obra, exportadas a BC3 para abrir en CYPE o Presto. Calidades elegidas con criterio propio: gama media, segura y sin derroche. La revisión encontró dos errores antes de cerrar: una partida contada dos veces y una red que faltaba.',
      output: '202 partidas en 15 capítulos, en BC3',
      media: {
        src: `${base}/dosier/dosier-capitulos.png`,
        alt: 'Gráfico de barras del presupuesto de ejecución material por capítulos, de instalaciones de las viviendas a gestión de residuos',
        caption: 'Presupuesto por capítulos',
        kind: 'esquema',
        ratio: 1.778,
      },
    },
    {
      title: 'Viabilidad económica',
      actor: 'ia',
      tool: 'Python · modelo económico',
      description:
        'Método residual: del precio de venta se restan obra, impuestos, honorarios, financiación y beneficio para saber qué precio de compra se sostiene. Se cruza con el mercado del barrio, las ayudas públicas vigentes y la propiedad horizontal.',
      output: 'Sensibilidad y estrategias de la operación',
    },
    {
      title: 'Revisión de la cuenta',
      actor: 'humano',
      phase: 'revision',
      description:
        'Objeción propia a la primera versión, que salía a pérdidas en todos los escenarios. Se revisan partida a partida la obra y la cuenta del promotor, y más adelante el presupuesto pasa de ratios a mediciones.',
      output: 'Presupuesto y cuenta corregidos',
    },
    {
      title: 'Dosier de presentación',
      actor: 'ia',
      tool: 'Claude Code',
      description:
        'Propuesta de 32 diapositivas con tres lecturas: dos minutos para todos, quince para el inversor y un anexo técnico para el arquitecto. Cada diapositiva indica para quién es y todo lleva el sello de hipótesis.',
      output: 'Propuesta de inversión con anexo técnico',
      media: {
        src: `${base}/dosier/dosier-lecturas.png`,
        alt: 'Diapositiva con tres tarjetas: para todos, 2 minutos; inversor, 15 minutos; técnico, a fondo',
        caption: 'Dosier · tres formas de leer la propuesta',
        kind: 'esquema',
        ratio: 1.778,
      },
    },
  ],

  media: [
    { src: `${base}/imagenes/modelo-trasera.jpg`, alt: 'Vista 3D trasera del modelo con el patio central abierto, la tapia de la finca trasera, casetas y torreón', caption: 'Modelo 3D · vista trasera', kind: 'modelo', ratio: 1.5 },
    { src: `${base}/planos/ea04-planta-tipo.png`, alt: 'Planta tipo a 1:50 con las dos viviendas, escalera central, patio y superficies por estancia', caption: 'EA-04 · Planta tipo 1ª, 2ª y 3ª · E 1:50', kind: 'plano', ratio: 1.414 },
    { src: `${base}/planos/ea03-planta-baja.png`, alt: 'Planta baja a 1:50 con portal, escalera y la vivienda fuera de alcance rayada', caption: 'EA-03 · Planta baja · E 1:50', kind: 'plano', ratio: 1.414 },
    { src: `${base}/planos/ea05-cubierta.png`, alt: 'Planta de cubierta con las dos casetas y el torreón de escalera', caption: 'EA-05 · Cubierta · E 1:50', kind: 'plano', ratio: 1.414 },
    { src: `${base}/planos/ea06-alzado.png`, alt: 'Alzado principal con cotas de nivel, balcones volados y la calle en pendiente', caption: 'EA-06 · Alzado principal · E 1:100', kind: 'plano', ratio: 1.414 },
    { src: `${base}/planos/es01-estructura-supuesta.png`, alt: 'Planta de estructura supuesta con viguetas, jácena por tramos con su perfil IPN, pilares y catas', caption: 'ES-01 · Estructura supuesta y catas · E 1:50', kind: 'plano', ratio: 1.414 },
    { src: `${base}/planos/es02-probabilidad-pilares.png`, alt: 'Probabilidad de ubicación de pilares a lo largo de la línea de jácenas', caption: 'ES-02 · Probabilidad de pilares', kind: 'plano', ratio: 1.414 },
    { src: `${base}/planos/v01-escenario-a.png`, alt: 'Escenario A: plantas con dos viviendas de tres dormitorios y ascensor en el patio', caption: 'V-01 · Escenario A, recomendado', kind: 'plano', ratio: 1.414 },
    { src: `${base}/dosier/dosier-preproyecto.png`, alt: 'Diapositiva con ocho tarjetas: estado actual, estructura, urbanismo, riesgo legal, distribución, presupuesto, modelo económico y panel de control', caption: 'Dosier · qué hay detrás de las cifras', kind: 'esquema', ratio: 1.778 },
    { src: `${base}/dosier/dosier-calidades.png`, alt: 'Diapositiva de calidades de gama media: puerta acorazada, ventanas de PVC, laminado, baños, aerotermia, clima, cocina y ascensor', caption: 'Dosier · calidades del presupuesto', kind: 'esquema', ratio: 1.778 },
    { src: `${base}/dosier/dosier-metodo.png`, alt: 'Diapositiva del anexo técnico: cadena CAD, modelo, planos, mediciones, CYPE y BC3, cuenta', caption: 'Dosier · anexo técnico, todo sale del mismo modelo', kind: 'esquema', ratio: 1.778 },
  ],

  tables: [
    {
      title: 'Viabilidad urbanística: Ordenanza 7A aplicada a la parcela',
      caption: 'Lectura técnica de la norma de zona del plan de 1986 y sus condiciones generales. A confirmar con el Ayuntamiento.',
      columns: ['Condición', 'Qué dice la norma', 'Resultado en el edificio'],
      rows: [
        ['Edificabilidad y altura', 'La de los planos de alineaciones', 'PB + 3 ya es la máxima: no se puede ganar volumen'],
        ['Número de viviendas', 'No se fija límite', 'El tope lo ponen la vivienda mínima, la exterioridad y los patios'],
        ['Ascensor en el patio', 'Permitido en edificios existentes sin otra ubicación (art. 94.2)', 'Cabe un hueco de 1,60 × 1,75 en el patio central'],
        ['Luces del patio', 'Al menos 1/4 de la altura del muro de enfrente', 'Piezas habitables al patio solo en P2 y P3'],
        ['Sótano', 'No se admiten viviendas en sótano', '2,04 m libres: trasteros y cuarto de instalaciones'],
        ['Casetas de cubierta', 'Trasteros de hasta 10 m², sin huecos', 'Nunca vivienda; trasteros solo si son legales'],
        ['Aparcamiento', '1 plaza por vivienda, salvo inviabilidad', 'Exención justificable: parcela 100 % construida'],
        ['Propiedad horizontal', 'Dividir pisos exige 3/5 (LPH art. 10.3.b)', 'Hace falta el vecino de la PB: riesgo principal'],
      ],
    },
    {
      title: 'Escenarios de programa',
      caption: 'Superficies medidas sobre la geometría real del CAD.',
      columns: ['Escenario', 'Viviendas propias', 'Resultado'],
      numeric: [1],
      rows: [
        ['A · 2 viviendas por planta, mejoradas, con ascensor en el patio', '7', 'Recomendado: cumple y mantiene 3 dormitorios'],
        ['B · 3 viviendas por planta', '9 como máximo', 'No cabe: unidades de ≈ 19 y 34 m² útiles frente a un mínimo de ≈ 28 m²'],
        ['C · sótano y casetas', '0', 'Complemento: trasteros y cuarto de instalaciones'],
      ],
    },
    {
      title: 'Presupuesto de ejecución material por capítulos',
      caption: 'Generador de precios de CYPE para esta obra (Toledo, rehabilitación integral, octubre de 2026). Sin IVA ni gastos de empresa. Calidades de gama media. Equivale a ≈ 62.000 € por vivienda y ≈ 706 €/m² construido.',
      columns: ['Capítulo', 'PEM (€)'],
      numeric: [1],
      rows: [
        ['Medios auxiliares', '4.723'],
        ['Demoliciones', '15.023'],
        ['Albañilería y tabiquería', '28.503'],
        ['Instalaciones de las viviendas', '87.967'],
        ['Baños y cocina', '76.035'],
        ['Revestimientos y pavimentos', '45.981'],
        ['Carpintería interior', '27.115'],
        ['Carpintería exterior', '27.161'],
        ['Ascensor y accesibilidad', '45.140'],
        ['Instalaciones comunes e ICT', '21.511'],
        ['Fachada y cubierta', '16.028'],
        ['Estructura (catas y reserva)', '10.460'],
        ['Gestión de residuos', '2.982'],
        ['Seguridad y salud', '10.585'],
        ['Portal, escalera y sótano', '14.769'],
      ],
      footer: ['Total PEM', '433.982'],
    },
    {
      title: 'Viabilidad económica · cifras de ejemplo',
      caption:
        'Cifras de ejemplo del modelo económico, no una oferta: compra supuesta de 600.000 €, 524,4 m² de venta, perfil de promotor profesional y obra total de ≈ 645.000 € sobre el PEM medido. Hipótesis a contrastar con cierres reales de venta.',
      columns: ['Precio de venta', 'Sin ayudas', 'Con ayuda de accesibilidad', 'Compra máxima para un 15 %'],
      numeric: [1, 2, 3],
      rows: [
        ['2.500 €/m²', '−48 k€', '−8 k€', '442 k€'],
        ['2.700 €/m²', '+55 k€', '+95 k€ (7,1 %)', '520 k€'],
        ['2.900 €/m²', '+157 k€', '+198 k€ (14,8 %)', '598 k€'],
        ['3.100 €/m²', '+260 k€', '+300 k€ (22,4 %)', '675 k€'],
        ['3.300 €/m²', '+363 k€', '+403 k€ (30,1 %)', '753 k€'],
      ],
      footer: ['Punto muerto con ayuda de accesibilidad', '', '≈ 2.515 €/m²', ''],
    },
    {
      title: 'Superficies de la planta tipo',
      caption: 'Útil y construida medidas en el modelo; Catastro según consulta oficial (privativa + comunes).',
      columns: ['Unidad', 'Útil (m²)', 'Construida, modelo (m²)', 'Catastro (m²)'],
      numeric: [1, 2, 3],
      rows: [
        ['Vivienda izquierda', '51,33', '62,13', '58'],
        ['Vivienda derecha', '60,54 + balcón 4,19', '73,23', '60'],
        ['Zonas comunes por planta', '8,41', '10,52', '—'],
      ],
    },
    {
      title: 'Esquemas estructurales comparados',
      caption: 'Mismos criterios de 1969 y 400 escenarios. El cálculo puro da A ≈ 100 %; se deja un 5 % a cada alternativa por error del modelo.',
      columns: ['Esquema', 'Probabilidad', 'Acero por planta (kg eq.)'],
      numeric: [1, 2],
      rows: [
        ['A · viguetas perpendiculares a fachada + jácena en y ≈ 4,70', '≈ 91 %', '≈ 1.000'],
        ['A2 · con segunda línea de jácenas en la crujía delantera', '≈ 4,5 %', '≈ 1.760'],
        ['B · viguetas paralelas a fachada + jácenas perpendiculares', '≈ 4,5 %', '≈ 2.300'],
      ],
    },
  ],

  code: [
    {
      title: 'Reconocer muros en un CAD de líneas sueltas',
      lang: 'python',
      description:
        'Cada cara de muro es una línea. Dos líneas paralelas separadas entre 6 y 36 cm, sin otra línea entre ellas, forman un muro, y su separación es el espesor. Así el modelo hereda las medidas exactas del CAD sin redibujarlo.',
      code: `def muros_por_pares(lineas, excluir=None, tmin=0.06, tmax=0.36, tol=1e-3):
    """Detecta muros como rectángulos entre pares de líneas paralelas ortogonales."""
    V, H = [], []
    for a, b in lineas:
        if abs(a[0] - b[0]) < tol and abs(a[1] - b[1]) > tol:
            V.append((round((a[0] + b[0]) / 2, 3), min(a[1], b[1]), max(a[1], b[1])))
        elif abs(a[1] - b[1]) < tol and abs(a[0] - b[0]) > tol:
            H.append((round((a[1] + b[1]) / 2, 3), min(a[0], b[0]), max(a[0], b[0])))

    def pares(S, d):
        out = []
        for (c1, s1, e1) in S:
            for (c2, s2, e2) in S:
                if not (tmin - tol <= c2 - c1 <= tmax + tol):
                    continue
                s, e = max(s1, s2), min(e1, e2)
                if e - s <= 0.02:
                    continue
                # otra línea paralela en medio: no es un par
                if any(c1 + tol < c3 < c2 - tol and min(e3, e) - max(s3, s) > 0.02 for (c3, s3, e3) in S):
                    continue
                out.append(dict(c0=c1, c1=c2, s=s, e=e, esp=round(c2 - c1, 3), dir=d))
        return out

    return pares(V, 'V') + pares(H, 'H')`,
    },
    {
      title: 'El constructor de 1969, como función de coste',
      lang: 'python',
      description:
        'Para cada tramo de jácena se elige el primer perfil IPN que resiste y no flecha más de lo admitido, con las fórmulas de tensiones admisibles de la época. Un perfil que no cabe en el forjado penaliza si queda a la vista.',
      code: `def lmax(p, q, s):
    _, I, Wx, _ = p
    k_m = 10.0 if s['continua'] else 8.0
    k_f = 2.6 if s['continua'] else 5.0
    Ls = math.sqrt(k_m * Wx * s['sadm'] / q)                    # resistencia
    Ld = (384 * E * I / (k_f * q * s['flecha'])) ** (1 / 3)     # flecha
    return min(Ls, Ld) / 100.0

def coste_tramo(a, b, s):
    L = b - a
    if L < 0.80:
        return math.inf, None
    q = s['q_lin'] + s['extra_muro'] * max(0.0, min(b, 4.45) - max(a, 0.30)) / L
    for p in IPN:
        if lmax(p, q, s) >= L:
            oculto = (a >= 0.10 and b <= 4.60)   # el tabique de 0,20 puede esconder una jácena descolgada
            pen = 0.0
            if p[0] == 240: pen = s['pen240_oc'] if oculto else s['pen240_vis']
            elif p[0] >= 260: pen = s['pen260_oc'] if oculto else s['pen260_vis']
            return p[3] * L + pen, p[0]
    return math.inf, None`,
    },
  ],

  participation: [
    'Planteamiento del encargo, criterios (manda el CAD) y datos propios de la estructura.',
    'Correcciones sobre el modelo a partir del conocimiento del edificio (patio cerrado, dormitorio de esquina).',
    'Distribución propia de la planta tipo en AutoCAD y elección de calidades para el presupuesto.',
    'Objeción a la primera cuenta económica, que obligó a revisarla partida a partida.',
    'Dirección de Claude Code por fases, con revisión de cada entrega antes de pasar a la siguiente.',
  ],

  deliverables: [
    'Estado actual en DXF/DWG por capas y modelo IFC4 descargable',
    '8 láminas A3 de estado actual a 1:50 y 1:100',
    '2 láminas de estructura supuesta con catas',
    'Marco normativo, escenarios de programa y propuesta de distribución',
    'Presupuesto por mediciones en BC3 y resumen de PEM por capítulos',
    'Estudio de viabilidad económica con sensibilidad y ayudas',
    'Dosier de presentación de 32 diapositivas con anexo técnico',
    'Lista de comprobaciones para la siguiente visita de obra',
  ],

  results: [
    'Estructura oculta acotada a un esquema muy probable y a 8 catas ordenadas, en lugar de abrir a ciegas.',
    'Toda la documentación se regenera desde el CAD en menos de un minuto: una corrección del modelo se propaga a planos, IFC y superficies.',
    'Escenario de más viviendas descartado con argumentos de normativa y superficies mínimas.',
    'Presupuesto medido partida a partida en lugar de estimado por ratios, listo para comparar con ofertas de constructoras.',
    'Una misma base de datos sirve para decidir la inversión y para el proyecto que revisa y firma el arquitecto.',
  ],

  checks: [
    'Modelo IFC4 regenerado y validado sin errores con IfcOpenShell; sin georreferencia ni datos de parcela.',
    'Superficies del CAD cuadradas con el rótulo del plano (152,9 frente a 152 m²).',
    'Fachada del CAD contrastada con el Catastro (19,21 frente a 19,37 m).',
  ],

  limitations: [
    'Estructura supuesta: los pilares deducidos están marcados para verificar con cata.',
    'El fondo del edificio difiere del Catastro; queda pendiente medir las diagonales en obra.',
    'Precios de referencia de CYPE: hay que contrastarlos con ofertas reales de constructoras.',
    'Documento de trabajo: requiere revisión y firma de un técnico competente.',
  ],
};

export default project;
