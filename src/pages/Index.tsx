import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GraduationCap, Users, Lightbulb, ArrowRight, BookOpen, Award } from "lucide-react";

const beneficios = [
  {
    icon: GraduationCap,
    titulo: "Academia Rigurosa",
    descripcion: "Programa con reconocimiento de calidad, impartido por doctores con experiencia en investigación y consultoría."
  },
  {
    icon: Users,
    titulo: "Networking Estratégico",
    descripcion: "Conecta con profesionales, empresarios y líderes del sector público y privado en la región."
  },
  {
    icon: Lightbulb,
    titulo: "Innovación Aplicada",
    descripcion: "Desarrolla competencias para implementar modelos de gestión innovadores con impacto social."
  }
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 bg-spotlight" />
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-destructive/5 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 py-20 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm rounded-full border border-border shadow-sm mb-8 animate-fade-in">
            <Award className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Programa Acreditado de Calidad</span>
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Maestría en{" "}
            <span className="text-gradient">Dirección</span>
            <br />
            de Organizaciones
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Forma parte de la élite directiva. Desarrolla competencias para liderar, innovar y transformar organizaciones con impacto social en la región.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <a
              href="https://drive.google.com/file/d/PLACEHOLDER_PLAN_ESTUDIOS"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="gap-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg">
                <BookOpen className="h-5 w-5" />
                Plan de Estudios
              </Button>
            </a>
            <Link to="/convocatoria">
              <Button size="lg" variant="outline" className="gap-2 rounded-xl bg-destructive hover:bg-destructive/90 text-destructive-foreground border-destructive px-8 py-6 text-lg">
                Convocatoria 2026
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Logos */}
          <div className="mt-16 flex justify-center items-center gap-8 opacity-60 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <img src="/assets/logos/logo-uagro.png" alt="UAGro" className="h-16 md:h-20 w-auto" />
            <img src="/assets/logos/logo-mdo.png" alt="MDO" className="h-16 md:h-20 w-auto" />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-card">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              ¿Por qué elegir la MDO?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Un programa diseñado para formar líderes con visión estratégica y compromiso social.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {beneficios.map((beneficio, index) => (
              <div
                key={index}
                className="bg-background rounded-2xl p-8 shadow-sm border border-border hover:shadow-md transition-all group"
              >
                <div className="p-4 bg-primary/10 rounded-xl w-fit mb-6 group-hover:bg-primary transition-colors">
                  <beneficio.icon className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {beneficio.titulo}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {beneficio.descripcion}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Objetivos */}
            <Link
              to="/objetivos"
              className="group relative overflow-hidden rounded-2xl bg-primary p-8 text-primary-foreground hover:shadow-xl transition-all"
            >
              <div className="relative z-10">
                <h3 className="font-display text-2xl font-semibold mb-3">
                  Conoce los Objetivos
                </h3>
                <p className="text-primary-foreground/80 mb-4">
                  Descubre el perfil de ingreso, egreso y las metas del programa.
                </p>
                <span className="inline-flex items-center gap-2 font-medium group-hover:gap-3 transition-all">
                  Explorar <ArrowRight className="h-4 w-4" />
                </span>
              </div>
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full" />
            </Link>

            {/* Núcleo Académico */}
            <Link
              to="/nucleo-academico"
              className="group relative overflow-hidden rounded-2xl bg-accent p-8 text-accent-foreground hover:shadow-xl transition-all"
            >
              <div className="relative z-10">
                <h3 className="font-display text-2xl font-semibold mb-3">
                  Núcleo Académico
                </h3>
                <p className="text-accent-foreground/80 mb-4">
                  Conoce a los doctores e investigadores que conforman nuestro claustro.
                </p>
                <span className="inline-flex items-center gap-2 font-medium group-hover:gap-3 transition-all">
                  Ver profesores <ArrowRight className="h-4 w-4" />
                </span>
              </div>
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
