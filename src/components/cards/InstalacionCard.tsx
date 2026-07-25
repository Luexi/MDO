import type { Instalacion } from "@/data/instalaciones";
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
    <div className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-4 flex items-center gap-4">
        <div className="rounded-xl bg-primary/10 p-3 transition-colors group-hover:bg-primary">
          <IconComponent className="h-6 w-6 text-primary transition-colors group-hover:text-primary-foreground" />
        </div>
        <div className="flex-1">
          <h3 className="font-display text-xl font-semibold text-foreground">
            {instalacion.nombre}
          </h3>
        </div>
        <div className="text-right">
          <span className="text-3xl font-bold text-primary">
            {instalacion.cantidad}
          </span>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {instalacion.descripcion}
      </p>
    </div>
  );
}
