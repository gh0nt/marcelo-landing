"use client";

import { useRouter, usePathname } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { Button } from "@/app/components/ui/button";
import { Globe } from "lucide-react";

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const switchLanguage = (newLocale: string) => {
    router.push(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-foreground-muted" />
      <div className="flex bg-background-secondary rounded-lg p-1">
        <Button
          onClick={() => switchLanguage("es")}
          variant="ghost"
          size="sm"
          className={`px-3 py-1 rounded text-sm font-medium transition-all ${
            locale === "es"
              ? "bg-primary text-primary-foreground"
              : "text-foreground-muted hover:text-foreground"
          }`}
        >
          ES
        </Button>
        <Button
          onClick={() => switchLanguage("en")}
          variant="ghost"
          size="sm"
          className={`px-3 py-1 rounded text-sm font-medium transition-all ${
            locale === "en"
              ? "bg-primary text-primary-foreground"
              : "text-foreground-muted hover:text-foreground"
          }`}
        >
          EN
        </Button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
