import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Objetivos", href: "/objetivos" },
  { label: "Nucleo Academico", href: "/nucleo-academico" },
  { label: "LIES", href: "/lies" },
  { label: "Repositorio", href: "/repositorio" },
  { label: "Tesis", href: "/tesis" },
  { label: "Instalaciones", href: "/instalaciones" },
  { label: "Galeria", href: "/galeria" },
  { label: "Vinculacion", href: "/vinculacion" },
];

interface NavbarProps {
  currentPath: string;
}

const isActive = (href: string, currentPath: string) => {
  if (href === "/") return currentPath === "/";
  return currentPath === href;
};

export default function Navbar({ currentPath }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
      <nav className="bg-card/90 backdrop-blur-md rounded-2xl shadow-lg border border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <img src="/assets/logos/logo-uagro.png" alt="UAGro" className="h-10 w-auto" />
            <img
              src="/assets/logos/logo-mdo.png"
              alt="Logo Maestria MDO"
              className="h-12 w-auto hidden sm:block"
            />
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive(item.href, currentPath)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/80 hover:text-foreground hover:bg-muted",
                )}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a href="/convocatoria" className="hidden sm:block">
              <Button className="bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-xl font-semibold">
                Convocatoria
              </Button>
            </a>

            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle menu"
              type="button"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-border">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                    isActive(item.href, currentPath)
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground/80 hover:text-foreground hover:bg-muted",
                  )}
                >
                  {item.label}
                </a>
              ))}
              <a href="/convocatoria" onClick={() => setIsOpen(false)} className="mt-2">
                <Button className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-xl font-semibold">
                  Convocatoria 2026
                </Button>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
