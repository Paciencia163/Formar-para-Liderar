import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, BookOpen, Wrench, GraduationCap, Sparkles } from "lucide-react";

const scholarshipTypes = [
  {
    title: "Ensino Fundamental",
    description: "Para estudantes do ensino primário e secundário com excelente desempenho.",
    href: "/bolsas#fundamental",
    icon: BookOpen,
  },
  {
    title: "Formação Profissional",
    description: "Cursos técnicos e profissionalizantes para inserção no mercado de trabalho.",
    href: "/bolsas#profissional",
    icon: Wrench,
  },
  {
    title: "Bolsa Universitária",
    description: "Apoio para licenciatura em universidades nacionais e internacionais.",
    href: "/bolsas#universitaria",
    icon: GraduationCap,
  },
  {
    title: "Outras Bolsas",
    description: "Programas especiais de pós-graduação, investigação e intercâmbio.",
    href: "/bolsas#outras",
    icon: Sparkles,
  },
];

export function ScholarshipTypesSection() {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            Modalidades de <span className="text-gradient-gold">Bolsas</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Oferecemos diferentes tipos de apoio para cada etapa da sua jornada educacional.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {scholarshipTypes.map((type, index) => (
            <Link
              key={type.title}
              to={type.href}
              className="group p-6 rounded-xl bg-background border border-border hover:border-primary/50 transition-all duration-300 flex items-center gap-4 animate-fade-in-up hover:shadow-gold"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <type.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {type.title}
                </h3>
                <p className="text-muted-foreground text-sm">{type.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="gold-outline" size="lg">
            <Link to="/bolsas">Ver Todas as Bolsas</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
