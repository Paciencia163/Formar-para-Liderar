const stats = [
  { value: "500+", label: "Bolseiros", description: "estudantes apoiados" },
  { value: "18", label: "Províncias", description: "em todo o país" },
  { value: "95%", label: "Taxa de Sucesso", description: "conclusão dos cursos" },
  { value: "10+", label: "Anos de Impacto", description: "transformando vidas" },
];

export function StatsSection() {
  return (
    <section className="py-20 bg-card border-y border-border relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(45,70%,50%,0.05)_0%,_transparent_70%)]" />
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center group animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="font-serif text-5xl md:text-6xl font-bold text-gradient-gold group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-foreground font-semibold mt-2">{stat.label}</div>
              <div className="text-muted-foreground text-sm mt-1">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
