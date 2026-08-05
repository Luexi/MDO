# Despliegue

Fecha: 2026-08-05

## 0. Los tres destinos, y cual es el que importa

| Direccion | Que es hoy | Quien la despliega |
| --- | --- | --- |
| `https://mdo-alpha.vercel.app` | **El sitio publico** | Vercel, desde `main` |
| `https://maestriadirecciondeorganizaciones.uagro.mx` | **Redirige** a Vercel. Resuelve a `200.4.142.12`, servidor de la Universidad | Area de sistemas de la UAGro |
| `https://luexi.github.io/MDO` | Mismo sitio, sin enlaces entrantes. Respaldo | GitHub Actions, desde `main` |

Vercel es el destino real por dos razones que no dependen del codigo:

1. **El QR del cartel impreso de la convocatoria apunta ahi.** Ya se distribuyo.
2. **El dominio de la UAGro reenvia ahi**, en lugar de servir el sitio.

Por eso el canonico de los dos despliegues es Vercel. Ver `src/lib/seo.ts`.

> **Este documento describio un tiempo GitHub Pages como produccion.** Era
> cierto durante la migracion y dejo de serlo cuando Vercel volvio por el QR.
> Esa descripcion desactualizada ya provoco dos veces que se configurara el
> dominio equivocado. Antes de tocar dominios: escanea el QR y abre el dominio
> de la UAGro.

### Lo que conviene pedirle a sistemas

Que `maestriadirecciondeorganizaciones.uagro.mx` **sirva** el sitio en vez de
redirigir. Hoy la barra de direcciones acaba mostrando `mdo-alpha.vercel.app`,
incluido para los evaluadores del SNP, y el programa depende de una cuenta
gratuita de un tercero. Dos formas de resolverlo:

- Apuntar un `CNAME` del subdominio a `cname.vercel-dns.com` y darlo de alta
  como dominio en el proyecto de Vercel. La redireccion desaparece y el dominio
  propio pasa a servir. Es el cambio mas pequeño.
- O apuntarlo a `luexi.github.io` y usar GitHub Pages con `public/CNAME`, como
  se describe en la seccion 4.

En cualquiera de los dos casos, el QR sigue funcionando: Vercel puede quedarse
redirigiendo al dominio propio.

## 1. Como funciona cada despliegue

**Vercel** compila desde `main` por su cuenta en cada push, con los valores por
defecto de `astro.config.mjs` (base `/`). No lee las variables del workflow: su
canonico sale del valor escrito en el codigo.

**GitHub Pages** usa `.github/workflows/deploy.yml`, que se dispara en cada
`push` a `main` y tambien a mano desde la pestaña **Actions**. El workflow:

1. Instala dependencias con `npm ci`.
2. Corre `npm run lint` y `npm test`.
3. Compila con `npm run build`, que incluye el guard de enlaces y `astro check`.
4. Sube `dist/` como artefacto y lo publica en Pages.

Si el lint, las pruebas o el guard fallan, **no se publica nada**. Es intencional: evita repetir el episodio de tener enlaces de marcador en produccion.

## 2. Configuracion inicial en GitHub (una sola vez)

1. Entra a **Settings > Pages**.
2. En **Source**, elige **GitHub Actions**. No elijas "Deploy from a branch".
3. Vuelve a lanzar el workflow desde **Actions** si hiciera falta.

## 3. La ruta base es lo unico delicado

Un sitio de proyecto de GitHub Pages vive en una subruta (`/MDO`), no en la raiz. Astro prefija por su cuenta lo que empaqueta, pero **no** reescribe los `src` ni los `href` escritos a mano ni lo que vive en `public/`.

Por eso ninguna ruta esta cableada en el codigo. Todas pasan por `withBase()`:

```ts
import { withBase } from "@/lib/paths";

<img src={withBase("/assets/logos/logo-uagro.webp")} />
<a href={withBase("/convocatoria")}>Convocatoria</a>
```

**Regla:** cualquier ruta interna nueva se escribe con `withBase()`. Si escribes `/assets/...` directo, funcionara en local y se rompera en produccion.

Los enlaces externos (`https://`, `mailto:`, `tel:`) no se prefijan. Si tienes una lista mixta, usa `link()` del mismo modulo, que decide por ti.

### Archivos estaticos que no pasan por Astro

Lo que vive en `public/` se copia tal cual, asi que no puede usar `withBase()`. Si uno de esos archivos contiene rutas (por ejemplo `site.webmanifest`), escribelas **relativas**:

```json
{ "start_url": ".", "icons": [{ "src": "./favicon.svg" }] }
```

Una ruta relativa se resuelve contra la ubicacion del propio archivo, que siempre esta en la raiz del sitio publicado. Asi funciona igual con base `/MDO` y con base `/`, sin tocar nada al cambiar de dominio.

## 4. Estado actual y cambio al dominio propio

Variables del workflow de GitHub Pages:

| Variable | Valor | Para que sirve |
| --- | --- | --- |
| `PUBLIC_SITE_URL` | `https://luexi.github.io` | Desde donde se sirve ESTA compilacion |
| `PUBLIC_BASE_PATH` | `/MDO` | Subruta de esta compilacion |
| `PUBLIC_CANONICAL_URL` | `https://mdo-alpha.vercel.app` | Cual de los destinos debe indexarse |

Fijate en que el canonico **no** es la propia direccion: GitHub Pages se
autodeclara secundario a proposito.

### Por que hay una variable de canonico aparte

`PUBLIC_SITE_URL` responde "¿desde donde sirvo yo?". `PUBLIC_CANONICAL_URL`
responde "¿cual de los destinos debe salir en Google?". Son preguntas
distintas y aqui tienen respuestas distintas.

Antes cada destino se declaraba canonico a si mismo: el mismo contenido
duplicado en dos dominios sin ninguna señal de cual indexar. Ahora los dos
emiten la misma `<link rel="canonical">` y el mismo sitemap, los de Vercel,
que es donde aterriza la gente. La logica esta en `src/lib/seo.ts`.

El canonico esta escrito en **cuatro** sitios y tienen que coincidir. Vercel no
lee las variables del workflow, asi que su valor sale del codigo:

| Archivo | Lo usa |
| --- | --- |
| `.github/workflows/deploy.yml` | La compilacion de GitHub Pages |
| `src/lib/seo.ts` | La compilacion de Vercel (etiquetas canonical y Open Graph) |
| `astro.config.mjs` | El sitemap de las dos |
| `public/robots.txt` | La directiva `Sitemap:` que sirven las dos |

### Cambio al dominio propio

El dominio ya resuelve (`200.4.142.12`), pero **redirige** a Vercel en lugar de
servir el sitio. Estos pasos son para cuando sistemas lo apunte de verdad a
GitHub Pages. Si en cambio se decide dejarlo en Vercel, basta con darlo de alta
como dominio del proyecto de Vercel y apuntar el `CNAME` a
`cname.vercel-dns.com`; entonces solo hay que cambiar el canonico de los cuatro
sitios de la tabla de arriba, sin tocar `PUBLIC_BASE_PATH`.

Para pasarlo a GitHub Pages:

1. Edita el bloque `env` de `.github/workflows/deploy.yml`:

   ```yaml
   PUBLIC_SITE_URL: https://maestriadirecciondeorganizaciones.uagro.mx
   PUBLIC_BASE_PATH: /
   PUBLIC_CANONICAL_URL: https://maestriadirecciondeorganizaciones.uagro.mx
   ```

   Y en la misma tanda, los otros tres sitios que declaran el canonico:

   - `CANONICAL_BASE` en `src/lib/seo.ts`
   - `canonical` en `astro.config.mjs` (lo consume el sitemap)
   - la linea `Sitemap:` de `public/robots.txt`

2. Crea `public/CNAME` con una sola linea y sin espacios:

   ```text
   maestriadirecciondeorganizaciones.uagro.mx
   ```

3. En **Settings > Pages > Custom domain**, escribe el mismo dominio y activa **Enforce HTTPS** cuando GitHub termine de emitir el certificado.

4. Haz push a `main`. Eso es todo: no hay que tocar ningun componente, porque `withBase()` devuelve la ruta sin prefijo en cuanto la base es `/`.

### DNS que debe configurar el area de sistemas

Para un subdominio, un registro `CNAME`:

```text
maestriadirecciondeorganizaciones  CNAME  luexi.github.io.
```

## 5. Desarrollo local

`npm run dev` y `npm run preview` respetan la misma base, asi que el sitio local vive en:

```text
http://localhost:8080/MDO
```

Si abres `http://localhost:8080` sin la subruta veras un 404. Es el comportamiento correcto y reproduce produccion.

Para probar en local como se vera con el dominio propio:

```bash
PUBLIC_BASE_PATH=/ PUBLIC_SITE_URL=https://maestriadirecciondeorganizaciones.uagro.mx npm run build
npm run preview
```

## 6. Guard de enlaces

`scripts/check-enlaces.mjs` corre antes de cada build y falla la compilacion si encuentra:

| Regla | Que detecta |
| --- | --- |
| `placeholder` | URLs de marcador (`PLACEHOLDER_*`) |
| `ancla-vacia` | Anclas que no llevan a ninguna parte (`href="#"`) |
| `host-cableado` | Un host escrito a mano dentro de `href`, `src` o `srcset` |
| `boton-en-enlace` | Un `<a>` envolviendo un boton |

Si una linea menciona uno de esos patrones a proposito (documentacion, la
declaracion del host canonico), marcala con el comentario `check-enlaces-ok` y
el guard la ignora. `src/test/` esta excluido por completo: sus fixtures son
justamente ejemplos de lo prohibido.

Las reglas tienen pruebas en `src/test/checkEnlaces.test.ts`, para que el guard
no se rompa en silencio.

Para expresar "este documento todavia no existe", **omite el campo `linkDrive`** en `src/data/*`. La tarjeta se renderiza sola con la insignia "En proceso". Nunca apuntes a una URL inventada.

Ejecutarlo suelto:

```bash
npm run check:enlaces
```

## 7. Diagnostico

**El sitio publica pero sin estilos ni imagenes.** La base no coincide con la URL real. Revisa `PUBLIC_BASE_PATH` en el workflow contra la URL que muestra Settings > Pages.

**El workflow falla en "Verificar lint" o "Ejecutar pruebas".** Reproduce en local con `npm run lint` y `npm test`. El despliegue no continua a proposito.

**El workflow falla en "Compilar" con `check-enlaces`.** La salida indica archivo, linea y motivo. Corrige el enlace o retira el campo.

**404 al entrar por el dominio propio.** Falta `public/CNAME` o el DNS aun no propaga. Ambos deben estar antes de que Pages sirva el dominio.
