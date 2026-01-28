import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold">
                <span className="font-serif font-bold text-primary-foreground text-lg">F</span>
              </div>
              <span className="font-serif text-xl font-semibold text-gradient-gold">
                FORMAR PARA LIDERAR
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Educação hoje. Liderança amanhã. Transformando vidas através de bolsas de estudo para quem tem mérito e sonhos.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-foreground mb-4">
              Navegação
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Início" },
                { href: "/sobre", label: "Sobre o Projecto" },
                { href: "/bolsas", label: "Bolsas" },
                { href: "/candidaturas", label: "Candidaturas" },
                { href: "/contactos", label: "Contactos" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Scholarships */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-foreground mb-4">
              Modalidades
            </h4>
            <ul className="space-y-2">
              {[
                "Ensino Fundamental",
                "Formação Profissional",
                "Bolsa Universitária",
                "Outras Bolsas",
              ].map((item) => (
                <li key={item}>
                  <span className="text-muted-foreground text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-foreground mb-4">
              Contactos
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Mail className="w-4 h-4 text-primary" />
                <span>info@formarparaliderar.ao</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Phone className="w-4 h-4 text-primary" />
                <span>+244 922 812 244</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span>Luanda, Angola</span>
              </li>
            </ul>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} FORMAR PARA LIDERAR. Todos os direitos reservados.
          </p>
          <p className="text-muted-foreground text-xs">
            Desenvolvido com ❤️ para Angola
          </p>
        </div>
      </div>
    </footer>
  );
}
