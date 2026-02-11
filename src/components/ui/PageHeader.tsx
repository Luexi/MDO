import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  children?: ReactNode;
  className?: string;
}

export function PageHeader({ title, subtitle, badge, children, className }: PageHeaderProps) {
  return (
    <section className={cn("relative py-16 md:py-24 overflow-hidden", className)}>
      {/* Background with spotlight effect */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 bg-spotlight" />
      
      <div className="relative max-w-7xl mx-auto px-4 text-center">
        {badge && (
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            {badge}
          </span>
        )}
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}

