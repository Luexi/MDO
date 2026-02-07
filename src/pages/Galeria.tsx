import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/PageHeader";
import { ImageCarousel } from "@/components/ui/ImageCarousel";
import { imagenesGaleria } from "@/data/galeria";
import { Camera } from "lucide-react";

export default function Galeria() {
  return (
    <Layout>
      <PageHeader
        title="Galería"
        subtitle="Momentos destacados de nuestra comunidad académica"
        badge="Memorias MDO"
      />

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          {/* Carrusel principal */}
          <ImageCarousel
            items={imagenesGaleria}
            autoPlay={true}
            interval={5000}
            className="shadow-xl"
          />

          {/* Info */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full text-sm text-muted-foreground">
              <Camera className="h-4 w-4" />
              <span>Desliza o usa las flechas para ver más imágenes</span>
            </div>
          </div>

          {/* Thumbnails grid (opcional) */}
          <div className="mt-12">
            <h3 className="font-display text-xl font-semibold text-foreground mb-6 text-center">
              Todas las Imágenes
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {imagenesGaleria.map((imagen) => (
                <div
                  key={imagen.id}
                  className="aspect-square rounded-xl overflow-hidden bg-muted group cursor-pointer"
                >
                  <img
                    src={imagen.src}
                    alt={imagen.alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Placeholder note */}
          <div className="mt-12 p-6 bg-muted/50 rounded-2xl border border-border text-center">
            <p className="text-sm text-muted-foreground">
              <strong>Nota:</strong> Esta galería se actualiza periódicamente con imágenes de eventos, graduaciones y actividades del programa.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
