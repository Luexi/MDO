import type { Config } from "tailwindcss";

/**
 * Escala de radios: se usa la escala por defecto de Tailwind, sin sobrescribir.
 *
 *   sm 0.125 · md 0.375 · lg 0.5 · xl 0.75 · 2xl 1 · 3xl 1.5  (rem)
 *
 * La configuracion anterior redefinia `lg`, `md`, `sm`, `2xl` y `3xl` pero
 * omitia `xl`, con lo que la escala quedaba invertida: `rounded-lg` (1rem)
 * resultaba MAS grande que `rounded-xl` (0.75rem) e identico a `rounded-2xl`.
 * Como `rounded-xl` es la clase mas usada del proyecto, la pieza mas comun era
 * la mas pequeña de las tres. Al no sobrescribir nada, la escala vuelve a ser
 * monotona y predecible.
 *
 * Convencion del proyecto:
 *   rounded-lg   -> elementos pequeños (enlaces de nav, insignias, cajas de icono)
 *   rounded-xl   -> controles (botones, campos, celdas de lista)
 *   rounded-2xl  -> contenedores (tarjetas, paneles, secciones)
 *   rounded-full -> elementos circulares o en pastilla
 */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}"],
  prefix: "",
  theme: {
    extend: {
      /*
       * Unica declaracion de las pilas tipograficas del sitio.
       *
       * "Inter Fallback" y "Playfair Display Fallback" son las caras del
       * sistema con las metricas corregidas en `src/styles/fonts.css`, para que
       * el intercambio de `font-display: swap` no mueva la maquetacion. Van
       * antes que las genericas: si la webfont tarda, el texto se pinta ya con
       * el ancho y la altura definitivos.
       */
      fontFamily: {
        sans: ["Inter", "Inter Fallback", "system-ui", "sans-serif"],
        display: [
          "Playfair Display",
          "Playfair Display Fallback",
          "Georgia",
          "serif",
        ],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
} satisfies Config;
