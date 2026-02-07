import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Target, UserCheck, GraduationCap } from "lucide-react";

const metas = [
  "Contribuir a la formación integral de profesionales en Dirección de Organizaciones capaces de generar soluciones innovadoras y sustentables.",
  "Fomentar la formación de profesionales con visión estratégica para la toma de decisiones en organizaciones públicas, privadas y del tercer sector.",
  "Promover en el estudiantado el aprendizaje en el área de administración, gestión y liderazgo organizacional.",
  "Lograr la satisfacción del estudiantado a través de formación integral que responda a las necesidades del entorno.",
  "Fomentar la vinculación de los estudios con el empleo y las necesidades reales de las organizaciones.",
  "Incentivar el desarrollo de conocimiento científico en el campo de Dirección de Organizaciones mediante investigación aplicada.",
  "Fortalecer la vinculación y movilidad de la MDO con universidades nacionales e internacionales."
];

const perfilIngreso = [
  "Egresadas/os de licenciaturas afines: Contaduría, Administración, Economía, Derecho, Ciencia Política, Tecnologías de la Información, entre otras.",
  "Comprensión lectora y habilidades de redacción académica.",
  "Pensamiento crítico y analítico.",
  "Capacidad de liderazgo y trabajo en equipo.",
  "Habilidades de análisis y síntesis de información.",
  "Iniciativa y proactividad.",
  "Ética profesional y sensibilidad social.",
  "Interés por la investigación y la mejora continua."
];

const perfilEgreso = [
  "Liderar procesos de cambio organizacional con visión estratégica.",
  "Diseñar, implementar y evaluar modelos de gestión innovadores.",
  "Tomar decisiones basadas en análisis riguroso y evidencia.",
  "Desarrollar proyectos de investigación aplicada en el campo de la dirección de organizaciones.",
  "Gestionar recursos humanos, financieros y tecnológicos de manera eficiente.",
  "Promover la responsabilidad social y el desarrollo sustentable en las organizaciones.",
  "Comunicar efectivamente ideas y propuestas a diversos públicos.",
  "Trabajar en equipos multidisciplinarios y multiculturales."
];

export default function Objetivos() {
  return (
    <Layout>
      <PageHeader
        title="Objetivos del Programa"
        subtitle="Formando líderes con capacidades directivas y de investigación de alto nivel"
        badge="MDO UAGro"
      />

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Objetivo General */}
          <div className="bg-card rounded-2xl p-8 shadow-sm border border-border mb-12">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                  Objetivo General
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Formar personas con capacidades directivas y de investigación de alto nivel, competentes en el diseño, implementación y evaluación de modelos de gestión e intervención que optimicen el desempeño de las organizaciones públicas, privadas o no lucrativas, orientando resultados hacia la creación sostenible con impacto social en la región.
                </p>
              </div>
            </div>
          </div>

          {/* Metas */}
          <div className="mb-12">
            <h2 className="font-display text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-primary" />
              Metas del Programa
            </h2>
            <div className="space-y-4">
              {metas.map((meta, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 bg-card rounded-xl p-4 border border-border"
                >
                  <span className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center font-semibold text-sm">
                    {index + 1}
                  </span>
                  <p className="text-foreground/90 leading-relaxed">{meta}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Perfiles (Tabs) */}
          <Tabs defaultValue="ingreso" className="w-full">
            <TabsList className="w-full grid grid-cols-2 h-auto p-1 bg-muted rounded-xl">
              <TabsTrigger
                value="ingreso"
                className="rounded-lg py-3 px-4 data-[state=active]:bg-card data-[state=active]:shadow-sm font-medium"
              >
                <UserCheck className="h-4 w-4 mr-2" />
                Perfil de Ingreso
              </TabsTrigger>
              <TabsTrigger
                value="egreso"
                className="rounded-lg py-3 px-4 data-[state=active]:bg-card data-[state=active]:shadow-sm font-medium"
              >
                <GraduationCap className="h-4 w-4 mr-2" />
                Perfil de Egreso
              </TabsTrigger>
            </TabsList>

            <TabsContent value="ingreso" className="mt-6">
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                  Requisitos y Competencias de Ingreso
                </h3>
                <p className="text-muted-foreground mb-6">
                  Podrán ingresar al programa egresadas y egresados de licenciaturas afines con las siguientes competencias deseables:
                </p>
                <ul className="space-y-3">
                  {perfilIngreso.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="egreso" className="mt-6">
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                  Competencias del Egresado
                </h3>
                <p className="text-muted-foreground mb-6">
                  El egresado de la MDO será un profesional altamente capacitado para liderar, innovar y transformar organizaciones de cualquier sector, contribuyendo al desarrollo sostenible y al bienestar social. Será capaz de:
                </p>
                <ul className="space-y-3">
                  {perfilEgreso.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
}
