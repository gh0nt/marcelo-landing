import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["es", "en"],

  // Used when no locale matches
  defaultLocale: "es",
});

// Create navigation hooks and utilities
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
