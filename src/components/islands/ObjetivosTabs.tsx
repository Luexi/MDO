import { CheckCircle, GraduationCap, UserCheck } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ObjetivosTabsProps {
  perfilIngreso: string[];
  perfilEgreso: string[];
}

export default function ObjetivosTabs({ perfilIngreso, perfilEgreso }: ObjetivosTabsProps) {
  return (
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
            Podran ingresar al programa egresadas y egresados de licenciaturas afines con las siguientes competencias deseables:
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
          <h3 className="font-display text-xl font-semibold text-foreground mb-4">Competencias del Egresado</h3>
          <p className="text-muted-foreground mb-6">
            El egresado de la MDO sera un profesional altamente capacitado para liderar, innovar y transformar organizaciones de cualquier sector, contribuyendo al desarrollo sostenible y al bienestar social. Sera capaz de:
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
  );
}
