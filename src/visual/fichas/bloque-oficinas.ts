import type { FichaVisual } from '../types';

/**
 * Edificio de oficinas PB + 2 con patio de bambú.
 * Datos de los planos 2, 3, 4 (alzados) y 5 (detalle constructivo).
 */
const ejesX = [0, 5.5, 11, 16.5, 22, 27.5, 33];

const ficha: FichaVisual = {
  proyecto: 'bloque-oficinas',
  nombre: 'Edificio de oficinas PB + 2',

  seccion: {
    titulo: 'Sección por el patio',
    fuente: 'Retícula 5,50 m y pilares HA 40×40 (enunciado y plano 5); niveles del plano 4; patio de las plantas del plano 2.',
    ejes: ejesX.map((x, i) => ({ nombre: String(i + 1), x })),
    niveles: [
      { cota: 0, etiqueta: '±0,00' },
      { cota: 3.5, etiqueta: '+3,50' },
      { cota: 7, etiqueta: '+7,00' },
      { cota: 10.5, etiqueta: '+10,50' },
    ],
    // En el eje 4 no hay pilar: cae dentro del patio.
    pilares: { x: [0, 5.5, 11, 22, 27.5, 33], ancho: 0.4, hasta: 7, etiqueta: 'Pilar HA 40×40' },
    forjados: [3.5, 7].map((cota) => ({
      cota,
      tramos: [
        [-0.55, 11.2],
        [21.8, 33.55],
      ],
    })),
    forjadoEtiqueta: 'Forjado · planta a planta 3,50 m',
    // Cubiertas no transitables: peto 0,40 m (plano 4).
    petos: [
      [-0.55, -0.2],
      [10.85, 11.2],
      [21.8, 22.15],
      [33.2, 33.55],
    ].map((t) => ({ tramo: t as [number, number], cota: 7, alto: 0.4 })),
    cerramientos: [
      { tramo: [-0.55, -0.2], desde: 0, hasta: 7 },
      { tramo: [33.2, 33.55], desde: 0, hasta: 7 },
    ],
    fondo: [{ tramo: [16.5, 33.55], desde: 7, hasta: 10.9, etiqueta: 'Planta segunda, al fondo' }],
    vacios: [
      {
        tramo: [11.2, 21.8],
        etiqueta: 'Patio de bambú · abierto al cielo',
        cota: '10,55',
        vegetacion: { tipo: 'bambu', alturaMax: 4 },
      },
    ],
    detalle: {
      titulo: 'Fachada: 35 cm, 9 capas',
      fuente: 'Plano 5 · Sección horizontal del cerramiento · E 1:5',
      en: { x: 33.38, cota: 5.2 },
      capas: [
        { nombre: 'Enlucido de yeso', cm: 1 },
        { nombre: 'Tabicón LHD', cm: 9 },
        { nombre: 'Aislamiento térmico', cm: 4, destacar: true },
        { nombre: 'Cámara de aire', cm: 5, hueco: true },
        { nombre: 'Mortero hidrófugo', cm: 1.5 },
        { nombre: 'Ladrillo perforado ½ pie', cm: 12 },
        { nombre: 'Enlucido de mortero', cm: 1 },
        { nombre: 'Cemento cola', cm: 0.5 },
        { nombre: 'Azulejo porcelánico', cm: 1 },
      ],
    },
    pasos: [
      { titulo: 'Retícula de 5,50 m y niveles', capas: ['reticula'] },
      { titulo: 'Pilares HA 40×40', capas: ['pilares'] },
      { titulo: 'Forjados y cubierta', capas: ['forjados', 'petos', 'fondo'] },
      { titulo: 'Cerramiento de fachada', capas: ['cerramientos', 'detalle'] },
      { titulo: 'Patio de bambú', capas: ['vacios'] },
    ],
    notas: ['El canto del forjado no consta en los planos: se dibuja como línea.'],
  },

  apiladas: {
    ratio: 600 / 498,
    plantas: [
      { mascara: '/visual/bloque-oficinas/planta-baja.png', nombre: 'Planta baja', dato: 'recepción' },
      { mascara: '/visual/bloque-oficinas/planta-primera.png', nombre: 'Planta primera', dato: '80 puestos' },
      { mascara: '/visual/bloque-oficinas/planta-segunda.png', nombre: 'Planta segunda', dato: 'dirección' },
    ],
    destacado: {
      left: 45.8,
      top: 53,
      width: 22.2,
      height: 39.6,
      nombre: 'Patio de bambú',
      medida: '10,55 × 16,50 m',
      vegetacion: 'bambu',
    },
    fuente: 'Plantas de distribución del plano 2.',
  },
};

export default ficha;
