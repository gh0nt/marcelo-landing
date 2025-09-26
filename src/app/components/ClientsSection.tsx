const ClientsSection = () => {
  // Placeholder client logos - would be replaced with actual client logos
  const clients = [
    { name: "Manager SAS", logo: "/clients/manager.svg" },
    { name: "GreenByte Studios", logo: "/clients/greenbyte.svg" },
    { name: "Unillanos", logo: "/clients/unillanos.svg" },
    { name: "Consuerte", logo: "/clients/consuerte.svg" },
    { name: "LegacyFinancial", logo: "/clients/legacyfinancial.svg" },
    { name: "Allstar Lending", logo: "/clients/allstar.svg" },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-up">
          <h3 className="text-lg font-medium text-foreground-muted mb-4">
            MIS COLABORACIONES RECIENTES
          </h3>
          <h2 className="text-2xl md:text-3xl font-semibold">
            Colaboraciones que{" "}
            <span className="gradient-text">dieron vida a las ideas</span>
          </h2>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 animate-scale-in">
          {clients.map((client, index) => (
            <div
              key={index}
              className="glass-card p-6 flex items-center justify-center hover:shadow-elevated transition-all duration-300 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-center">
                <div className="mb-2 group-hover:scale-110 transition-transform flex items-center justify-center">
                  <img
                    src={client.logo}
                    alt={`${client.name} logo`}
                    className="h-8 w-auto max-w-full object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="text-xs font-medium text-foreground-muted">
                  {client.name}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div
          className="mt-16 glass-card p-8 max-w-4xl mx-auto text-center animate-fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          <blockquote className="text-lg md:text-xl text-foreground-secondary leading-relaxed mb-6">
            &ldquo;El trabajo de Marcelo transformó completamente nuestra
            plataforma. Su enfoque centrado en el usuario y atención al detalle
            resultaron en una mejora de producto.&rdquo;
          </blockquote>

          <div className="flex items-center justify-center gap-4">
            <div className="text-left">
              <div className="font-semibold">Carlos Martínez</div>
              <div className="text-foreground-muted text-sm">
                CEO, Vantage Tech
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
