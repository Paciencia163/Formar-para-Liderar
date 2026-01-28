import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2, GraduationCap, Mail, Lock, User, ArrowLeft } from "lucide-react";
import { Layout } from "@/components/layout/Layout";

export default function CandidatoLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      navigate("/candidato/perfil");
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ 
          email, 
          password,
          options: { 
            emailRedirectTo: `${window.location.origin}/candidato/perfil`,
            data: { full_name: fullName }
          }
        });
        if (error) throw error;
        toast.success("Conta criada com sucesso! Pode agora fazer login.");
        setIsSignUp(false);
        setPassword("");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Login efectuado com sucesso!");
        navigate("/candidato/perfil");
      }
    } catch (error: any) {
      toast.error(error.message || "Erro ao processar");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <section className="min-h-[80vh] flex items-center justify-center py-24 bg-gradient-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8">
              <ArrowLeft className="w-4 h-4" /> Voltar ao Início
            </Link>
            
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <GraduationCap className="w-8 h-8 text-primary" />
              </div>
              <h1 className="font-serif text-3xl font-bold">
                {isSignUp ? "Criar Conta" : "Entrar"}
              </h1>
              <p className="text-muted-foreground mt-2">
                {isSignUp 
                  ? "Registe-se para submeter a sua candidatura" 
                  : "Aceda à sua conta para gerir candidaturas"}
              </p>
            </div>

            <form onSubmit={handleAuth} className="p-8 rounded-2xl bg-card border border-border space-y-6">
              {isSignUp && (
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input 
                    placeholder="Nome completo" 
                    value={fullName} 
                    onChange={e => setFullName(e.target.value)} 
                    className="bg-background pl-11" 
                    required 
                  />
                </div>
              )}
              
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  type="email" 
                  placeholder="E-mail" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  className="bg-background pl-11" 
                  required 
                />
              </div>
              
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  type="password" 
                  placeholder="Senha" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  className="bg-background pl-11" 
                  required 
                  minLength={6}
                />
              </div>

              <Button type="submit" variant="gold" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                {isSignUp ? "Criar Conta" : "Entrar"}
              </Button>

              <div className="text-center">
                <button 
                  type="button" 
                  onClick={() => setIsSignUp(!isSignUp)} 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {isSignUp ? "Já tem conta? Fazer login" : "Não tem conta? Criar agora"}
                </button>
              </div>
            </form>

            <p className="text-center text-xs text-muted-foreground mt-6">
              Ao criar conta, concorda com os nossos termos e política de privacidade.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
