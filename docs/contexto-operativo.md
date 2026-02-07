# Contexto Operativo del Proyecto (Actualizado)

Fecha de actualizacion: 2026-02-07

## 1. Estado funcional

- Proyecto migrado a Astro (sitio estatico) con islas React puntuales.
- Build validado con `npm run build`.
- Rutas principales y ruta dinamica de profesores activas.

## 2. Decisiones importantes ya aplicadas

1. Logos y header
- Navbar muestra logos institucionales (UAGro + MDO) sin texto extra en el bloque izquierdo.
- Footer incluye UAGro + FCA + MDO.

2. Galeria
- Se reemplazo el set original por imagenes nuevas en `public/assets/galeria/`.
- Fuente de datos: `src/data/galeria.ts`.

3. Convocatoria
- Se agrego imagen centrada al inicio de la seccion (`/convocatoria.jpeg`).

4. Nucleo academico (tarjetas)
- Se muestra `Dr./Dra. + Nombre`.
- Se eliminaron subtextos en la tarjeta (sin area debajo del nombre).

5. Datos de profesores
- Fotos cargadas en `public/assets/profesores/` y enlazadas en `src/data/profesores.ts`.
- Integracion de datos basada en carpeta `profesores/`.
- Regla de conflicto aplicada: **PDF del nucleo > ficha individual**.

## 3. Fuente de verdad para docentes

- Documento rector: `profesores/NUCLEO ACADEMICO.pdf`
- Complemento individual: `profesores/*.txt`
- Sitio publicado: `src/data/profesores.ts`

## 4. Orden de fichas vigente en Nucleo Academico

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
15. Jose Hugo Vazquez Mendoza
16. Nallely Vazquez Martinez

## 5. Archivos clave para mantenimiento

- `src/data/profesores.ts`
- `src/components/cards/ProfesorCard.tsx`
- `src/pages/profesores/[slug].astro`
- `src/pages/nucleo-academico.astro`
- `docs/guia-edicion-y-mantenimiento.md`

## 6. Recomendaciones para siguientes cambios

- Mantener UTF-8 sin BOM en archivos TS/MD.
- Antes de deploy: `npm run lint` + `npm run build`.
- Si se reemplazan fotos: conservar naming por slug para evitar romper rutas.
