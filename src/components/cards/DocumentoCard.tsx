import {
  BookOpen,
  ExternalLink,
  FileCheck,
  FilePlus,
  FileSpreadsheet,
  FileText,
} from "lucide-react";
import type { Documento } from "@/data/documentos";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { EstadoEnProceso } from "@/components/ui/EstadoEnProceso";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText,
  BookOpen,
  FileCheck,
  FilePlus,
  FileSpreadsheet,
};

interface DocumentoCardProps {
  documento: Documento;
}

export function DocumentoCard({ documento }: DocumentoCardProps) {
  const IconComponent = iconMap[documento.icono] || FileText;
  const disponible = Boolean(documento.linkDrive);

  return (
    // `h-full` y `flex-col` hacen que la tarjeta ocupe toda la celda del grid, y
    // `mt-auto` ancla el boton al fondo de la TARJETA y no al final del texto.
    // Sin esto, los botones de una misma fila aterrizaban a alturas distintas
    // en cuanto las descripciones diferian en numero de lineas.
    <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex flex-1 items-start gap-4">
        <div className="flex-shrink-0 rounded-xl bg-primary/10 p-3">
          <IconComponent className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1">
          {/*
           * La categoria ya la anuncia el <h2> del grupo que contiene esta
           * tarjeta, asi que repetirla aqui en versalitas duplicaba el mismo
           * texto seis veces en la pagina.
           */}
          <h3 className="font-display text-lg font-semibold text-foreground">
            {documento.titulo}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {documento.descripcion}
          </p>
        </div>
      </div>

      <div className="mt-4 border-t border-border pt-4">
        {disponible ? (
          <ButtonLink
            href={documento.linkDrive}
            variant="outline"
            size="sm"
            externo
            className="w-full hover:bg-primary hover:text-primary-foreground"
          >
            <ExternalLink className="h-4 w-4" />
            Abrir en Google Drive
          </ButtonLink>
        ) : (
          <EstadoEnProceso />
        )}
      </div>
    </div>
  );
}
