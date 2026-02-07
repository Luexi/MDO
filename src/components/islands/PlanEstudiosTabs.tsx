import { BookMarked, CheckCircle, Layers3, Table2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { PlanAreaItem, PlanOptativa, PlanSemestre } from "@/data/planEstudios";

interface PlanEstudiosTabsProps {
  areas: PlanAreaItem[];
  semestres: PlanSemestre[];
  optativas: PlanOptativa[];
}

export default function PlanEstudiosTabs({ areas, semestres, optativas }: PlanEstudiosTabsProps) {
  return (
    <div className="mb-12">
      <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 bg-primary/10 rounded-xl">
            <BookMarked className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground mb-2">Plan de Estudios</h2>
            <p className="text-muted-foreground">
              Estructura curricular por area de formacion y organizacion por semestre.
            </p>
          </div>
        </div>

        <Tabs defaultValue="area" className="w-full">
          <TabsList className="w-full grid grid-cols-2 h-auto p-1 bg-muted rounded-xl">
            <TabsTrigger
              value="area"
              className="rounded-lg py-3 px-4 data-[state=active]:bg-card data-[state=active]:shadow-sm font-medium"
            >
              <Layers3 className="h-4 w-4 mr-2" />
              Area de formacion
            </TabsTrigger>
            <TabsTrigger
              value="semestre"
              className="rounded-lg py-3 px-4 data-[state=active]:bg-card data-[state=active]:shadow-sm font-medium"
            >
              <Table2 className="h-4 w-4 mr-2" />
              Semestre
            </TabsTrigger>
          </TabsList>

          <TabsContent value="area" className="mt-6">
            <div className="grid gap-4 md:grid-cols-3">
              {areas.map((area) => (
                <article key={area.area} className="rounded-xl border border-border bg-background p-5">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-4">{area.area}</h3>
                  <ul className="space-y-2.5">
                    {area.unidades.map((unidad) => (
                      <li key={unidad} className="flex items-start gap-2.5">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-foreground/90">{unidad}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="semestre" className="mt-6 space-y-5">
            {semestres.map((semestre) => (
              <section key={semestre.semestre} className="rounded-xl border border-border bg-background p-4 sm:p-5">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <h3 className="font-display text-lg font-semibold text-foreground mr-1">Semestre {semestre.semestre}</h3>
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                    TH: {semestre.totalTh}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">
                    Creditos: {semestre.totalCred}
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-[560px] w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-muted-foreground">
                        <th className="text-left py-2 pr-3 font-medium">Unidad de aprendizaje</th>
                        <th className="text-right py-2 px-3 font-medium">TH</th>
                        <th className="text-right py-2 pl-3 font-medium">Total/Cred</th>
                      </tr>
                    </thead>
                    <tbody>
                      {semestre.rows.map((row) => (
                        <tr key={`${semestre.semestre}-${row.unidad}`} className="border-b border-border/70 last:border-b-0">
                          <td className="py-2.5 pr-3 text-foreground/90">{row.unidad}</td>
                          <td className="py-2.5 px-3 text-right text-foreground/90">{row.th}</td>
                          <td className="py-2.5 pl-3 text-right text-foreground/90">{row.totalCred}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t border-border">
                        <td className="pt-3 pr-3 font-semibold text-foreground">Total semestre</td>
                        <td className="pt-3 px-3 text-right font-semibold text-foreground">{semestre.totalTh}</td>
                        <td className="pt-3 pl-3 text-right font-semibold text-foreground">{semestre.totalCred}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </section>
            ))}

            <section className="rounded-xl border border-border bg-background p-4 sm:p-5">
              <h3 className="font-display text-lg font-semibold text-foreground mb-3">Lista de Unidades de Aprendizaje Optativas</h3>
              <div className="overflow-x-auto">
                <table className="min-w-[560px] w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground">
                      <th className="text-left py-2 pr-3 font-medium">Unidad de aprendizaje</th>
                      <th className="text-right py-2 px-3 font-medium">TH</th>
                      <th className="text-right py-2 pl-3 font-medium">Total/Cred</th>
                    </tr>
                  </thead>
                  <tbody>
                    {optativas.map((optativa) => (
                      <tr key={optativa.unidad} className="border-b border-border/70 last:border-b-0">
                        <td className="py-2.5 pr-3 text-foreground/90">{optativa.unidad}</td>
                        <td className="py-2.5 px-3 text-right text-foreground/90">{optativa.th}</td>
                        <td className="py-2.5 pl-3 text-right text-foreground/90">{optativa.totalCred}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
