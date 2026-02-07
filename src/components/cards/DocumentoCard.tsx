import { Documento } from "@/data/documentos";
import { FileText, BookOpen, FileCheck, FilePlus, FileSpreadsheet, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  return (
    <div className="bg-card rounded-2xl p-6 shadow-sm border border-border hover:shadow-md transition-all group">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
          <IconComponent className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1">
          <span className="text-xs font-medium text-accent uppercase tracking-wider">
            {documento.categoria}
          </span>
          <h3 className="font-display text-lg font-semibold text-foreground mt-1 mb-2">
            {documento.titulo}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {documento.descripcion}
          </p>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <a href={documento.linkDrive} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="sm" className="w-full gap-2 rounded-xl hover:bg-primary hover:text-primary-foreground transition-colors">
            <ExternalLink className="h-4 w-4" />
            Abrir en Google Drive
          </Button>
        </a>
      </div>
    </div>
  );
}
