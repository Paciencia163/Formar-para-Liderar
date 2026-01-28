import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { LogOut, Users, FileText, CheckCircle, Clock, XCircle, Eye, Search, Download, RefreshCw, LayoutDashboard, Settings } from "lucide-react";
import { ApplicationDetailModal } from "@/components/admin/ApplicationDetailModal";
import { UserManagement } from "@/components/admin/UserManagement";

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

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [scholarshipFilter, setScholarshipFilter] = useState("all");
  const [provinceFilter, setProvinceFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    checkAuth();
    fetchApplications();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/admin");
      return;
    }
    const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", session.user.id);
    if (!roles?.some(r => r.role === "admin")) {
      navigate("/admin");
    }
  };

  const fetchApplications = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("applications").select("*").order("created_at", { ascending: false });
    if (!error) setApplications(data || []);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("applications").update({ status: status as any }).eq("id", id);
    if (!error) {
      toast.success("Estado actualizado");
      fetchApplications();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  const exportToCSV = () => {
    const headers = ["Nome", "Email", "Telefone", "Província", "Município", "Tipo de Bolsa", "Nível de Ensino", "Instituição", "Estado", "Data"];
    const rows = filtered.map(app => [
      app.full_name,
      app.email,
      app.phone,
      app.province,
      app.municipality,
      app.scholarship_type,
      app.education_level,
      app.institution,
      app.status,
      new Date(app.created_at).toLocaleDateString("pt-AO")
    ]);
    
    const csv = [headers.join(","), ...rows.map(r => r.map(cell => `"${cell || ""}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `candidaturas_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    toast.success("Ficheiro exportado com sucesso");
  };

  const filtered = applications.filter(a => {
    const matchesStatus = filter === "all" || a.status === filter;
    const matchesScholarship = scholarshipFilter === "all" || a.scholarship_type === scholarshipFilter;
    const matchesProvince = provinceFilter === "all" || a.province === provinceFilter;
    const matchesSearch = search === "" || 
      a.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      a.email?.toLowerCase().includes(search.toLowerCase()) ||
      a.phone?.includes(search);
    return matchesStatus && matchesScholarship && matchesProvince && matchesSearch;
  });

  const stats = {
    total: applications.length,
    nova: applications.filter(a => a.status === "nova").length,
    em_analise: applications.filter(a => a.status === "em_analise").length,
    aprovada: applications.filter(a => a.status === "aprovada").length,
    rejeitada: applications.filter(a => a.status === "rejeitada").length,
  };

  const provinces = [...new Set(applications.map(a => a.province))].filter(Boolean).sort();

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border p-4 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="font-serif text-xl font-bold text-gradient-gold flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-primary" />
            Painel Administrativo
          </h1>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" /> Sair
          </Button>
        </div>
      </header>

      <main className="container mx-auto p-6">
        <Tabs defaultValue="applications" className="space-y-8">
          <TabsList className="bg-card border border-border">
            <TabsTrigger value="applications" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <FileText className="w-4 h-4 mr-2" />
              Candidaturas
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Users className="w-4 h-4 mr-2" />
              Utilizadores
            </TabsTrigger>
          </TabsList>

          <TabsContent value="applications" className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="p-4 rounded-xl bg-card border border-border text-center hover:border-primary/50 transition-colors cursor-pointer" onClick={() => setFilter("all")}>
                <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.total}</div>
                <div className="text-xs text-muted-foreground">Total</div>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border text-center hover:border-blue-500/50 transition-colors cursor-pointer" onClick={() => setFilter("nova")}>
                <FileText className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.nova}</div>
                <div className="text-xs text-muted-foreground">Novas</div>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border text-center hover:border-yellow-500/50 transition-colors cursor-pointer" onClick={() => setFilter("em_analise")}>
                <Clock className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.em_analise}</div>
                <div className="text-xs text-muted-foreground">Em Análise</div>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border text-center hover:border-green-500/50 transition-colors cursor-pointer" onClick={() => setFilter("aprovada")}>
                <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.aprovada}</div>
                <div className="text-xs text-muted-foreground">Aprovadas</div>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border text-center hover:border-red-500/50 transition-colors cursor-pointer" onClick={() => setFilter("rejeitada")}>
                <XCircle className="w-6 h-6 text-red-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.rejeitada}</div>
                <div className="text-xs text-muted-foreground">Rejeitadas</div>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex flex-wrap gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Pesquisar..." 
                    value={search} 
                    onChange={e => setSearch(e.target.value)}
                    className="pl-10 w-64 bg-card"
                  />
                </div>
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-40 bg-card"><SelectValue placeholder="Estado" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos Estados</SelectItem>
                    <SelectItem value="nova">Novas</SelectItem>
                    <SelectItem value="em_analise">Em Análise</SelectItem>
                    <SelectItem value="aprovada">Aprovadas</SelectItem>
                    <SelectItem value="rejeitada">Rejeitadas</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={scholarshipFilter} onValueChange={setScholarshipFilter}>
                  <SelectTrigger className="w-48 bg-card"><SelectValue placeholder="Tipo de Bolsa" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as Bolsas</SelectItem>
                    <SelectItem value="ensino_fundamental">Ensino Fundamental</SelectItem>
                    <SelectItem value="formacao_profissional">Formação Profissional</SelectItem>
                    <SelectItem value="universitaria_comparticipada">Universitária</SelectItem>
                    <SelectItem value="outras">Outras</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={provinceFilter} onValueChange={setProvinceFilter}>
                  <SelectTrigger className="w-40 bg-card"><SelectValue placeholder="Província" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas Províncias</SelectItem>
                    {provinces.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={fetchApplications}>
                  <RefreshCw className="w-4 h-4 mr-2" /> Actualizar
                </Button>
                <Button variant="gold" size="sm" onClick={exportToCSV}>
                  <Download className="w-4 h-4 mr-2" /> Exportar CSV
                </Button>
              </div>
            </div>

            {/* Applications Table */}
            <div className="rounded-xl bg-card border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="p-4 text-left font-medium">Nome</th>
                      <th className="p-4 text-left font-medium">Contacto</th>
                      <th className="p-4 text-left font-medium">Bolsa</th>
                      <th className="p-4 text-left font-medium">Nível</th>
                      <th className="p-4 text-left font-medium">Província</th>
                      <th className="p-4 text-left font-medium">Data</th>
                      <th className="p-4 text-left font-medium">Estado</th>
                      <th className="p-4 text-left font-medium">Acções</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr><td colSpan={8} className="p-8 text-center text-muted-foreground">A carregar...</td></tr>
                    ) : filtered.length === 0 ? (
                      <tr><td colSpan={8} className="p-8 text-center text-muted-foreground">Nenhuma candidatura encontrada</td></tr>
                    ) : filtered.map(app => (
                      <tr key={app.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                        <td className="p-4">
                          <div className="font-medium">{app.full_name}</div>
                          <div className="text-xs text-muted-foreground">{app.institution}</div>
                        </td>
                        <td className="p-4">
                          <div className="text-muted-foreground">{app.phone}</div>
                          <div className="text-xs text-muted-foreground">{app.email}</div>
                        </td>
                        <td className="p-4 text-sm">{app.scholarship_type?.replace(/_/g, " ")}</td>
                        <td className="p-4 text-sm">{app.education_level}</td>
                        <td className="p-4 text-sm">{app.province}</td>
                        <td className="p-4 text-muted-foreground text-sm">{new Date(app.created_at).toLocaleDateString("pt-AO")}</td>
                        <td className="p-4">
                          <Select value={app.status} onValueChange={v => updateStatus(app.id, v)}>
                            <SelectTrigger className="h-8 text-xs w-28">
                              <Badge className={statusColors[app.status]}>
                                {statusLabels[app.status]}
                              </Badge>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="nova">Nova</SelectItem>
                              <SelectItem value="em_analise">Em Análise</SelectItem>
                              <SelectItem value="aprovada">Aprovada</SelectItem>
                              <SelectItem value="rejeitada">Rejeitada</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="p-4">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              setSelectedApp(app);
                              setShowDetail(true);
                            }}
                          >
                            <Eye className="w-4 h-4 mr-1" /> Ver
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              Mostrando {filtered.length} de {applications.length} candidaturas
            </div>
          </TabsContent>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>
        </Tabs>
      </main>

      <ApplicationDetailModal
        application={selectedApp}
        open={showDetail}
        onClose={() => setShowDetail(false)}
        onUpdate={fetchApplications}
      />
    </div>
  );
}
