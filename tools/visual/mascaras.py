"""Genera las máscaras PNG que usan los moldes «Radiografía» y «Plantas apiladas».

Una máscara es un PNG blanco cuyo canal alfa dice dónde hay dibujo. La web la
tiñe con los colores de la línea visual, así el plano original no se toca.

Uso:
    python3 tools/visual/mascaras.py LAMINA.png SALIDA_PREFIJO x0 y0 x1 y1

    x0 y0 x1 y1  recorte en fracciones (0-1) del ancho y alto de la lámina.

Genera tres archivos:
    SALIDA_PREFIJO-l.png  líneas oscuras (grises/negro)   → color de texto
    SALIDA_PREFIJO-c.png  colores fríos (azules, verdes)  → azul apagado
    SALIDA_PREFIJO-w.png  colores cálidos (rojo, naranja) → naranja (lo que se resalta)

Ejemplo (ES02 de la rehabilitación):
    python3 tools/visual/mascaras.py public/proyectos/rehabilitacion-toledo/planos/es02-probabilidad-pilares.png \
        public/visual/rehabilitacion-toledo/es02-plan 0.081 0.084 0.7 0.465

Para «Plantas apiladas», las plantas altas deben llevar solo el edificio (sin
parcela ni vegetación exterior): limpia esas capas antes en CAD o borra la zona
exterior de la máscara.
"""

import sys

import numpy as np
from PIL import Image


def mascaras(lamina: str, prefijo: str, x0: float, y0: float, x1: float, y1: float) -> None:
    im = Image.open(lamina).convert('RGB')
    W, H = im.size
    a = np.asarray(im.crop((int(x0 * W), int(y0 * H), int(x1 * W), int(y1 * H)))).astype(int)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    sat = a.max(-1) - a.min(-1)
    lum = r * 0.3 + g * 0.59 + b * 0.11
    color = sat > 70
    calido = color & (r > g + 40)
    frio = color & ~calido
    lineas = np.clip((235 - lum) * 1.6, 0, 255) * ~color
    for sufijo, m in (('l', lineas), ('c', frio * 255), ('w', calido * 255)):
        o = np.zeros(a.shape[:2] + (4,), np.uint8)
        o[..., :3] = 255
        o[..., 3] = m.astype(np.uint8)
        Image.fromarray(o).save(f'{prefijo}-{sufijo}.png', optimize=True)
    h, w = a.shape[:2]
    print(f'Hecho: {prefijo}-[l|c|w].png · ratio {w}/{h} = {w / h:.4f}')


if __name__ == '__main__':
    if len(sys.argv) != 7:
        sys.exit(__doc__)
    mascaras(sys.argv[1], sys.argv[2], *map(float, sys.argv[3:]))
