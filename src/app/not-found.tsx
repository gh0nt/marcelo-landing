"use client";

import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";
import FloatingDots from "@/app/components/FloatingDots";
import { routing } from "@/i18n/routing";

// Root-level 404 page (when no locale is matched)
export default function RootNotFound() {
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
            Page Not Found
          </h2>
          <p className="text-lg md:text-xl text-foreground-secondary max-w-md mx-auto leading-relaxed">
            Oops! It seems you&apos;ve ventured into uncharted territory. The
            page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        {/* Glass card with suggestions */}
        <div className="glass-card p-6 md:p-8 max-w-md mx-auto space-y-4">
          <div className="flex items-center gap-3 text-foreground-secondary">
            <Search className="w-5 h-5 text-primary-orange" />
            <p className="text-sm text-left">Here&apos;s what you can do:</p>
          </div>
          <ul className="text-sm text-left space-y-2 text-foreground-secondary pl-8">
            <li className="list-disc">Check if the URL is correct</li>
            <li className="list-disc">Return to the home page</li>
            <li className="list-disc">
              Use the navigation menu to find what you need
            </li>
          </ul>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link href={`/${routing.defaultLocale}`}>
            <Button className="btn-primary font-medium px-8 py-3 rounded-lg transition-all duration-300 group hover:scale-105 w-full sm:w-auto">
              <Home className="mr-2 w-4 h-4" />
              Go Home
            </Button>
          </Link>

          <Button
            onClick={() => window.history.back()}
            variant="outline"
            className="glass-card border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/30 px-8 py-3 font-medium rounded-lg transition-all duration-300 group hover:scale-105 w-full sm:w-auto"
          >
            <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </Button>
        </div>

        {/* Fun message */}
        <p className="text-sm text-foreground-muted pt-8 animate-fade-in">
          Lost in space? We&apos;ll help you find your way back!
        </p>
      </div>
    </div>
  );
}
