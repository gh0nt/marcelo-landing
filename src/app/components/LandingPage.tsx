"use client";
import Navigation from "@/app/components/Navigation";
import HeroSection from "@/app/components/HeroSection";
import AboutSection from "@/app/components/AboutSection";
import ServiceSection from "@/app/components/ServiceSection";
import ProjectSection from "@/app/components/ProjectSection";
import ClientsSection from "@/app/components/ClientsSection";
import ContactForm from "@/app/components/ContactForm";
import Footer from "@/app/components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* About Section */}
        <AboutSection />

        {/* Services Section */}
        <ServiceSection />

        {/* Projects/Portfolio Section */}
        <ProjectSection />

        {/* Clients/Testimonials Section */}
        <ClientsSection />

        {/* Contact Form */}
        <ContactForm />
      </main>

      <Footer />
    </div>
  );
}
