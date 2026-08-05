import * as React from "react";

import { cn } from "@/lib/utils";
import { buttonVariants, type ButtonVariantProps } from "@/components/ui/buttonVariants";

export interface ButtonLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    ButtonVariantProps {
  /** Abre en pestaña nueva y lo anuncia a los lectores de pantalla. */
  externo?: boolean;
}

/**
 * Enlace con apariencia de boton.
 *
 * Sustituye al patron de envolver un boton en un enlace, que se repetia en
 * seis sitios del proyecto. Ese anidamiento tenia tres problemas:
 *
 *  1. El modelo de contenido de `<a>` prohibe contenido interactivo: era HTML
 *     invalido, y los lectores de pantalla anunciaban un boton dentro de un
 *     enlace, o sea dos controles para una sola accion.
 *  2. El aviso "se abre en una pestaña nueva" vivia DENTRO del boton, asi que
 *     no le pertenecia al enlace que realmente navegaba.
 *  3. Un enlace no es un boton: no responde a Espacio, si al Enter, y el menu
 *     contextual del navegador ofrece "abrir en pestaña nueva". Envolverlo en
 *     un boton confundia las dos semanticas.
 *
 * `externo` centraliza `target`, `rel` y el aviso accesible para que no haya
 * que recordarlos en cada llamada.
 */
export function ButtonLink({
  className,
  variant,
  size,
  externo = false,
  children,
  ...props
}: ButtonLinkProps) {
  const propsExternos = externo
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <a
      className={cn(buttonVariants({ variant, size, className }))}
      {...propsExternos}
      {...props}
    >
      {children}
      {externo && <span className="sr-only">, se abre en una pestaña nueva</span>}
    </a>
  );
}
