import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/assets/logos/logo-uagro.png" 
                alt="UAGro" 
                className="h-12 w-auto brightness-0 invert"
              />
              <img 
                src="/assets/logos/logo-mdo.png" 
                alt="MDO" 
                className="h-12 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Maestría en Dirección de Organizaciones. Formando líderes con visión estratégica para la transformación organizacional.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li><Link to="/objetivos" className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors">Objetivos del Programa</Link></li>
              <li><Link to="/nucleo-academico" className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors">Núcleo Académico</Link></li>
              <li><Link to="/repositorio" className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors">Documentos</Link></li>
              <li><Link to="/tesis" className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors">Repositorio de Tesis</Link></li>
              <li><Link to="/convocatoria" className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors">Convocatoria</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-primary-foreground/80">
                  Facultad de Contaduría y Administración, Ciudad Universitaria, Chilpancingo, Gro.
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm text-primary-foreground/80">(747) 472-5678</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <a href="mailto:mdo@uagro.mx" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  mdo@uagro.mx
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Síguenos</h4>
            <div className="flex gap-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground/20 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/60">
              © {new Date().getFullYear()} Universidad Autónoma de Guerrero. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                Aviso de Privacidad
              </a>
              <a href="#" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                Términos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
