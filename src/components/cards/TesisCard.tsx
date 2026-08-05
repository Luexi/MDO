import { ExternalLink, FileText } from "lucide-react";
import type { Tesis } from "@/data/tesis";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { EstadoEnProceso } from "@/components/ui/EstadoEnProceso";

interface TesisCardProps {
  tesis: Tesis;
}

export function TesisCard({ tesis }: TesisCardProps) {
  const disponible = Boolean(tesis.linkDrive);

  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex flex-1 items-start gap-4">
        <div className="flex-shrink-0 rounded-xl bg-primary/10 p-3">
          <FileText className="h-6 w-6 text-primary" />
        </div>
        <div className="min-w-0 flex-1">
          <span className="inline-block rounded-lg bg-accent/10 px-2 py-1 text-xs font-medium text-accent">
            Generación {tesis.generacion}
          </span>
          <h3 className="mt-2 font-display text-lg font-semibold text-foreground">
            {tesis.titulo}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            <span className="font-medium">Autoría:</span> {tesis.autor}
          </p>
          {tesis.director && (
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Dirección:</span> {tesis.director}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 border-t border-border pt-4">
        {disponible ? (
          <ButtonLink
            href={tesis.linkDrive}
            variant="outline"
            size="sm"
            externo
            className="w-full"
          >
            <ExternalLink className="h-4 w-4" />
            Ver o descargar
          </ButtonLink>
        ) : (
          <EstadoEnProceso />
        )}
      </div>
    </div>
  );
}
