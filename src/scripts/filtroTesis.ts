/**
 * Filtro de tesis por generacion, sin framework.
 *
 * Antes esto era una isla React con `client:idle`. La pagina /tesis descargaba
 * 43.9 KB comprimidos del runtime de React mas 9.9 KB del componente para
 * gestionar UNA cadena de estado: la generacion seleccionada. La galeria si
 * justifica React (dialogo modal, contencion de foco, teclado); un filtro de
 * tres botones no.
 *
 * Es ademas la regla que el propio proyecto se dio y estaba incumpliendo:
 * "Prefiere un `<script>` en `src/scripts/` sobre una isla React cuando el
 * estado sea simple" (docs/arquitectura-y-estructura.md, seccion 14).
 *
 * Las tarjetas ahora se renderizan las tres generaciones en el servidor y el
 * script solo conmuta el atributo `hidden`. Sin JavaScript se ven todas, cada
 * una bajo su encabezado, y la barra de filtros se oculta: el contenido nunca
 * queda inalcanzable.
 *
 * Contrato del marcado (ver `src/pages/tesis.astro`):
 *   [data-filtro-tesis]                     contenedor
 *   [data-filtro-boton][data-generacion]    boton, con aria-pressed
 *   [data-filtro-panel][data-generacion]    panel de esa generacion
 */

function activarGrupo(contenedor: HTMLElement): void {
  const botones = Array.from(
    contenedor.querySelectorAll<HTMLButtonElement>("[data-filtro-boton]"),
  );
  const paneles = Array.from(
    contenedor.querySelectorAll<HTMLElement>("[data-filtro-panel]"),
  );

  if (botones.length === 0 || paneles.length === 0) return;

  function seleccionar(generacion: string): void {
    botones.forEach((boton) => {
      boton.setAttribute(
        "aria-pressed",
        String(boton.dataset.generacion === generacion),
      );
    });
    paneles.forEach((panel) => {
      panel.hidden = panel.dataset.generacion !== generacion;
    });
  }

  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      const generacion = boton.dataset.generacion;
      if (generacion) seleccionar(generacion);
    });
  });

  // Respeta la generacion que el servidor marco como activa.
  const inicial =
    botones.find((boton) => boton.getAttribute("aria-pressed") === "true") ??
    botones[0];
  if (inicial?.dataset.generacion) seleccionar(inicial.dataset.generacion);
}

export function initFiltroTesis(raiz: ParentNode = document): void {
  raiz
    .querySelectorAll<HTMLElement>("[data-filtro-tesis]")
    .forEach((contenedor) => activarGrupo(contenedor));
}
