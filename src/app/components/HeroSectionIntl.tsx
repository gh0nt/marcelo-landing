"use client";

import { Button } from "@/app/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import heroProfile from "@/app/assets/hero-profile.png";
import { useTranslations } from "next-intl";
import Image from "next/image";

const HeroSection = () => {
  const t = useTranslations("hero");

  const scrollToSection = (selector: string) => {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Content Side */}
        <div className="space-y-8 animate-fade-up">
          {/* Greeting & Name */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-foreground-muted text-lg font-medium">
                {t("greeting")}
              </span>
              <div className="h-px bg-gradient-to-r from-primary to-transparent flex-1"></div>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold">
              {t("name")}
            </h1>

            <div className="space-y-2">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground-secondary">
                {t("title")}
              </h2>
              <p className="text-lg md:text-xl gradient-text font-medium">
                {t("subtitle")}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-foreground-secondary text-lg leading-relaxed max-w-xl">
            {t("description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              onClick={() => scrollToSection("#proyectos")}
              className="btn-primary font-medium px-8 py-3 rounded-lg transition-all duration-300 group hover:scale-105"
            >
              {t("viewProjects")}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              onClick={() => scrollToSection("#sobre-mi")}
              variant="outline"
              className="glass-card border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/30 px-8 py-3 font-medium rounded-lg transition-all duration-300 group hover:scale-105"
            >
              {t("aboutMe")}
              <ExternalLink className="ml-2 w-4 h-4 group-hover:scale-110 transition-transform" />
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4 pt-6">
            <span className="text-foreground-muted text-sm font-medium">
              {t("connectWithMe")}
            </span>
            <div className="flex space-x-3">
              {[
                { name: "GitHub", icon: "🔗" },
                { name: "LinkedIn", icon: "💼" },
                { name: "Dribbble", icon: "🎨" },
                { name: "X", icon: "🐦" },
              ].map((social) => (
                <button
                  key={social.name}
                  className="glass-button w-10 h-10 flex items-center justify-center rounded-lg hover:scale-110 transition-transform"
                  aria-label={social.name}
                >
                  <span className="text-sm">{social.icon}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Profile Image with Glass Frame */}
        <div className="relative animate-scale-in">
          <div className="glass-card p-8 rounded-3xl relative overflow-hidden">
            {/* Floating UI Elements */}
            <div className="absolute -top-2 -right-2 glass-button px-3 py-1 rounded-full text-xs font-medium animate-float">
              {t("hello")}
            </div>

            <div className="absolute -bottom-2 -left-2 glass-button px-3 py-1 rounded-full text-xs font-medium animate-float-delayed">
              {t("experience")}
            </div>

            {/* Profile Image */}
            <div className="w-72 h-72 mx-auto bg-gradient-to-br from-primary/20 to-background-secondary rounded-2xl flex items-center justify-center relative overflow-hidden">
              <Image
                src={heroProfile}
                alt={`${t("name")} - ${t("title")}`}
                width={240}
                height={240}
                className="w-60 h-60 object-cover rounded-xl"
                priority
              />
            </div>
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
