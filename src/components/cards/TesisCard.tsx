import type { Tesis } from "@/data/tesis";
import { FileText, ExternalLink, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TesisCardProps {
  tesis: Tesis;
}

export function TesisCard({ tesis }: TesisCardProps) {
  const hasLink = !!tesis.linkDrive;

  return (
    <div className="bg-card rounded-2xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 p-3 bg-primary/10 rounded-xl">
          <FileText className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded-lg">
              {tesis.generacion}
            </span>
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground mb-2 line-clamp-2">
            {tesis.titulo}
          </h3>
          <p className="text-sm text-muted-foreground mb-1">
            <span className="font-medium">Autor:</span> {tesis.autor}
          </p>
          {tesis.director && (
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Director:</span> {tesis.director}
            </p>
          )}
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        {hasLink ? (
          <a href={tesis.linkDrive} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="w-full gap-2 rounded-xl">
              <ExternalLink className="h-4 w-4" />
              Ver / Descargar
            </Button>
          </a>
        ) : (
          <Button variant="outline" size="sm" className="w-full gap-2 rounded-xl" disabled>
            <Clock className="h-4 w-4" />
            En proceso
          </Button>
        )}
      </div>
    </div>
  );
}

