"use client";

import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      title: "Diseño UI/UX",
      description:
        "Interfaces intuitivas y experiencias de usuario excepcionales que convierten visitantes en clientes.",
      features: [
        "Research y análisis de usuarios",
        "Wireframes y prototipos interactivos",
        "Diseño visual y sistema de componentes",
        "Testing de usabilidad",
      ],
      price: "Desde 400.000COP",
      popular: false,
    },
    {
      title: "Desarrollo Web WP o NextJS",
      description:
        "Implementación técnica de diseños con código limpio, optimizado y escalable.",
      features: [
        "NextJS development",
        "WordPress/Vue.js development",
        "Responsive design garantizado",
        "Optimización de rendimiento",
        "Integración con APIs y servicios",
        "Dominio y Hosting incluidos",
      ],
      price: "Desde 800.000COP",
      popular: false,
    },
    {
      title: "Consultoría UX",
      description:
        "Auditoría completa de tu producto digital con recomendaciones estratégicas para mejorar la experiencia.",
      features: [
        "Auditoría UX completa",
        "Análisis de métricas y conversión",
        "Auditoría de Marketing",
        "Documento de implementación de mejoras prioritarias",
      ],
      price: "Desde 80.000COP",
      popular: true,
    },
  ];

  const scrollToContact = () => {
    const element = document.querySelector("#contacto");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="servicios" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Mis <span className="gradient-text">Servicios</span>
          </h2>
          <p className="text-foreground-secondary text-lg max-w-2xl mx-auto">
            Transformo ideas en experiencias digitales excepcionales. Desde el
            concepto inicial hasta la implementación final.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <div
              key={index}
              className={`
                glass-card p-8 relative transition-all duration-300 hover:shadow-elevated animate-fade-up h-full flex flex-col
                ${service.popular ? "ring-2 ring-primary/20" : ""}
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {service.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge
                    className="text-black font-semibold px-4 py-1 shadow-lg border-none"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--primary-orange), #ff9454)",
                      boxShadow: "0 4px 14px rgba(255, 123, 44, 0.25)",
                    }}
                  >
                    Más Popular
                  </Badge>
                </div>
              )}

              <div className="flex flex-col h-full">
                {/* Service Header */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">
                    {service.title}
                  </h3>
                  <p className="text-foreground-secondary text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-3 flex-grow mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground-secondary text-sm">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price */}
                <div className="pt-4 border-t border-glass-border mt-auto">
                  <div className="text-2xl font-bold gradient-text mb-4">
                    {service.price}
                  </div>

                  <Button
                    onClick={scrollToContact}
                    className={`
                      w-full font-medium py-2 rounded-lg transition-all duration-200 group glass-button border-glass-border hover:border-primary/50 text-white
                    `}
                  >
                    Comenzar proyecto
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="glass-card p-8 text-center animate-scale-in">
          <h3 className="text-2xl font-semibold mb-4">
            ¿Necesitas algo personalizado?
          </h3>
          <p className="text-foreground-secondary mb-6 max-w-2xl mx-auto">
            Cada proyecto es único. Si tienes necesidades específicas o quieres
            combinar varios servicios, conversemos para crear una propuesta a
            medida.
          </p>
          <Button
            onClick={scrollToContact}
            className="glass-button border-glass-border hover:border-primary/50 px-8 py-3 font-medium"
          >
            Solicitar cotización personalizada
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
