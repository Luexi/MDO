# Despliegue en GitHub Pages

Fecha: 2026-07-25

El sitio se publica con GitHub Actions en GitHub Pages. Antes estaba en Vercel; `vercel.json` se elimino y las cabeceras de cache que definia ahora las gestiona Pages por su cuenta.

## 1. Como funciona

`.github/workflows/deploy.yml` se dispara en cada `push` a `main` y tambien a mano desde la pestaña **Actions**. El workflow:

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

## 4. Estado actual y cambio al dominio propio

Hoy, temporal:

| Variable | Valor |
| --- | --- |
| `PUBLIC_SITE_URL` | `https://luexi.github.io` |
| `PUBLIC_BASE_PATH` | `/MDO` |
| URL publica | `https://luexi.github.io/MDO` |

Cuando el area de sistemas apunte el DNS de `maestriaendirecciondeorganizaciones.uagro.mx`:

1. Edita el bloque `env` de `.github/workflows/deploy.yml`:

   ```yaml
   PUBLIC_SITE_URL: https://maestriaendirecciondeorganizaciones.uagro.mx
   PUBLIC_BASE_PATH: /
   ```

2. Crea `public/CNAME` con una sola linea y sin espacios:

   ```text
   maestriaendirecciondeorganizaciones.uagro.mx
   ```

3. En **Settings > Pages > Custom domain**, escribe el mismo dominio y activa **Enforce HTTPS** cuando GitHub termine de emitir el certificado.

4. Haz push a `main`. Eso es todo: no hay que tocar ningun componente, porque `withBase()` devuelve la ruta sin prefijo en cuanto la base es `/`.

### DNS que debe configurar el area de sistemas

Para un subdominio, un registro `CNAME`:

```text
maestriaendirecciondeorganizaciones  CNAME  luexi.github.io.
```

## 5. Desarrollo local

`npm run dev` y `npm run preview` respetan la misma base, asi que el sitio local vive en:

```text
http://localhost:8080/MDO
```

Si abres `http://localhost:8080` sin la subruta veras un 404. Es el comportamiento correcto y reproduce produccion.

Para probar en local como se vera con el dominio propio:

```bash
PUBLIC_BASE_PATH=/ PUBLIC_SITE_URL=https://maestriaendirecciondeorganizaciones.uagro.mx npm run build
npm run preview
```

## 6. Guard de enlaces

`scripts/check-enlaces.mjs` corre antes de cada build y falla la compilacion si encuentra:

- URLs de marcador (`PLACEHOLDER_*`)
- Anclas vacias (`href="#"`)
- Referencias al dominio anterior de Vercel

Para expresar "este documento todavia no existe", **omite el campo `linkDrive`** en `src/data/*`. La tarjeta se renderiza sola en estado "En proceso" con el boton inhabilitado. Nunca apuntes a una URL inventada.

Ejecutarlo suelto:

```bash
npm run check:enlaces
```

## 7. Diagnostico

**El sitio publica pero sin estilos ni imagenes.** La base no coincide con la URL real. Revisa `PUBLIC_BASE_PATH` en el workflow contra la URL que muestra Settings > Pages.

**El workflow falla en "Verificar lint" o "Ejecutar pruebas".** Reproduce en local con `npm run lint` y `npm test`. El despliegue no continua a proposito.

**El workflow falla en "Compilar" con `check-enlaces`.** La salida indica archivo, linea y motivo. Corrige el enlace o retira el campo.

**404 al entrar por el dominio propio.** Falta `public/CNAME` o el DNS aun no propaga. Ambos deben estar antes de que Pages sirva el dominio.
