import { GraduationCap, Users, Target, Award } from "lucide-react";

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

export function FeaturesSection() {
  return (
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
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
