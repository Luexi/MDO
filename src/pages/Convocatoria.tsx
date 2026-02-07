import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, UserPlus, Mail, Phone, Clock, CheckCircle, AlertCircle } from "lucide-react";

const fechasClave = [
  {
    fecha: "Enero - Marzo 2026",
    evento: "Publicación de Convocatoria y Registro de Aspirantes",
    descripcion: "Apertura del proceso de admisión y recepción de documentos.",
    activo: true
  },
  {
    fecha: "Abril 2026",
    evento: "Examen EXANI-III (CENEVAL)",
    descripcion: "Aplicación del examen de admisión nacional.",
    activo: false
  },
  {
    fecha: "Mayo 2026",
    evento: "Publicación de Resultados",
    descripcion: "Difusión de la lista de aspirantes aceptados.",
    activo: false
  },
  {
    fecha: "Agosto 2026",
    evento: "Inicio de Cursos",
    descripcion: "Bienvenida e inicio del primer semestre.",
    activo: false
  }
];

const requisitos = [
  "Título de licenciatura en áreas afines (original y copia)",
  "Certificado de calificaciones con promedio mínimo de 8.0",
  "Acta de nacimiento (original y copia)",
  "CURP ampliada",
  "Carta de exposición de motivos",
  "Currículum vitae actualizado",
  "2 cartas de recomendación académica",
  "Fotografías tamaño infantil (4 a color)",
  "Comprobante de pago de derechos"
];

export default function Convocatoria() {
  return (
    <Layout>
      <PageHeader
        title="Convocatoria 2026"
        subtitle="Únete a la próxima generación de líderes organizacionales"
        badge="Admisión Abierta"
      />

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          {/* CTAs principales */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="https://drive.google.com/file/d/PLACEHOLDER_CONVOCATORIA"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="gap-2 rounded-xl px-8 py-6 text-lg">
                <FileText className="h-5 w-5" />
                Descargar Convocatoria PDF
              </Button>
            </a>
            <a
              href="https://forms.google.com/PLACEHOLDER_PREREGISTRO"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline" className="gap-2 rounded-xl px-8 py-6 text-lg border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                <UserPlus className="h-5 w-5" />
                Iniciar Pre-Registro
              </Button>
            </a>
          </div>

          {/* Timeline de fechas */}
          <div className="bg-card rounded-2xl p-8 shadow-sm border border-border mb-12">
            <h2 className="font-display text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
              <Calendar className="h-6 w-6 text-primary" />
              Fechas Importantes
            </h2>
            <div className="space-y-0">
              {fechasClave.map((item, index) => (
                <div key={index} className="relative pl-8 pb-8 last:pb-0">
                  {/* Línea vertical */}
                  {index !== fechasClave.length - 1 && (
                    <div className="absolute left-[11px] top-6 w-0.5 h-full bg-border" />
                  )}
                  {/* Punto */}
                  <div className={`absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center ${
                    item.activo ? 'bg-primary' : 'bg-muted border-2 border-border'
                  }`}>
                    {item.activo && <Clock className="h-3 w-3 text-primary-foreground" />}
                  </div>
                  {/* Contenido */}
                  <div className="ml-4">
                    <span className={`text-sm font-medium ${item.activo ? 'text-primary' : 'text-muted-foreground'}`}>
                      {item.fecha}
                    </span>
                    <h3 className="font-semibold text-foreground mt-1">{item.evento}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{item.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Requisitos */}
          <div className="bg-card rounded-2xl p-8 shadow-sm border border-border mb-12">
            <h2 className="font-display text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-primary" />
              Requisitos de Admisión
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {requisitos.map((req, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-xl">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground/90">{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Nota importante */}
          <div className="bg-destructive/10 rounded-2xl p-6 mb-12 border border-destructive/20">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-6 w-6 text-destructive flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">Importante: Becas Disponibles</h3>
                <p className="text-sm text-muted-foreground">
                  El programa cuenta con apoyo de becas CONAHCyT para estudiantes que cumplan con los requisitos establecidos. Consulta los lineamientos de becas en la convocatoria oficial.
                </p>
              </div>
            </div>
          </div>

          {/* Contacto */}
          <div className="bg-primary text-primary-foreground rounded-2xl p-8">
            <h2 className="font-display text-2xl font-semibold mb-6 text-center">
              ¿Tienes dudas? Contáctanos
            </h2>
            <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <a
                href="mailto:mdo@uagro.mx"
                className="flex items-center gap-4 p-4 bg-primary-foreground/10 rounded-xl hover:bg-primary-foreground/20 transition-colors"
              >
                <Mail className="h-6 w-6" />
                <div>
                  <p className="font-medium">Correo electrónico</p>
                  <p className="text-sm text-primary-foreground/80">mdo@uagro.mx</p>
                </div>
              </a>
              <a
                href="tel:+527474725678"
                className="flex items-center gap-4 p-4 bg-primary-foreground/10 rounded-xl hover:bg-primary-foreground/20 transition-colors"
              >
                <Phone className="h-6 w-6" />
                <div>
                  <p className="font-medium">Teléfono</p>
                  <p className="text-sm text-primary-foreground/80">(747) 472-5678</p>
                </div>
              </a>
            </div>
            <p className="text-center text-primary-foreground/60 text-sm mt-6">
              Horario de atención: Lunes a Viernes de 9:00 a 17:00 hrs
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
