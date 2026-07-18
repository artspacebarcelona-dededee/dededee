# DEDEDEE — Landing · Contexto del proyecto

Landing de una sola página para **DEDEDEE Vol. 1**, la mixtape de **Big Papa 313** (Zero Games Records). 15 canciones, 42 min, 19 artistas de tres continentes. La nav tiene un toggle **Vol. 1 / Vol. 2**: Vol. 1 es el contenido real (hero, tracklist, artistas, plataformas) y Vol. 2 es un placeholder "Próximamente".

## Origen

El diseño se creó originalmente como artifact de **Claude Design** (sintaxis `x-dc` / `sc-if` / `sc-for` / `{{ }}` + runtime `support.js`) y se **portó a mano a HTML/CSS/JS vanilla**. No hay frameworks, no hay build, no hay `package.json`.

## Stack

- HTML + CSS + JS vanilla.
- **GSAP 3.12.5 + ScrollTrigger** vía CDN (cdnjs), cargados en el `<head>` de `index.html`.
- Fuentes de Google Fonts: **Archivo Black** (titulares), **Barlow Condensed** (labels/botones), **Barlow** (cuerpo).

## Estructura de archivos

| Archivo | Qué contiene |
|---|---|
| `index.html` | Todo el markup. La mayoría de estilos van **inline por elemento**. |
| `style.css` | Solo estilos globales y `@keyframes` (marquees, flicker, scrollPulse, arrowBounce, cursor). |
| `script.js` | Todo el comportamiento: preloader, cursor custom, toggle Vol1/Vol2, render de tracklist / artistas / plataformas desde arrays de datos, y todas las animaciones GSAP. |

## Paleta

- Fondo: `#060607`
- Texto: `#f0ede7`
- Acento rojo: `#d22c20`
- Grises: `#8a8781` / `#55524c` / `#2e2e30`

## Assets

- `assets/logo-stamp-cutout.png` — logo real (sello "DEDEDEE VOL. 1"). El fondo transparente se generó por **remoción de color** (reconstrucción del canal alfa a partir de la tinta roja), no es un recorte manual — ojo si se reemplaza el archivo. Existe `logo-stamp-cutout.orig.png` como backup del original con halo blanco.
- `assets/cover-vol1.jpg` — portada real (collage de los 19 artistas), redimensionada a **1800px de ancho** para web.

## Correr en local

Abrir `index.html` directo en el navegador, o:

```bash
python3 -m http.server 3000   # desde esta carpeta → http://localhost:3000
```

No hay `npm run dev` (no hay `package.json` todavía).

## Publicar

Sin build: arrastrar esta carpeta a [netlify.com/drop](https://app.netlify.com/drop) da una URL pública instantánea.

## Pendiente / known gaps

- La sección **Vol. 2** es un placeholder "Próximamente" (fecha por anunciar).
- No hay reproductor embebido: los botones de plataformas (Spotify, Apple Music, YouTube, Amazon Music) enlazan directo a las URLs externas de cada servicio en pestaña nueva.
