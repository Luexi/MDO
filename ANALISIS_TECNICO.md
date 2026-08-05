# Análisis Técnico: Sitio Web MDO UAGro

Este documento proporciona un análisis detallado de la estructura, propósito, arquitectura y funcionamiento del sitio web de la **Maestría en Dirección de Organizaciones (MDO)** de la Universidad Autónoma de Guerrero.

Última actualización: 2026-07-25

## 1. Propósito del Proyecto

El objetivo principal de este proyecto es servir como el **sitio web oficial e informativo** para la MDO. Atiende tres audiencias con tres preguntas distintas:

| Audiencia | Pregunta | Superficie principal |
| --- | --- | --- |
| Aspirantes | ¿cómo entro y cuándo? | Portada y `/convocatoria` |
| Evaluadores del SNP | ¿es sólido este programa? | `/objetivos`, `/plan-estudios`, `/nucleo-academico`, `/lies` |
| Estudiantado actual | ¿dónde está mi formato? | `/repositorio`, `/tesis` |

Esa división es la que gobierna la arquitectura de navegación del sitio.

El sitio está diseñado para ser **rápido, accesible y fácil de mantener**, priorizando una arquitectura estática que no requiere bases de datos ni servidores en tiempo de ejecución.

## 2. Arquitectura Técnica

El proyecto utiliza una arquitectura **JAMstack** moderna centrada en la generación de sitios estáticos (SSG).

### Stack Tecnológico

- **Framework Principal**: [Astro 5](https://astro.build/) (Static Site Generator).
- **Lenguaje**: TypeScript.
- **Componentes UI**:
  - **Astro (`.astro`)**: estructura general, layouts y contenido estático.
  - **React (`.tsx`)**: exclusivamente para islas de interactividad.
  - **Scripts vanilla (`src/scripts/`)**: comportamiento compartido (navegación, pestañas) sin costo de framework.
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/) sobre tokens CSS propios en HSL.
- **Iconos**: Lucide React.
- **Hosting**: el sitio publico es **Vercel** (`mdo-alpha.vercel.app`), que es a donde apunta el QR del cartel impreso y a donde redirige `maestriadirecciondeorganizaciones.uagro.mx`. GitHub Actions publica en paralelo una copia en GitHub Pages, sin enlaces entrantes, como respaldo. Los dos declaran el canonico de Vercel. Ver `docs/despliegue-github-pages.md`.

### Enfoque de "Islas" (Islands Architecture)

El sitio envía **HTML puro** al navegador. JavaScript solo se carga donde hace falta.

Islas React activas:

- `GaleriaLightbox.tsx`: rejilla de galería con visor modal accesible.

Comportamiento resuelto sin React:

- `src/scripts/navbar.ts`: menús desplegables, menú móvil, foco y Escape.
- `src/scripts/tabs.ts`: patrón WAI-ARIA de pestañas.
- `src/scripts/filtroTesis.ts`: filtro de tesis por generación.

Este reparto es deliberado: React solo entra cuando el estado lo justifica. El
filtro de tesis fue isla y dejó de serlo: traía 54 KB comprimidos de framework
para gestionar una sola cadena de estado. El visor de galería se queda porque
un diálogo modal con contención de foco sí lo amerita.

Medición: `/tesis`, `/objetivos` y el resto de páginas envían **cero** JavaScript
de framework. Solo `/galeria` carga React.

## 3. Estructura del Proyecto

```text
MDO/
├── .github/workflows/      # Despliegue a GitHub Pages
├── public/                 # Archivos estáticos servidos tal cual
│   ├── assets/             # Imágenes, logos, documentos
│   └── favicon.svg
├── scripts/
│   └── check-enlaces.mjs   # Guard de enlaces previo al build
├── src/
│   ├── components/
│   │   ├── cards/          # Tarjetas informativas
│   │   ├── islands/        # Componentes React hidratados
│   │   ├── layout/         # Navbar y Footer
│   │   └── ui/             # Button, PageHeader, TabGroup
│   ├── data/               # Capa de contenido en TypeScript
│   ├── layouts/            # BaseLayout.astro
│   ├── lib/paths.ts        # withBase() para rutas con base de despliegue
│   ├── pages/              # Ruteo basado en archivos
│   ├── scripts/            # Comportamiento vanilla compartido
│   └── styles/             # global.css (tokens y tema)
├── docs/                   # Documentación técnica
├── astro.config.mjs
├── tailwind.config.ts
└── package.json
```

## 4. Funcionamiento y Flujo de Datos

### Ruteo

Ruteo basado en archivos. Cada archivo en `src/pages/` es una URL:

- `index.astro` → `/`
- `objetivos.astro` → `/objetivos`
- `plan-estudios.astro` → `/plan-estudios`
- `profesores/[slug].astro` → `/profesores/:slug` (ruta dinámica)

Las URLs públicas llevan además la base de despliegue. Ver la sección 6.

### Capa de Datos (`src/data`)

El contenido reside en archivos TypeScript, lo que permite edición sencilla, seguridad de tipos y versionado en Git.

**Archivos clave:**

- `navegacion.ts`: arquitectura de navegación. Alimenta Navbar y Footer a la vez, de modo que no pueden desincronizarse.
- `admision.ts`: calendario, pasos, requisitos y preguntas frecuentes. Lo consumen portada y convocatoria.
- `contacto.ts`: fuente única de correo, teléfono, domicilio y redes.
- `profesores.ts`: catálogo del núcleo académico.
- `tesis.ts`, `documentos.ts`, `instalaciones.ts`, `galeria.ts`, `vinculacion.ts`.

**Decisión de modelado relevante:** en `documentos.ts` y `tesis.ts` el campo `linkDrive` es **opcional**. Omitirlo hace que la tarjeta se renderice en estado "En proceso" con el botón inhabilitado. Es la forma correcta de expresar "aún no hay documento", en vez de apuntar a una URL inexistente.

### Generación de Páginas Dinámicas

`profesores/[slug].astro` usa `getStaticPaths()`: durante el build lee `profesores.ts` y genera una página HTML por profesor.

## 5. Accesibilidad como requisito de arquitectura

No es una capa cosmética, condiciona decisiones de implementación:

- **Pestañas**: `TabGroup.astro` implementa el patrón WAI-ARIA. El estado visual se deriva de `aria-selected` mediante la variante `aria-*` de Tailwind, así que apariencia y semántica son el mismo atributo y no pueden divergir. Sin JavaScript, un bloque `<noscript>` revela todos los paneles.
- **Navegación**: `aria-expanded`, `aria-controls`, `aria-current="page"`, cierre con Escape con devolución de foco, y contención de foco en el menú móvil.
- **Contraste**: el token `--muted-foreground` cumple AA sobre las dos superficies del sitio (fondo de página y tarjeta), no solo sobre una.
- **Movimiento**: guarda global `prefers-reduced-motion`.
- **Enlace de salto** al contenido principal como primer elemento tabulable.

## 6. Base de despliegue

El sitio vive temporalmente en una subruta de GitHub Pages (`/MDO`) y migrará a `maestriadirecciondeorganizaciones.uagro.mx`, donde la base vuelve a ser `/`.

Astro prefija por su cuenta los assets que empaqueta y las rutas de página, pero **no** reescribe los `src` ni `href` escritos a mano ni lo que vive en `public/`. Por eso ninguna ruta está cableada: todas pasan por `withBase()` en `src/lib/paths.ts`.

Consecuencia práctica: cambiar de dominio es editar dos variables de entorno en el workflow y añadir un archivo `CNAME`. No hay que tocar ningún componente.

## 7. Ciclo de Vida y Despliegue

1. **Desarrollo (`npm run dev`)**: servidor local en `http://localhost:8080/MDO` con recarga en caliente.

2. **Construcción (`npm run build`)**, en tres etapas:
   - `check-enlaces`: falla si hay URLs de marcador, anclas vacías o referencias al hosting anterior.
   - `astro check`: validación de tipos.
   - `astro build`: genera `dist/`.

3. **Producción**: GitHub Actions ejecuta lint, pruebas y build en cada push a `main`, y publica `dist/` en Pages. Si algo falla, no se publica nada.

## 8. Mantenimiento

1. Modificar contenido en `src/data/`.
2. Subir imágenes a `public/assets/` con `width` y `height` declarados en el marcado.
3. Probar localmente (`npm run dev`).
4. Verificar (`npm run lint`, `npm run test`, `npm run build`).
5. Push a `main`: el despliegue es automático.

Ver `docs/guia-edicion-y-mantenimiento.md` para el detalle por tipo de cambio y `docs/despliegue-github-pages.md` para el procedimiento de dominio.
