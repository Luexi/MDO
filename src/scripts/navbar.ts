/**
 * Comportamiento de la barra de navegacion.
 *
 * Cubre los fallos detectados en la auditoria:
 *  - El boton de menu no exponia `aria-expanded` ni `aria-controls`, asi que
 *    nada anunciaba que el menu se habia abierto.
 *  - Escape no cerraba el menu y el foco ni se movia ni quedaba contenido.
 *  - La pagina de fondo seguia desplazandose con el menu movil abierto.
 *
 * Los menus desplegables de escritorio siguen el patron de menu-boton: el
 * disparador conserva el foco, Escape cierra y devuelve el foco, y un clic
 * fuera o el foco saliendo del grupo tambien cierran.
 */

const SELECTOR_FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

function cerrarDesplegable(disparador: HTMLElement, panel: HTMLElement): void {
  disparador.setAttribute("aria-expanded", "false");
  panel.hidden = true;
}

function abrirDesplegable(disparador: HTMLElement, panel: HTMLElement): void {
  disparador.setAttribute("aria-expanded", "true");
  panel.hidden = false;
}

function initDesplegablesEscritorio(): void {
  const grupos = Array.from(
    document.querySelectorAll<HTMLElement>("[data-nav-grupo]"),
  );

  const cerrarTodos = (excepto?: HTMLElement) => {
    grupos.forEach((grupo) => {
      if (grupo === excepto) return;
      const disparador = grupo.querySelector<HTMLElement>("[data-nav-boton]");
      const panel = grupo.querySelector<HTMLElement>("[data-nav-panel]");
      if (disparador && panel) cerrarDesplegable(disparador, panel);
    });
  };

  grupos.forEach((grupo) => {
    const disparador = grupo.querySelector<HTMLElement>("[data-nav-boton]");
    const panel = grupo.querySelector<HTMLElement>("[data-nav-panel]");
    if (!disparador || !panel) return;

    disparador.addEventListener("click", () => {
      const abierto = disparador.getAttribute("aria-expanded") === "true";
      cerrarTodos(grupo);
      if (abierto) {
        cerrarDesplegable(disparador, panel);
      } else {
        abrirDesplegable(disparador, panel);
      }
    });

    grupo.addEventListener("keydown", (evento: KeyboardEvent) => {
      if (evento.key !== "Escape") return;
      if (disparador.getAttribute("aria-expanded") !== "true") return;
      evento.preventDefault();
      cerrarDesplegable(disparador, panel);
      disparador.focus();
    });

    // Cierra cuando el foco abandona el grupo por completo (Tab desde el
    // ultimo enlace del panel).
    grupo.addEventListener("focusout", () => {
      window.setTimeout(() => {
        if (!grupo.contains(document.activeElement)) {
          cerrarDesplegable(disparador, panel);
        }
      }, 0);
    });
  });

  document.addEventListener("click", (evento) => {
    const destino = evento.target as Node;
    const dentro = grupos.some((grupo) => grupo.contains(destino));
    if (!dentro) cerrarTodos();
  });
}

function initMenuMovil(): void {
  const disparador = document.querySelector<HTMLElement>("[data-menu-boton]");
  const panel = document.querySelector<HTMLElement>("[data-menu-movil]");
  const iconoAbrir = document.querySelector<HTMLElement>("[data-icono-menu]");
  const iconoCerrar = document.querySelector<HTMLElement>("[data-icono-cerrar]");
  if (!disparador || !panel) return;

  const estaAbierto = () => disparador.getAttribute("aria-expanded") === "true";

  function alternarIconos(abierto: boolean): void {
    iconoAbrir?.classList.toggle("hidden", abierto);
    iconoCerrar?.classList.toggle("hidden", !abierto);
  }

  function abrir(): void {
    disparador!.setAttribute("aria-expanded", "true");
    panel!.hidden = false;
    alternarIconos(true);
    // Bloquea el desplazamiento del fondo mientras el menu ocupa la pantalla.
    document.body.style.overflow = "hidden";
    panel!.querySelector<HTMLElement>(SELECTOR_FOCUSABLE)?.focus();
  }

  function cerrar(devolverFoco: boolean): void {
    disparador!.setAttribute("aria-expanded", "false");
    panel!.hidden = true;
    alternarIconos(false);
    document.body.style.overflow = "";
    if (devolverFoco) disparador!.focus();
  }

  disparador.addEventListener("click", () => {
    if (estaAbierto()) cerrar(false);
    else abrir();
  });

  // Al seguir un enlace, el menu debe quedar cerrado para la siguiente pagina.
  panel.querySelectorAll("a").forEach((enlace) => {
    enlace.addEventListener("click", () => cerrar(false));
  });

  document.addEventListener("keydown", (evento: KeyboardEvent) => {
    if (evento.key === "Escape" && estaAbierto()) {
      evento.preventDefault();
      cerrar(true);
    }
  });

  // Contencion del foco: con el menu abierto, Tab circula dentro del panel.
  panel.addEventListener("keydown", (evento: KeyboardEvent) => {
    if (evento.key !== "Tab" || !estaAbierto()) return;

    const focusables = Array.from(
      panel.querySelectorAll<HTMLElement>(SELECTOR_FOCUSABLE),
    ).filter((el) => el.offsetParent !== null);
    if (focusables.length === 0) return;

    const primero = focusables[0];
    const ultimo = focusables[focusables.length - 1];

    if (evento.shiftKey && document.activeElement === primero) {
      evento.preventDefault();
      ultimo.focus();
    } else if (!evento.shiftKey && document.activeElement === ultimo) {
      evento.preventDefault();
      primero.focus();
    }
  });

  // Si se pasa a escritorio con el menu abierto, se restaura el scroll.
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024 && estaAbierto()) cerrar(false);
  });
}

export function initNavbar(): void {
  initDesplegablesEscritorio();
  initMenuMovil();
}
