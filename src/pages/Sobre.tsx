import { Layout } from "@/components/layout/Layout";
import { Target, Eye, Heart, Shield, Users, TrendingUp } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Excelência",
    description: "Procuramos a excelência em tudo o que fazemos, desde a selecção dos bolseiros até ao acompanhamento contínuo.",
  },
  {
    icon: Heart,
    title: "Compromisso Social",
    description: "Acreditamos no poder transformador da educação para combater a desigualdade e promover o desenvolvimento.",
  },
  {
    icon: Shield,
    title: "Integridade",
    description: "Agimos com transparência, ética e responsabilidade em todas as nossas decisões e processos.",
  },
  {
    icon: Users,
    title: "Inclusão",
    description: "Valorizamos a diversidade e garantimos oportunidades iguais independentemente da origem ou condição social.",
  },
];

const impacts = [
  { number: "500+", label: "Bolseiros formados" },
  { number: "18", label: "Províncias abrangidas" },
  { number: "50+", label: "Instituições parceiras" },
  { number: "95%", label: "Taxa de conclusão" },
];

export default function Sobre() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 bg-gradient-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up">
              Sobre o <span className="text-gradient-gold">Projecto</span>
            </h1>
            <p className="text-xl text-muted-foreground animate-fade-in-up animation-delay-200">
              Conheça a nossa história, missão e o impacto que estamos a criar em Angola.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-in-up">
                <h2 className="font-serif text-4xl font-bold">
                  A Nossa <span className="text-gradient-gold">História</span>
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    O projecto FORMAR PARA LIDERAR nasceu da convicção de que Angola possui um potencial humano extraordinário que precisa de ser desenvolvido e apoiado.
                  </p>
                  <p>
                    Fundado por um grupo de angolanos comprometidos com o desenvolvimento do país, o projecto tem como objectivo principal identificar, apoiar e formar os futuros líderes de Angola através da educação.
                  </p>
                  <p>
                    Ao longo dos anos, temos trabalhado incansavelmente para criar oportunidades educacionais para jovens talentosos de todas as províncias, independentemente da sua condição socioeconómica.
                  </p>
                </div>
              </div>
              <div className="relative animate-fade-in-up animation-delay-200">
                <div className="aspect-square rounded-2xl bg-card border border-border overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-24 h-24 rounded-full bg-gradient-gold mx-auto mb-6 flex items-center justify-center shadow-gold-lg">
                        <span className="font-serif font-bold text-primary-foreground text-4xl">F</span>
                      </div>
                      <p className="font-serif text-2xl font-semibold text-gradient-gold">
                        Desde 2014
                      </p>
                      <p className="text-muted-foreground mt-2">
                        Transformando vidas através da educação
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="p-8 rounded-2xl bg-background border border-border animate-fade-in-up">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-4">Missão</h3>
              <p className="text-muted-foreground leading-relaxed">
                Identificar, apoiar e capacitar jovens angolanos talentosos através de bolsas de estudo e programas de desenvolvimento pessoal, contribuindo para a formação de líderes comprometidos com o progresso de Angola.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-background border border-border animate-fade-in-up animation-delay-200">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-4">Visão</h3>
              <p className="text-muted-foreground leading-relaxed">
                Ser a principal referência em Angola na formação de líderes através da educação, criando uma rede de profissionais qualificados e comprometidos que impulsionarão o desenvolvimento sustentável do país.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Os Nossos <span className="text-gradient-gold">Valores</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Princípios que guiam todas as nossas acções e decisões.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="text-center p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              O Nosso <span className="text-gradient-gold">Impacto</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Números que reflectem o nosso compromisso com Angola.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {impacts.map((impact, index) => (
              <div
                key={impact.label}
                className="text-center p-6 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="font-serif text-5xl md:text-6xl font-bold text-gradient-gold mb-2">
                  {impact.number}
                </div>
                <p className="text-muted-foreground">{impact.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <TrendingUp className="w-16 h-16 text-primary mx-auto mb-8" />
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Compromisso com <span className="text-gradient-gold">Angola</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              O nosso compromisso vai além das bolsas de estudo. Acreditamos que cada jovem formado é um agente de mudança que contribuirá para o desenvolvimento sustentável de Angola. Trabalhamos em parceria com instituições de ensino, empresas e organizações para criar um ecossistema que apoia os nossos bolseiros durante e após a sua formação.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
