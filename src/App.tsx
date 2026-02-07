import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Objetivos from "./pages/Objetivos";
import NucleoAcademico from "./pages/NucleoAcademico";
import ProfesorDetalle from "./pages/ProfesorDetalle";
import LIES from "./pages/LIES";
import Repositorio from "./pages/Repositorio";
import Tesis from "./pages/Tesis";
import Instalaciones from "./pages/Instalaciones";
import Galeria from "./pages/Galeria";
import Vinculacion from "./pages/Vinculacion";
import Convocatoria from "./pages/Convocatoria";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/objetivos" element={<Objetivos />} />
          <Route path="/nucleo-academico" element={<NucleoAcademico />} />
          <Route path="/profesores/:slug" element={<ProfesorDetalle />} />
          <Route path="/lies" element={<LIES />} />
          <Route path="/repositorio" element={<Repositorio />} />
          <Route path="/tesis" element={<Tesis />} />
          <Route path="/instalaciones" element={<Instalaciones />} />
          <Route path="/galeria" element={<Galeria />} />
          <Route path="/vinculacion" element={<Vinculacion />} />
          <Route path="/convocatoria" element={<Convocatoria />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
