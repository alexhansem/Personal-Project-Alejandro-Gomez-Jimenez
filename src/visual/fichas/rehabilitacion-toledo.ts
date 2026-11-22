import type { FichaVisual } from '../types';
import budget from '../../content/projects/data/rehabilitacion-toledo-presupuesto';

/**
 * Rehabilitación de viviendas de 1969 en Toledo.
 * Datos de ES02, del modelo del estado actual y del presupuesto del escenario A.
 */
const base = '/proyectos/rehabilitacion-toledo';
const vis = '/visual/rehabilitacion-toledo';

// Capítulos calculados desde las 202 partidas reales (no se escriben a mano).
const porCapitulo = new Map<string, number>();
for (const l of budget.lines) porCapitulo.set(l.chapter, (porCapitulo.get(l.chapter) ?? 0) + l.amount);
const capitulos = [...porCapitulo]
  .map(([nombre, importe]) => ({ nombre, importe }))
  .sort((a, b) => b.importe - a.importe);

const ficha: FichaVisual = {
  proyecto: 'rehabilitacion-toledo',
  nombre: 'Rehabilitación de viviendas, 1969 · Toledo',

  radiografia: {
    etiqueta: 'Rehabilitación 1969 · Hoja 02',
    pregunta: '¿Dónde están los pilares que',
    preguntaResaltada: 'no se ven?',
    cifra: '78 %',
    cifraTexto: 'de probabilidad de que haya más de 4 pilares por planta.',
    texto: 'Calculado con 300 simulaciones según cómo se construía en 1969, para ordenar las catas antes de abrir.',
    aviso: 'Es una probabilidad, no un hecho: se confirma en obra con catas.',
    fuente: 'Plano ES02 · Probabilidad de ubicación de pilares.',
    plano: {
      lineas: `${vis}/es02-plan-l.png`,
      frio: `${vis}/es02-plan-c.png`,
      calido: `${vis}/es02-plan-w.png`,
      ratio: 990 / 430,
      pie: 'Planta tipo · viga de carga y pilares probables',
    },
    grafico: {
      lineas: `${vis}/es02-chart-l.png`,
      frio: `${vis}/es02-chart-c.png`,
      calido: `${vis}/es02-chart-w.png`,
      ratio: 1150 / 295,
      pie: 'Debajo: probabilidad de pilar a lo largo de la fachada',
      planoIzquierda: 80 / 1150,
      planoAncho: 990 / 1150,
    },
  },

  expediente: {
    cajetin: [
      { clave: 'Expediente', valor: 'Rehabilitación de viviendas, 1969 · Toledo' },
      { clave: 'Partidas', valor: String(budget.lines.length) },
      { clave: 'Simulaciones', valor: '300' },
      { clave: 'Plazo total*', valor: '< 48 h' },
      { clave: 'Descargas', valor: 'IFC · PDF · BC3' },
    ],
    hoja: 'Hoja',
    pregunta: '¿Merece la pena',
    preguntaResaltada: 'rehabilitarlo?',
    entradilla: 'Un edificio de viviendas de 1969, estudiado de arriba abajo para poder decidir antes de licitar.',
    hojas: [
      { n: '01', titulo: 'Estado actual: modelo 3D e IFC', dato: 'descargar', imagen: `${base}/modelo/estado-actual.jpg`, alt: 'Modelo 3D del estado actual del edificio', pie: 'Modelo del estado actual' },
      { n: '02', titulo: 'Estructura supuesta: dónde hay pilares', dato: '300 simulaciones', imagen: `${base}/planos/es02-probabilidad-pilares.png`, alt: 'Plano ES02 con la probabilidad de pilar en cada punto de la planta', pie: 'ES02 · Probabilidad de pilar en cada punto de la planta' },
      { n: '03', titulo: 'Escenarios A y B', dato: 'planta tipo', imagen: `${base}/planos/v01-escenario-a.png`, alt: 'Plano del escenario A de la planta tipo', pie: 'V01 · Escenario A' },
      { n: '04', titulo: 'Presupuesto por partidas', dato: `${budget.lines.length} partidas`, imagen: `${base}/dosier/dosier-capitulos.png`, alt: 'Diapositiva del dosier con el presupuesto por capítulos', pie: 'Presupuesto por capítulos' },
      { n: '05', titulo: 'Dosier para inversores', dato: '32 diapositivas', imagen: `${base}/dosier/dosier-lecturas.png`, alt: 'Diapositiva del dosier con sus tres lecturas', pie: 'Dosier · tres lecturas' },
    ],
    activa: 1,
    sello: { texto: 'Revisado', firma: 'A.G.J.' },
    presupuesto: { titulo: 'Presupuesto escenario A, por capítulos', capitulos, mostrar: 8 },
    notas: ['* Tiempo total indicado por el autor, sin desglose.'],
  },

  modelo: {
    glb: `${base}/modelo/estado-actual.glb`,
    angulo: 25,
    camara: [0.85, 0.3, 0.7],
    pie: 'Estado actual, modelado desde los planos de partida',
    descarga: { etiqueta: 'Descargar IFC', src: `${base}/modelo/estado-actual.ifc` },
  },
};

export default ficha;
