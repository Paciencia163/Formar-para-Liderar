import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Users, Search, Shield, UserX, Loader2, RefreshCw } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface UserWithRoles {
  id: string;
  email: string | null;
  full_name: string | null;
  created_at: string;
  roles: string[];
}

const roleLabels: Record<string, string> = {
  admin: "Administrador",
  moderator: "Moderador",
  candidato: "Candidato",
};

const roleColors: Record<string, string> = {
  admin: "bg-red-500/20 text-red-400 border-red-500/30",
  moderator: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  candidato: "bg-green-500/20 text-green-400 border-green-500/30",
};

export function UserManagement() {
  const [users, setUsers] = useState<UserWithRoles[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<UserWithRoles | null>(null);
  const [newRole, setNewRole] = useState<string>("");
  const [showRoleDialog, setShowRoleDialog] = useState(false);
  const [showRemoveRoleDialog, setShowRemoveRoleDialog] = useState(false);
  const [roleToRemove, setRoleToRemove] = useState<string>("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Fetch profiles
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (profilesError) throw profilesError;

      // Fetch roles for each user
      const { data: allRoles, error: rolesError } = await supabase
        .from("user_roles")
        .select("*");

      if (rolesError) throw rolesError;

      // Combine profiles with roles
      const usersWithRoles: UserWithRoles[] = (profiles || []).map((profile) => ({
        id: profile.id,
        email: profile.email,
        full_name: profile.full_name,
        created_at: profile.created_at,
        roles: (allRoles || [])
          .filter((r) => r.user_id === profile.id)
          .map((r) => r.role),
      }));

      setUsers(usersWithRoles);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Erro ao carregar utilizadores");
    } finally {
      setLoading(false);
    }
  };

  const addRole = async () => {
    if (!selectedUser || !newRole) return;

    try {
      const { error } = await supabase.from("user_roles").insert({
        user_id: selectedUser.id,
        role: newRole as any,
      });

      if (error) throw error;
      toast.success(`Papel "${roleLabels[newRole]}" atribuído com sucesso`);
      fetchUsers();
    } catch (error: any) {
      if (error.code === "23505") {
        toast.error("Este utilizador já tem este papel");
      } else {
        toast.error("Erro ao atribuir papel");
      }
    } finally {
      setShowRoleDialog(false);
      setNewRole("");
      setSelectedUser(null);
    }
  };

  const removeRole = async () => {
    if (!selectedUser || !roleToRemove) return;

    try {
      const { error } = await supabase
        .from("user_roles")
        .delete()
        .eq("user_id", selectedUser.id)
        .eq("role", roleToRemove as any);

      if (error) throw error;
      toast.success(`Papel "${roleLabels[roleToRemove]}" removido com sucesso`);
      fetchUsers();
    } catch (error) {
      toast.error("Erro ao remover papel");
    } finally {
      setShowRemoveRoleDialog(false);
      setRoleToRemove("");
      setSelectedUser(null);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.email?.toLowerCase().includes(search.toLowerCase()) ||
      user.full_name?.toLowerCase().includes(search.toLowerCase());
    const matchesRole =
      roleFilter === "all" || user.roles.includes(roleFilter);
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-xl font-bold flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          Gestão de Utilizadores
        </h2>
        <Button variant="outline" size="sm" onClick={fetchUsers}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Actualizar
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar por nome ou e-mail..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-background pl-10"
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-48 bg-background">
            <SelectValue placeholder="Filtrar por papel" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os papéis</SelectItem>
            <SelectItem value="admin">Administradores</SelectItem>
            <SelectItem value="moderator">Moderadores</SelectItem>
            <SelectItem value="candidato">Candidatos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Users Table */}
      <div className="rounded-xl bg-card border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="p-4 text-left font-medium">Nome</th>
                <th className="p-4 text-left font-medium">E-mail</th>
                <th className="p-4 text-left font-medium">Papéis</th>
                <th className="p-4 text-left font-medium">Data de Registo</th>
                <th className="p-4 text-left font-medium">Acções</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-primary" />
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">
                    Nenhum utilizador encontrado
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-t border-border hover:bg-muted/30">
                    <td className="p-4 font-medium">{user.full_name || "-"}</td>
                    <td className="p-4 text-muted-foreground">{user.email}</td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {user.roles.length === 0 ? (
                          <span className="text-muted-foreground text-xs">Sem papéis</span>
                        ) : (
                          user.roles.map((role) => (
                            <Badge
                              key={role}
                              className={`${roleColors[role]} cursor-pointer hover:opacity-80`}
                              onClick={() => {
                                setSelectedUser(user);
                                setRoleToRemove(role);
                                setShowRemoveRoleDialog(true);
                              }}
                            >
                              {roleLabels[role]}
                              <UserX className="w-3 h-3 ml-1" />
                            </Badge>
                          ))
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground">
                      {new Date(user.created_at).toLocaleDateString("pt-AO")}
                    </td>
                    <td className="p-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedUser(user);
                          setShowRoleDialog(true);
                        }}
                      >
                        <Shield className="w-4 h-4 mr-2" />
                        Adicionar Papel
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Role Dialog */}
      <AlertDialog open={showRoleDialog} onOpenChange={setShowRoleDialog}>
        <AlertDialogContent className="bg-card">
          <AlertDialogHeader>
            <AlertDialogTitle>Adicionar Papel</AlertDialogTitle>
            <AlertDialogDescription>
              Seleccione o papel a atribuir a {selectedUser?.full_name || selectedUser?.email}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Select value={newRole} onValueChange={setNewRole}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Seleccionar papel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Administrador</SelectItem>
              <SelectItem value="moderator">Moderador</SelectItem>
              <SelectItem value="candidato">Candidato</SelectItem>
            </SelectContent>
          </Select>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={addRole} disabled={!newRole}>
              Atribuir Papel
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Remove Role Dialog */}
      <AlertDialog open={showRemoveRoleDialog} onOpenChange={setShowRemoveRoleDialog}>
        <AlertDialogContent className="bg-card">
          <AlertDialogHeader>
            <AlertDialogTitle>Remover Papel</AlertDialogTitle>
            <AlertDialogDescription>
              Tem a certeza que deseja remover o papel "{roleLabels[roleToRemove]}" de{" "}
              {selectedUser?.full_name || selectedUser?.email}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={removeRole} className="bg-destructive hover:bg-destructive/90">
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
