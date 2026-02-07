import type { Profesor } from "@/data/profesores";
import { User } from "lucide-react";

interface ProfesorCardProps {
  profesor: Profesor;
}

export function ProfesorCard({ profesor }: ProfesorCardProps) {
  return (
    <a
      href={`/profesores/${profesor.slug}`}
      className="group block bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-border"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        {profesor.foto ? (
          <img
            src={profesor.foto}
            alt={profesor.nombreCompleto}
            className="w-full h-full object-cover transition-all duration-500 group-hover:grayscale group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
            <User className="h-24 w-24 text-muted-foreground/50 transition-all duration-500 group-hover:grayscale" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-4">
        <h3 className="font-display text-lg font-semibold text-foreground leading-tight">
          {profesor.grado} {profesor.nombre}
        </h3>
      </div>
    </a>
  );
}

