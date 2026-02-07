import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Objetivos", href: "/objetivos" },
  { label: "Núcleo Académico", href: "/nucleo-academico" },
  { label: "LIES", href: "/lies" },
  { label: "Repositorio", href: "/repositorio" },
  { label: "Tesis", href: "/tesis" },
  { label: "Instalaciones", href: "/instalaciones" },
  { label: "Galería", href: "/galeria" },
  { label: "Vinculación", href: "/vinculacion" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
      <nav className="bg-card/90 backdrop-blur-md rounded-2xl shadow-lg border border-border px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="/assets/logos/logo-uagro.png" 
              alt="UAGro" 
              className="h-10 w-auto"
            />
            <div className="hidden sm:block">
              <span className="font-display text-lg font-bold text-primary">MDO</span>
              <span className="hidden md:inline text-sm text-muted-foreground ml-2">Maestría en Dirección de Organizaciones</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  location.pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/80 hover:text-foreground hover:bg-muted"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex items-center gap-2">
            <Link to="/convocatoria" className="hidden sm:block">
              <Button className="bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-xl font-semibold">
                Convocatoria
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-border">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                    location.pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground/80 hover:text-foreground hover:bg-muted"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/convocatoria"
                onClick={() => setIsOpen(false)}
                className="mt-2"
              >
                <Button className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-xl font-semibold">
                  Convocatoria 2026
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
