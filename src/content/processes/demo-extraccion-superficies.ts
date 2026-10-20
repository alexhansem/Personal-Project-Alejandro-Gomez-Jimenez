/**
 * CONTENIDO DE DEMOSTRACIÓN — FICTICIO.
 * El código es un ejemplo genérico para probar el bloque de código; no es una
 * herramienta desarrollada por el autor del portfolio.
 */
import type { ProcessEntry } from '../types';

const entry: ProcessEntry = {
  slug: 'demo-extraccion-superficies',
  title: 'Demo · Extracción de superficies desde DXF',
  demo: true,
  published: true,
  order: 1,
  type: 'Script (ejemplo)',
  summary: 'Ejemplo de entrada de herramienta: problema, proceso anterior, solución, funcionamiento y límites.',
  problem: 'Texto de ejemplo. Medir superficies estancia por estancia consume tiempo y genera errores al copiar valores.',
  previousProcess: 'Texto de ejemplo. Medición manual con el comando ÁREA y transcripción a una hoja de cálculo.',
  solution: 'Texto de ejemplo. Un script lee las polilíneas cerradas de una capa y exporta superficie y nombre a CSV.',
  tools: ['Python (ejemplo)', 'ezdxf (ejemplo)'],
  howItWorks: [
    'Se exporta el plano a DXF con una capa por tipo de superficie.',
    'El script recorre las polilíneas cerradas y calcula su área.',
    'Asocia cada área al texto que queda dentro de la polilínea.',
    'Escribe un CSV ordenado por nivel y estancia.',
  ],
  example: {
    input: 'planta.dxf · capa SUP_UTIL · 6 polilíneas',
    output: 'superficies.csv · 6 filas + total',
    note: 'Ejemplo ficticio',
  },
  media: [
    { src: '/demo/demo-esquema-flujo.svg', alt: 'Esquema genérico de seis pasos con bucle de correcciones', caption: 'Esquema de flujo (ficticio)', kind: 'esquema', ratio: 2000 / 760 },
  ],
  code: [
    {
      title: 'Lectura de polilíneas (ejemplo genérico)',
      lang: 'python',
      description: 'Fragmento ilustrativo para probar el resaltado y el botón de copiar.',
      code: `import csv
import ezdxf

def superficies(ruta_dxf: str, capa: str = "SUP_UTIL"):
    doc = ezdxf.readfile(ruta_dxf)
    for pl in doc.modelspace().query(f'LWPOLYLINE[layer=="{capa}"]'):
        if pl.closed:
            yield pl.dxf.handle, abs(ezdxf.math.area(pl.vertices_in_wcs()))

with open("superficies.csv", "w", newline="", encoding="utf-8") as f:
    w = csv.writer(f, delimiter=";")
    w.writerow(["id", "superficie_m2"])
    for handle, area in superficies("planta.dxf"):
        w.writerow([handle, f"{area:.2f}".replace(".", ",")])
`,
    },
  ],
  limitations: ['Ejemplo: no detecta polilíneas abiertas ni superpuestas.'],
  applications: ['Ejemplo: cuadros de superficies por planta.', 'Ejemplo: control de superficies entre versiones.'],
  relatedProjects: ['demo-cuadro-superficies'],
};

export default entry;
