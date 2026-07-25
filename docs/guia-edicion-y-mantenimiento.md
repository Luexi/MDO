# Guia de Edicion y Mantenimiento

Guia operativa para editar contenido, imagenes, secciones y componentes sin romper el sitio.

## 0. Tres reglas que evitan la mayoria de los problemas

1. **Toda ruta interna se escribe con `withBase()`.** El sitio vive en la subruta `/MDO` de GitHub Pages. Escribir `/assets/foto.jpg` directo funciona en local y se rompe en produccion.

   ```astro
   ---
   import { withBase } from "@/lib/paths";
   ---
   <img src={withBase("/assets/logos/logo-uagro.webp")} alt="UAGro" />
   <a href={withBase("/convocatoria")}>Convocatoria</a>
   ```

2. **Si un documento no existe, omite el campo `linkDrive`.** No inventes una URL ni apuntes a un archivo que aun no subes. La tarjeta se renderiza sola en estado "En proceso" con el boton inhabilitado, y `npm run build` falla si detecta marcadores.

3. **Los datos de contacto salen de un unico archivo**, `src/data/contacto.ts`. No escribas correos ni telefonos sueltos en las paginas.

## 1. Checklist rapido antes de cambiar

1. `npm install` (si no instalaste deps)
2. `npm run dev` y abre `http://localhost:8080/MDO`
3. Identifica el tipo de cambio: contenido, assets, estructura visual o nueva funcionalidad

## 2. Edicion de contenido (caso mas comun)

### Profesores

Archivo: `src/data/profesores.ts`

Campos editables: `nombre`, `grado`, `area`, `linea`, `email`, `semblanza`, `historialAcademico`, `publicaciones`, `slug`.

Importante:

- Si cambias `slug`, cambia la URL del profesor.
- `linea` se muestra en la tarjeta del listado, asi que conviene que sea breve.
- `area` guarda la clave del cuerpo academico (por ejemplo `UAGro-CA-229`) y en la ficha se muestra etiquetada como tal.
- No incluyas anotaciones internas de captura en los textos: se publican tal cual.
- Si hay conflicto entre datos individuales y el PDF oficial del nucleo, prevalece el PDF.

### Fuente de verdad del Nucleo Academico

1. `profesores/NUCLEO ACADEMICO.pdf` (prioridad alta)
2. `profesores/*.txt` por profesor (complemento)
3. `src/data/profesores.ts` (estado publicado en el sitio)

### Proceso de admision

Archivo: `src/data/admision.ts`

Contiene el calendario, los tres pasos que muestra la portada, los requisitos y las preguntas frecuentes. Lo consumen a la vez `/` y `/convocatoria`, asi que un cambio aqui se refleja en ambas.

Solo una etapa del calendario debe llevar `activo: true`: es la que la portada destaca como etapa vigente.

Si la coordinacion confirma cuotas o sede de entrega de documentos, actualiza las respuestas correspondientes en `preguntasFrecuentes`, que hoy enrutan al contacto.

### Tesis

Archivo: `src/data/tesis.ts`

Campos: generaciones, tesis por generacion y `linkDrive` opcional. Sin `linkDrive` la tarjeta muestra "En proceso".

Manten el mismo guion normal en `id` y en `label` de las generaciones.

### Repositorio de documentos

Archivo: `src/data/documentos.ts`

Campos: `titulo`, `descripcion`, `categoria`, `icono` y `linkDrive` opcional.

El orden de los grupos en la pagina lo fija `categoriasDocumentos`, no el orden alfabetico.

### Instalaciones

Archivo: `src/data/instalaciones.ts`

### Galeria

Datos: `src/data/galeria.ts` · Imagenes: `public/assets/galeria/`

Reglas:

- Sube la imagen primero a `public/assets/galeria/`.
- Referenciala en `src/data/galeria.ts` con ruta que empiece por `/assets/`. El componente aplica `withBase()` por ti.
- El campo `alt` debe **describir la imagen**, no numerarla. "Imagen 3" no sirve a nadie.
- `titulo` y `descripcion` se muestran en la tarjeta y en el visor: que sean distintos entre fotos.

### Vinculacion

Archivo: `src/data/vinculacion.ts`

El tipo `empresa` esta soportado: si cargas convenios empresariales apareceran solos en su bloque.

### Contacto y redes

Archivo: `src/data/contacto.ts`

Solo se listan redes con cuenta real del programa. No agregues una red sin perfil propio.

## 3. Navegacion

Archivo: `src/data/navegacion.ts`

Define los tres grupos (Admisión, Programa, Comunidad) y los alimenta tanto al Navbar como al Footer, de modo que no pueden quedar desincronizados.

Para agregar un destino:

1. Crea la pagina en `src/pages/`.
2. Agrega la entrada al grupo que corresponda, con `label`, `href` y `descripcion`.
3. Nada mas: el menu de escritorio, el menu movil y el footer se actualizan solos.

Si un grupo pasa de cinco destinos, conviene replantear la agrupacion antes que seguir alargando la lista.

## 4. Edicion de logos

Carpeta: `public/assets/logos/`

Referencias: `src/components/layout/Navbar.astro`, `src/components/layout/Footer.astro`, `src/pages/index.astro`.

En el footer los logos van sobre una superficie clara, no invertidos con filtros: el escudo de la UAGro tiene detalle fino y `brightness-0 invert` lo convierte en un disco blanco.

Declara siempre `width` y `height` reales del archivo.

## 5. Cambios visuales (layout y estilo)

- Layout global: `src/layouts/BaseLayout.astro`
- Navbar: `src/components/layout/Navbar.astro` (comportamiento en `src/scripts/navbar.ts`)
- Footer: `src/components/layout/Footer.astro`
- Tokens y tema: `src/styles/global.css`
- Config Tailwind: `tailwind.config.ts`

Convenciones vigentes:

- Radios: `rounded-lg` para elementos pequeños, `rounded-xl` para controles, `rounded-2xl` para contenedores, `rounded-full` para pastillas.
- Tarjetas en rejilla: `h-full` en la tarjeta, `auto-rows-fr` en la rejilla y `mt-auto` en el bloque de CTA. Sin esto los botones de una misma fila quedan a alturas distintas.
- Texto secundario: usa `text-muted-foreground`. Si cambias ese token, verifica contraste contra el fondo de pagina **y** contra tarjeta blanca.

## 6. Cambios de rutas o paginas

Paginas en `src/pages/`. Si agregas una:

1. Crea el archivo `.astro`.
2. Agrega el destino en `src/data/navegacion.ts`.
3. Usa `withBase()` en todos sus enlaces internos.
4. Comprueba que tiene un unico `h1` y que no salta niveles de encabezado.

## 7. Interactividad nueva

### Opcion 1: script vanilla (preferido)

Si el estado es simple:

1. Crea o extiende un modulo en `src/scripts/`.
2. Inicializalo desde el `<script>` de `BaseLayout.astro`.
3. Marca el marcado con atributos `data-*` y deja que el script los busque.

Ejemplos: `src/scripts/navbar.ts` y `src/scripts/tabs.ts`.

### Opcion 2: isla React (solo si hace falta)

Si necesitas estado complejo o manejadores de React:

1. Crea el `.tsx` en `src/components/islands/`.
2. Importalo en la pagina `.astro`.
3. Hidrata con `client:idle` por defecto; `client:load` solo si debe estar disponible de inmediato.

### Pestañas

No escribas un patron de pestañas nuevo: usa `src/components/ui/TabGroup.astro`. Admite de dos a tres pestañas y ya resuelve roles ARIA, navegacion por flechas, Home, End y el caso sin JavaScript.

Los nombres de slot son fijos (`panel-1`, `panel-2`, `panel-3`) porque Astro exige que `slot[name]` sea una cadena literal.

## 8. Accesibilidad: minimos que no se rompen

- Todo control desplegable expone `aria-expanded` y `aria-controls`.
- Escape cierra lo que se abrio y devuelve el foco a quien lo abrio.
- El destino activo lleva `aria-current="page"`.
- Toda imagen informativa lleva `alt` descriptivo; los iconos decorativos llevan `aria-hidden="true"`.
- Nada se anima si el sistema pide movimiento reducido.
- Ningun contenido queda accesible solo con raton.

## 9. Flujo seguro para cambios

1. Editar archivos
2. `npm run lint`
3. `npm run test`
4. `npm run build`
5. Revisar en `npm run preview` (recuerda la subruta `/MDO`)
6. Commit y PR contra `main`

El workflow de despliegue repite lint, pruebas y build. Si algo falla, no publica.

## 10. Problemas comunes y solucion

### La imagen no aparece en produccion pero si en local

Casi siempre falta `withBase()`. Revisa que el `src` no sea una cadena `/assets/...` escrita a mano.

### La imagen no aparece en ningun lado

- Revisa nombre exacto (mayusculas y minusculas) y extension real.
- Revisa la ruta en el archivo de datos correspondiente.

### El build falla con `check-enlaces`

La salida indica archivo, linea y motivo. O publicas el destino real, o retiras el campo `linkDrive`, o quitas el enlace.

### Cambie datos pero no se actualiza

Reinicia `npm run dev` y limpia cache del navegador.

### El build falla en tipos

Revisa imports de tipos con `import type` y las props de los componentes TSX.

### Se ve distinto en movil

Verifica clases responsive de Tailwind y prueba con viewport real en devtools. Comprueba tambien que el CTA principal siga visible en la barra.

## 11. Convenciones

- Nombres de archivos en minusculas y con guiones.
- Commits pequeños y descriptivos.
- No mezclar cambios de contenido con refactors grandes.

## 12. Verificacion previa a deploy

- Rutas principales accesibles
- Navbar y footer correctos, con el grupo activo resaltado
- Galeria y logos cargan bien
- Enlaces externos correctos
- Recorrido completo con teclado en pestañas, menu movil y visor de galeria
- `npm run build` sin errores

## 13. Contacto tecnico interno

Si vas a hacer cambios estructurales (routing, arquitectura, dependencias, dominio), documenta la decision en `docs/` junto al cambio para mantener trazabilidad.
