import { cva, type VariantProps } from "class-variance-authority";

/**
 * Clases compartidas por `Button` (React), `ButtonLink` (React) y
 * `ButtonLink.astro`.
 *
 * Vive en su propio modulo por dos razones:
 *
 *  1. Un archivo que exporta a la vez un componente y una constante rompe el
 *     Fast Refresh de React, que era la unica advertencia de lint del proyecto.
 *  2. Los archivos `.astro` necesitan las clases sin arrastrar el componente
 *     React ni su runtime.
 *
 * RADIO: la base es `rounded-xl`, que es lo que la convencion del proyecto
 * asigna a los controles (ver `tailwind.config.ts`). Antes era `rounded-md` y
 * las seis llamadas del sitio lo sobrescribian una por una con `rounded-xl`:
 * el valor por defecto no lo queria nadie.
 *
 * ALTURA: ningun tamaño baja de 44px (`h-11`). Antes `sm` daba 36px y
 * `default` 40px, por debajo del objetivo tactil comodo, y `sm` es justo el
 * tamaño de las llamadas a la accion de las tarjetas, que en movil son el
 * control mas pulsado del sitio. `sm` y `default` comparten altura a
 * proposito: se diferencian por el relleno horizontal y el cuerpo de texto.
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-11 px-3",
        lg: "h-12 px-8",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
