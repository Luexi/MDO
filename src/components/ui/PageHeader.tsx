import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  /**
   * Micro-rotulo sobre el titulo. Usalo solo cuando aporte informacion que el
   * titulo no da. Antes se aplicaba en nueve de doce paginas con valores que
   * repetian el titulo ("Documentos" sobre "Repositorio de Documentos"), lo que
   * producia el mismo ritmo plantillado en todo el sitio.
   */
  badge?: string;
  children?: ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  badge,
  children,
  className,
}: PageHeaderProps) {
  return (
    // Relleno reducido respecto a `py-16 md:py-24`. Sumado al `pt-24` del
    // <main>, aquella cabecera empujaba el contenido util a unos 620 px del
    // borde superior: en /tesis el 70% de la primera pantalla era degradado
    // vacio con tres lineas de texto centradas, y se repetia igual en 8 paginas.
    <section className={cn("relative overflow-hidden py-10 md:py-14", className)}>
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 bg-spotlight" />

      <div className="relative mx-auto max-w-4xl px-4 text-center">
        {badge && (
          <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            {badge}
          </span>
        )}
        <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
