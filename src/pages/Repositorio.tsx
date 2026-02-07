import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/PageHeader";
import { DocumentoCard } from "@/components/cards/DocumentoCard";
import { documentos } from "@/data/documentos";
import { FolderOpen } from "lucide-react";

export default function Repositorio() {
  const categorias = [...new Set(documentos.map(d => d.categoria))];

  return (
    <Layout>
      <PageHeader
        title="Repositorio de Documentos"
        subtitle="Accede a los documentos oficiales, formatos y recursos del programa"
        badge="Documentos"
      />

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          {categorias.map((categoria) => (
            <div key={categoria} className="mb-12 last:mb-0">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <FolderOpen className="h-6 w-6 text-primary" />
                {categoria}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {documentos
                  .filter((d) => d.categoria === categoria)
                  .map((documento) => (
                    <DocumentoCard key={documento.id} documento={documento} />
                  ))}
              </div>
            </div>
          ))}

          {/* Note */}
          <div className="mt-12 p-6 bg-muted/50 rounded-2xl border border-border">
            <p className="text-sm text-muted-foreground text-center">
              <strong>Nota:</strong> Todos los documentos se abren en Google Drive. Para descargar, haz clic en el ícono de descarga dentro de Drive.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
