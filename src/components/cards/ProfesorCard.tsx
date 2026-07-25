import { User } from "lucide-react";
import type { Profesor } from "@/data/profesores";
import { withBase } from "@/lib/paths";

interface ProfesorCardProps {
  profesor: Profesor;
}

export function ProfesorCard({ profesor }: ProfesorCardProps) {
  return (
    <a
      href={withBase(`/profesores/${profesor.slug}`)}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow duration-300 hover:shadow-lg"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        {profesor.foto ? (
          <img
            src={withBase(profesor.foto)}
            alt={`Retrato de ${profesor.nombreCompleto}`}
            /*
             * Dimensiones nominales en la proporcion 4:5 del contenedor. Las
             * fotos de origen tienen tamaños distintos entre si; lo que importa
             * aqui es que el navegador reserve el espacio antes de descargarlas.
             */
            width={400}
            height={500}
            loading="lazy"
            /*
             * Antes el hover aplicaba `grayscale`, de modo que la interaccion
             * QUITABA informacion y la tarjeta se leia como deshabilitada. Ahora
             * el hover acerca ligeramente la imagen, que es un gesto de
             * invitacion y no de desactivacion.
             */
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
            <User className="h-24 w-24 text-muted-foreground/50" aria-hidden="true" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-lg font-semibold leading-tight text-foreground">
          {profesor.grado} {profesor.nombre}
        </h3>
        {/*
         * La linea de investigacion ya existia en los datos y la tarjeta la
         * ignoraba: las dieciseis fichas se veian identicas salvo por la foto y
         * habia que abrir cada una para saber de que se ocupa cada quien.
         */}
        {profesor.linea && (
          <p className="mt-2 text-sm leading-snug text-muted-foreground">
            {profesor.linea}
          </p>
        )}
        <span className="mt-auto pt-3 text-sm font-medium text-accent group-hover:underline">
          Ver ficha completa
        </span>
      </div>
    </a>
  );
}
