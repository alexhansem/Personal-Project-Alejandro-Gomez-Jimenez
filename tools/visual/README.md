# Moldes visuales

Cinco moldes que se dibujan solos a partir de la **ficha visual** de cada proyecto
(`src/visual/fichas/<proyecto>.ts`). Para un proyecto nuevo se copia
`src/visual/fichas/_PLANTILLA.ts.txt`, se rellena y listo. Se ven todos juntos en
`/moldes/` (página de pruebas, sin enlazar ni indexar).

| Molde | Componente | Qué pide de las láminas |
|---|---|---|
| Plantas apiladas | `PlantasApiladas.astro` | Máscara PNG de cada planta (parcela solo en PB) y la zona a destacar en % |
| Sección viva + montaje | `SeccionViva.astro` | Ejes, niveles, pilares, forjados, petos, cerramientos, huecos, capas de fachada |
| Radiografía | `Radiografia.astro` | Plano de estudio en máscaras (`mascaras.py`) y una cifra clave con aviso |
| Expediente | `Expediente.astro` | Cajetín, índice de hojas con su lámina, presupuesto por partidas |
| Modelo 3D en líneas | `ModeloLineas.astro` | GLB exportado del BIM (y el IFC para descargar) |

## Reglas

- Todo dato sale de una lámina y la ficha dice cuál (`fuente`).
- Si un dato no consta, no se inventa: se dibuja como línea o se omite, y se
  explica en `notas` (p. ej. el canto del forjado en las oficinas).
- Los colores salen de `src/styles/v2.css`; las fichas no llevan colores.
- El naranja es solo para lo que se quiere demostrar (patio, lo oculto, la cifra).
- Un molde sin material suficiente simplemente no se usa en ese proyecto.

## Máscaras

```
python3 tools/visual/mascaras.py LAMINA.png public/visual/<proyecto>/<nombre> x0 y0 x1 y1
```

El script imprime el `ratio` que hay que poner en la ficha.
