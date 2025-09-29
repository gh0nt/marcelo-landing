"use client";
import { useState, useRef } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app//components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Label } from "@/app/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Send } from "lucide-react";
import { useSnackbar } from "notistack";
import ReCAPTCHA from "react-google-recaptcha";
import ClientOnly from "@/app/components/ClientOnly";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validar reCAPTCHA solo si está configurado
    const isRecaptchaEnabled = !!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

    if (isRecaptchaEnabled && !recaptchaToken) {
      enqueueSnackbar("Por favor, completa la verificación reCAPTCHA.", {
        variant: "error",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        enqueueSnackbar(
          "¡Mensaje enviado! Gracias por contactarme. Te responderé pronto.",
          {
            variant: "success",
          }
        );
        setFormData({ name: "", email: "", subject: "", message: "" });
        setRecaptchaToken(null);
        recaptchaRef.current?.reset();
      } else {
        enqueueSnackbar(
          result.error ||
            "Error al enviar el mensaje. Por favor, intenta de nuevo.",
          {
            variant: "error",
          }
        );
      }
    } catch (error) {
      console.error("Error:", error);
      enqueueSnackbar(
        "Error de conexión. Por favor, verifica tu conexión a internet e intenta de nuevo.",
        {
          variant: "error",
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contacto" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para crear algo{" "}
            <span className="gradient-text">increíble</span>?
          </h2>
          <p className="text-foreground-secondary text-lg max-w-2xl mx-auto">
            Conversemos sobre tu próximo proyecto. Estoy aquí para ayudarte a
            maquetar tus ideas en sistemas.
          </p>
        </div>

        <div className="glass-card p-8 animate-scale-in">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Nombre completo *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="glass-button border-glass-border focus:border-primary"
                  placeholder="Tu nombre"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="glass-button border-glass-border focus:border-primary"
                  placeholder="tu@email.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject" className="text-sm font-medium">
                Tipo de proyecto
              </Label>
              <ClientOnly
                fallback={
                  <div className="h-10 w-full rounded-md border border-glass-border bg-glass-bg animate-pulse" />
                }
              >
                <Select
                  value={formData.subject}
                  onValueChange={(value) => handleChange("subject", value)}
                >
                  <SelectTrigger className="glass-button border-glass-border focus:border-primary">
                    <SelectValue placeholder="Selecciona el tipo de proyecto" />
                  </SelectTrigger>
                  <SelectContent
                    className="glass-card border-glass-border"
                    position="popper"
                    side="bottom"
                    align="start"
                    sideOffset={4}
                    avoidCollisions={true}
                    collisionPadding={8}
                  >
                    <SelectItem value="web-design">Diseño UI/UX</SelectItem>
                    <SelectItem value="app-design">
                      Desarrollo Web WordPress o NextJS
                    </SelectItem>
                    <SelectItem value="consultation">Consultoría UX</SelectItem>
                    <SelectItem value="other">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </ClientOnly>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-medium">
                Mensaje *
              </Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                className="glass-button border-glass-border focus:border-primary min-h-[120px]"
                placeholder="Cuéntame sobre tu proyecto..."
                required
              />
            </div>

            {/* reCAPTCHA */}
            <div className="flex justify-center">
              <ClientOnly
                fallback={
                  <div className="w-[304px] h-[78px] rounded border border-glass-border bg-glass-bg animate-pulse flex items-center justify-center">
                    <div className="text-sm text-muted-foreground">
                      Cargando verificación...
                    </div>
                  </div>
                }
              >
                {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? (
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                    onChange={setRecaptchaToken}
                    onExpired={() => setRecaptchaToken(null)}
                    theme="dark"
                  />
                ) : (
                  <div className="w-[304px] h-[78px] rounded border border-dashed border-gray-400 bg-gray-100 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">
                        🔒 Verificación de Seguridad
                      </div>
                      <div className="text-xs text-gray-500">
                        reCAPTCHA no configurado
                      </div>
                    </div>
                  </div>
                )}
              </ClientOnly>
            </div>

            <Button
              type="submit"
              disabled={
                isSubmitting ||
                (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
                  ? !recaptchaToken
                  : false)
              }
              className="w-full btn-primary font-medium py-3 rounded-lg transition-all duration-300 group hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                  Enviando...
                </>
              ) : (
                <>
                  Enviar mensaje
                  <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          {/* Contact Info */}
          <div className="mt-8 pt-8 border-t border-glass-border">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <div className="text-sm font-medium">Email</div>
                <div className="text-foreground-secondary">
                  contacto@marcelopuentes.com
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">WhatsApp</div>
                <div className="text-foreground-secondary">
                  +57 311 531 5662
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">Ubicación</div>
                <div className="text-foreground-secondary">
                  Bogotá, Colombia
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
