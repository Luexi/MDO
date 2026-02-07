import { Instalacion } from "@/data/instalaciones";
import { Building2, Monitor, Users, Presentation, Video, Library, Coffee, Bath, Trees } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2,
  Monitor,
  Users,
  Presentation,
  Video,
  Library,
  Coffee,
  Bath,
  Trees,
};

interface InstalacionCardProps {
  instalacion: Instalacion;
}

export function InstalacionCard({ instalacion }: InstalacionCardProps) {
  const IconComponent = iconMap[instalacion.icono] || Building2;

  return (
    <div className="bg-card rounded-2xl p-6 shadow-sm border border-border hover:shadow-md transition-all group">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          <IconComponent className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
        </div>
        <div className="flex-1">
          <h3 className="font-display text-xl font-semibold text-foreground">
            {instalacion.nombre}
          </h3>
        </div>
        <div className="text-right">
          <span className="text-3xl font-bold text-primary">{instalacion.cantidad}</span>
        </div>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {instalacion.descripcion}
      </p>
    </div>
  );
}
