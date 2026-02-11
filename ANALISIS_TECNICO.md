# Análisis Técnico: Sitio Web MDO UAGro

Este documento proporciona un análisis detallado de la estructura, propósito, arquitectura y funcionamiento del sitio web de la **Maestría en Dirección de Organizaciones (MDO)** de la Universidad Autónoma de Guerrero.

## 1. Propósito del Proyecto

El objetivo principal de este proyecto es servir como el **sitio web oficial e informativo** para la MDO. Su función es comunicar de manera clara y accesible:

- Los objetivos y perfil de egreso del programa.
- El núcleo académico y la producción de sus profesores.
- Información para aspirantes (convocatorias, requisitos).
- Repositorio de tesis y documentos normativos.
- Evidencia de instalaciones y vinculación institucional.

El sitio está diseñado para ser **rápido, seguro y fácil de mantener**, priorizando una arquitectura estática que no requiere bases de datos complejas ni mantenimiento de servidores en tiempo de ejecución.

## 2. Arquitectura Técnica

El proyecto utiliza una arquitectura **JAMstack** moderna centrada en la generación de sitios estáticos (SSG).

### Stack Tecnológico

- **Framework Principal**: [Astro 5](https://astro.build/) (Static Site Generator).
- **Lenguaje**: TypeScript (para lógica y seguridad de tipos).
- **Componentes UI**:
  - **Astro Components (`.astro`)**: Para la estructura general, layouts y contenido estático (90% del sitio).
  - **React (`.tsx`)**: Utilizado exclusivamente para "Islas" de interactividad (menú móvil, carruseles, filtros).
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/) para diseño utilitario y responsivo.
- **Iconos**: Lucide React.
- **Toolchain**: NPM para gestión de paquetes y scripts de build.

### Enfoque de "Islas" (Islands Architecture)

A diferencia de una Single Page Application (SPA) tradicional, este sitio envía **HTML puro** al navegador. JavaScript solo se carga en las pequeñas secciones que lo necesitan (las "islas"), mejorando drásticamente el rendimiento y el SEO.

Ejemplos de islas en este proyecto:

- `Navbar.tsx`: Para manejar el estado del menú desplegable en móviles.
- `ObjetivosTabs.tsx`: Para cambiar entre pestañas de información sin recargar.
- `TesisFiltro.tsx`: Para filtrar tesis por generación dinámicamente.
- `ImageCarousel.tsx`: Para la galería de imágenes.

## 3. Estructura del Proyecto

La estructura de carpetas sigue las convenciones de Astro, optimizada para orden y escalabilidad:

```text
mdocom/
├── public/                 # Archivos estáticos públicos (se sirven tal cual)
│   ├── assets/             # Imágenes, logos, documentos PDF
│   └── favicon.ico         # Icono del sitio
├── src/                    # Código fuente
│   ├── components/         # Bloques de construcción UI
│   │   ├── cards/          # Tarjetas informativas (Profesores, Tesis, etc.)
│   │   ├── islands/        # Componentes interactivos (React)
│   │   ├── layout/         # Componentes estructurales (Navbar, Footer)
│   │   └── ui/             # Elementos base (Botones, Inputs, Badges)
│   ├── data/               # "Base de datos" en archivos TypeScript/JSON
│   ├── layouts/            # Plantillas de página (BaseLayout.astro)
│   ├── pages/              # Rutas del sitio (File-based routing)
│   └── styles/             # Estilos globales (global.css)
├── docs/                   # Documentación técnica detallada
├── astro.config.mjs        # Configuración de Astro
├── tailwind.config.ts      # Configuración de diseño y tema
└── package.json            # Dependencias y scripts
```

## 4. Funcionamiento y Flujo de Datos

### Ruteo (Routing)

El sitio utiliza **ruteo basado en archivos**. Cada archivo dentro de `src/pages/` se convierte automáticamente en una URL:

- `src/pages/index.astro`  →  `/` (Inicio)
- `src/pages/objetivos.astro`  →  `/objetivos`
- `src/pages/profesores/[slug].astro`  →  `/profesores/nombre-profesor` (Ruta dinámica)

### Capa de Datos (`src/data`)

En lugar de una base de datos SQL/NoSQL externa, el contenido reside en archivos TypeScript dentro de `src/data/`. Esto permite:

1. **Edición sencilla**: Se editan los archivos `.ts` y se reconstruye el sitio.
2. **Seguridad de tipos**: TypeScript valida que no falten campos (ej. que cada profesor tenga nombre y foto).
3. **Versionado**: Todo el contenido está en Git, permitiendo historial de cambios.

**Archivos clave de datos:**

- `profesores.ts`: Catálogo completo del núcleo académico.
- `tesis.ts`: Lista de tesis por generación.
- `documentos.ts`: Normatividad y formatos.

### Generación de Páginas Dinámicas

Para las páginas de detalle de profesores (`[slug].astro`), Astro utiliza la función `getStaticPaths()`. Durante el proceso de construcción (`build`), lee `profesores.ts` y genera una página HTML estática individual para cada profesor.

## 5. Ciclo de Vida y Despliegue

1. **Desarrollo (`npm run dev`)**:
    - Inicia un servidor local en `localhost:8080`.
    - Habilitada la recarga en caliente (HMR) para ver cambios al instante.

2. **Construcción (`npm run build`)**:
    - Astro compila todo el TypeScript y React.
    - Genera archivos HTML, CSS y JS optimizados en la carpeta `dist/`.
    - Las imágenes se optimizan (si se configurara) y los assets se copian.

3. **Producción**:
    - La carpeta `dist/` contiene el sitio web final.
    - Este contenido es **totalmente estático**, por lo que puede desplegarse en cualquier hosting estático (Vercel, Netlify, GitHub Pages, Apache/Nginx) sin necesidad de Node.js en el servidor.

## 6. Mantenimiento

Para mantener el sitio actualizado, el flujo de trabajo es:

1. **Modificar contenido** en `src/data/` (ej. añadir un nuevo profesor o tesis).
2. **Subir imágenes** a `public/assets/` si es necesario.
3. **Probar localmente** (`npm run dev`).
4. **Generar versión final** (`npm run build`).
5. **Desplegar** la carpeta `dist`.
