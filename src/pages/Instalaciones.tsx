import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/PageHeader";
import { InstalacionCard } from "@/components/cards/InstalacionCard";
import { instalaciones } from "@/data/instalaciones";
import { Building } from "lucide-react";

export default function Instalaciones() {
  return (
    <Layout>
      <PageHeader
        title="Instalaciones"
        subtitle="Conoce la infraestructura física y tecnológica disponible para nuestros estudiantes"
        badge="Infraestructura"
      />

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          {/* Intro */}
          <div className="bg-card rounded-2xl p-8 shadow-sm border border-border mb-12">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Building className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                  Facultad de Contaduría y Administración
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  El programa de Maestría en Dirección de Organizaciones dispone de la infraestructura física y tecnológica de la Facultad de Contaduría y Administración de la Universidad Autónoma de Guerrero. Nuestras instalaciones están equipadas con tecnología de punta para garantizar una experiencia educativa de calidad, incluyendo aulas multimedia, laboratorios de cómputo, bibliotecas especializadas y espacios de convivencia.
                </p>
              </div>
            </div>
          </div>

          {/* Grid de instalaciones */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {instalaciones.map((instalacion) => (
              <InstalacionCard key={instalacion.id} instalacion={instalacion} />
            ))}
          </div>

          {/* Servicios adicionales */}
          <div className="mt-12 bg-muted/50 rounded-2xl p-8">
            <h3 className="font-display text-lg font-semibold text-foreground mb-4 text-center">
              Servicios Adicionales
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-card rounded-xl border border-border">
                <p className="font-medium text-foreground">WiFi de Alta Velocidad</p>
                <p className="text-sm text-muted-foreground">En todo el campus</p>
              </div>
              <div className="p-4 bg-card rounded-xl border border-border">
                <p className="font-medium text-foreground">Estacionamiento</p>
                <p className="text-sm text-muted-foreground">Amplio y seguro</p>
              </div>
              <div className="p-4 bg-card rounded-xl border border-border">
                <p className="font-medium text-foreground">Accesibilidad</p>
                <p className="text-sm text-muted-foreground">Rampas y elevadores</p>
              </div>
              <div className="p-4 bg-card rounded-xl border border-border">
                <p className="font-medium text-foreground">Seguridad 24/7</p>
                <p className="text-sm text-muted-foreground">Vigilancia permanente</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
