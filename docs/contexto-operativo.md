# Contexto Operativo del Proyecto

Fecha de actualizacion: 2026-08-05

## 1. Estado funcional

- Sitio estatico en Astro. Una sola isla React (`GaleriaLightbox`); el resto del comportamiento es JavaScript vanilla en `src/scripts/`.
- Build validado con `npm run build`: guard de enlaces, `astro check` y compilacion.
- Rutas principales, ruta dinamica de profesores y `/plan-estudios` activas, con sitemap generado.
- Convocatoria para la generacion febrero 2027 publicada, con pre-registro del 19 al 30 de octubre de 2026.

### Donde vive el sitio

| Direccion | Que es hoy | Base |
| --- | --- | --- |
| `https://mdo-alpha.vercel.app` | **El sitio publico.** Destino del QR del cartel impreso y del dominio de la UAGro | `/` |
| `https://maestriadirecciondeorganizaciones.uagro.mx` | Existe y **redirige** a Vercel. Resuelve a `200.4.142.12`, un servidor de la Universidad que reenvia; no sirve contenido propio | — |
| `https://luexi.github.io/MDO` | Compila lo mismo, pero nadie lo enlaza. Respaldo | `/MDO` |

Los dos despliegues declaran el mismo canonico, **el de Vercel**, asi que solo
una direccion compite por la indexacion. Ver `src/lib/seo.ts`.

> **Aviso para quien retome el proyecto.** La documentacion describio un tiempo
> GitHub Pages como "produccion" y Vercel como algo temporal. Es falso en la
> practica y ya provoco dos veces que se configurara el dominio equivocado, una
> de ellas dejando la pagina del QR pidiendo a los buscadores que indexaran
> otra. Verifica el QR y la redireccion del dominio antes de tocar nada de
> dominios.

**Pendiente con sistemas:** que el dominio de la UAGro sirva el sitio en lugar
de redirigir, y pase a ser el canonico. Es lo que corresponde a un programa
institucional: hoy la barra de direcciones muestra `mdo-alpha.vercel.app`,
incluido para los evaluadores del SNP.

## 2. Cambios aplicados el 2026-08-05

Responden a una auditoria tecnica del codigo (accesibilidad, rendimiento,
theming, responsive e integridad de implementacion). Ningun cambio toca el
contenido academico salvo donde el texto contradecia a la propia pagina.

### Accesibilidad

- **`<a>` envolviendo `<Button>`, en seis sitios.** `<a>` no admite contenido
  interactivo: era HTML invalido y los lectores de pantalla anunciaban dos
  controles para una sola accion. Se extrajo `ButtonLink`
  (`src/components/ui/`, version `.tsx` y `.astro`), que centraliza ademas
  `target`, `rel` y el aviso "se abre en una pestaña nueva". Cero anidamientos
  en el HTML publicado.
- **Contraste por debajo de AA en dos paginas.** `text-muted-foreground` sobre
  `bg-primary/5` da 4.46:1. Estaba vivo en `/tesis` y `/lies`. Se sustituyo por
  `text-foreground/80` (8.5:1). Cuando se corrigio el token se verificaron dos
  superficies; esta era una cuarta.
- **`aria-current="page"` duplicado.** En `/convocatoria` se marcaban dos
  destinos distintos como pagina actual, porque `esRutaActiva()` ignoraba el
  ancla. Un enlace con ancla apunta a una seccion, no a la pagina; ya no se
  marca. El resaltado del grupo sigue funcionando igual.
- **"En proceso" era un boton deshabilitado.** Es informacion, no un control:
  quedaba fuera del orden de tabulacion y `opacity-50` lo dejaba en 3.3:1. Ahora
  es una insignia (`EstadoEnProceso`) con contraste completo.
- **Objetivos tactiles.** Boton de menu, enlaces de redes y llamadas a la accion
  de tarjeta pasan de 36-40 px a 44 px.
- **Fondo del visor de galeria.** Era un `div` con `onClick` sin equivalente de
  teclado. Ahora va `aria-hidden`, como corresponde a una comodidad de raton;
  la salida real sigue siendo Escape o el boton de cerrar.

### Rendimiento

- **`/tesis` ya no carga React.** El filtro de generacion era una isla que traia
  54 KB comprimidos de framework para una sola cadena de estado, incumpliendo la
  regla del propio proyecto. Es `src/scripts/filtroTesis.ts`. La unica isla que
  queda es el visor de galeria.
- **Tipografia auto-hospedada.** Inter y Playfair salen de `src/assets/fonts/`
  con familias de reserva de metricas corregidas, calculadas de los archivos
  reales. Se acaba el salto de encabezados al intercambiar la fuente y se
  eliminan dos origenes de terceros de la ruta critica.
- **Galeria.** Las fotos pasaron de `public/` a `src/assets/`, o sea al pipeline
  de Astro. De 800 KB de JPEG a ~117 KB de WebP para las cinco miniaturas.
- **Cartel de la convocatoria.** Estaba `lazy` estando dentro del viewport en
  escritorio, y a 1241 px en una columna de 320. Ahora carga de inmediato y con
  `srcset` de 640/900/1241. El original sigue disponible completo.

### SEO

- **Canonico unico.** GitHub Pages y Vercel se autodeclaraban canonicos cada
  uno: el mismo contenido duplicado en dos dominios sin señal de cual indexar.
  Ahora los dos emiten la misma URL canonica y el mismo sitemap, **los de
  Vercel**, que es donde apunta el QR del cartel y a donde redirige el dominio
  de la UAGro. Ver `src/lib/seo.ts`.
- **Sitemap** (`@astrojs/sitemap`) y directiva `Sitemap:` en `robots.txt`.

> Correccion del mismo dia: la primera version de este cambio apunto el canonico
> a GitHub Pages, siguiendo lo que decia la documentacion del repositorio. Era
> el sitio equivocado: dejaba la pagina del QR pidiendo que se indexara una
> direccion que nadie enlaza. Se corrigio en cuanto se verifico a donde va el QR
> y a donde redirige el dominio de la UAGro.

### Puerta de calidad

Era ceremonial: la unica prueba afirmaba `true === true` y el lint no miraba los
`.astro`, que son la mayor parte del sitio.

- 47 pruebas reales sobre `withBase`/`withoutBase`, `esRutaActiva`, las reglas
  del guard de enlaces y las invariantes de `src/data/*`.
- Lint sobre 58 archivos, 20 de ellos `.astro` (antes cero), con
  `eslint-plugin-astro` y `eslint-plugin-jsx-a11y`, y `no-unused-vars` activo.
- Dos reglas nuevas en `scripts/check-enlaces.mjs`: `boton-en-enlace` (impide
  reintroducir el anidamiento) y `host-cableado`.

### Contradicciones entre codigo y documentacion

- La regla `dominio-vercel` del guard prohibia `mdo-alpha.vercel.app` con el
  mensaje "el sitio se publica en GitHub Pages". Dejo de ser cierto en cuanto
  Vercel volvio por el QR: el guard bloqueaba el dominio del que depende la
  convocatoria impresa. Ahora solo dispara si el host aparece cableado en un
  `href`/`src`.
- `/tesis` afirmaba que "los documentos estan disponibles en formato PDF a
  traves de Google Drive". Ninguna de las cinco tesis tiene enlace: las cinco se
  muestran "En proceso". Se corrigio el texto para describir lo que la pagina
  realmente enseña. **Es el unico cambio de contenido de esta tanda y conviene
  que la coordinacion lo revise.**
- El comentario del heroe de la portada decia "una sola accion principal" sobre
  un bloque con dos botones.

### Deuda tecnica

- `tailwindcss-animate` seguia en `dependencies` sin usarse.
- Tokens `--uagro-*` declarados y nunca referenciados (los duplicaban
  `--primary`, `--accent` y `--destructive`).
- Sombras con HSL cableado, ahora derivadas de `--primary`.
- `rounded` a secas (fuera de la escala) en seis sitios, y `rounded-md` como
  base de los botones que las seis llamadas sobrescribian.
- Superficies del navegador (seleccion, cursor, barra de desplazamiento,
  subrayado) tematizadas desde los tokens.

## 3. Cambios aplicados el 2026-08-04

- **Vercel recuperado temporalmente.** El dominio `mdo-alpha.vercel.app` vuelve a desplegar desde `main`. Astro usa `/` por defecto para Vercel y el workflow de GitHub Pages conserva explicitamente `/MDO`, de modo que ambos destinos cargan sus assets correctamente.
- **Convocatoria febrero 2027 publicada.** Se sustituyo el cartel oficial y se sincronizaron la portada, `/convocatoria` y el repositorio de documentos.
- **Calendario actualizado.** El proceso inicia con el pre-registro del 19 al 30 de octubre de 2026 y concluye con las inscripciones del 18 al 22 de enero de 2027. A la fecha de esta actualizacion ninguna etapa esta marcada como vigente.
- **Ponderaciones actualizadas.** EXANI-III 20%, conocimientos en metodologia de investigacion (curso propedeutico) 30%, entrevista 30% y curriculo profesional 20%.
- **Perfil de ingreso actualizado.** Se publica en texto el perfil del nuevo cartel para mantenerlo legible en movil y accesible para lectores de pantalla.
- **Requisitos conservados por confirmacion del responsable del sitio.** Se mantienen los nueve documentos y el promedio minimo de 8.0 aunque el cartel 2027 no los repita.
- **Sin enlaces inventados.** El cartel esta disponible como imagen en `/convocatoria`; la tarjeta del repositorio permanece "En proceso" hasta recibir un PDF o enlace oficial.

## 4. Cambios aplicados el 2026-07-25

Estos cambios responden a una auditoria de diseño y accesibilidad del sitio. Se agrupan por naturaleza del problema.

### Correcciones que bloqueaban tareas

- **Enlaces de marcador en produccion.** Once URLs apuntaban a destinos inexistentes de Google Drive, incluidas las dos acciones principales de `/convocatoria`, los seis documentos del repositorio y tres tesis. Se retiraron y las tarjetas afectadas se muestran en estado "En proceso" con el boton inhabilitado. El unico enlace real que existia (Plan de Estudios) quedo conectado.
- **Pestañas inoperables con teclado.** Los tabs de perfiles y de plan de estudios usaban `input[type=radio]` con clase `hidden`, que los sacaba del orden de tabulacion, y sus etiquetas nunca recibian el estilo de estado activo porque `peer-*` no alcanzaba a elementos anidados. Se sustituyeron por el patron WAI-ARIA en `src/components/ui/TabGroup.astro`, con navegacion por flechas, Home y End, y salida sin JavaScript.

### Arquitectura de informacion

- **Navegacion de nueve destinos planos a tres grupos** (Admisión, Programa, Comunidad), definidos en `src/data/navegacion.ts`. Las URLs no cambiaron.
- **La portada es ahora un embudo de admision**: tres pasos del proceso y accesos a requisitos y preguntas frecuentes.
- **`/convocatoria` publica en texto lo que antes solo vivia dentro del cartel**: calendario, criterios de ponderacion, modalidad, perfil de aspirante y preguntas frecuentes. El cartel sigue siendo la fuente rectora y se muestra en la barra lateral.
- **El plan de estudios se movio a `/plan-estudios`.** Antes ocupaba la parte superior de `/objetivos`, por delante del propio objetivo general.
- **Preguntas frecuentes** en `/convocatoria#preguntas-frecuentes`, con `details`/`summary` nativos.

### Accesibilidad (tanda de julio)

- Enlace de salto al contenido en todas las paginas.
- `aria-expanded`, `aria-controls`, cierre con Escape, bloqueo de desplazamiento de fondo y contencion de foco en el menu movil.
- `aria-current="page"` en el destino activo.
- `--muted-foreground` corregido: de 4.35:1 a 4.87:1 sobre el fondo de pagina. Afectaba a practicamente todo el cuerpo de texto del sitio.
- Guarda `prefers-reduced-motion` global.
- Texto alternativo descriptivo en las cinco imagenes de galeria, que antes compartian `alt` numerado y el mismo titulo.
- Jerarquia de encabezados sin saltos y un unico `h1` por pagina.
- El carrusel con autoplay sin pausa (incumplia WCAG 2.2.2) se sustituyo por una rejilla con visor modal operable por teclado.

### Contenido y datos

- **48 marcas `(PDF NA)`** de la captura interna, visibles en el historial academico de cada ficha, eliminadas. Tambien una nota de gestion interna y una referencia al PDF de origen dentro de una semblanza.
- **Fuente unica de contacto** en `src/data/contacto.ts`. Antes convivian dos correos distintos del programa en la misma pantalla.
- Se retiraron los enlaces a Twitter y LinkedIn, que apuntaban a las portadas genericas de esas redes, y los enlaces legales sin destino.
- **Meta del SNP corregida.** La portada afirma registro vigente y `/objetivos` lo planteaba como meta a conseguir en 2026. Ahora la meta habla de refrendarlo.
- `/lies` se anuncia en singular, que es lo que corresponde a una sola linea registrada.
- **El cartel oficial pasa a ser la fuente rectora del proceso de admision.** El calendario, el telefono y el domicilio del sitio no coincidian con el. Se sustituyeron por los datos del cartel: proceso de octubre de 2025 a enero de 2026 con inicio en febrero de 2026, telefono 744 134 0900 ext. 4477 y domicilio en Av. Ruiz Cortines s/n, Col. Alta Progreso, Acapulco.
- **Se publican en texto los datos que solo existian dentro de la imagen**: ponderacion de seleccion (curriculo 30%, entrevistas 25%, propedeutico 25%, EXANI-III 20%), modalidad escolarizada, perfil de aspirante y nombre del coordinador.
- **Las etiquetas de la llamada a la accion pierden el ano.** El proceso de la generacion de febrero de 2026 ya concluyo, asi que la pagina lo declara cerrado en vez de anunciar "Convocatoria 2026" como si estuviera abierta.
- **Copy de posicionamiento de la portada.** Decia "Forma parte de la élite directiva", en contradiccion con el objetivo del cartel (fortalecer micro, pequeñas y medianas empresas y favorecer a los sectores productivos mas vulnerables) y con las metas de inclusion y empleo digno del propio sitio. Se sustituyo por: "Dirige con responsabilidad social. Un posgrado público enfocado en fortalecer las micro, pequeñas y medianas empresas de Guerrero."

### Deuda tecnica (tanda de julio)

- `Navbar.tsx` (codigo muerto, sin importaciones) eliminado.
- Trece iconos SVG dibujados a mano sustituidos por `lucide-react`, que ya era dependencia.
- **Escala de radios corregida.** La configuracion redefinia `lg`, `md`, `sm`, `2xl` y `3xl` pero omitia `xl`, con lo que `rounded-lg` resultaba mayor que `rounded-xl`. Se usa la escala por defecto de Tailwind.
- Configuracion muerta purgada: `darkMode` sin una sola variante `dark:`, tokens `sidebar-*`, colores `uagro.*`, keyframes sin uso y el plugin `tailwindcss-animate`.
- `width` y `height` en las 16 imagenes que no los declaraban.
- Tarjetas con `h-full` y CTA anclado con `mt-auto`: los botones de una misma fila ya no quedan a alturas distintas.
- Rejillas de tres columnas alimentadas por listas que no son multiplo de tres, corregidas para no dejar huecos.

## 5. Pendientes que dependen de la coordinacion

Estos puntos NO se resolvieron porque requieren informacion que solo tiene el programa:

- **URLs reales** de convocatoria en PDF, formularios de preinscripcion, formatos y lineamientos. Mientras tanto las tarjetas dicen "En proceso".
- **Cuotas del programa.** La pregunta frecuente existe y enruta a la coordinacion, sin cifras inventadas.
- **Sede y horario de entrega de documentos.** Mismo tratamiento.
- **Aviso de privacidad.** El enlace se retiro hasta que exista documento publicado.
- **Verificacion de los registros de tesis.** Se conservan con boton inhabilitado por indicacion expresa.
- **Convenios de vinculacion.** Catorce instituciones listadas sin fuente ni fecha.
- **Fotografia del nucleo academico.** Los retratos no comparten fondo ni encuadre; se normalizo el recorte por CSS, pero homogeneizarlos de verdad requiere volver a fotografiar.

## 6. Fuentes rectoras

El proyecto tiene dos documentos que prevalecen sobre lo que diga el codigo:

| Ambito | Documento rector | Datos que gobierna |
| --- | --- | --- |
| Proceso de admision | `public/convocatoria.webp` | Calendario, ponderacion, modalidad, perfil de aspirante y contacto de la coordinacion |
| Nucleo academico | `profesores/NUCLEO ACADEMICO.pdf` | Fichas, grados, cuerpos academicos y produccion |

Si el sitio y el documento difieren, gana el documento. Al sustituir cualquiera de los dos, actualiza el archivo de datos correspondiente en la misma tanda.

## 7. Fuente de verdad para docentes

- Documento rector: `profesores/NUCLEO ACADEMICO.pdf`
- Complemento individual: `profesores/*.txt`
- Sitio publicado: `src/data/profesores.ts`

Regla de conflicto: **gana el PDF**.

Nota: las semblanzas usan "SNI" y `/objetivos` usa "SNII". No se unifico porque las semblanzas reproducen el PDF rector y esa regla tiene prioridad.

## 8. Orden de fichas vigente en Nucleo Academico

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

## 9. Archivos clave para mantenimiento

- `src/data/navegacion.ts` (arquitectura de navegacion)
- `src/data/contacto.ts` (fuente unica de contacto)
- `src/data/admision.ts` (calendario, pasos, requisitos, preguntas frecuentes)
- `src/data/profesores.ts`
- `src/lib/paths.ts` (`withBase()`) y `src/lib/seo.ts` (host canonico)
- `src/components/ui/buttonVariants.ts`, `ButtonLink.tsx` y `ButtonLink.astro`
- `src/components/ui/TabGroup.astro` y `src/scripts/tabs.ts`
- `src/components/layout/Navbar.astro` y `src/scripts/navbar.ts`
- `src/styles/fonts.css` (tipografia auto-hospedada y metricas de reserva)
- `scripts/check-enlaces.mjs` y sus pruebas en `src/test/checkEnlaces.test.ts`
- `.github/workflows/deploy.yml`

## 10. Recomendaciones para siguientes cambios

- Toda ruta interna nueva se escribe con `withBase()`.
- Si un documento no existe todavia, omite `linkDrive`; no inventes URLs.
- Manten UTF-8 sin BOM en archivos TS y MD.
- Antes de push: `npm run lint`, `npm run test` y `npm run build`. El workflow los repite y no publica si fallan. Ahora los tres verifican algo de verdad.
- Si reemplazas fotos, conserva el naming por slug para no romper rutas.
- **Fotos de galeria: van en `src/assets/galeria/` e importadas**, no en `public/`. Astro genera las variantes. Los logos y el cartel si viven en `public/` porque necesitan URL estable.
- Toda `<img>` declara `width` y `height`.
- Prefiere un `<script>` en `src/scripts/` sobre una isla React cuando el estado sea simple. Una isla cuesta ~44 KB comprimidos de runtime en esa pagina.
- Para navegar con apariencia de boton usa `ButtonLink`, nunca un `<a>` alrededor de un `Button`.
- `text-muted-foreground` no alcanza AA sobre `bg-primary/5`: ahi va `text-foreground/80`.
