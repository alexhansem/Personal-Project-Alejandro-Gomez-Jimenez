"""
Genera los recursos de DEMOSTRACIÓN (láminas SVG y un PDF) en public/demo/.

Son esquemas abstractos, marcados como ficticios en cada hoja, que solo sirven
para probar el visor, la galería y el comparador. No representan ningún
proyecto real. Puedes borrar public/demo/ cuando tengas contenido propio.

Uso:  python3 scripts/generate-demo-assets.py
Requiere: reportlab (solo para el PDF).
"""

from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "public" / "demo"
OUT.mkdir(parents=True, exist_ok=True)

INK = "#1c1c1a"
GREY = "#8a877d"
LIGHT = "#d9d5ca"
RED = "#b4331d"
PAPER = "#fbfaf6"
FONT = "font-family='IBM Plex Mono, ui-monospace, monospace'"


def svg(w, h, body):
    return (
        f"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 {w} {h}' width='{w}' height='{h}'>"
        f"<defs><pattern id='hatch' width='8' height='8' patternUnits='userSpaceOnUse' patternTransform='rotate(45)'>"
        f"<line x1='0' y1='0' x2='0' y2='8' stroke='{GREY}' stroke-width='1'/></pattern>"
        f"<pattern id='dots' width='6' height='6' patternUnits='userSpaceOnUse'>"
        f"<circle cx='3' cy='3' r='0.9' fill='{GREY}'/></pattern></defs>"
        f"<rect width='{w}' height='{h}' fill='{PAPER}'/>{body}</svg>"
    )


def text(x, y, s, size=14, fill=INK, anchor="start", weight=400, extra=""):
    return (
        f"<text x='{x}' y='{y}' {FONT} font-size='{size}' fill='{fill}' "
        f"text-anchor='{anchor}' font-weight='{weight}' {extra}>{s}</text>"
    )


def frame(w, h, title, sheet, scale="S/E"):
    """Marco de lámina con cajetín y sello de demostración."""
    m = 40
    tb_w, tb_h = 620, 150
    x0, y0 = w - m - tb_w, h - m - tb_h
    parts = [
        f"<rect x='{m}' y='{m}' width='{w-2*m}' height='{h-2*m}' fill='none' stroke='{INK}' stroke-width='2'/>",
        f"<rect x='{m+12}' y='{m+12}' width='{w-2*m-24}' height='{h-2*m-24}' fill='none' stroke='{INK}' stroke-width='0.6'/>",
        # cajetín
        f"<rect x='{x0}' y='{y0}' width='{tb_w}' height='{tb_h}' fill='{PAPER}' stroke='{INK}' stroke-width='1.4'/>",
        f"<line x1='{x0}' y1='{y0+50}' x2='{x0+tb_w}' y2='{y0+50}' stroke='{INK}' stroke-width='0.8'/>",
        f"<line x1='{x0}' y1='{y0+100}' x2='{x0+tb_w}' y2='{y0+100}' stroke='{INK}' stroke-width='0.8'/>",
        f"<line x1='{x0+420}' y1='{y0+50}' x2='{x0+420}' y2='{y0+tb_h}' stroke='{INK}' stroke-width='0.8'/>",
        text(x0 + 16, y0 + 32, "DOCUMENTO DE DEMOSTRACIÓN · CONTENIDO FICTICIO", 17, RED, weight=600),
        text(x0 + 16, y0 + 82, title, 18, weight=600),
        text(x0 + 436, y0 + 82, f"HOJA {sheet}", 18),
        text(x0 + 16, y0 + 132, "No corresponde a ningún proyecto real", 13, GREY),
        text(x0 + 436, y0 + 132, f"ESCALA {scale}", 13, GREY),
    ]
    # Sello diagonal discreto
    parts.append(
        f"<g transform='translate({w/2} {h/2}) rotate(-18)' opacity='0.10'>"
        + text(0, 0, "DEMO · FICTICIO", 150, RED, "middle", 700)
        + "</g>"
    )
    return "".join(parts)


def axes(xs, ys, top, left, bottom, right):
    out = []
    for i, x in enumerate(xs):
        label = chr(65 + i)
        out.append(f"<line x1='{x}' y1='{top}' x2='{x}' y2='{bottom}' stroke='{GREY}' stroke-width='0.6' stroke-dasharray='18 6 3 6'/>")
        out.append(f"<circle cx='{x}' cy='{top-22}' r='16' fill='{PAPER}' stroke='{INK}' stroke-width='1'/>")
        out.append(text(x, top - 17, label, 14, anchor="middle"))
    for j, y in enumerate(ys):
        out.append(f"<line x1='{left}' y1='{y}' x2='{right}' y2='{y}' stroke='{GREY}' stroke-width='0.6' stroke-dasharray='18 6 3 6'/>")
        out.append(f"<circle cx='{left-22}' cy='{y}' r='16' fill='{PAPER}' stroke='{INK}' stroke-width='1'/>")
        out.append(text(left - 22, y + 5, str(j + 1), 14, anchor="middle"))
    return "".join(out)


def dim_h(x1, x2, y, label):
    return (
        f"<line x1='{x1}' y1='{y}' x2='{x2}' y2='{y}' stroke='{INK}' stroke-width='0.7'/>"
        f"<line x1='{x1}' y1='{y-8}' x2='{x1}' y2='{y+8}' stroke='{INK}' stroke-width='0.7'/>"
        f"<line x1='{x2}' y1='{y-8}' x2='{x2}' y2='{y+8}' stroke='{INK}' stroke-width='0.7'/>"
        f"<line x1='{x1-5}' y1='{y+5}' x2='{x1+5}' y2='{y-5}' stroke='{INK}' stroke-width='1.4'/>"
        f"<line x1='{x2-5}' y1='{y+5}' x2='{x2+5}' y2='{y-5}' stroke='{INK}' stroke-width='1.4'/>"
        + text((x1 + x2) / 2, y - 8, label, 11, anchor="middle")
    )


def dim_v(x, y1, y2, label):
    return (
        f"<line x1='{x}' y1='{y1}' x2='{x}' y2='{y2}' stroke='{INK}' stroke-width='0.7'/>"
        f"<line x1='{x-8}' y1='{y1}' x2='{x+8}' y2='{y1}' stroke='{INK}' stroke-width='0.7'/>"
        f"<line x1='{x-8}' y1='{y2}' x2='{x+8}' y2='{y2}' stroke='{INK}' stroke-width='0.7'/>"
        f"<line x1='{x-5}' y1='{y1+5}' x2='{x+5}' y2='{y1-5}' stroke='{INK}' stroke-width='1.4'/>"
        f"<line x1='{x-5}' y1='{y2+5}' x2='{x+5}' y2='{y2-5}' stroke='{INK}' stroke-width='1.4'/>"
        + f"<g transform='translate({x-8} {(y1+y2)/2}) rotate(-90)'>" + text(0, 0, label, 11, anchor="middle") + "</g>"
    )


def room(x, y, w, h, name, area):
    return (
        text(x + w / 2, y + h / 2 - 4, name, 13, anchor="middle", weight=600)
        + text(x + w / 2, y + h / 2 + 16, f"S. útil {area} m²", 11, GREY, "middle")
    )


def plan(version=2):
    """Planta esquemática abstracta. La versión 1 es un estado previo para el comparador."""
    W, H = 2400, 1700
    L, T = 300, 260
    xs = [L, L + 520, L + 1040, L + 1560]
    ys = [T, T + 440, T + 880]
    body = [axes(xs, ys, T - 60, L - 60, ys[-1] + 60, xs[-1] + 60)]
    wall = 22
    # Muros exteriores (relleno de sección)
    ox, oy, ow, oh = xs[0], ys[0], xs[-1] - xs[0], ys[-1] - ys[0]
    body.append(f"<rect x='{ox}' y='{oy}' width='{ow}' height='{oh}' fill='url(#hatch)' stroke='{INK}' stroke-width='2.2'/>")
    body.append(f"<rect x='{ox+wall}' y='{oy+wall}' width='{ow-2*wall}' height='{oh-2*wall}' fill='{PAPER}' stroke='{INK}' stroke-width='1.6'/>")
    # Particiones
    inner = 9
    parts = [
        (xs[1], ys[0], xs[1], ys[2]),
        (xs[2], ys[0], xs[2], ys[1]),
        (xs[0], ys[1], xs[1], ys[1]),
        (xs[2], ys[1], xs[3], ys[1]),
    ]
    if version == 2:
        parts.append((xs[2] + 260, ys[1], xs[2] + 260, ys[2]))
    for x1, y1, x2, y2 in parts:
        if x1 == x2:
            body.append(f"<rect x='{x1-inner/2}' y='{y1}' width='{inner}' height='{y2-y1}' fill='{INK}'/>")
        else:
            body.append(f"<rect x='{x1}' y='{y1-inner/2}' width='{x2-x1}' height='{inner}' fill='{INK}'/>")
    # Huecos de puerta (con arco)
    doors = [(xs[1], ys[0] + 300), (xs[1], ys[1] + 120), (xs[2], ys[0] + 300)]
    if version == 2:
        doors.append((xs[2] + 260, ys[1] + 200))
    for dx, dy in doors:
        body.append(f"<rect x='{dx-8}' y='{dy}' width='16' height='90' fill='{PAPER}'/>")
        body.append(f"<path d='M {dx} {dy} L {dx+90} {dy}' stroke='{INK}' stroke-width='1'/>")
        body.append(f"<path d='M {dx+90} {dy} A 90 90 0 0 1 {dx} {dy+90}' fill='none' stroke='{INK}' stroke-width='0.6' stroke-dasharray='4 3'/>")
    # Ventanas en fachada
    for wx in [xs[0] + 160, xs[1] + 200, xs[2] + 180, xs[2] + 380]:
        body.append(f"<rect x='{wx}' y='{oy-2}' width='140' height='{wall+4}' fill='{PAPER}' stroke='{INK}' stroke-width='0.8'/>")
        body.append(f"<line x1='{wx}' y1='{oy+wall/2}' x2='{wx+140}' y2='{oy+wall/2}' stroke='{INK}' stroke-width='0.8'/>")
    # Rótulos
    body.append(room(xs[0], ys[0], 520, 440, "ESTANCIA A", "22,40"))
    body.append(room(xs[0], ys[1], 520, 440, "ESTANCIA B", "21,85"))
    body.append(room(xs[1], ys[0], 1040 - 520, 880, "ESPACIO C", "46,10"))
    body.append(room(xs[2], ys[0], 520, 440, "ESTANCIA D", "22,40"))
    if version == 2:
        body.append(room(xs[2], ys[1], 260, 440, "E1", "10,20"))
        body.append(room(xs[2] + 260, ys[1], 260, 440, "E2", "10,05"))
    else:
        body.append(room(xs[2], ys[1], 520, 440, "ESTANCIA E", "20,90"))
    # Cotas
    for i in range(3):
        body.append(dim_h(xs[i], xs[i + 1], ys[-1] + 130, "5,20"))
    body.append(dim_h(xs[0], xs[-1], ys[-1] + 185, "15,60"))
    for j in range(2):
        body.append(dim_v(xs[-1] + 140, ys[j], ys[j + 1], "4,40"))
    # Norte
    nx, ny = W - 200, 220
    body.append(f"<circle cx='{nx}' cy='{ny}' r='46' fill='none' stroke='{INK}' stroke-width='1'/>")
    body.append(f"<path d='M {nx} {ny-46} L {nx+16} {ny+30} L {nx} {ny+16} L {nx-16} {ny+30} Z' fill='{INK}'/>")
    body.append(text(nx, ny - 58, "N", 16, anchor="middle", weight=600))
    # Leyenda de revisión
    rev = "REV. B · Partición en estancia E" if version == 2 else "REV. A · Estado inicial"
    body.append(text(L - 60, H - 90, rev, 14, RED if version == 2 else GREY))
    title = "PLANTA ESQUEMÁTICA" + (" · REV. B" if version == 2 else " · REV. A")
    body.append(frame(W, H, title, "D-01", "1:50 (ficticia)"))
    return svg(W, H, "".join(body))


def section():
    W, H = 2400, 1500
    base = 1050
    body = []
    # Terreno
    body.append(f"<rect x='120' y='{base}' width='2160' height='90' fill='url(#dots)' stroke='none'/>")
    body.append(f"<line x1='120' y1='{base}' x2='2280' y2='{base}' stroke='{INK}' stroke-width='2'/>")
    levels = [(base, "±0,00"), (base - 320, "+3,20"), (base - 640, "+6,40")]
    x1, x2 = 420, 1980
    for i, (y, lab) in enumerate(levels):
        body.append(f"<rect x='{x1}' y='{y-26}' width='{x2-x1}' height='26' fill='url(#hatch)' stroke='{INK}' stroke-width='1.6'/>")
        body.append(f"<line x1='{x2+40}' y1='{y}' x2='{x2+210}' y2='{y}' stroke='{INK}' stroke-width='0.8'/>")
        body.append(f"<path d='M {x2+60} {y} l 12 -14 l 12 14 Z' fill='{INK}'/>")
        body.append(text(x2 + 90, y - 6, f"N{i} {lab}", 13))
    # Cubierta
    body.append(f"<path d='M {x1-40} {levels[2][0]-26} L {(x1+x2)/2} {levels[2][0]-240} L {x2+40} {levels[2][0]-26}' fill='none' stroke='{INK}' stroke-width='2.2'/>")
    # Muros
    for x in (x1, x2 - 24):
        body.append(f"<rect x='{x}' y='{levels[2][0]-26}' width='24' height='{base-levels[2][0]+26}' fill='url(#hatch)' stroke='{INK}' stroke-width='1.6'/>")
    # Huecos
    for y, _ in levels[:2]:
        for hx in (700, 1150, 1600):
            body.append(f"<rect x='{hx}' y='{y-250}' width='200' height='170' fill='none' stroke='{INK}' stroke-width='0.8'/>")
            body.append(f"<line x1='{hx+100}' y1='{y-250}' x2='{hx+100}' y2='{y-80}' stroke='{INK}' stroke-width='0.5'/>")
    body.append(dim_v(330, levels[1][0], levels[0][0], "3,20"))
    body.append(dim_v(330, levels[2][0], levels[1][0], "3,20"))
    body.append(text(160, 160, "SECCIÓN ESQUEMÁTICA S-1", 22, weight=600))
    body.append(frame(W, H, "SECCIÓN ESQUEMÁTICA", "D-02", "1:50 (ficticia)"))
    return svg(W, H, "".join(body))


def detail():
    W, H = 1800, 1400
    body = []
    layers = [
        ("Acabado interior (ficticio)", 30, "none"),
        ("Hoja interior", 110, "url(#hatch)"),
        ("Aislante", 80, "url(#dots)"),
        ("Cámara", 40, "none"),
        ("Hoja exterior", 120, "url(#hatch)"),
        ("Revestimiento", 20, "none"),
    ]
    x = 520
    top, bottom = 200, 1000
    for i, (name, th, fill) in enumerate(layers):
        body.append(f"<rect x='{x}' y='{top}' width='{th}' height='{bottom-top}' fill='{fill}' stroke='{INK}' stroke-width='1.4'/>")
        ly = 260 + i * 110
        body.append(f"<line x1='{x+th/2}' y1='{ly}' x2='1260' y2='{ly}' stroke='{INK}' stroke-width='0.6'/>")
        body.append(f"<circle cx='{x+th/2}' cy='{ly}' r='4' fill='{INK}'/>")
        body.append(text(1275, ly + 5, f"{i+1:02d}  {name}", 15))
        x += th
    body.append(dim_h(520, x, 1060, f"{sum(l[1] for l in layers)/10:.1f} cm".replace(".", ",")))
    body.append(text(120, 140, "DETALLE ESQUEMÁTICO DE CERRAMIENTO", 22, weight=600))
    body.append(text(120, 172, "Capas genéricas para probar el visor. Sin valor constructivo.", 14, GREY))
    body.append(frame(W, H, "DETALLE ESQUEMÁTICO", "D-03", "1:5 (ficticia)"))
    return svg(W, H, "".join(body))


def table_capture():
    """Captura simulada de una tabla de superficies generada por un script (ficticia)."""
    W, H = 1600, 1000
    body = [f"<rect x='0' y='0' width='{W}' height='56' fill='#e9e6dd'/>"]
    body.append(text(28, 36, "superficies_demo.csv — salida de ejemplo (ficticia)", 16))
    cols = ["Estancia", "Nivel", "S. útil (m²)", "S. construida (m²)", "Uso"]
    widths = [320, 200, 260, 320, 380]
    rows = [
        ["Estancia A", "N0", "22,40", "25,10", "Ejemplo"],
        ["Estancia B", "N0", "21,85", "24,60", "Ejemplo"],
        ["Espacio C", "N0", "46,10", "51,30", "Ejemplo"],
        ["Estancia D", "N0", "22,40", "25,10", "Ejemplo"],
        ["E1", "N0", "10,20", "11,70", "Ejemplo"],
        ["E2", "N0", "10,05", "11,55", "Ejemplo"],
        ["TOTAL", "", "133,00", "149,35", ""],
    ]
    y = 140
    x = 60
    for c, w in zip(cols, widths):
        body.append(text(x, y, c, 16, weight=600))
        x += w
    body.append(f"<line x1='60' y1='{y+18}' x2='{W-60}' y2='{y+18}' stroke='{INK}' stroke-width='1.4'/>")
    for r in rows:
        y += 70
        x = 60
        bold = 600 if r[0] == "TOTAL" else 400
        for v, w in zip(r, widths):
            body.append(text(x, y, v, 16, weight=bold))
            x += w
        body.append(f"<line x1='60' y1='{y+22}' x2='{W-60}' y2='{y+22}' stroke='{LIGHT}' stroke-width='1'/>")
    body.append(text(60, H - 60, "DATOS FICTICIOS DE DEMOSTRACIÓN", 16, RED, weight=600))
    return svg(W, H, "".join(body))


def flow_diagram():
    W, H = 2000, 760
    body = []
    boxes = [
        ("01", "Encargo y datos", "Humano"),
        ("02", "Instrucciones a la IA", "Humano"),
        ("03", "Generación", "IA"),
        ("04", "Ejecución en CAD", "Software"),
        ("05", "Revisión técnica", "Humano"),
        ("06", "Entregable", "—"),
    ]
    bw, gap = 260, 64
    x = 80
    for i, (n, name, actor) in enumerate(boxes):
        stroke = RED if actor == "IA" else INK
        body.append(f"<rect x='{x}' y='260' width='{bw}' height='200' fill='{PAPER}' stroke='{stroke}' stroke-width='1.6'/>")
        body.append(text(x + 18, 296, n, 15, GREY))
        body.append(text(x + 18, 360, name, 19, weight=600))
        body.append(text(x + 18, 430, actor.upper(), 13, stroke))
        if i < len(boxes) - 1:
            body.append(f"<line x1='{x+bw}' y1='360' x2='{x+bw+gap-10}' y2='360' stroke='{INK}' stroke-width='1.2'/>")
            body.append(f"<path d='M {x+bw+gap-12} 352 L {x+bw+gap} 360 L {x+bw+gap-12} 368 Z' fill='{INK}'/>")
        x += bw + gap
    # bucle de corrección
    body.append(f"<path d='M {80+4*(bw+gap)+bw/2} 460 V 560 H {80+2*(bw+gap)+bw/2} V 466' fill='none' stroke='{GREY}' stroke-width='1.2' stroke-dasharray='8 6'/>")
    body.append(text(80 + 3 * (bw + gap) + bw / 2, 590, "correcciones", 14, GREY, "middle"))
    body.append(text(80, 140, "ESQUEMA DE FLUJO DE TRABAJO (DEMOSTRACIÓN)", 22, weight=600))
    body.append(text(80, 176, "Diagrama genérico. No describe un proceso real medido.", 15, GREY))
    return svg(W, H, "".join(body))


files = {
    "demo-planta-rev-a.svg": plan(1),
    "demo-planta-rev-b.svg": plan(2),
    "demo-seccion.svg": section(),
    "demo-detalle.svg": detail(),
    "demo-tabla-superficies.svg": table_capture(),
    "demo-esquema-flujo.svg": flow_diagram(),
}
for name, content in files.items():
    (OUT / name).write_text(content, encoding="utf-8")
    print("✓", name)


def make_pdf():
    from reportlab.lib.pagesizes import A3, landscape
    from reportlab.lib.colors import HexColor
    from reportlab.pdfgen import canvas

    path = OUT / "demo-documentacion.pdf"
    w, h = landscape(A3)
    c = canvas.Canvas(str(path), pagesize=(w, h))
    c.setTitle("Documento de demostración — contenido ficticio")
    ink, red, grey = HexColor(INK), HexColor(RED), HexColor(GREY)
    pages = [
        ("Memoria descriptiva (ficticia)", [
            "1. Objeto del documento",
            "Este PDF existe solo para probar el visor de documentos del portfolio.",
            "Ningún dato de este documento corresponde a un proyecto real.",
            "",
            "2. Descripción general (texto de relleno)",
            "Se describe un edificio genérico de una planta con cinco estancias.",
            "Las superficies son inventadas y no tienen valor técnico.",
        ]),
        ("Cuadro de superficies (ficticio)", None),
        ("Planta esquemática (ficticia)", "plan"),
    ]
    for i, (title, content) in enumerate(pages, start=1):
        c.setStrokeColor(ink)
        c.setLineWidth(1.4)
        c.rect(20, 20, w - 40, h - 40)
        c.setLineWidth(0.5)
        c.rect(28, 28, w - 56, h - 56)
        # cajetín
        c.setLineWidth(1)
        c.rect(w - 28 - 330, 28, 330, 80)
        c.setFillColor(red)
        c.setFont("Helvetica-Bold", 10)
        c.drawString(w - 28 - 320, 90, "DOCUMENTO DE DEMOSTRACIÓN · CONTENIDO FICTICIO")
        c.setFillColor(ink)
        c.setFont("Helvetica-Bold", 12)
        c.drawString(w - 28 - 320, 62, title)
        c.setFont("Helvetica", 9)
        c.setFillColor(grey)
        c.drawString(w - 28 - 320, 40, f"Página {i} de {len(pages)} · No corresponde a ningún proyecto real")
        c.setFillColor(ink)
        c.setFont("Helvetica-Bold", 20)
        c.drawString(60, h - 80, title)
        if isinstance(content, list):
            c.setFont("Helvetica", 12)
            y = h - 130
            for line in content:
                c.drawString(60, y, line)
                y -= 22
        elif content is None:
            rows = [("Estancia", "S. útil (m²)", "S. construida (m²)"),
                    ("Estancia A", "22,40", "25,10"), ("Estancia B", "21,85", "24,60"),
                    ("Espacio C", "46,10", "51,30"), ("Estancia D", "22,40", "25,10"),
                    ("E1", "10,20", "11,70"), ("E2", "10,05", "11,55"),
                    ("TOTAL", "133,00", "149,35")]
            y = h - 140
            for j, r in enumerate(rows):
                c.setFont("Helvetica-Bold" if j in (0, len(rows) - 1) else "Helvetica", 12)
                for k, v in enumerate(r):
                    c.drawString(60 + k * 200, y, v)
                c.setLineWidth(0.4 if j else 1)
                c.line(60, y - 8, 660, y - 8)
                y -= 30
        else:
            # planta muy simplificada en vector
            ox, oy = 120, 180
            c.setLineWidth(3)
            c.rect(ox, oy, 780, 440)
            c.setLineWidth(2)
            c.line(ox + 260, oy, ox + 260, oy + 440)
            c.line(ox + 520, oy + 220, ox + 520, oy + 440)
            c.line(ox, oy + 220, ox + 260, oy + 220)
            c.line(ox + 520, oy + 220, ox + 780, oy + 220)
            c.setFont("Helvetica", 10)
            for (tx, ty, lab) in [(ox + 90, oy + 330, "ESTANCIA A"), (ox + 90, oy + 110, "ESTANCIA B"),
                                  (ox + 350, oy + 220, "ESPACIO C"), (ox + 610, oy + 330, "ESTANCIA D"),
                                  (ox + 610, oy + 110, "ESTANCIA E")]:
                c.drawString(tx, ty, lab)
            c.setFont("Helvetica", 6)
            c.drawString(ox, oy - 20, "Texto de 6 pt para comprobar la legibilidad al ampliar: cotas y rótulos ficticios 5,20 · 4,40 · 15,60")
        c.saveState()
        c.translate(w / 2, h / 2)
        c.rotate(18)
        c.setFillColor(red)
        c.setFillAlpha(0.08)
        c.setFont("Helvetica-Bold", 110)
        c.drawCentredString(0, 0, "DEMO · FICTICIO")
        c.restoreState()
        c.showPage()
    c.save()
    print("✓", path.name)


make_pdf()
