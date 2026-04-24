import Link from "next/link";
import { Linkedin, Mail } from "lucide-react";

type PageNotFoundProps = {
  homeHref: string;
};

export default function PageNotFound({ homeHref }: PageNotFoundProps) {
  return (
    <div className="min-h-screen overflow-hidden bg-[#0f1c1c] text-[#f4e8d0]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 bottom-0 h-px bg-[#f4e8d0]/7" />
        <div className="absolute -left-24 top-24 h-64 w-64 rounded-full bg-[#d4b483]/6 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-72 w-72 rounded-full bg-[#d4b483]/5 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1500px] flex-col px-6 pb-12 pt-12 sm:px-8 lg:px-14">
        <header className="flex items-start justify-between">
          <Link
            href={homeHref}
            className="text-[11px] uppercase tracking-[0.35em] text-[#d4b483] transition-opacity duration-300 hover:opacity-80"
          >
            Marcelo
          </Link>

          <div className="flex items-center gap-1 rounded-2xl bg-[#d4b483]/8 p-1">
            <Link
              href="mailto:giohanpuentes@gmail.com"
              aria-label="Email Marcelo"
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-[#d4b483] transition-colors duration-300 hover:bg-[#f4e8d0]/8 hover:text-[#f4e8d0]"
            >
              <Mail className="h-4 w-4" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/gh0nt/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Marcelo on LinkedIn"
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-[#d4b483] transition-colors duration-300 hover:bg-[#f4e8d0]/8 hover:text-[#f4e8d0]"
            >
              <Linkedin className="h-4 w-4" />
            </Link>
          </div>
        </header>

        <main className="flex flex-1 items-center justify-center">
          <div className="max-w-4xl text-center">
            <p className="text-[11px] uppercase tracking-[0.35em] text-[#d4b483]/70">
              Page Not Found
            </p>
            <h1 className="mt-8 text-5xl font-medium leading-[0.95] tracking-[-0.05em] text-[#d4b483] sm:text-6xl md:text-7xl lg:text-[5.75rem]">
              Uh-oh, looks like you took the scenic route.
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-base leading-7 text-[#f4e8d0]/72 md:text-lg">
              This page wandered off somewhere between code, coffee, and
              questionable marketing ideas.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
