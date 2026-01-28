import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_hsl(45,70%,50%,0.15)_0%,_transparent_70%)]" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="font-serif text-4xl md:text-6xl font-bold">
            Investe no teu <span className="text-gradient-gold">Futuro</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            As candidaturas para 2025 estão abertas. Não deixes passar esta oportunidade de transformar a tua vida e contribuir para o desenvolvimento de Angola.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild variant="gold" size="xl">
              <Link to="/auth/candidato">
                Candidatar-se Agora
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl">
              <Link to="/candidaturas">Ver Requisitos</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
