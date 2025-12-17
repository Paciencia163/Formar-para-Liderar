import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";

const provinces = ["Bengo", "Benguela", "Bié", "Cabinda", "Cuando Cubango", "Cuanza Norte", "Cuanza Sul", "Cunene", "Huambo", "Huíla", "Luanda", "Lunda Norte", "Lunda Sul", "Malanje", "Moxico", "Namibe", "Uíge", "Zaire"];

const steps = ["Dados Pessoais", "Dados Académicos", "Tipo de Bolsa", "Situação Socioeconómica", "Motivação", "Declaração"];

export default function CandidaturaForm() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "", birth_date: "", bi_number: "", phone: "", email: "", province: "", municipality: "", address: "",
    education_level: "", institution: "", course: "", current_year: "",
    scholarship_type: "",
    household_income: "", household_members: "", employment_status: "",
    motivation: "",
    declaration_accepted: false,
  });

  const updateField = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.declaration_accepted) {
      toast.error("Deve aceitar a declaração de veracidade");
      return;
    }
    setIsSubmitting(true);
    try {
      const { current_year, household_members, ...rest } = formData;
      const { error } = await supabase.from("applications").insert({
        ...rest,
        current_year: current_year ? parseInt(current_year) : null,
        household_members: parseInt(household_members),
      } as any);
      if (error) throw error;
      toast.success("Candidatura submetida com sucesso!");
      navigate("/candidaturas");
    } catch (error) {
      toast.error("Erro ao submeter candidatura. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="grid gap-4">
            <Input placeholder="Nome completo *" value={formData.full_name} onChange={e => updateField("full_name", e.target.value)} className="bg-background" required />
            <Input type="date" placeholder="Data de nascimento *" value={formData.birth_date} onChange={e => updateField("birth_date", e.target.value)} className="bg-background" required />
            <Input placeholder="Número do BI *" value={formData.bi_number} onChange={e => updateField("bi_number", e.target.value)} className="bg-background" required />
            <Input placeholder="Telefone *" value={formData.phone} onChange={e => updateField("phone", e.target.value)} className="bg-background" required />
            <Input type="email" placeholder="E-mail *" value={formData.email} onChange={e => updateField("email", e.target.value)} className="bg-background" required />
            <Select value={formData.province} onValueChange={v => updateField("province", v)}>
              <SelectTrigger className="bg-background"><SelectValue placeholder="Província *" /></SelectTrigger>
              <SelectContent>{provinces.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
            </Select>
            <Input placeholder="Município *" value={formData.municipality} onChange={e => updateField("municipality", e.target.value)} className="bg-background" required />
            <Textarea placeholder="Endereço completo *" value={formData.address} onChange={e => updateField("address", e.target.value)} className="bg-background" required />
          </div>
        );
      case 1:
        return (
          <div className="grid gap-4">
            <Select value={formData.education_level} onValueChange={v => updateField("education_level", v)}>
              <SelectTrigger className="bg-background"><SelectValue placeholder="Nível de ensino *" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="primario">Primário</SelectItem>
                <SelectItem value="secundario">Secundário</SelectItem>
                <SelectItem value="tecnico">Técnico</SelectItem>
                <SelectItem value="universitario">Universitário</SelectItem>
                <SelectItem value="pos_graduacao">Pós-Graduação</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Instituição de ensino *" value={formData.institution} onChange={e => updateField("institution", e.target.value)} className="bg-background" required />
            <Input placeholder="Curso" value={formData.course} onChange={e => updateField("course", e.target.value)} className="bg-background" />
            <Input type="number" placeholder="Ano actual" value={formData.current_year} onChange={e => updateField("current_year", e.target.value)} className="bg-background" />
          </div>
        );
      case 2:
        return (
          <div className="grid gap-4">
            <Select value={formData.scholarship_type} onValueChange={v => updateField("scholarship_type", v)}>
              <SelectTrigger className="bg-background"><SelectValue placeholder="Tipo de bolsa pretendida *" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ensino_fundamental">Ensino Fundamental</SelectItem>
                <SelectItem value="formacao_profissional">Formação Profissional</SelectItem>
                <SelectItem value="universitaria_comparticipada">Bolsa Universitária Comparticipada</SelectItem>
                <SelectItem value="outras">Outras Bolsas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      case 3:
        return (
          <div className="grid gap-4">
            <Select value={formData.household_income} onValueChange={v => updateField("household_income", v)}>
              <SelectTrigger className="bg-background"><SelectValue placeholder="Rendimento familiar mensal *" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="menos_50000">Menos de 50.000 Kz</SelectItem>
                <SelectItem value="50000_150000">50.000 - 150.000 Kz</SelectItem>
                <SelectItem value="150000_300000">150.000 - 300.000 Kz</SelectItem>
                <SelectItem value="mais_300000">Mais de 300.000 Kz</SelectItem>
              </SelectContent>
            </Select>
            <Input type="number" placeholder="Número de pessoas no agregado familiar *" value={formData.household_members} onChange={e => updateField("household_members", e.target.value)} className="bg-background" required />
            <Select value={formData.employment_status} onValueChange={v => updateField("employment_status", v)}>
              <SelectTrigger className="bg-background"><SelectValue placeholder="Situação de emprego do responsável *" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="empregado">Empregado</SelectItem>
                <SelectItem value="desempregado">Desempregado</SelectItem>
                <SelectItem value="autonomo">Trabalhador Autónomo</SelectItem>
                <SelectItem value="reformado">Reformado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      case 4:
        return (
          <div className="grid gap-4">
            <Textarea placeholder="Descreva a sua motivação para esta candidatura e como esta bolsa pode transformar a sua vida e contribuir para Angola... *" value={formData.motivation} onChange={e => updateField("motivation", e.target.value)} className="bg-background min-h-[200px]" required />
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-primary/5 border border-primary/20">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Declaro que todas as informações fornecidas nesta candidatura são verdadeiras e correspondem à minha situação real. Estou ciente de que a prestação de informações falsas resultará na desqualificação automática da minha candidatura e possíveis consequências legais. Autorizo o projecto FORMAR PARA LIDERAR a verificar todas as informações fornecidas.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Checkbox id="declaration" checked={formData.declaration_accepted} onCheckedChange={v => updateField("declaration_accepted", v as boolean)} />
              <label htmlFor="declaration" className="text-sm cursor-pointer">Li, compreendi e aceito a declaração de veracidade acima *</label>
            </div>
          </div>
        );
    }
  };

  return (
    <Layout>
      <section className="py-24 bg-gradient-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-center">
              Formulário de <span className="text-gradient-gold">Candidatura</span>
            </h1>
            <div className="flex justify-center gap-2 mb-12 flex-wrap">
              {steps.map((step, i) => (
                <div key={step} className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs ${i === currentStep ? "bg-primary text-primary-foreground" : i < currentStep ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
                  {i < currentStep ? <Check className="w-3 h-3" /> : <span>{i + 1}</span>}
                  <span className="hidden sm:inline">{step}</span>
                </div>
              ))}
            </div>
            <div className="p-8 rounded-2xl bg-card border border-border">
              <h2 className="font-serif text-2xl font-bold mb-6">{steps[currentStep]}</h2>
              {renderStep()}
              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={() => setCurrentStep(s => s - 1)} disabled={currentStep === 0}>
                  <ArrowLeft className="w-4 h-4 mr-2" /> Anterior
                </Button>
                {currentStep < steps.length - 1 ? (
                  <Button variant="gold" onClick={() => setCurrentStep(s => s + 1)}>
                    Próximo <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button variant="gold" onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    Submeter Candidatura
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
