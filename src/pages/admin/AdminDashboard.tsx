import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { LogOut, Users, FileText, CheckCircle, Clock, XCircle, Eye } from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

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
    const { data, error } = await supabase.from("applications").select("*").order("created_at", { ascending: false });
    if (!error) setApplications(data || []);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: "nova" | "em_analise" | "aprovada" | "rejeitada") => {
    const { error } = await supabase.from("applications").update({ status }).eq("id", id);
    if (!error) {
      toast.success("Estado actualizado");
      fetchApplications();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  const filtered = filter === "all" ? applications : applications.filter(a => a.status === filter);
  const stats = {
    total: applications.length,
    nova: applications.filter(a => a.status === "nova").length,
    em_analise: applications.filter(a => a.status === "em_analise").length,
    aprovada: applications.filter(a => a.status === "aprovada").length,
    rejeitada: applications.filter(a => a.status === "rejeitada").length,
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="font-serif text-xl font-bold text-gradient-gold">Painel Administrativo</h1>
          <Button variant="ghost" onClick={handleLogout}><LogOut className="w-4 h-4 mr-2" /> Sair</Button>
        </div>
      </header>

      <main className="container mx-auto p-6 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="p-4 rounded-xl bg-card border border-border text-center">
            <Users className="w-6 h-6 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border text-center">
            <FileText className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.nova}</div>
            <div className="text-xs text-muted-foreground">Novas</div>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border text-center">
            <Clock className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.em_analise}</div>
            <div className="text-xs text-muted-foreground">Em Análise</div>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border text-center">
            <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.aprovada}</div>
            <div className="text-xs text-muted-foreground">Aprovadas</div>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border text-center">
            <XCircle className="w-6 h-6 text-red-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{stats.rejeitada}</div>
            <div className="text-xs text-muted-foreground">Rejeitadas</div>
          </div>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-4">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-48 bg-card"><SelectValue placeholder="Filtrar por estado" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="nova">Novas</SelectItem>
              <SelectItem value="em_analise">Em Análise</SelectItem>
              <SelectItem value="aprovada">Aprovadas</SelectItem>
              <SelectItem value="rejeitada">Rejeitadas</SelectItem>
            </SelectContent>
          </Select>
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
                  <th className="p-4 text-left font-medium">Província</th>
                  <th className="p-4 text-left font-medium">Data</th>
                  <th className="p-4 text-left font-medium">Estado</th>
                  <th className="p-4 text-left font-medium">Acções</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={7} className="p-8 text-center text-muted-foreground">A carregar...</td></tr>
                ) : filtered.length === 0 ? (
                  <tr><td colSpan={7} className="p-8 text-center text-muted-foreground">Nenhuma candidatura encontrada</td></tr>
                ) : filtered.map(app => (
                  <tr key={app.id} className="border-t border-border hover:bg-muted/30">
                    <td className="p-4 font-medium">{app.full_name}</td>
                    <td className="p-4 text-muted-foreground">{app.phone}<br/>{app.email}</td>
                    <td className="p-4">{app.scholarship_type?.replace(/_/g, " ")}</td>
                    <td className="p-4">{app.province}</td>
                    <td className="p-4 text-muted-foreground">{new Date(app.created_at).toLocaleDateString("pt-AO")}</td>
                    <td className="p-4">
                      <Select value={app.status} onValueChange={v => updateStatus(app.id, v as "nova" | "em_analise" | "aprovada" | "rejeitada")}>
                        <SelectTrigger className="h-8 text-xs w-28"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nova">Nova</SelectItem>
                          <SelectItem value="em_analise">Em Análise</SelectItem>
                          <SelectItem value="aprovada">Aprovada</SelectItem>
                          <SelectItem value="rejeitada">Rejeitada</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="p-4"><Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
