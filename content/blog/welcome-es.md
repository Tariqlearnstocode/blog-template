---
slug: "bienvenida"
locale: "es"
translation_key: "welcome"
title: "Bienvenido a Tu Nuevo Blog"
category: "Primeros pasos"
meta_title: ""
meta_description: "Un recorrido por esta plantilla de blog: dónde viven los artículos, cómo se configura el diseño y qué cambiar antes de publicar."
excerpt: "Un recorrido rápido por la plantilla. Dónde viven los artículos, qué controla el archivo de configuración y qué cambiar antes de publicar."
published_at: "2026-10-07T12:00:00.000Z"
updated_at: "2026-10-07T12:00:00.000Z"
---

## Todo es un archivo

Los artículos son archivos markdown en `content/blog/`. No hay base de datos ni panel de administración. Para publicar, agrega un archivo, haz commit y push; el hosting reconstruye el sitio y cada página se genera como HTML estático.

## Un solo archivo de configuración

`site.config.ts` guarda el nombre del sitio, el dominio, el logo, los colores de marca, los IDs de analítica y todo el texto de la llamada a la acción.

## Versiones en dos idiomas

Un artículo en inglés y su versión en español comparten el mismo `translation_key`. Así el sitio los enlaza entre sí y le indica a Google que son traducciones.
