import { Layout } from "@/components/layout/Layout";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

export default function Contactos() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success("Mensagem enviada com sucesso!");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Layout>
      <section className="py-24 bg-gradient-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up">
              <span className="text-gradient-gold">Contactos</span>
            </h1>
            <p className="text-xl text-muted-foreground animate-fade-in-up animation-delay-200">
              Entre em contacto connosco. Estamos aqui para ajudar.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="space-y-8">
              <h2 className="font-serif text-3xl font-bold">Fale Connosco</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border">
                  <Mail className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">E-mail</h3>
                    <p className="text-muted-foreground">info@formarparaliderar.ao</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border">
                  <Phone className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Telefone</h3>
                    <p className="text-muted-foreground">+244 922 812 244</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border">
                  <MapPin className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Localização</h3>
                    <p className="text-muted-foreground">Luanda, Angola</p>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-card border border-border space-y-6">
              <h2 className="font-serif text-2xl font-bold">Envie uma Mensagem</h2>
              <div className="grid gap-4">
                <Input placeholder="Nome completo" required className="bg-background" />
                <Input type="email" placeholder="E-mail" required className="bg-background" />
                <Input placeholder="Assunto" required className="bg-background" />
                <Textarea placeholder="Mensagem" rows={5} required className="bg-background" />
              </div>
              <Button type="submit" variant="gold" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "A enviar..." : "Enviar Mensagem"}
                <Send className="ml-2 w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
