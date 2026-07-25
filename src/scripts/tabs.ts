/**
 * Patron de pestañas accesible (WAI-ARIA Tabs).
 *
 * Sustituye a la implementacion anterior basada en `input[type=radio]` con
 * clase `hidden`, que tenia dos fallos independientes:
 *
 *  1. `hidden` es `display:none`, asi que los radios quedaban FUERA del orden
 *     de tabulacion y las pestañas eran completamente inoperables con teclado.
 *     Todo "Perfil de Egreso" y todo el plan por semestre eran contenido que
 *     existia y era inalcanzable para quien no usa raton.
 *  2. Los `<label>` vivian dentro de un div hermano, no como hermanos de los
 *     inputs, y el modificador `peer-*` de Tailwind usa el combinador `~`. Por
 *     eso `peer-checked/x:bg-card` no aplicaba nunca: el panel conmutaba pero
 *     la pestaña jamas mostraba cual estaba activa.
 *
 * Contrato del marcado (ver `TabGroup.astro`):
 *   [data-tabs]            contenedor
 *   [role="tablist"]       barra de pestañas
 *   [role="tab"]           boton, con aria-controls apuntando al panel
 *   [role="tabpanel"]      panel, con aria-labelledby apuntando a su pestaña
 *
 * Sin JavaScript, `TabGroup.astro` revela todos los paneles y oculta la barra,
 * de modo que el contenido nunca queda inaccesible.
 */

function activarGrupo(contenedor: HTMLElement): void {
  const tabs = Array.from(
    contenedor.querySelectorAll<HTMLButtonElement>('[role="tab"]'),
  );
  const paneles = Array.from(
    contenedor.querySelectorAll<HTMLElement>('[role="tabpanel"]'),
  );

  if (tabs.length === 0 || tabs.length !== paneles.length) return;

  function activar(indice: number, mueveFoco: boolean): void {
    tabs.forEach((tab, i) => {
      const activo = i === indice;
      tab.setAttribute("aria-selected", String(activo));
      // Roving tabindex: solo la pestaña activa es alcanzable con Tab; entre
      // pestañas se navega con las flechas, como espera un lector de pantalla.
      tab.tabIndex = activo ? 0 : -1;
    });

    paneles.forEach((panel, i) => {
      panel.hidden = i !== indice;
    });

    if (mueveFoco) tabs[indice].focus();
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => activar(i, false));

    tab.addEventListener("keydown", (evento: KeyboardEvent) => {
      const ultimo = tabs.length - 1;
      let destino: number | null = null;

      switch (evento.key) {
        case "ArrowRight":
          destino = i === ultimo ? 0 : i + 1;
          break;
        case "ArrowLeft":
          destino = i === 0 ? ultimo : i - 1;
          break;
        case "Home":
          destino = 0;
          break;
        case "End":
          destino = ultimo;
          break;
        default:
          return;
      }

      evento.preventDefault();
      activar(destino, true);
    });
  });

  // Estado inicial: respeta la pestaña marcada por el servidor.
  const inicial = tabs.findIndex(
    (tab) => tab.getAttribute("aria-selected") === "true",
  );
  activar(inicial === -1 ? 0 : inicial, false);
}

export function initTabs(raiz: ParentNode = document): void {
  raiz
    .querySelectorAll<HTMLElement>("[data-tabs]")
    .forEach((contenedor) => activarGrupo(contenedor));
}
