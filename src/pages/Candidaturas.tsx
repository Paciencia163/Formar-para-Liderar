import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  CheckCircle, 
  FileText, 
  Users, 
  ClipboardCheck, 
  Award,
  Calendar,
  Clock,
  AlertCircle
} from "lucide-react";

const eligibility = [
  "Ser cidadão angolano",
  "Demonstrar mérito académico (média igual ou superior a 14 valores)",
  "Comprovar necessidade de apoio financeiro",
  "Estar matriculado ou com admissão confirmada numa instituição de ensino",
  "Não ser beneficiário de outra bolsa de estudos",
  "Comprometer-se com os valores do programa",
];

const criteria = [
  { title: "Desempenho Académico", weight: "40%", description: "Notas e progressão escolar" },
  { title: "Situação Socioeconómica", weight: "30%", description: "Análise da carência financeira" },
  { title: "Motivação e Potencial", weight: "20%", description: "Ensaio e entrevista" },
  { title: "Impacto Comunitário", weight: "10%", description: "Participação social e voluntariado" },
];

const steps = [
  {
    icon: FileText,
    title: "1. Submissão Online",
    description: "Preencha o formulário de candidatura com todos os dados e documentos solicitados.",
  },
  {
    icon: ClipboardCheck,
    title: "2. Análise Documental",
    description: "A nossa equipa verifica a elegibilidade e analisa toda a documentação submetida.",
  },
  {
    icon: Users,
    title: "3. Entrevista",
    description: "Candidatos pré-seleccionados são convocados para entrevista presencial ou online.",
  },
  {
    icon: Award,
    title: "4. Resultado Final",
    description: "Divulgação dos candidatos seleccionados e início do acompanhamento.",
  },
];

const timeline = [
  { phase: "Candidaturas Abertas", date: "Janeiro - Março 2025" },
  { phase: "Análise Documental", date: "Abril 2025" },
  { phase: "Entrevistas", date: "Maio 2025" },
  { phase: "Divulgação dos Resultados", date: "Junho 2025" },
  { phase: "Início do Programa", date: "Setembro 2025" },
];

export default function Candidaturas() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 bg-gradient-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-6 animate-fade-in">
              <Clock className="w-4 h-4" />
              Candidaturas Abertas até Março 2025
            </div>
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up">
              Processo de <span className="text-gradient-gold">Candidatura</span>
            </h1>
            <p className="text-xl text-muted-foreground animate-fade-in-up animation-delay-200">
              Tudo o que precisa saber para se candidatar a uma bolsa FORMAR PARA LIDERAR.
            </p>
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold mb-4">
                Quem pode <span className="text-gradient-gold">candidatar-se</span>?
              </h2>
              <p className="text-xl text-muted-foreground">
                Verifique se cumpre os requisitos mínimos de elegibilidade.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-card border border-border">
              <ul className="grid md:grid-cols-2 gap-4">
                {eligibility.map((item, index) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 animate-fade-in-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Selection Criteria */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold mb-4">
                Critérios de <span className="text-gradient-gold">Selecção</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Como avaliamos as candidaturas recebidas.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {criteria.map((item, index) => (
                <div
                  key={item.title}
                  className="p-6 rounded-xl bg-background border border-border animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-serif text-xl font-semibold">{item.title}</h3>
                    <span className="text-2xl font-bold text-gradient-gold">{item.weight}</span>
                  </div>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold mb-4">
                Processo de <span className="text-gradient-gold">Candidatura</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Quatro etapas simples até à selecção final.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold mb-4">
                <span className="text-gradient-gold">Calendário</span> 2025
              </h2>
              <p className="text-xl text-muted-foreground">
                Datas importantes do processo de selecção.
              </p>
            </div>

            <div className="space-y-4">
              {timeline.map((item, index) => (
                <div
                  key={item.phase}
                  className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.phase}</h4>
                  </div>
                  <div className="text-primary font-medium">{item.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Important Note */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="p-6 rounded-xl bg-primary/5 border border-primary/20 flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold mb-2">Nota Importante</h4>
                <p className="text-muted-foreground text-sm">
                  Todas as informações fornecidas serão verificadas. A submissão de dados falsos resultará na desqualificação automática do candidato. A declaração de veracidade é parte obrigatória do formulário de candidatura.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="font-serif text-4xl font-bold">
              Pronto para dar o <span className="text-gradient-gold">primeiro passo</span>?
            </h2>
            <p className="text-xl text-muted-foreground">
              Inicie agora a sua candidatura e aproxime-se do seu sonho.
            </p>
            <Button asChild variant="gold" size="xl">
              <Link to="/candidaturas/formulario">
                Candidatar-se Agora
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
