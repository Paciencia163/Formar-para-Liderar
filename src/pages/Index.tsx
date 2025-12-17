import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, Users, Target, Award, ChevronRight } from "lucide-react";

const stats = [
  { value: "500+", label: "Bolseiros" },
  { value: "18", label: "Províncias" },
  { value: "95%", label: "Taxa de Sucesso" },
  { value: "10+", label: "Anos de Impacto" },
];

const features = [
  {
    icon: GraduationCap,
    title: "Educação de Qualidade",
    description: "Proporcionamos acesso a instituições de ensino de excelência em Angola e no estrangeiro.",
  },
  {
    icon: Users,
    title: "Acompanhamento Integral",
    description: "Mentoria personalizada e suporte contínuo ao longo de toda a jornada académica.",
  },
  {
    icon: Target,
    title: "Foco no Mérito",
    description: "Valorizamos o esforço, a dedicação e o potencial de cada candidato.",
  },
  {
    icon: Award,
    title: "Formação de Líderes",
    description: "Preparamos os futuros líderes que transformarão Angola.",
  },
];

const scholarshipTypes = [
  {
    title: "Ensino Fundamental",
    description: "Para estudantes do ensino primário e secundário com excelente desempenho.",
    href: "/bolsas#fundamental",
  },
  {
    title: "Formação Profissional",
    description: "Cursos técnicos e profissionalizantes para inserção no mercado de trabalho.",
    href: "/bolsas#profissional",
  },
  {
    title: "Bolsa Universitária",
    description: "Apoio para licenciatura em universidades nacionais e internacionais.",
    href: "/bolsas#universitaria",
  },
  {
    title: "Outras Bolsas",
    description: "Programas especiais de pós-graduação, investigação e intercâmbio.",
    href: "/bolsas#outras",
  },
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-dark" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Candidaturas Abertas 2025
            </div>

            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-tight animate-fade-in-up">
              <span className="text-gradient-gold">FORMAR</span>
              <br />
              <span className="text-foreground">PARA LIDERAR</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
              Educação hoje. Liderança amanhã.
              <br />
              <span className="text-foreground">Bolsas de estudo para quem tem mérito e sonhos.</span>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-400">
              <Button asChild variant="gold" size="xl">
                <Link to="/candidaturas/formulario">
                  Candidatar-se Agora
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button asChild variant="gold-outline" size="xl">
                <Link to="/sobre">Conhecer o Projecto</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 rounded-full bg-primary animate-pulse" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="font-serif text-4xl md:text-5xl font-bold text-gradient-gold">
                  {stat.value}
                </div>
                <div className="text-muted-foreground mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Por que <span className="text-gradient-gold">FORMAR PARA LIDERAR</span>?
            </h2>
            <p className="text-xl text-muted-foreground">
              Acreditamos que a educação é a chave para transformar Angola. Investimos em talentos que farão a diferença.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group p-8 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-gold animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scholarship Types */}
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
                className="group p-6 rounded-xl bg-background border border-border hover:border-primary/50 transition-all duration-300 flex items-center gap-4 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex-1">
                  <h3 className="font-serif text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {type.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{type.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
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

      {/* CTA Section */}
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
                <Link to="/candidaturas/formulario">
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
    </Layout>
  );
}
