import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { User, Phone, Mail, MapPin, GraduationCap, Briefcase, Users, Calendar, FileText, Save } from "lucide-react";

interface ApplicationDetailModalProps {
  application: any;
  open: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

const statusColors: Record<string, string> = {
  nova: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  em_analise: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  aprovada: "bg-green-500/20 text-green-400 border-green-500/30",
  rejeitada: "bg-red-500/20 text-red-400 border-red-500/30",
};

const statusLabels: Record<string, string> = {
  nova: "Nova",
  em_analise: "Em Análise",
  aprovada: "Aprovada",
  rejeitada: "Rejeitada",
};

const educationLabels: Record<string, string> = {
  primario: "Primário",
  secundario: "Secundário",
  tecnico: "Técnico",
  universitario: "Universitário",
  pos_graduacao: "Pós-Graduação",
};

const scholarshipLabels: Record<string, string> = {
  ensino_fundamental: "Ensino Fundamental",
  formacao_profissional: "Formação Profissional",
  universitaria_comparticipada: "Bolsa Universitária Comparticipada",
  outras: "Outras Bolsas",
};

const incomeLabels: Record<string, string> = {
  menos_50000: "Menos de 50.000 Kz",
  "50000_150000": "50.000 - 150.000 Kz",
  "150000_300000": "150.000 - 300.000 Kz",
  mais_300000: "Mais de 300.000 Kz",
};

const employmentLabels: Record<string, string> = {
  empregado: "Empregado",
  desempregado: "Desempregado",
  autonomo: "Trabalhador Autónomo",
  reformado: "Reformado",
};

export function ApplicationDetailModal({ application, open, onClose, onUpdate }: ApplicationDetailModalProps) {
  const [adminNotes, setAdminNotes] = useState(application?.admin_notes || "");
  const [status, setStatus] = useState(application?.status || "nova");
  const [isSaving, setIsSaving] = useState(false);

  if (!application) return null;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("applications")
        .update({ admin_notes: adminNotes, status })
        .eq("id", application.id);

      if (error) throw error;
      toast.success("Candidatura actualizada com sucesso");
      onUpdate();
      onClose();
    } catch (error) {
      toast.error("Erro ao actualizar candidatura");
    } finally {
      setIsSaving(false);
    }
  };

  const Section = ({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) => (
    <div className="space-y-3">
      <h3 className="font-semibold text-sm flex items-center gap-2 text-primary">
        <Icon className="w-4 h-4" />
        {title}
      </h3>
      <div className="grid gap-2 text-sm">{children}</div>
    </div>
  );

  const Field = ({ label, value }: { label: string; value: string | number | null }) => (
    <div className="flex justify-between py-2 border-b border-border/50">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-right max-w-[60%]">{value || "-"}</span>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-card">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl flex items-center gap-3">
            Detalhes da Candidatura
            <Badge className={statusColors[application.status]}>
              {statusLabels[application.status]}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Personal Data */}
          <Section title="Dados Pessoais" icon={User}>
            <Field label="Nome Completo" value={application.full_name} />
            <Field label="Data de Nascimento" value={new Date(application.birth_date).toLocaleDateString("pt-AO")} />
            <Field label="Número do BI" value={application.bi_number} />
            <Field label="Telefone" value={application.phone} />
            <Field label="E-mail" value={application.email} />
          </Section>

          {/* Location */}
          <Section title="Localização" icon={MapPin}>
            <Field label="Província" value={application.province} />
            <Field label="Município" value={application.municipality} />
            <Field label="Endereço" value={application.address} />
          </Section>

          {/* Academic Data */}
          <Section title="Dados Académicos" icon={GraduationCap}>
            <Field label="Nível de Ensino" value={educationLabels[application.education_level]} />
            <Field label="Instituição" value={application.institution} />
            <Field label="Curso" value={application.course} />
            <Field label="Ano Actual" value={application.current_year} />
          </Section>

          {/* Scholarship & Socioeconomic */}
          <Section title="Bolsa & Situação Socioeconómica" icon={Briefcase}>
            <Field label="Tipo de Bolsa" value={scholarshipLabels[application.scholarship_type]} />
            <Field label="Rendimento Familiar" value={incomeLabels[application.household_income]} />
            <Field label="Membros do Agregado" value={application.household_members} />
            <Field label="Situação de Emprego" value={employmentLabels[application.employment_status]} />
          </Section>
        </div>

        {/* Motivation */}
        <Section title="Motivação" icon={FileText}>
          <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
            <p className="text-sm whitespace-pre-wrap">{application.motivation}</p>
          </div>
        </Section>

        {/* Metadata */}
        <Section title="Informações da Candidatura" icon={Calendar}>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span>Submetida: {new Date(application.created_at).toLocaleString("pt-AO")}</span>
            <span>Actualizada: {new Date(application.updated_at).toLocaleString("pt-AO")}</span>
          </div>
        </Section>

        {/* Admin Section */}
        <div className="border-t border-border pt-6 mt-6 space-y-4">
          <h3 className="font-semibold text-sm flex items-center gap-2 text-primary">
            <Users className="w-4 h-4" />
            Avaliação Administrativa
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Estado</label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nova">Nova</SelectItem>
                  <SelectItem value="em_analise">Em Análise</SelectItem>
                  <SelectItem value="aprovada">Aprovada</SelectItem>
                  <SelectItem value="rejeitada">Rejeitada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Notas Internas</label>
            <Textarea
              placeholder="Adicione notas sobre esta candidatura..."
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              className="bg-background min-h-[100px]"
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button variant="gold" onClick={handleSave} disabled={isSaving}>
              <Save className="w-4 h-4 mr-2" />
              Guardar Alterações
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
