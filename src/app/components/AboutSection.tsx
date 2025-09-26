import { Badge } from "@/app/components/ui/badge";

const AboutSection = () => {
  const skills = [
    "UI/UX Design",
    "Figma",
    "NextJS",
    "WordPress",
    "User Research",
    "Design Systems",
    "Software Development",
    "Accessibility",
    "React",
    "Facebook Ads & Google Ads",
    "TypeScript",
    "Tailwind CSS",
    "3D Model Web Integration",
  ];

  const experience = [
    {
      period: "2025 - Presente",
      title: "Web Developer",
      company: "ZJ Events",
      description:
        "Desarrollando y dando soporte a diseños UI/UX para sitios web, aprovechando PHP y WordPress para mejorar la experiencia y funcionalidad del usuario. Integración de aplicaciones, gestión de API y tareas de servidor.",
    },
    {
      period: "2024 - 2025",
      title: "Software Engineer",
      company: "Manager SAS",
      description:
        "Desarrollo y soporte a aplicaciones web internas, páginas web en WordPress utilizando PHP, y automatización de procesos de marketing y ventas con herramientas no-code.",
    },
    {
      period: "2023 - 2024",
      title: "Analista de Datos",
      company:
        "Centro de Investigación y Pensamiento para los Llanos Orientales",
      description:
        "Responsable de implementar validación de datos y corrección en procesos de encuestas, direccionamiento y respuestas utilizando Stata como herramienta primaria.",
    },
  ];

  const achievements = [
    { number: "10+", label: "Proyectos Completados" },
    {
      number: `${new Date().getFullYear() - 2022}`,
      label: "Años de Experiencia",
    },
    { number: "98%", label: "Satisfacción del Cliente" },
    { number: "4", label: "Clientes Satisfechos" },
  ];

  return (
    <section id="sobre-mi" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Sobre <span className="gradient-text">mí</span>
          </h2>
          <p className="text-foreground-secondary text-lg max-w-3xl mx-auto">
            Soy profesional en Mercadeo y especialista en Ingeniería de
            Software. Combino la visión estratégica del marketing con el
            pensamiento lógico y técnico del desarrollo, lo que me permite
            diseñar y escalar réplicas digitales de negocios. Mi enfoque une
            creatividad, datos y tecnología para transformar ideas en productos
            digitales funcionales, sostenibles y con impacto real.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Story */}
          <div className="space-y-8 animate-fade-up">
            <div className="glass-card p-8 space-y-6">
              <h3 className="text-2xl font-semibold mb-4">Mi Historia</h3>

              <p className="text-foreground-secondary leading-relaxed">
                Desde que tengo uso de razón, la curiosidad me ha llevado a
                buscar un conocimiento integral. Empecé en el camino de la
                ingeniería, que no llegué a terminar; más tarde me adentré en
                los negocios y su lógica; y finalmente encontré mi verdadera
                pasión en el desarrollo, retomando aquel interés de niño por las
                computadoras.
              </p>

              <p className="text-foreground-secondary leading-relaxed">
                En los últimos años de mi carrera como mercadólogo, me hice una
                pregunta clave: ¿Cuál sería el producto capaz de funcionar sin
                depender de una constante presencia humana? Esa reflexión me
                impulsó a integrar la tecnología en cada etapa de mi quehacer
                profesional, desde la idea inicial hasta la implementación
                final.
              </p>

              <p className="text-foreground-secondary leading-relaxed">
                Los fracasos y errores del camino se convirtieron en
                aprendizajes que hoy afinan mi alcance. Gracias a esa
                experiencia, no solo ofrezco un servicio profesional, sino
                también un valor agregado integral para cada proyecto… e
                incluso, en algunos casos, para la vida misma.
              </p>
            </div>

            {/* Skills */}
            <div className="glass-card p-8">
              <h3 className="text-xl font-semibold mb-6">
                Habilidades & Herramientas
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <Badge
                    key={index}
                    className="glass-button text-sm py-1 px-3 font-medium"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Experience & Stats */}
          <div className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 animate-scale-in">
              {achievements.map((stat, index) => (
                <div key={index} className="glass-card p-6 text-center">
                  <div className="text-2xl md:text-3xl font-bold gradient-text mb-2">
                    {stat.number}
                  </div>
                  <div className="text-foreground-secondary text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Experience Timeline */}
            <div
              className="glass-card p-8 animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              <h3 className="text-xl font-semibold mb-8">
                Experiencia Profesional
              </h3>

              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <div key={index} className="relative">
                    {/* Timeline line */}
                    {index < experience.length - 1 && (
                      <div className="absolute left-4 top-8 bottom-0 w-px bg-glass-border"></div>
                    )}

                    <div className="flex gap-4">
                      {/* Timeline dot */}
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>

                      <div className="space-y-2">
                        <div className="text-foreground-muted text-sm font-medium">
                          {exp.period}
                        </div>
                        <h4 className="font-semibold text-foreground">
                          {exp.title}
                        </h4>
                        <div className="text-primary text-sm font-medium">
                          {exp.company}
                        </div>
                        <p className="text-foreground-secondary text-sm leading-relaxed">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
