import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { GraduationCap, Briefcase, BookOpen, Award, ArrowRight, CheckCircle } from "lucide-react";

const scholarships = [
  {
    id: "fundamental",
    icon: BookOpen,
    title: "Ensino Fundamental",
    subtitle: "Primário e Secundário",
    description: "Apoio financeiro para estudantes do ensino primário e secundário que demonstrem excelente desempenho académico e necessidade de suporte financeiro.",
    benefits: [
      "Propinas escolares cobertas",
      "Material escolar",
      "Transporte escolar",
      "Alimentação",
      "Acompanhamento pedagógico",
    ],
    requirements: [
      "Média igual ou superior a 14 valores",
      "Idade entre 6 e 18 anos",
      "Comprovativo de carência financeira",
      "Carta de recomendação escolar",
    ],
  },
  {
    id: "profissional",
    icon: Briefcase,
    title: "Formação Profissional",
    subtitle: "Cursos Técnicos",
    description: "Bolsas para cursos técnicos e profissionalizantes que preparam jovens para o mercado de trabalho angolano em áreas de alta demanda.",
    benefits: [
      "Propinas do curso cobertas",
      "Material didáctico",
      "Estágios em empresas parceiras",
      "Certificação reconhecida",
      "Apoio na inserção profissional",
    ],
    requirements: [
      "Ensino secundário completo",
      "Idade entre 18 e 30 anos",
      "Comprovativo de carência financeira",
      "Motivação para a área escolhida",
    ],
  },
  {
    id: "universitaria",
    icon: GraduationCap,
    title: "Bolsa Universitária Comparticipada",
    subtitle: "Licenciatura",
    description: "Apoio parcial ou total para estudantes universitários em instituições nacionais e internacionais, cobrindo propinas e despesas académicas.",
    benefits: [
      "Propinas universitárias (parcial ou total)",
      "Subsídio mensal para despesas",
      "Material académico",
      "Mentoria profissional",
      "Rede de ex-bolseiros",
    ],
    requirements: [
      "Aprovação em exame de acesso",
      "Média do secundário igual ou superior a 14",
      "Comprovativo de carência financeira",
      "Ensaio de motivação",
      "Entrevista de selecção",
    ],
  },
  {
    id: "outras",
    icon: Award,
    title: "Outras Bolsas",
    subtitle: "Programas Especiais",
    description: "Programas especiais de pós-graduação, mestrado, doutoramento, investigação e intercâmbio para profissionais em desenvolvimento.",
    benefits: [
      "Propinas completas",
      "Passagens aéreas (intercâmbio)",
      "Alojamento",
      "Seguro de saúde",
      "Subsídio de investigação",
    ],
    requirements: [
      "Licenciatura concluída",
      "Experiência profissional relevante",
      "Projecto de investigação (se aplicável)",
      "Carta de aceitação da instituição",
      "Compromisso de retorno a Angola",
    ],
  },
];

export default function Bolsas() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 bg-gradient-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up">
              Modalidades de <span className="text-gradient-gold">Bolsas</span>
            </h1>
            <p className="text-xl text-muted-foreground animate-fade-in-up animation-delay-200">
              Descubra as diferentes oportunidades de apoio educacional que oferecemos.
            </p>
          </div>
        </div>
      </section>

      {/* Scholarships */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-24">
            {scholarships.map((scholarship, index) => (
              <div
                key={scholarship.id}
                id={scholarship.id}
                className="scroll-mt-24 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="max-w-6xl mx-auto">
                  <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Info */}
                    <div className="space-y-6">
                      <div className="inline-flex items-center gap-3">
                        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                          <scholarship.icon className="w-7 h-7 text-primary" />
                        </div>
                        <div>
                          <h2 className="font-serif text-3xl font-bold">{scholarship.title}</h2>
                          <p className="text-primary">{scholarship.subtitle}</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        {scholarship.description}
                      </p>
                      <Button asChild variant="gold" size="lg">
                        <Link to="/candidaturas/formulario">
                          Candidatar-se
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                      </Button>
                    </div>

                    {/* Details */}
                    <div className="grid gap-6">
                      <div className="p-6 rounded-xl bg-card border border-border">
                        <h3 className="font-serif text-xl font-semibold mb-4 text-gradient-gold">
                          Benefícios
                        </h3>
                        <ul className="space-y-3">
                          {scholarship.benefits.map((benefit) => (
                            <li key={benefit} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-6 rounded-xl bg-card border border-border">
                        <h3 className="font-serif text-xl font-semibold mb-4">
                          Requisitos
                        </h3>
                        <ul className="space-y-3">
                          {scholarship.requirements.map((req) => (
                            <li key={req} className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                              <span className="text-muted-foreground">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {index < scholarships.length - 1 && (
                  <div className="border-b border-border mt-24" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="font-serif text-4xl font-bold">
              Pronto para <span className="text-gradient-gold">candidatar-se</span>?
            </h2>
            <p className="text-xl text-muted-foreground">
              Verifique os requisitos e inicie o seu processo de candidatura hoje mesmo.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild variant="gold" size="xl">
                <Link to="/candidaturas/formulario">
                  Iniciar Candidatura
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link to="/candidaturas">Ver Processo de Selecção</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
