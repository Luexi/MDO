# Guia de Edicion y Mantenimiento

Guia operativa para editar contenido, imagenes, secciones y componentes sin romper el sitio.

## 1. Checklist rapido antes de cambiar

1. `npm install` (si no instalaste deps)
2. `npm run dev`
3. Identifica el tipo de cambio:
- contenido
- assets
- estructura visual
- nueva funcionalidad

## 2. Edicion de contenido (caso mas comun)

### Profesores

Archivo: `src/data/profesores.ts`

Puedes editar:
- nombre
- grado
- area
- linea
- email
- semblanza
- historial academico
- publicaciones
- `slug`

Importante:
- Si cambias `slug`, cambia la URL del profesor.
- Si hay conflicto entre datos individuales y el PDF oficial del nucleo, prevalece el PDF.

### Fuente de verdad del Nucleo Academico

1. `profesores/NUCLEO ACADEMICO.pdf` (prioridad alta)
2. `profesores/*.txt` por profesor (complemento)
3. `src/data/profesores.ts` (estado publicado en el sitio)

### Orden oficial actual de fichas (Nucleo Academico)

1. Ruben Hernandez Chavarria
2. David Antonio Reyes Pena
3. Irma Amalia Mendez Castrejon
4. Evelyn Janet Zavaleta Carbajal
5. Yanira Gallardo Moreno
6. Gabriela del Carmen Rivero Solana
7. Citlalli Arroyo Rosas
8. Remigio Marin Ibarra
9. Liliana Galeana Camacho
10. Jose Luis Susano Garcia
11. Rosa Alejandra Vazquez Martinez
12. Justino Arziga Castanon
13. Tania de Jesus Adame Zambrano
14. Adriana Miranda Esteban
15. Jose Hugo Vazquez Mendoza (agregado al final por no estar en el orden solicitado)
16. Nallely Vazquez Martinez (agregada al final por no estar en el orden solicitado)

### Tesis

Archivo: `src/data/tesis.ts`

Puedes editar:
- generaciones
- tesis por generacion
- links de Drive

### Repositorio de documentos

Archivo: `src/data/documentos.ts`

Puedes editar:
- titulo
- descripcion
- categoria
- linkDrive
- icono

### Instalaciones

Archivo: `src/data/instalaciones.ts`

### Galeria

Archivo de datos: `src/data/galeria.ts`

Archivos de imagen: `public/assets/galeria/`

Reglas:
- Subir imagen primero a `public/assets/galeria/`
- Referenciarla en `src/data/galeria.ts`
- Verificar ruta exacta y extension

### Vinculacion

Archivo: `src/data/vinculacion.ts`

## 3. Edicion de logos

Carpeta: `public/assets/logos/`

Referencias actuales:

- Navbar: `src/components/layout/Navbar.astro`
- Footer: `src/components/layout/Footer.astro`

## 4. Cambios visuales (layout/estilo)

- Layout global: `src/layouts/BaseLayout.astro`
- Navbar: `src/components/layout/Navbar.astro` (componente Astro puro)
- Footer: `src/components/layout/Footer.astro`
- Variables/tema: `src/styles/global.css`
- Config Tailwind: `tailwind.config.ts`

## 5. Cambios de rutas o paginas

Paginas en `src/pages/`.

Si agregas una pagina nueva:
1. Crear archivo `.astro` en `src/pages/`
2. Agregar enlace en `Navbar.astro` y/o footer
3. Probar navegacion

## 6. Interactividad nueva

### Opcion 1: Componente Astro puro (preferido)

Si la interactividad se puede resolver con CSS o un `<script>` inline:

1. Crear componente `.astro` en `src/components/`
2. Usar tecnicas CSS-only (`peer-checked`, `:target`, etc.) o un `<script>` vanilla
3. Importarlo directamente en la pagina

Ejemplos existentes: Navbar (script inline), ObjetivosTabs (radio buttons + `peer-checked`).

### Opcion 2: Isla React (solo si es necesario)

Si la seccion necesita estado complejo o handlers de React:

1. Crear componente `.tsx` en `src/components/islands/`
2. Importarlo en la pagina `.astro`
3. Hidratar con `client:idle` o `client:load`

Recomendacion:

- `client:idle` por defecto
- `client:load` solo si debe estar disponible inmediatamente
- Preferir Astro puro cuando sea posible para reducir JS en el cliente

## 7. Flujo seguro para cambios

1. Editar archivos
2. `npm run lint`
3. `npm run test`
4. `npm run build`
5. Revisar en `npm run preview` o `npm run dev`

## 8. Problemas comunes y solucion

### La imagen no aparece

- Revisa nombre exacto (mayusculas/minusculas)
- Revisa extension real (`.jpg`, `.webp`) — los logos usan `.webp`, las fotos `.jpg` o `.webp`
- Revisa ruta en `src/data/galeria.ts`
- Si agregas imagenes nuevas, optimizalas antes (WebP para logos, JPEG comprimido para fotos)

### Cambie data pero no se actualiza

- Reinicia `npm run dev`
- Limpia cache del navegador

### Build falla en tipos

- Revisa imports de tipos con `import type`
- Revisa props en componentes TSX

### Se ve distinto en mobile

- Verifica clases responsive de Tailwind
- Prueba con viewport real en devtools

## 9. Convenciones recomendadas

- Nombres de archivos en minusculas y con guiones
- Commits pequenos y descriptivos
- No mezclar cambios de contenido con refactors grandes

## 10. Verificacion previa a deploy

- Rutas principales accesibles
- Navbar y footer correctos
- Galeria y logos cargan bien
- Links externos correctos
- `npm run build` sin errores

## 11. Contacto tecnico interno

Si vas a hacer cambios estructurales (routing, arquitectura, dependencias), documenta la decision en `docs/` junto al cambio para mantener trazabilidad.
