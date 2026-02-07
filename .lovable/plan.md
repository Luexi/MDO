

# 🎓 Plan: Sitio Web MDO - Maestría en Dirección de Organizaciones

## Resumen del Proyecto
Sitio web estático moderno y elegante para la Maestría en Dirección de Organizaciones de la UAGro, con diseño institucional (azul/rojo), navegación completa, y preparado para despliegue en Vercel desde GitHub.

---

## 🎨 Design System UAGro
- **Paleta de colores institucionales**: Azul UAGro (#0B2D5C), Azul acentos (#1F3A8A), Rojo (#D72626)
- **Tipografías**: Inter para UI, Playfair Display para títulos elegantes
- **Estilo visual**: Gradientes suaves tipo "spotlight", bordes redondeados, sombras sutiles, mucho espacio en blanco
- **Navbar tipo "pill"**: Navegación flotante con fondo blanco traslúcido

---

## 📄 Páginas y Secciones

### 1. **Inicio (Home)**
- Hero elegante con título grande y subtítulo académico
- Badge "Programa Acreditado de Calidad"
- Dos botones CTA: "Plan de Estudios" (azul → Drive) y "Convocatoria 2026" (rojo)
- 3 tarjetas de beneficios: Academia Rigurosa, Networking, Innovación
- Logos institucionales en footer

### 2. **Objetivos**
- Objetivo general del programa
- Metas del programa (lista numerada de 7 puntos)
- **Tabs internos**:
  - *Perfil de Ingreso*: Requisitos y competencias deseables
  - *Perfil de Egreso*: Competencias del egresado

### 3. **Núcleo Académico**
- Grid de tarjetas con los 16 profesores
- Cada tarjeta: foto placeholder, nombre, grado
- Hover: efecto grayscale elegante
- Click → subpágina individual del profesor

### 4. **Subpáginas de Profesores** (/profesores/[slug])
- Encabezado con foto + nombre + grado
- Secciones editables: Semblanza, Historial Académico, Publicaciones
- Contenido placeholder listo para que llenes manualmente

### 5. **LIES** (Líneas de Investigación)
- Tarjetas con las líneas de investigación:
  - "Gestión y desarrollo empresarial"
  - "Procesos de gestión y calidad en organizaciones"
- Descripción académica de cada línea

### 6. **Repositorio** (Documentos)
- Tarjetas de documentos con links a Google Drive (placeholders):
  - Plan de Estudios
  - Convocatoria
  - Formatos varios

### 7. **Tesis** (Repositorio de Tesis)
- Filtros por generación (pills): 2023–2025, 2024–2026, 2025–2027
- Tarjetas de tesis: Autor, Generación, Título, Botón (Ver/Próximamente)
- Datos placeholder fáciles de editar

### 8. **Instalaciones**
- Texto introductorio sobre infraestructura FCA
- Cards o lista visual del inventario:
  - 8 aulas, 3 salas de cómputo, 12 cubículos
  - 2 auditorios, 2 salas de videoconferencias
  - 2 bibliotecas, cafeterías, áreas verdes

### 9. **Galería**
- Carrusel de imágenes destacadas
- Placeholders para fotos de eventos, graduaciones, actividades

### 10. **Vinculación**
- Texto explicativo de convenios, intercambios, movilidad
- Lista de instituciones con convenios (editable)

### 11. **Convocatoria** (/convocatoria)
- Fechas clave con timeline visual (Registro, Examen EXANI, Inicio de cursos)
- Botones: "Descargar Convocatoria PDF", "Iniciar Pre-Registro"
- Información de contacto (email, teléfono)
- Nota importante sobre becas

---

## 🧩 Componentes Reutilizables
- Navbar con navegación completa + botón CTA "Convocatoria"
- Footer con logos UAGro/FCA/MDO + redes sociales
- Tarjetas de profesor, documento, tesis
- Tabs component para Objetivos
- Pills/filtros para Tesis
- Carrusel para Galería

---

## 📁 Estructura de Assets
- `/public/assets/logos/` → Logos UAGro, FCA, Maestría
- `/public/assets/profesores/[slug]/` → Fotos de cada profesor
- `/public/assets/galeria/` → Imágenes del carrusel

---

## ✅ Entregables
- Código React + TypeScript + Tailwind CSS 100% funcional
- Diseño responsive (desktop, tablet, móvil)
- Estructura de datos editable (JSON/archivos) para fácil actualización
- Listo para push a GitHub y deploy en Vercel

