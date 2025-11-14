"use client";
import { useState } from "react";
import ProjectCard from "./ProjectCard";
import { Button } from "@/app/components/ui/button";

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState("todos");

  const filters = [
    { id: "todos", name: "Todos" },
    { id: "web", name: "Web Design" },
    { id: "mobile", name: "Mobile" },
    { id: "branding", name: "Branding" },
  ];

  const projects = [
    {
      id: 1,
      title: "AltProExpo Website",
      description:
        "Desarrollo completo de experiencia de usuario para la plataforma AltproExpo con enfoque mobile-first y optimización SEO.",
      image: "/projects/altproexpo.png",
      tags: [
        "WordPress",
        "HTML",
        "VueJS",
        "Hubspot",
        "WooCommerce",
        "Automations",
        "Airtable",
      ],
      category: "web",
      featured: true,
      demoUrl: "https://altproexpo.com/",
    },
    {
      id: 2,
      title: "Consuerte Website",
      description:
        "Desarrollo web y Aplicación móvil para consultas de premios tipo chance en tiempo real.",
      image: "/projects/consuertelogo.png",
      tags: ["WordPress", "Node.js", "MySQL", "NextJS", "PHP"],
      category: "mobile",
      demoUrl: "https://consuerte.com.co/",
    },
    {
      id: 3,
      title: "Front2Back Website",
      description:
        "Desarrollo Web completo para la plataforma Front2Back con enfoque en la experiencia del usuario.",
      image: "/projects/front2backlogo.png",
      tags: ["WordPress", "PHP", "Hubspot", "Automations"],
      category: "branding",
      demoUrl: "https://front2back.co/",
    },
    {
      id: 4,
      title: "Ángel Global ADS Landing Page",
      description:
        "Landing Page para la plataforma Ángel Global ADS con enfoque en la experiencia del usuario.",
      image: "/projects/angel-global-ads.png",
      tags: ["NextJS", "PostgreSQL"],
      category: "branding",
      demoUrl: "https://angel-ads-global.com/",
    },
  ];

  const filteredProjects =
    activeFilter === "todos"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <section id="proyectos" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Proyectos <span className="gradient-text">Destacados</span>
          </h2>
          <p className="text-foreground-secondary text-lg max-w-2xl mx-auto mb-8">
            Una selección de trabajos que demuestran mi enfoque en crear
            experiencias digitales excepcionales y soluciones centradas en el
            usuario.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-scale-in">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              variant={activeFilter === filter.id ? "default" : "outline"}
              className={`
                px-6 py-2 rounded-full font-medium transition-all duration-200
                ${
                  activeFilter === filter.id
                    ? "bg-primary text-primary-foreground glow-primary"
                    : "glass-button border-glass-border hover:border-primary/50"
                }
              `}
            >
              {filter.name}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  tags={project.tags}
                  demoUrl={project.demoUrl}
                  featured={project.featured}
                />
              </a>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-foreground-secondary mb-6">
            ¿Te gustó lo que viste? Estos son solo algunos ejemplos.
          </p>
          <Button
            onClick={() =>
              document
                .getElementById("contacto")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="glass-button border-glass-border hover:border-primary/50 px-8 py-3 font-medium"
          >
            Crear proyecto
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
