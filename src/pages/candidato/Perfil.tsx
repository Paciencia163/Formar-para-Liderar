import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  Loader2, 
  User, 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  ArrowLeft,
  Save,
  LogOut,
  GraduationCap,
  Calendar,
  Building
} from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Application = Tables<"applications">;
type Profile = Tables<"profiles">;

const statusConfig = {
  nova: { label: "Nova", icon: Clock, color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  em_analise: { label: "Em Análise", icon: AlertCircle, color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  aprovada: { label: "Aprovada", icon: CheckCircle, color: "bg-green-500/20 text-green-400 border-green-500/30" },
  rejeitada: { label: "Rejeitada", icon: XCircle, color: "bg-red-500/20 text-red-400 border-red-500/30" },
};

const scholarshipLabels: Record<string, string> = {
  ensino_fundamental: "Ensino Fundamental",
  formacao_profissional: "Formação Profissional",
  universitaria_comparticipada: "Universitária Comparticipada",
  outras: "Outras Bolsas",
};

const educationLabels: Record<string, string> = {
  primario: "Primário",
  secundario: "Secundário",
  tecnico: "Técnico",
  universitario: "Universitário",
  pos_graduacao: "Pós-Graduação",
};

export default function PerfilCandidato() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    checkAuthAndLoadData();
  }, []);

  const checkAuthAndLoadData = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/auth/candidato");
      return;
    }

    try {
      // Load profile
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .maybeSingle();

      if (profileError) throw profileError;
      
      if (profileData) {
        setProfile(profileData);
        setFullName(profileData.full_name || "");
      }

      // Load applications
      const { data: applicationsData, error: applicationsError } = await supabase
        .from("applications")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      if (applicationsError) throw applicationsError;
      setApplications(applicationsData || []);
    } catch (error: any) {
      toast.error("Erro ao carregar dados: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!profile) return;
    
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ full_name: fullName })
        .eq("id", profile.id);

      if (error) throw error;
      toast.success("Perfil atualizado com sucesso!");
      setProfile({ ...profile, full_name: fullName });
    } catch (error: any) {
      toast.error("Erro ao guardar: " + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Sessão terminada");
    navigate("/");
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-AO", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-24 bg-gradient-dark min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                  <h1 className="font-serif text-3xl font-bold">Meu Perfil</h1>
                  <p className="text-muted-foreground">Gerencie os seus dados e candidaturas</p>
                </div>
              </div>
              <Button variant="outline" onClick={handleLogout} className="gap-2">
                <LogOut className="w-4 h-4" />
                Terminar Sessão
              </Button>
            </div>

            {/* Profile Card */}
            <Card className="mb-8 bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Dados Pessoais
                </CardTitle>
                <CardDescription>
                  Atualize as suas informações pessoais
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nome Completo</Label>
                    <Input
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Seu nome completo"
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      value={profile?.email || ""}
                      disabled
                      className="bg-muted"
                    />
                    <p className="text-xs text-muted-foreground">O e-mail não pode ser alterado</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleSaveProfile} disabled={isSaving} variant="gold" className="gap-2">
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Guardar Alterações
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Applications Section */}
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      Minhas Candidaturas
                    </CardTitle>
                    <CardDescription>
                      Acompanhe o estado das suas candidaturas
                    </CardDescription>
                  </div>
                  <Button asChild variant="gold">
                    <Link to="/candidaturas/formulario">Nova Candidatura</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {applications.length === 0 ? (
                  <div className="text-center py-12">
                    <GraduationCap className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Nenhuma candidatura encontrada</h3>
                    <p className="text-muted-foreground mb-4">
                      Ainda não submeteu nenhuma candidatura a bolsa de estudo.
                    </p>
                    <Button asChild variant="gold">
                      <Link to="/candidaturas/formulario">Submeter Candidatura</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {applications.map((app) => {
                      const status = statusConfig[app.status];
                      const StatusIcon = status.icon;
                      
                      return (
                        <div
                          key={app.id}
                          className="rounded-xl border border-border bg-gradient-to-br from-background/80 to-background/60 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10"
                        >
                          {/* Status Header */}
                          <div className="p-4 border-b border-border/50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Badge variant="outline" className={`${status.color} text-base px-3 py-1`}>
                                <StatusIcon className="w-4 h-4 mr-2" />
                                {status.label}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                ID: {app.id.slice(0, 8)}
                              </span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(app.created_at)}
                            </span>
                          </div>

                          {/* Main Content */}
                          <div className="p-4 space-y-4">
                            {/* Scholarship and Course Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Tipo de Bolsa</p>
                                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                                  {scholarshipLabels[app.scholarship_type] || app.scholarship_type}
                                </Badge>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Nível de Educação</p>
                                <p className="text-sm">{educationLabels[app.education_level] || app.education_level}</p>
                              </div>
                            </div>

                            {/* Institution and Course */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1 flex items-center gap-1">
                                  <Building className="w-3 h-3" />
                                  Instituição
                                </p>
                                <p className="text-sm font-medium">{app.institution}</p>
                              </div>
                              {app.course && (
                                <div>
                                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1 flex items-center gap-1">
                                    <GraduationCap className="w-3 h-3" />
                                    Curso
                                  </p>
                                  <p className="text-sm font-medium">{app.course}</p>
                                </div>
                              )}
                            </div>

                            {/* Additional Info */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2 border-t border-border/50">
                              <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Ano</p>
                                <p className="text-sm font-medium">{app.current_year ? `${app.current_year}º Ano` : "-"}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Província</p>
                                <p className="text-sm font-medium">{app.province}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Município</p>
                                <p className="text-sm font-medium">{app.municipality}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Situação</p>
                                <p className="text-sm font-medium">{app.employment_status}</p>
                              </div>
                            </div>
                          </div>

                          {/* Status Messages */}
                          {app.status === "aprovada" && (
                            <div className="mx-4 mb-4 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                              <div className="flex gap-3">
                                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-sm font-semibold text-green-400 mb-1">Candidatura Aprovada!</p>
                                  <p className="text-xs text-green-400/80">
                                    Parabéns! A sua candidatura foi aprovada. Aguarde contacto por e-mail ou telefone para próximos passos.
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {app.status === "rejeitada" && (
                            <div className="mx-4 mb-4 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                              <div className="flex gap-3">
                                <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-sm font-semibold text-red-400 mb-1">Candidatura Rejeitada</p>
                                  <p className="text-xs text-red-400/80">
                                    Infelizmente a sua candidatura não foi aprovada desta vez. Pode submeter uma nova candidatura no próximo ciclo.
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}

                          {app.status === "em_analise" && (
                            <div className="mx-4 mb-4 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                              <div className="flex gap-3">
                                <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-sm font-semibold text-yellow-400 mb-1">Em Análise</p>
                                  <p className="text-xs text-yellow-400/80">
                                    A sua candidatura está sendo analisada. Notificá-lo-emos assim que houver uma decisão.
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}

                          {app.status === "nova" && (
                            <div className="mx-4 mb-4 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                              <div className="flex gap-3">
                                <Clock className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-sm font-semibold text-blue-400 mb-1">Candidatura Registada</p>
                                  <p className="text-xs text-blue-400/80">
                                    A sua candidatura foi recebida com sucesso. Aguarde o início da análise.
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}

                          {app.admin_notes && (
                            <div className="mx-4 mb-4 p-4 rounded-lg bg-muted/50 border border-border">
                              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Notas do Administrador</p>
                              <p className="text-sm text-foreground">{app.admin_notes}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
