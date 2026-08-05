import { Clock } from "lucide-react";

import { cn } from "@/lib/utils";

interface EstadoEnProcesoProps {
  className?: string;
}

/**
 * Insignia de estado para las tarjetas cuyo documento aun no tiene URL publica.
 *
 * Antes esto era un `<Button disabled>`, lo que traia tres problemas:
 *
 *  1. Es informacion, no un control. Prometia una accion que no existe.
 *  2. `disabled` lo saca del orden de tabulacion, asi que quien navega saltando
 *     de control en control nunca se enteraba de por que faltaba la descarga.
 *  3. `disabled:opacity-50` dejaba el texto en 3.3:1. WCAG exime a los
 *     controles inactivos, pero aqui el texto es el mensaje: tiene que leerse.
 *
 * Como parrafo con borde discontinuo se lee como estado, va en el orden normal
 * del documento y conserva el contraste completo (4.8:1 sobre `--muted`).
 */
export function EstadoEnProceso({ className }: EstadoEnProcesoProps) {
  return (
    <p
      className={cn(
        "flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-muted px-3 text-sm font-medium text-muted-foreground",
        className,
      )}
    >
      <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
      En proceso
    </p>
  );
}
