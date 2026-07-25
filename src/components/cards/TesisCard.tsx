import { Clock, ExternalLink, FileText } from "lucide-react";
import type { Tesis } from "@/data/tesis";
import { Button } from "@/components/ui/button";

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
          <a
            href={tesis.linkDrive}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button
              variant="outline"
              size="sm"
              className="w-full gap-2 rounded-xl"
            >
              <ExternalLink className="h-4 w-4" />
              Ver o descargar
              <span className="sr-only">, se abre en una pestaña nueva</span>
            </Button>
          </a>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="w-full gap-2 rounded-xl"
            disabled
          >
            <Clock className="h-4 w-4" />
            En proceso
          </Button>
        )}
      </div>
    </div>
  );
}
