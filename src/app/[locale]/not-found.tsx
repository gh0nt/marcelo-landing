"use client";

import { Link } from "@/i18n/routing";
import { Button } from "@/app/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import FloatingDots from "@/app/components/FloatingDots";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <FloatingDots />

      <div className="max-w-2xl mx-auto text-center space-y-8 relative z-10 animate-fade-up">
        {/* 404 Number with gradient */}
        <div className="space-y-4">
          <h1 className="text-[150px] md:text-[200px] font-bold leading-none gradient-text animate-pulse-slow">
            404
          </h1>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-primary-orange to-transparent rounded-full"></div>
        </div>

        {/* Message */}
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {useTranslations("notFound")("title")}
          </h2>
          <p className="text-lg md:text-xl text-foreground-secondary max-w-md mx-auto leading-relaxed">
            {useTranslations("notFound")("description")}
          </p>
        </div>

        {/* Glass card with suggestions */}
        <div className="glass-card p-6 md:p-8 max-w-md mx-auto space-y-4">
          <div className="flex items-center gap-3 text-foreground-secondary">
            <Search className="w-5 h-5 text-primary-orange" />
            <p className="text-sm text-left">
              {useTranslations("notFound")("suggestions")}
            </p>
          </div>
          <ul className="text-sm text-left space-y-2 text-foreground-secondary pl-8">
            <li className="list-disc">
              {useTranslations("notFound")("suggestion1")}
            </li>
            <li className="list-disc">
              {useTranslations("notFound")("suggestion2")}
            </li>
            <li className="list-disc">
              {useTranslations("notFound")("suggestion3")}
            </li>
          </ul>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link href="/">
            <Button className="btn-primary font-medium px-8 py-3 rounded-lg transition-all duration-300 group hover:scale-105 w-full sm:w-auto">
              <Home className="mr-2 w-4 h-4" />
              {useTranslations("notFound")("goHome")}
            </Button>
          </Link>

          <Button
            onClick={() => window.history.back()}
            variant="outline"
            className="glass-card border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/30 px-8 py-3 font-medium rounded-lg transition-all duration-300 group hover:scale-105 w-full sm:w-auto"
          >
            <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {useTranslations("notFound")("goBack")}
          </Button>
        </div>

        {/* Fun message */}
        <p className="text-sm text-foreground-muted pt-8 animate-fade-in">
          {useTranslations("notFound")("funMessage")}
        </p>
      </div>
    </div>
  );
}
