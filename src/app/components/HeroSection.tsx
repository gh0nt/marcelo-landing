"use client";

import { Button } from "@/app/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import FloatingDots from "./FloatingDots";
import Marcelo3DViewer from "./Marcelo3DViewer";

const HeroSection = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="inicio"
      className="min-h-screen flex items-center justify-center px-4 pt-20 relative"
    >
      <FloatingDots />

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Text Content */}
        <div className="space-y-6 animate-fade-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Marketing y Desarrollo <br></br>
            <span className="gradient-text">Que convierten</span>
          </h1>

          <p className="text-foreground-secondary text-lg md:text-xl leading-relaxed max-w-lg">
            Diseño experiencias de cliente que guían la compra y construyo
            interfaces intuitivas, basadas en datos y centradas en el usuario,
            para elevar el engagement y el valor del producto digital.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              onClick={() => scrollToSection("#proyectos")}
              className="btn-primary font-medium px-8 py-3 rounded-lg transition-all duration-300 group hover:scale-105"
            >
              Ver Proyectos
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              onClick={() => scrollToSection("#sobre-mi")}
              variant="outline"
              className="glass-card border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/30 px-8 py-3 font-medium rounded-lg transition-all duration-300 group hover:scale-105"
            >
              Sobre mí
              <ExternalLink className="ml-2 w-4 h-4 group-hover:scale-110 transition-transform" />
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4 pt-6">
            <span className="text-foreground-muted text-sm font-medium">
              CONÉCTATE CONMIGO
            </span>
            <div className="flex space-x-3">
              {[
                {
                  name: "GitHub",
                  icon: "/contact/github.svg",
                  url: "https://github.com/gh0nt",
                },
                {
                  name: "LinkedIn",
                  icon: "/contact/linkedin.svg",
                  url: "https://linkedin.com/in/gh0nt",
                },
                {
                  name: "WhatsApp",
                  icon: "/contact/whatsapp.svg",
                  url: "https://wa.me/573115315662",
                },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-button w-10 h-10 flex items-center justify-center rounded-lg hover:scale-110 transition-transform"
                  aria-label={`Visit ${social.name} profile`}
                >
                  <Image
                    src={social.icon}
                    alt={social.name}
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Profile 3D Model with Glass Frame */}
        <div className="relative animate-scale-in">
          <div className="glass-card p-8 rounded-3xl relative overflow-hidden">
            {/* Floating UI Elements */}
            <div className="absolute -top-2 -right-2 glass-button px-3 py-1 rounded-full text-xs font-medium animate-float">
              Hola, soy Marcelo 👋
            </div>

            <div className="absolute -bottom-2 -left-2 glass-button px-3 py-1 rounded-full text-xs font-medium animate-float-delayed">
              Marketer y Web Developer
            </div>

            {/* 3D Model */}
            <Marcelo3DViewer />
          </div>

          {/* Mobile Device Frame */}
          <div className="absolute -bottom-8 -right-8 w-32 h-56 glass-card rounded-2xl p-1 animate-float-slow hidden md:block">
            <div className="w-full h-full bg-background-secondary rounded-xl p-3">
              <div className="text-xs mb-2">📱 Mobile First</div>
              <div className="space-y-2">
                <div className="h-1 bg-primary rounded w-3/4"></div>
                <div className="h-1 bg-foreground-muted rounded w-1/2"></div>
                <div className="h-8 bg-primary/20 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
