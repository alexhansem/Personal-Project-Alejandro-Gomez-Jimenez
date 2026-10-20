import type { Project } from '../types';

const base = '/proyectos/moriyama-house';

const project: Project = {
  slug: 'moriyama-house',
  title: 'Casa Moriyama',
  demo: false,
  published: true,
  featured: true,
  order: 1,
  sortDate: '2026-10-13',
  period: 'Octubre 2026',
  status: 'en desarrollo',
  location: 'Obra de referencia: Ota-ku, Tokio (Ryue Nishizawa / SANAA, 2002–2005)',
  categories: ['bim', 'delineacion', 'documentacion', 'ia', 'cad-automatizacion'],

  summary:
    'Reconstrucción documental de la Casa Moriyama de Ryue Nishizawa (SANAA) sin planos acotados de partida: cotas sacadas de imágenes y fuentes publicadas, planos CAD a 1:100 y modelo completo en Revit 2026 construido por Claude a través de un add-in propio.',

  context:
    'Ejercicio académico de levantamiento. La obra no es propia: es la Casa Moriyama (Ryue Nishizawa / SANAA, Ota-ku, Tokio, 2002–2005), diez cajas independientes de chapa de acero repartidas en un solar de unos 290 m². Lo que se muestra aquí es la reconstrucción: datos, planos, modelo BIM, renders y maquetación.',
  objective:
    'Entregar plantas, alzados y secciones acotados y un modelo BIM completo de la casa, del que salgan las vistas y los renders finales, partiendo solo de imágenes de referencia y documentación publicada.',
  problem:
    'No había cotas ni mediciones de partida. Cada dimensión se obtuvo de la planta baja original con rotulación en japonés, de secciones constructivas, de una axonometría y de la maqueta 1:50 del MoMA, midiendo a escala y contrastando entre fuentes. Cada dato guarda su procedencia: plano original, medido a escala (±100 mm o ±200 mm) o supuesto.',

  participation: [
    'Recopilación de fuentes de referencia y contraste de datos entre ellas.',
    'Planteamiento del flujo: una sola tabla de datos de la que salen el CAD, el modelo BIM y la maquetación.',
    'Dirección de Claude Code en cada fase y revisión de los resultados (planos, modelo, renders y láminas).',
    'Decisión de descartar los renders en three.js y rehacerlos desde Revit.',
  ],

  tools: [
    'Claude Code',
    'Revit 2026 (API, add-in propio en C#)',
    'AutoCAD (DXF → DWG por COM)',
    'Node.js (generadores de planos y láminas)',
    'Microsoft Edge sin interfaz (HTML → PDF)',
  ],

  methodology: [
    'Extraer cotas de la planta baja original: anchos y fondos acotados en el plano, posiciones medidas a escala (escala de la imagen comprobada con una cota conocida).',
    'Volcar todo a una tabla maestra por caja (datos/moriyama.json) con la fuente de cada valor.',
    'Desarrollar a la vez, desde esa misma tabla, los planos CAD (SVG A3, DXF a escala real y DWG con grosores por capa) y el modelo Revit (scripts C# que Claude escribe y el add-in ejecuta dentro de Revit).',
    'Vestir el modelo (materiales, vidrios, entorno, mobiliario), colocar cámaras y sol, y renderizar.',
    'Maquetar documento A3, láminas A1 y presentación a partir de los planos y renders generados.',
  ],

  deliverables: [
    'Documento de planos A3, 13 hojas a 1:100 y 1:50 con cuadro de rótulo',
    'Láminas de presentación A1 (3)',
    'Presentación para exposición, 18 diapositivas',
    'Planos en DWG y DXF',
    'Modelo Revit 2026 (.rvt)',
    'Seis renders desde Revit y vistas 3D del modelo',
  ],

  cover: {
    src: `${base}/renders/r2-calle-este.jpg`,
    alt: 'Render desde la calle este: cajas blancas de distintas alturas entre árboles, con postes eléctricos y casas vecinas',
    caption: 'R2 · Calle este. Render desde el modelo Revit',
    kind: 'modelo',
    ratio: 1.6,
  },

  workflow: [
    {
      title: 'Fuentes de referencia',
      actor: 'humano',
      tool: 'Búsqueda y contraste',
      description:
        'Planta baja original con cotas por caja, secciones constructivas B-D-I y C-G-H, axonometría publicada, maqueta 1:50 del MoMA y artículo de referencia (Martín y De Esteban, Revista de Arquitectura, 2018).',
      output: 'Material de partida sin cotas completas',
      time: { provenance: 'pendiente' },
    },
    {
      title: 'Lectura de la planta original y tabla maestra',
      actor: 'ia',
      tool: 'Claude Code',
      description:
        'Traducción de los rótulos en japonés, cotas entre ejes por caja y posiciones medidas a escala (≈15 mm/px, comprobado con AX1–AX2 = 5634 mm). Alturas y huecos a partir de secciones, axonometría y maqueta. Lo que no aparece en ninguna fuente se marca como supuesto.',
      input: 'Imágenes y documentos de referencia',
      output: 'Tabla de 10 cajas, pasillos, auxiliares y árboles con la fuente de cada dato',
      time: { provenance: 'pendiente' },
    },
    {
      title: 'Planos CAD (en paralelo con el BIM)',
      actor: 'ia',
      tool: 'Claude Code · Node.js · AutoCAD',
      description:
        'Un generador escrito por Claude dibuja plantas, alzados, secciones, emplazamiento y axonometrías a partir de la tabla. Sale en SVG por hojas A3 y en DXF a escala real; un script abre el DXF en AutoCAD, asigna grosores de línea por capa y lo guarda como DWG. CAD y BIM se desarrollaron al mismo tiempo, los dos a partir de esta misma tabla.',
      input: 'Tabla maestra',
      output: '13 hojas A3 + DXF + DWG',
      time: { provenance: 'pendiente' },
      media: {
        src: `${base}/planos/planta-baja.svg`,
        alt: 'Planta baja acotada de las diez cajas A a J con usos, cotas de nivel y mobiliario',
        caption: 'Planta baja · E 1:100',
        kind: 'plano',
        ratio: 1.56,
      },
    },
    {
      title: 'Puente entre Claude y Revit',
      actor: 'ia',
      tool: 'C# · API de Revit · Roslyn',
      description:
        'Add-in propio (ClaudeBridge): vigila una carpeta de entrada, compila cada script C# dentro de Revit y devuelve el resultado en un archivo de texto. Así Claude Code puede modelar sin tocar la interfaz.',
      output: 'Add-in instalado y probado en Revit 2026',
      time: { provenance: 'pendiente' },
    },
    {
      title: 'Modelo BIM (en paralelo con el CAD)',
      actor: 'software',
      tool: 'Revit 2026 vía ClaudeBridge',
      description:
        'El script de modelado lee la misma tabla y crea muros de chapa de 60 mm, soleras, forjados, cubiertas y huecos. Resultado registrado por Revit: 56 muros, 32 losas, 59 huecos y 0 fallos.',
      input: 'Tabla maestra',
      output: 'Modelo Revit y cuatro vistas 3D',
      time: { provenance: 'pendiente' },
      media: {
        src: `${base}/renders/revit-3d-sureste.jpg`,
        alt: 'Vista 3D del modelo Revit desde el sureste: cajas blancas con huecos sobre la parcela',
        caption: 'Modelo Revit · vista 3D sureste',
        kind: 'modelo',
        ratio: 1.446,
      },
    },
    {
      title: 'Prueba de renders en three.js',
      actor: 'ia',
      tool: 'three.js',
      description:
        'Primer intento de renders con una escena web generada desde los datos. Se descartó: volumetría correcta pero acabado de maqueta, lejos del aspecto de la obra.',
      output: 'Descartado',
      time: { provenance: 'pendiente' },
      media: {
        src: `${base}/proceso/threejs-aerea-se.jpg`,
        alt: 'Render de prueba en three.js: cajas blancas simplificadas y árboles esquemáticos',
        caption: 'Prueba descartada en three.js',
        kind: 'captura',
        ratio: 1.6,
      },
    },
    {
      title: 'Materiales, entorno y mobiliario',
      actor: 'software',
      tool: 'Revit 2026 vía ClaudeBridge',
      description:
        'Inventario de materiales y familias disponibles, 52 vidrios y entorno urbano, y 111 elementos de mobiliario, vegetación y personas colocados sin fallos.',
      output: 'Modelo listo para renderizar',
      time: { provenance: 'pendiente' },
    },
    {
      title: 'Cámaras, sol y render',
      actor: 'software',
      tool: 'Revit 2026 vía ClaudeBridge',
      description:
        'Seis cámaras (calle sur, calle este, aérea sureste, jardín, aérea noroeste y terraza de G), posición del sol propia para cada vista, render y exportación.',
      output: 'Seis renders',
      time: { provenance: 'pendiente' },
    },
    {
      title: 'Maquetación de la entrega',
      actor: 'ia',
      tool: 'Node.js · HTML → PDF',
      description:
        'Documento A3, láminas A1 y presentación generados con los mismos datos, los planos SVG y los renders. Un solo script regenera toda la entrega.',
      output: 'Tres PDF y DWG',
      time: { provenance: 'pendiente' },
    },
    {
      title: 'Revisión del resultado',
      actor: 'humano',
      phase: 'revision',
      description: 'Revisión de planos, modelo, renders y láminas. Las láminas siguen abiertas a mejora.',
      time: { provenance: 'pendiente' },
    },
  ],

  comparison: {
    task: 'Levantamiento documental, planos 1:100 y modelo BIM de la Casa Moriyama',
    used: {
      label: 'Claude Code + datos únicos + Revit por API',
      generation: { provenance: 'pendiente' },
      review: { provenance: 'pendiente' },
    },
    observations:
      'Los archivos de la entrega tienen fecha del 13 de octubre de 2026, entre las 17:48 y las 20:07. Son fechas de última modificación, no un cronómetro: no cubren la búsqueda de fuentes ni las versiones anteriores, así que no se usan como tiempo de trabajo.',
  },

  media: [
    { src: `${base}/renders/r1-calle-sur.jpg`, alt: 'Render a pie de calle sur entre dos cajas, con jardín y un hueco con tarima al fondo', caption: 'R1 · Calle sur', kind: 'modelo', ratio: 1.6 },
    { src: `${base}/renders/r3-aerea-sureste.jpg`, alt: 'Vista aérea desde el sureste de las diez cajas entre las casas vecinas', caption: 'R3 · Aérea sureste', kind: 'modelo', ratio: 1.6 },
    { src: `${base}/renders/r4-jardin.jpg`, alt: 'Vista desde el jardín entre cajas, con un gran hueco y vegetación en primer plano', caption: 'R4 · Jardín', kind: 'modelo', ratio: 1.6 },
    { src: `${base}/renders/r5-aerea-noroeste.jpg`, alt: 'Vista aérea desde el noroeste con las cubiertas de las casas vecinas', caption: 'R5 · Aérea noroeste', kind: 'modelo', ratio: 1.6 },
    { src: `${base}/renders/r6-terraza-g.jpg`, alt: 'Vista desde la cubierta de la caja G con lucernario y árbol', caption: 'R6 · Terraza de G', kind: 'modelo', ratio: 1.6 },
    { src: `${base}/renders/revit-3d-noroeste.jpg`, alt: 'Vista 3D del modelo Revit desde el noroeste', caption: 'Modelo Revit · vista 3D noroeste', kind: 'modelo', ratio: 1.446 },
    { src: `${base}/planos/emplazamiento.svg`, alt: 'Emplazamiento y cubiertas de las diez cajas en la parcela', caption: 'Emplazamiento y cubiertas · E 1:100', kind: 'plano', ratio: 1.56 },
    { src: `${base}/planos/planta-baja.svg`, alt: 'Planta baja acotada con usos, niveles y mobiliario', caption: 'Planta baja · E 1:100', kind: 'plano', ratio: 1.56 },
    { src: `${base}/planos/planta-primera.svg`, alt: 'Planta primera de las cajas con dos o más plantas', caption: 'Planta primera · E 1:100', kind: 'plano', ratio: 1.56 },
    { src: `${base}/planos/planta-segunda.svg`, alt: 'Planta segunda de las cajas A y F', caption: 'Planta segunda · E 1:100', kind: 'plano', ratio: 1.56 },
    { src: `${base}/planos/alzado-sur.svg`, alt: 'Alzado sur con las cajas de distintas alturas y sus huecos', caption: 'Alzado sur · E 1:100', kind: 'plano', ratio: 2.288 },
    { src: `${base}/planos/alzado-norte.svg`, alt: 'Alzado norte con las cajas de distintas alturas y sus huecos', caption: 'Alzado norte · E 1:100', kind: 'plano', ratio: 2.288 },
    { src: `${base}/planos/alzado-este.svg`, alt: 'Alzado este', caption: 'Alzado este · E 1:100', kind: 'plano', ratio: 1.49 },
    { src: `${base}/planos/alzado-oeste.svg`, alt: 'Alzado oeste', caption: 'Alzado oeste · E 1:100', kind: 'plano', ratio: 1.51 },
    { src: `${base}/planos/secciones-AB.svg`, alt: 'Secciones A-A y B-B', caption: 'Secciones A-A y B-B · E 1:100', kind: 'plano', ratio: 2.946 },
    { src: `${base}/planos/secciones-CD.svg`, alt: 'Secciones C-C y D-D', caption: 'Secciones C-C y D-D · E 1:100', kind: 'plano', ratio: 1.072 },
    { src: `${base}/planos/seccion-DD-50.svg`, alt: 'Sección D-D por las cajas B y A con niveles y alturas libres', caption: 'Sección D-D, cajas B y A · E 1:50', kind: 'detalle', ratio: 1.34 },
    { src: `${base}/planos/seccion-CC-50.svg`, alt: 'Sección C-C por las cajas F y G con niveles y alturas libres', caption: 'Sección C-C, cajas F y G · E 1:50', kind: 'detalle', ratio: 1.361 },
    { src: `${base}/planos/axo-SE.svg`, alt: 'Axonometría desde el sureste en línea', caption: 'Axonometría sureste', kind: 'esquema', ratio: 1.129 },
    { src: `${base}/planos/axo-NO.svg`, alt: 'Axonometría desde el noroeste en línea', caption: 'Axonometría noroeste', kind: 'esquema', ratio: 1.165 },
  ],

  documents: [
    {
      id: 'documento-a3',
      title: 'Documento de planos',
      src: `${base}/documentos/moriyama-documento-a3.pdf`,
      description: 'Datos, emplazamiento, plantas, alzados, secciones 1:100 y 1:50, axonometrías e imágenes, con cuadro de rótulo.',
      pages: 13,
      sheet: 'A3',
    },
    {
      id: 'laminas-a1',
      title: 'Láminas de presentación',
      src: `${base}/documentos/moriyama-laminas-a1.pdf`,
      description: 'Programa, plantas, secciones y alzados, y renders. Maquetación pendiente de revisión.',
      pages: 3,
      sheet: 'A1',
    },
    {
      id: 'presentacion',
      title: 'Presentación',
      src: `${base}/documentos/moriyama-presentacion.pdf`,
      description: 'Exposición en clase: la casa, las diez cajas, planos, modelo Revit, renders y cómo se hizo el levantamiento.',
      pages: 18,
      sheet: '16:9',
    },
  ],

  tables: [
    {
      title: 'Tabla maestra por caja',
      caption:
        'Cotas en metros. Ancho y fondo: plano original (C y H medidos a escala). Altura total: secciones originales medidas a escala (±100 mm) o axonometría (±200 mm). FL respecto a la rasante.',
      columns: ['Caja', 'Uso', 'Ancho × fondo', 'Plantas', 'Altura total', 'Fuente de la altura', 'Régimen'],
      numeric: [3, 4],
      rows: [
        ['A', 'Salón / estudio / dormitorio-estudio', '5,63 × 4,03', 3, '7,87', 'Axonometría', 'Propietario'],
        ['B', 'Cocina-comedor / dormitorio', '3,03 × 1,83', 2, '5,02', 'Sección', 'Propietario'],
        ['C', 'Estudio-salón', '2,73 × 4,03', 1, '3,64', 'Sección', 'Propietario'],
        ['D', 'Baño', '1,81 × 1,25', 1, '2,07', 'Sección', 'Propietario'],
        ['E', 'Cocina-comedor / dormitorio', '3,18 × 2,73', 2, '5,03', 'Sección', 'Alquiler'],
        ['F', 'Salón-cocina / dormitorio / estudio', '3,78 × 5,03', 3, '7,87', 'Sección', 'Alquiler'],
        ['G', 'Salón en semisótano (FL −0,41)', '4,43 × 4,43', 1, '2,09', 'Sección', 'Alquiler'],
        ['H', 'Baño de G', '2,33 × 1,35', 1, '4,02', 'Sección', 'Alquiler'],
        ['I', 'Salón-dormitorio', '4,78 × 4,28', 1, '4,84', 'Sección', 'Alquiler'],
        ['J', 'Salón-dormitorio + baño', '2,88 × 5,38', 1, '3,34', 'Axonometría', 'Alquiler'],
      ],
    },
  ],

  code: [
    {
      title: 'Ejecutar un script de Claude dentro de Revit',
      lang: 'powershell',
      description:
        'Claude escribe un script C#, este comando lo deja en la carpeta que vigila el add-in y espera la respuesta de Revit. Así se lanzaron los 15 pasos del modelo, del proyecto vacío a los renders.',
      code: `# Ejecuta bridge\\scripts\\<nombre>.cs dentro de Revit a través de ClaudeBridge y muestra la respuesta.
param([Parameter(Mandatory)][string]$Nombre, [int]$Timeout = 600)
$b = $PSScriptRoot
$src = Join-Path $b "scripts\\$Nombre.cs"
if (-not (Test-Path $src)) { throw "No existe $src" }
$out = Join-Path $b "outbox\\$Nombre.txt"
Remove-Item $out -ErrorAction SilentlyContinue
Copy-Item $src (Join-Path $b "inbox\\$Nombre.cs") -Force
$t = 0
while (-not (Test-Path $out) -and $t -lt $Timeout) { Start-Sleep -Milliseconds 500; $t += 0.5 }
if (Test-Path $out) { Start-Sleep -Milliseconds 200; Get-Content $out -Encoding UTF8 } else { "Sin respuesta tras $Timeout s (¿Revit ocupado o con un diálogo abierto?)" }`,
    },
    {
      title: 'Muros de cada caja desde la tabla de datos',
      lang: 'csharp',
      description:
        'Extracto del script de modelado: por cada caja de la tabla crea los cuatro muros de chapa de 60 mm a eje, la solera, los forjados intermedios y la cubierta. Cada elemento se etiqueta con su caja para poder borrarlo y regenerarlo.',
      code: `foreach (var b in data.GetProperty("cajas").EnumerateArray())
{
    string id = b.S("id");
    double x = b.D("x"), y = b.D("y"), w = b.D("w"), d = b.D("d"), h = b.D("h");
    var pl = b.GetProperty("plantas").EnumerateArray().ToList();
    double fl1 = pl[0].D("fl"), zb = fl1 - GSLAB;
    double x0 = x + T / 2, x1 = x + w - T / 2, y0 = y + T / 2, y1 = y + d - T / 2;
    var segs = new Dictionary<string, (XYZ, XYZ)> {
        { "S", (MH.P(x0, y0), MH.P(x1, y0)) }, { "E", (MH.P(x1, y0), MH.P(x1, y1)) },
        { "N", (MH.P(x1, y1), MH.P(x0, y1)) }, { "W", (MH.P(x0, y1), MH.P(x0, y0)) } };
    foreach (var kv in segs)
    {
        var wall = Wall.Create(doc, Line.CreateBound(kv.Value.Item1, kv.Value.Item2),
            wt60.Id, L0.Id, MH.F(h - zb), MH.F(zb), false, false);
        Tag(wall, "MH-" + id); walls[id + "-" + kv.Key] = wall; nWalls++;
    }
    // solera, forjados intermedios y cubierta …
}`,
    },
  ],

  results: [
    'Diez cajas, dos pasillos de vidrio y tres cuartos auxiliares definidos con su fuente en una sola tabla.',
    'Un mismo origen de datos para CAD, BIM y maquetación: si cambia una cota, se regeneran planos, modelo y láminas.',
    'Modelo Revit construido sin modelado manual: 56 muros, 32 losas y 59 huecos, sin fallos registrados.',
    'Entrega completa: 13 hojas A3, 3 láminas A1, presentación de 18 diapositivas, DWG y seis renders.',
  ],

  limitations: [
    'Reconstrucción a partir de fuentes publicadas: las posiciones tienen una tolerancia de ±100 mm y algunas alturas de ±200 mm.',
    'Tres huecos de la caja A (caras norte y oeste) son supuestos, a falta de fotos de esas fachadas.',
    'El fondo de las cajas C y H no está acotado en el plano original; está medido a escala.',
    'La maquetación de las láminas no está cerrada.',
  ],

  checks: [
    'Escala de la planta original comprobada con una cota conocida (AX1–AX2 = 5634 mm).',
    'Cotas contrastadas entre planta, secciones, axonometría y maqueta del MoMA.',
    'Registro de Revit de cada script: modelo con 0 fallos, decoración con 0 fallos.',
  ],

  notes:
    'Obra original: Moriyama House, Ryue Nishizawa / SANAA (2002–2005). Esta ficha muestra un ejercicio de levantamiento y modelado, no un proyecto propio.',
};

export default project;
