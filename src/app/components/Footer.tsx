"use client";

import NextImage from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Navegación",
      links: [
        { name: "Inicio", href: "#inicio" },
        { name: "Proyectos", href: "#proyectos" },
        { name: "Sobre mí", href: "#sobre-mi" },
        { name: "Servicios", href: "#servicios" },
        { name: "Contacto", href: "#contacto" },
      ],
    },
    {
      title: "Servicios",
      links: [
        { name: "Diseño UI/UX", href: "#servicios" },
        { name: "Desarrollo Frontend", href: "#servicios" },
        { name: "Consultoría UX", href: "#servicios" },
        { name: "Design Systems", href: "#servicios" },
      ],
    },
    {
      title: "Conecta",
      links: [
        {
          name: "LinkedIn",
          href: "https://www.linkedin.com/in/gh0nt/",
          external: true,
        },
        { name: "GitHub", href: "https://github.com/gh0nt", external: true },
        {
          name: "WhatsApp",
          href: "https://wa.me/573115315662",
          external: true,
        },
      ],
    },
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="py-16 px-4 border-t border-glass-border">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                <NextImage
                  src="/marcelologo.svg"
                  alt="Marcelo Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
              </div>
              <span className="font-semibold text-lg">Marcelo Puentes</span>
            </div>
            <p className="text-foreground-secondary text-sm leading-relaxed max-w-sm">
              Arquitectura de producto que conecta con las personas, marketing
              que genera recordación.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-foreground-muted">
                <span>contacto@marcelopuentes.com</span>
              </div>
              <div className="flex items-center gap-2 text-foreground-muted">
                <span>Bogotá, Colombia</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <div key={index} className="space-y-4">
              <h4 className="font-semibold text-foreground">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-foreground-secondary hover:text-primary transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-glass-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-foreground-muted text-sm">
              © {currentYear} Marcelo Puentes. Todos los derechos reservados.
            </div>

            <div className="flex items-center gap-6 text-sm">
              <button className="text-foreground-muted hover:text-primary transition-colors">
                Política de Privacidad
              </button>
              <button className="text-foreground-muted hover:text-primary transition-colors">
                Términos de Uso
              </button>
              <button className="text-foreground-muted hover:text-primary transition-colors">
                Cookies
              </button>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => scrollToSection("#inicio")}
            className="glass-button p-3 rounded-full hover:scale-110 transition-transform"
            aria-label="Volver arriba"
          >
            <span className="text-lg">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
