import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/PageHeader";
import { Briefcase, TrendingUp, Target, Users } from "lucide-react";

const lineas = [
  {
    id: "1",
    titulo: "Gestión y Desarrollo Empresarial",
    descripcion: "Línea de investigación enfocada en el estudio y mejora de los procesos de gestión en organizaciones empresariales, incluyendo estrategias de crecimiento, innovación, competitividad y sustentabilidad.",
    areas: [
      "Estrategia empresarial y competitividad",
      "Innovación y emprendimiento",
      "Finanzas corporativas",
      "Mercadotecnia estratégica",
      "Gestión del talento humano"
    ],
    icon: Briefcase
  },
  {
    id: "2",
    titulo: "Procesos de Gestión y Calidad en Organizaciones",
    descripcion: "Línea orientada al análisis y optimización de los procesos organizacionales, sistemas de calidad, transformación digital y mejora continua en organizaciones del sector público, privado y social.",
    areas: [
      "Sistemas de gestión de calidad",
      "Transformación digital",
      "Administración pública",
      "Gestión del conocimiento",
      "Auditoría y control interno"
    ],
    icon: TrendingUp
  }
];

export default function LIES() {
  return (
    <Layout>
      <PageHeader
        title="Líneas de Investigación"
        subtitle="Conoce las líneas de generación y aplicación del conocimiento de nuestro programa"
        badge="LIES"
      />

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="space-y-8">
            {lineas.map((linea) => (
              <div
                key={linea.id}
                className="bg-card rounded-2xl p-8 shadow-sm border border-border hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-6">
                  <div className="p-4 bg-primary/10 rounded-xl flex-shrink-0">
                    <linea.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-display text-2xl font-semibold text-foreground mb-3">
                      {linea.titulo}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {linea.descripcion}
                    </p>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <Target className="h-4 w-4 text-accent" />
                        Áreas de Estudio
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {linea.areas.map((area, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 bg-muted text-sm text-foreground/80 rounded-lg"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Info adicional */}
          <div className="mt-12 bg-primary/5 rounded-2xl p-8 text-center">
            <Users className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              ¿Interesado en investigar con nosotros?
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nuestro núcleo académico está conformado por investigadores activos que pueden guiar tu proyecto de tesis en estas líneas de investigación.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
