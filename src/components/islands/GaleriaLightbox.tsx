import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ImagenGaleria } from "@/data/galeria";
import { withBase } from "@/lib/paths";

interface GaleriaLightboxProps {
  imagenes: ImagenGaleria[];
}

/**
 * Rejilla de galeria con visor modal.
 *
 * Sustituye al carrusel anterior, que acumulaba cuatro problemas:
 *  - Autoplay cada 5 s sin ningun control de pausa, lo que incumple el criterio
 *    WCAG 2.2.2 y hostiga a quien lee despacio.
 *  - La pagina prometia "Desliza o usa las flechas" pero el componente no
 *    registraba ningun manejador tactil ni de puntero.
 *  - Debajo se repetian las mismas cinco fotos bajo el titulo "Todas las
 *    Imágenes", asi que la seccion prometia mas material del que existe.
 *  - Las miniaturas eran `div` con `cursor-pointer` y sin destino: senalaban una
 *    interaccion inexistente y eran invisibles para un lector de pantalla.
 */
export default function GaleriaLightbox({ imagenes }: GaleriaLightboxProps) {
  const [abierta, setAbierta] = useState<number | null>(null);
  const dialogoRef = useRef<HTMLDivElement>(null);
  const disparadorRef = useRef<HTMLButtonElement | null>(null);

  const cerrar = useCallback(() => {
    setAbierta(null);
    // Devuelve el foco a la miniatura desde la que se abrio el visor.
    disparadorRef.current?.focus();
  }, []);

  const mover = useCallback(
    (delta: number) => {
      setAbierta((actual) => {
        if (actual === null) return actual;
        return (actual + delta + imagenes.length) % imagenes.length;
      });
    },
    [imagenes.length],
  );

  useEffect(() => {
    if (abierta === null) return;

    function alPulsarTecla(evento: KeyboardEvent) {
      if (evento.key === "Escape") {
        evento.preventDefault();
        cerrar();
      } else if (evento.key === "ArrowRight") {
        evento.preventDefault();
        mover(1);
      } else if (evento.key === "ArrowLeft") {
        evento.preventDefault();
        mover(-1);
      } else if (evento.key === "Tab") {
        // Contencion del foco dentro del dialogo.
        const focusables = dialogoRef.current?.querySelectorAll<HTMLElement>(
          "button, [href], [tabindex]:not([tabindex='-1'])",
        );
        if (!focusables || focusables.length === 0) return;
        const primero = focusables[0];
        const ultimo = focusables[focusables.length - 1];
        if (evento.shiftKey && document.activeElement === primero) {
          evento.preventDefault();
          ultimo.focus();
        } else if (!evento.shiftKey && document.activeElement === ultimo) {
          evento.preventDefault();
          primero.focus();
        }
      }
    }

    document.addEventListener("keydown", alPulsarTecla);
    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", alPulsarTecla);
      document.body.style.overflow = overflowPrevio;
    };
  }, [abierta, cerrar, mover]);

  useEffect(() => {
    if (abierta === null) return;
    dialogoRef.current?.querySelector<HTMLElement>("button")?.focus();
  }, [abierta]);

  const imagenActiva = abierta === null ? null : imagenes[abierta];

  return (
    <>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {imagenes.map((imagen, indice) => (
          <li key={imagen.id} className="h-full">
            <button
              type="button"
              onClick={(evento) => {
                disparadorRef.current = evento.currentTarget;
                setAbierta(indice);
              }}
              className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-card text-left shadow-sm transition-shadow hover:shadow-lg"
            >
              <span className="block aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={withBase(imagen.src)}
                  alt={imagen.alt}
                  width={1200}
                  height={900}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </span>
              <span className="flex flex-1 flex-col p-4">
                <span className="font-display text-lg font-semibold text-foreground">
                  {imagen.titulo}
                </span>
                <span className="mt-1 text-sm leading-snug text-muted-foreground">
                  {imagen.descripcion}
                </span>
                <span className="mt-auto pt-3 text-sm font-medium text-accent group-hover:underline">
                  Ampliar imagen
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {imagenActiva && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/90 p-4"
          onClick={(evento) => {
            if (evento.target === evento.currentTarget) cerrar();
          }}
        >
          <div
            ref={dialogoRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Imagen ${(abierta ?? 0) + 1} de ${imagenes.length}: ${imagenActiva.titulo}`}
            className="relative w-full max-w-4xl"
          >
            <div className="flex items-center justify-between gap-4 pb-3">
              <p className="text-sm text-background/80">
                {(abierta ?? 0) + 1} de {imagenes.length}
              </p>
              <button
                type="button"
                onClick={cerrar}
                className="rounded-lg bg-background/10 p-2 text-background transition-colors hover:bg-background/20"
                aria-label="Cerrar el visor de imágenes"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <img
              src={withBase(imagenActiva.src)}
              alt={imagenActiva.alt}
              width={1200}
              height={900}
              className="max-h-[70vh] w-full rounded-2xl bg-muted object-contain"
            />

            <div className="mt-3 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => mover(-1)}
                className="rounded-lg bg-background/10 p-2 text-background transition-colors hover:bg-background/20"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>

              <div className="min-w-0 flex-1 text-center">
                <p className="font-display text-lg font-semibold text-background">
                  {imagenActiva.titulo}
                </p>
                <p className="text-sm text-background/80">
                  {imagenActiva.descripcion}
                </p>
              </div>

              <button
                type="button"
                onClick={() => mover(1)}
                className="rounded-lg bg-background/10 p-2 text-background transition-colors hover:bg-background/20"
                aria-label="Imagen siguiente"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
