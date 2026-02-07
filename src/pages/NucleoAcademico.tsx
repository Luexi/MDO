import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProfesorCard } from "@/components/cards/ProfesorCard";
import { profesores } from "@/data/profesores";

export default function NucleoAcademico() {
  return (
    <Layout>
      <PageHeader
        title="Núcleo Académico"
        subtitle="Conoce al cuerpo docente de excelencia que conforma nuestra maestría"
        badge="Claustro Docente"
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {profesores.map((profesor) => (
              <ProfesorCard key={profesor.id} profesor={profesor} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
