# Portfolio técnico — delineación, documentación de edificación e IA

Web estática de portfolio, hecha con [Astro](https://astro.build) y TypeScript. No tiene backend, base de datos ni CMS: todo el contenido son archivos de datos tipados dentro de `src/content/`.

**Web publicada:** https://alexhansem.github.io/Personal-Project-Alejandro-Gomez-Jimenez/ (se actualiza sola cada vez que cambia la rama `main`).

> **Estado actual:** todavía no hay proyectos publicados (la web muestra sus secciones vacías, preparadas para recibirlos) y los datos personales son de **EJEMPLO**.

## Añadir proyectos sin tocar código

No hace falta usar GitHub. Envía en el chat del proyecto de Claude, por cada trabajo:

1. Los archivos: PDF de láminas, imágenes o capturas (los DWG, exportados a PDF vectorial).
2. Un texto breve: qué era el encargo, qué hiciste tú y con qué herramientas.
3. Los pasos y tiempos: qué hizo la IA, qué hiciste tú y qué hizo el software, y cuánto tardó cada paso. Indica si cada tiempo está cronometrado o es aproximado.
4. Si lo tienes, cuánto tardarías haciéndolo sin IA, y si ese dato está medido.

Claude lo convierte en una ficha, lo publica y te pasa el enlace. Una interfaz de edición dentro de la propia web necesitaría servidor, almacenamiento de archivos y contraseñas, así que por ahora no compensa.

## Ejecutar en local

Requiere Node.js 22 o superior.

```bash
npm install
npm run dev          # http://localhost:4321, con los borradores visibles
```

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo. Muestra también los borradores. |
| `npm run build` | Comprueba tipos y genera la web final en `dist/`. Excluye borradores y contenido marcado como demo. |
| `npm run preview` | Sirve `dist/` para revisar la build. |
| `npm run check` | Comprobación de TypeScript y plantillas Astro. |
| `npm run lint` | ESLint. |

## Estructura

```
src/
  config/profile.ts        ← nombre, titular, intro, email, enlaces (EJEMPLO)
  config/site.ts           ← navegación
  content/types.ts         ← modelo de datos (qué campos admite cada ficha)
  content/categories.ts    ← categorías de trabajo
  content/projects/*.ts    ← un archivo por proyecto
  content/processes/*.ts   ← un archivo por proceso o herramienta
  components/              ← visor, galería, comparativas, secuencia de trabajo…
  pages/                   ← rutas de la web
public/
  proyectos/<slug>/        ← imágenes y PDF de cada proyecto (crear al añadir uno)
```

Páginas: `/` portada · `/proyectos/` índice con filtros (`?categoria=bim`) · `/proyectos/<slug>/` ficha · `/proyectos/<slug>/documentos/<id>/` visor de PDF · `/procesos/` y `/procesos/<slug>/` · `/comparativas/` · `/metodologia/`.

## Datos personales

Edita `src/config/profile.ts`. Cuando estén tus datos reales, cambia `isExample` a `false`: entonces desaparece la marca EJEMPLO, el email y los enlaces pasan a ser enlaces activos y la web deja de pedir a los buscadores que no la indexen. Los apartados `software` y `education` solo se muestran si tienen contenido.

## Añadir un proyecto

1. Copia `src/content/projects/_PLANTILLA.ts.txt` como `src/content/projects/<slug>.ts`.
2. Rellena **solo** los campos de los que tengas información real y borra el resto. La ficha no muestra etiquetas vacías.
3. Copia imágenes y PDF a `public/proyectos/<slug>/` y referéncialos como `/proyectos/<slug>/archivo.png`.
4. Indica sus categorías en `categories` (puede tener varias). Una categoría solo aparece como filtro si algún proyecto la usa.
5. Deja `published: false` mientras sea un borrador (solo se ve con `npm run dev`). Cámbialo a `true` para publicarlo.

`demo: true` marca contenido ficticio de prueba: nunca entra en `npm run build`. Los procesos y herramientas siguen el mismo sistema, con su plantilla en `src/content/processes/_PLANTILLA.ts.txt`.

## Imágenes, planos y PDF

- **Planos e imágenes** (`media`): PNG, JPG, WebP o SVG. Para que se lean bien al ampliar, exporta los planos a SVG o a PNG de alta resolución (por ejemplo, 300 ppp). Indica `ratio` (ancho / alto) para que la maquetación no salte mientras carga la imagen. Cada imagen se abre en un visor a pantalla completa con zoom (rueda, pellizco, doble clic, `+` / `−`), desplazamiento, tamaño real 1:1, miniaturas y navegación con el teclado.
- **Comparar versiones**: añade `compareWith` a una imagen para mostrar un comparador deslizante antes / después.
- **PDF** (`documents`): cada documento tiene su propia página de visor, con paso de página, miniaturas, zoom nítido y botones para abrir o descargar el archivo original. Si el PDF no carga, se ofrece el enlace directo.
- **DWG**: el navegador no puede mostrarlo. Exporta desde AutoCAD a **PDF vectorial** (recomendado para láminas maquetadas) o a SVG/PNG para planos sueltos.
- **BIM**: pendiente. El siguiente paso previsto es un visor IFC que se cargue solo en su página.
- Si falta una imagen, omite `src`: se dibuja un marcador de posición neutro. Si una ruta es incorrecta, se muestra un aviso en lugar de un hueco.
- **Tablas** (`tables`) y **código** (`code`, con resaltado y botón de copiar) también son campos de la ficha. El código nunca va sin contexto: usa `description`.

## Secuencia de trabajo y comparativas

`workflow` describe el proyecto paso a paso. Cada paso indica quién lo ejecuta (`actor: 'ia' | 'humano' | 'software'`), la herramienta, la entrada y la salida, si es de generación o de revisión (`phase`), y su tiempo:

```ts
time: { minutes: 25, provenance: 'medido', note: 'Cronómetro' }
```

`provenance` puede ser `medido`, `estimado` o `pendiente`. Con esto la ficha dibuja la barra de tiempos y calcula generación, revisión y total. Si falta el tiempo de algún paso, el total queda como pendiente.

`comparison` compara la misma tarea con el método convencional (`reference`) y con el utilizado (`used`), separando `generation`, `review` y, opcionalmente, `total`. Reglas que aplica la web:

- Solo se calcula ahorro y porcentaje cuando **los dos totales son medidos**.
- Si alguno es una estimación, se muestran los tiempos y se explica por qué no se calcula el ahorro.
- Sin `reference`, la comparación aparece como *pendiente de medir*.
- Además del total, se muestra la diferencia en generación y en revisión por separado, para no confundir generar más rápido con terminar antes.

Todas las comparativas aparecen también en `/comparativas/`.

## Publicar

La web se publica sola en GitHub Pages con `.github/workflows/deploy.yml` cada vez que cambia `main`: comprueba lint y tipos, construye con la ruta base del repositorio y despliega.

Para llevarla a otro alojamiento estático (Netlify, Vercel, Cloudflare Pages), basta con el comando `npm run build` y la carpeta `dist`. Con un dominio propio no hace falta `BASE_PATH` (ver `.env.example`).

Antes de enseñarla, cambia `profile.isExample` a `false` con tus datos reales: mientras sea `true`, la web pide a los buscadores que no la indexen.
