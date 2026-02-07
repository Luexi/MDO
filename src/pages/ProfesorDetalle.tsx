import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { getProfesorBySlug } from "@/data/profesores";
import { ArrowLeft, Mail, User, BookOpen, GraduationCap, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProfesorDetalle() {
  const { slug } = useParams<{ slug: string }>();
  const profesor = slug ? getProfesorBySlug(slug) : undefined;

  if (!profesor) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-3xl font-bold text-foreground mb-4">
              Profesor no encontrado
            </h1>
            <Link to="/nucleo-academico">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Volver al Núcleo Académico
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <section className="relative py-16 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 bg-spotlight" />
        <div className="relative max-w-6xl mx-auto px-4">
          <Link
            to="/nucleo-academico"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al Núcleo Académico
          </Link>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Photo */}
            <div className="w-48 h-56 rounded-2xl overflow-hidden bg-muted flex-shrink-0 shadow-lg">
              {profesor.foto ? (
                <img
                  src={profesor.foto}
                  alt={profesor.nombreCompleto}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                  <User className="h-20 w-20 text-muted-foreground/50" />
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              <span className="text-accent font-medium">{profesor.grado}</span>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-1 mb-2">
                {profesor.nombre}
              </h1>
              {profesor.area && (
                <p className="text-lg text-muted-foreground mb-4">{profesor.area}</p>
              )}
              {profesor.linea && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-lg text-sm text-primary">
                  <BookOpen className="h-4 w-4" />
                  {profesor.linea}
                </div>
              )}
              {profesor.email && (
                <div className="mt-4">
                  <a
                    href={`mailto:${profesor.email}`}
                    className="inline-flex items-center gap-2 text-accent hover:underline"
                  >
                    <Mail className="h-4 w-4" />
                    {profesor.email}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          {/* Semblanza */}
          <div className="bg-card rounded-2xl p-6 border border-border">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Semblanza
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {profesor.semblanza || "Información próximamente disponible."}
            </p>
          </div>

          {/* Historial Académico */}
          <div className="bg-card rounded-2xl p-6 border border-border">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              Historial Académico
            </h2>
            {profesor.historialAcademico && profesor.historialAcademico.length > 0 ? (
              <ul className="space-y-3">
                {profesor.historialAcademico.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">Información próximamente disponible.</p>
            )}
          </div>

          {/* Publicaciones */}
          <div className="bg-card rounded-2xl p-6 border border-border">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Publicaciones Recientes
            </h2>
            {profesor.publicaciones && profesor.publicaciones.length > 0 ? (
              <div className="space-y-4">
                {profesor.publicaciones.map((pub, index) => (
                  <div
                    key={index}
                    className="p-4 bg-muted/50 rounded-xl"
                  >
                    <p className="font-medium text-foreground">{pub.titulo}</p>
                    <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                      <span>{pub.año}</span>
                      <span className="px-2 py-0.5 bg-accent/10 text-accent rounded text-xs">
                        {pub.tipo}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">Información próximamente disponible.</p>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
