import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/PageHeader";
import { institucionesConvenio, mecanismosVinculacion } from "@/data/vinculacion";
import { Handshake, Building2, GraduationCap, Briefcase, Globe, ArrowRight } from "lucide-react";

const iconMap = {
  universidad: GraduationCap,
  gobierno: Building2,
  empresa: Briefcase,
  organismo: Globe,
};

export default function Vinculacion() {
  return (
    <Layout>
      <PageHeader
        title="Vinculación"
        subtitle="Conoce nuestros mecanismos de vinculación y convenios con instituciones nacionales e internacionales"
        badge="Colaboración"
      />

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          {/* Intro */}
          <div className="bg-card rounded-2xl p-8 shadow-sm border border-border mb-12">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Handshake className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                  Vinculación Institucional
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  La Maestría en Dirección de Organizaciones mantiene vínculos activos con instituciones educativas, organismos gubernamentales y empresas a nivel nacional e internacional. Estos convenios permiten el intercambio académico, la investigación conjunta, estancias profesionales y la realización de proyectos de colaboración que enriquecen la formación de nuestros estudiantes.
                </p>
              </div>
            </div>
          </div>

          {/* Mecanismos de Vinculación */}
          <div className="mb-12">
            <h2 className="font-display text-2xl font-semibold text-foreground mb-6">
              Mecanismos de Vinculación
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mecanismosVinculacion.map((mecanismo, index) => (
                <div
                  key={index}
                  className="bg-card rounded-2xl p-6 border border-border hover:shadow-md transition-shadow group"
                >
                  <div className="flex items-center gap-2 text-primary mb-3">
                    <ArrowRight className="h-4 w-4" />
                    <h3 className="font-semibold">{mecanismo.titulo}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {mecanismo.descripcion}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Instituciones con Convenio */}
          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground mb-6">
              Instituciones con Convenio
            </h2>
            
            {/* Por tipo */}
            {(['universidad', 'gobierno', 'organismo'] as const).map((tipo) => {
              const instituciones = institucionesConvenio.filter((i) => i.tipo === tipo);
              if (instituciones.length === 0) return null;
              
              const IconComponent = iconMap[tipo];
              const tituloTipo = {
                universidad: 'Universidades',
                gobierno: 'Gobierno',
                empresa: 'Empresas',
                organismo: 'Organismos',
              }[tipo];

              return (
                <div key={tipo} className="mb-8 last:mb-0">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <IconComponent className="h-5 w-5 text-accent" />
                    {tituloTipo}
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {instituciones.map((inst) => (
                      <div
                        key={inst.id}
                        className="p-4 bg-muted/50 rounded-xl text-sm"
                      >
                        <p className="font-medium text-foreground">{inst.nombre}</p>
                        {inst.pais && (
                          <p className="text-xs text-muted-foreground mt-1">{inst.pais}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Nota */}
            <div className="mt-8 p-4 bg-accent/10 rounded-xl text-center">
              <p className="text-sm text-accent">
                Esta lista representa una muestra de nuestros convenios activos. Para más información, contacta a la coordinación del programa.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
