import { useMemo, useState } from "react";
import { BookOpen, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { TesisCard } from "@/components/cards/TesisCard";
import type { Tesis } from "@/data/tesis";

interface Generacion {
  id: string;
  label: string;
}

interface TesisFiltroProps {
  generaciones: Generacion[];
  tesis: Tesis[];
}

export default function TesisFiltro({ generaciones, tesis }: TesisFiltroProps) {
  const [generacionActiva, setGeneracionActiva] = useState(generaciones[0]?.id ?? "");

  const tesisActuales = useMemo(
    () => tesis.filter((item) => item.generacion === generacionActiva),
    [tesis, generacionActiva],
  );

  return (
    <>
      <div
        className="mb-10 flex flex-wrap justify-center gap-3"
        role="group"
        aria-label="Filtrar tesis por generación"
      >
        {generaciones.map((gen) => (
          <button
            key={gen.id}
            type="button"
            aria-pressed={generacionActiva === gen.id}
            onClick={() => setGeneracionActiva(gen.id)}
            className={cn(
              "rounded-xl px-5 py-2.5 font-medium transition-all",
              generacionActiva === gen.id
                ? "bg-primary text-primary-foreground shadow-md"
                : "border border-border bg-card text-foreground hover:bg-muted",
            )}
          >
            Generación {gen.label}
          </button>
        ))}
      </div>

      {tesisActuales.length > 0 ? (
        <ul className="grid auto-rows-fr gap-6 md:grid-cols-2">
          {tesisActuales.map((item) => (
            <li key={item.id} className="h-full">
              <TesisCard tesis={item} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-16">
          <div className="p-4 bg-muted rounded-full w-fit mx-auto mb-4">
            <Clock className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="font-display text-xl font-semibold text-foreground mb-2">Próximamente</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Los trabajos de tesis de esta generación estarán disponibles una vez que los estudiantes concluyan su proceso de titulación.
          </p>
        </div>
      )}

      <div className="mt-12 bg-primary/5 rounded-2xl p-8">
        <div className="flex items-start gap-4">
          <BookOpen className="h-8 w-8 text-primary flex-shrink-0" />
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">Sobre el Repositorio</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Este repositorio contiene los trabajos de tesis de los egresados de la Maestría en Dirección de Organizaciones. Los documentos están disponibles en formato PDF a través de Google Drive. Para citar estos trabajos, consulta los lineamientos APA vigentes.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
