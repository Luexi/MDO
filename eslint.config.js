import js from "@eslint/js";
import globals from "globals";
import astro from "eslint-plugin-astro";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

/**
 * Configuracion de lint.
 *
 * La version anterior solo miraba `**\/*.{ts,tsx}`, asi que los `.astro` (la
 * mayor parte del sitio) no se revisaban, y `no-unused-vars` estaba apagado.
 * Sumado a que la unica prueba del proyecto afirmaba `true === true`, la puerta
 * de calidad que el workflow ejecuta antes de publicar no verificaba nada.
 *
 * Ahora cubre `.astro`, `.ts`, `.tsx` y los scripts de Node, y anade las reglas
 * de accesibilidad de JSX. Esas reglas no habrian atrapado el `<a><button>`
 * anidado (jsx-a11y no tiene una regla para contenido interactivo anidado): de
 * eso se encarga la regla `boton-en-enlace` de `scripts/check-enlaces.mjs`.
 */
export default tseslint.config(
  { ignores: ["dist", ".astro", "node_modules"] },

  // React e islas
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      jsxA11y.flatConfigs.recommended,
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },

  // Paginas y componentes Astro
  ...astro.configs.recommended,
  {
    files: ["**/*.astro"],
    rules: {
      // El compilador de Astro ya resuelve los componentes importados; la regla
      // base de `no-unused-vars` no los ve usados dentro del template.
      "@typescript-eslint/no-unused-vars": "off",
    },
  },

  // Scripts de Node (guard de enlaces, configuracion)
  {
    files: ["**/*.{js,mjs}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: globals.node,
    },
  },
);
