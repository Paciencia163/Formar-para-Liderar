import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Lock } from "lucide-react";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ 
          email, 
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` }
        });
        if (error) throw error;
        toast.success("Conta criada! Agora pode fazer login.");
        setIsSignUp(false);
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        
        const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", data.user.id);
        if (!roles?.some(r => r.role === "admin")) {
          await supabase.auth.signOut();
          throw new Error("Acesso não autorizado. Contacte o administrador.");
        }
        toast.success("Login efectuado com sucesso!");
        navigate("/admin/dashboard");
      }
    } catch (error: any) {
      toast.error(error.message || "Erro ao processar");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-600 to-amber-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Lock className="w-8 h-8 text-black" />
          </div>
          <h1 className="font-serif text-3xl font-bold">Área Administrativa</h1>
          <p className="text-muted-foreground mt-2">FORMAR PARA LIDERAR</p>
        </div>
        <form onSubmit={handleAuth} className="p-8 rounded-2xl bg-card border border-border space-y-6">
          <Input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} className="bg-background" required />
          <Input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} className="bg-background" required />
          <Button type="submit" variant="gold" className="w-full" disabled={isLoading}>
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            {isSignUp ? "Criar Conta" : "Entrar"}
          </Button>
          <button type="button" onClick={() => setIsSignUp(!isSignUp)} className="w-full text-sm text-muted-foreground hover:text-primary">
            {isSignUp ? "Já tem conta? Fazer login" : "Criar nova conta"}
          </button>
        </form>
      </div>
    </div>
  );
}
