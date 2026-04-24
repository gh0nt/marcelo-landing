"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Linkedin, Mail } from "lucide-react";

const HERO_PHRASES = [
  "builds systems that convert",
  "turns traffic into clients",
  "combines code + marketing",
  "designs with your customer in mind",
  "removes friction from your funnel",
  "turns ideas into real products",
  "helps you grow with clarity",
  "adds a bit of magic behind the scenes",
  "loves playing with pixels and data",
  "rocks with his headphones on",
];

const HERO_TEXT_COLORS = [
  "#d4b483",
  "#c89a6a",
  "#b97c63",
  "#a86666",
  "#8c6a8c",
  "#6f7f9c",
  "#4f7c7a",
  "#3f6f5e",
];

const ABOUT_BACKGROUND_COLORS = [
  "#d4b483",
  "#c89a6a",
  "#b97c63",
  "#a86666",
  "#8c6a8c",
  "#6f7f9c",
  "#4f7c7a",
  "#3f6f5e",
];

const EXPERIENCE_ITEMS = [
  {
    title: "Growth Websites",
    description:
      "Fast landing pages designed to rank, explain clearly, and move visitors into qualified conversations.",
  },
  {
    title: "Funnel Automation",
    description:
      "Lead capture, follow-up sequences, and internal workflows connected into one clean system.",
  },
  {
    title: "Conversion Systems",
    description:
      "Offers, page structure, and tracking shaped around the exact step that turns interest into action.",
  },
  {
    title: "Analytics",
    description:
      "Measurement setups that show where traffic comes from, where users drop, and what improves revenue.",
  },
  {
    title: "Launch Support",
    description:
      "From positioning to release, every touchpoint stays aligned across code, messaging, and acquisition.",
  },
  {
    title: "Retention Loops",
    description:
      "Email, remarketing, and post-conversion flows built to keep attention and recover missed demand.",
  },
];

const PROJECTS = [
  {
    title: "Tiked.co",
    role: "Case Study",
    summary: "Ticket application for managing event registrations.",
    href: "https://tiked.co/",
  },
  {
    title: "Angel Ads",
    role: "Case Study",
    summary: "High-conversion funnel built for paid traffic performance.",
    href: "https://angel-ads-global.com/",
  },
  {
    title: "Finalap",
    role: "Case Study",
    summary: "Running app to track performance and deliver real-time insights.",
    href: "https://finalap.com/",
  },
  {
    title: "Altpro Expo",
    role: "Project",
    summary: "CRM-driven platform to capture and qualify exhibitors at scale.",
    href: "https://altproexpo.com/",
  },
  {
    title: "ConSuerte",
    role: "Project",
    summary: "Real-time lottery platform for instant prize checking.",
    href: "https://consuerte.com.co/",
  },
  {
    title: "Front2Back",
    role: "Project",
    summary:
      "Web platform designed to convert finance web visitors into qualified leads.",
    href: "https://front2back.co/",
  },
];

function useTypewriter(
  phrases: string[],
  typingSpeed = 50,
  deletingSpeed = 30,
  pauseDuration = 1200,
) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const isComplete = displayText === currentPhrase;
    const isCleared = displayText.length === 0;

    const timeout = window.setTimeout(
      () => {
        if (!isDeleting) {
          if (isComplete) {
            setIsDeleting(true);
            return;
          }

          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
          return;
        }

        if (isCleared) {
          setIsDeleting(false);
          setPhraseIndex((currentIndex) => (currentIndex + 1) % phrases.length);
          return;
        }

        setDisplayText(currentPhrase.slice(0, displayText.length - 1));
      },
      isDeleting
        ? isCleared
          ? 180
          : deletingSpeed
        : isComplete
          ? pauseDuration
          : typingSpeed,
    );

    return () => window.clearTimeout(timeout);
  }, [
    deletingSpeed,
    displayText,
    isDeleting,
    pauseDuration,
    phraseIndex,
    phrases,
    typingSpeed,
  ]);

  return displayText;
}

export default function LandingPage() {
  const typedText = useTypewriter(HERO_PHRASES, 50, 30, 1400);
  const heroSuffix = typedText.replace(/^Marcelo\s*/i, "").trimStart();
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    if (typedText !== "") return;

    const timeout = window.setTimeout(() => {
      setColorIndex(
        (currentIndex) => (currentIndex + 1) % HERO_TEXT_COLORS.length,
      );
    }, 170);

    return () => window.clearTimeout(timeout);
  }, [typedText]);

  const heroHeadlineColor = HERO_TEXT_COLORS[colorIndex];
  const aboutBackgroundColor = ABOUT_BACKGROUND_COLORS[colorIndex];
  const headerPillBackground = `${aboutBackgroundColor}14`;

  return (
    <div className="bg-[#0f1c1c] text-[#f4e8d0]">
      <section className="sticky top-0 z-0 h-screen overflow-hidden bg-[#0f1c1c]">
        <div className="absolute inset-0">
          <div className="absolute inset-x-0 bottom-0 h-px bg-[#f4e8d0]/7" />
          <div className="absolute -left-24 top-24 h-64 w-64 rounded-full bg-[#d4b483]/6 blur-3xl" />
          <div className="absolute bottom-20 right-10 h-72 w-72 rounded-full bg-[#d4b483]/5 blur-3xl" />
        </div>

        <div className="relative mx-auto flex h-full w-full max-w-[1500px] flex-col px-6 pb-12 pt-12 sm:px-8 lg:px-14">
          <header className="flex items-start justify-between">
            <div
              className="text-[11px] uppercase tracking-[0.35em] text-[#d9c39d]"
              style={{
                color: heroHeadlineColor,
                transition: "color 1000ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              Marcelo
            </div>

            <div
              className="flex items-center gap-1 rounded-2xl  p-1"
              style={{
                backgroundColor: headerPillBackground,
                transition:
                  "background-color 1000ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <Link
                href="mailto:giohanpuentes@gmail.com"
                aria-label="Email Marcelo"
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-[#d9c39d] transition-colors duration-300 hover:bg-[#f4e8d0]/8 hover:text-[#f4e8d0]"
                style={{
                  color: heroHeadlineColor,
                  transition: "color 1000ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                <Mail className="h-4 w-4" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/gh0nt/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Marcelo on LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-[#d9c39d] transition-colors duration-300 hover:bg-[#f4e8d0]/8 hover:text-[#f4e8d0]"
                style={{
                  color: heroHeadlineColor,
                  transition: "color 1000ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                <Linkedin className="h-4 w-4" />
              </Link>
            </div>
          </header>

          <div className="flex flex-1 items-center">
            <div className="w-full pb-[18vh] pt-[8vh]">
              <h1
                className="max-w-[1620px] text-left text-[3rem] font-medium leading-[0.96] tracking-[-0.06em] text-[#d4b483] sm:text-[4rem] md:text-[5rem] lg:text-[5.75rem] xl:text-[6.4rem]"
                style={{
                  color: heroHeadlineColor,
                  transition: "color 1000ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                <span
                  style={{
                    color: heroHeadlineColor,
                    transition: "color 1000ms cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  Marcelo{" "}
                </span>
                <span
                  style={{
                    color: heroHeadlineColor,
                    transition: "color 1000ms cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  {heroSuffix}
                  <span
                    className="ml-2 inline-block h-[0.06em] w-[0.74em] translate-y-[0.18em] align-baseline animate-pulse"
                    style={{
                      backgroundColor: heroHeadlineColor,
                      transition:
                        "background-color 1000ms cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  />
                </span>
              </h1>
            </div>
          </div>
        </div>
      </section>

      <main className="relative z-10 -mt-20 md:-mt-24">
        <section
          className="   bg-[#d4b483] text-[#102020]"
          style={{
            backgroundColor: aboutBackgroundColor,
            transition:
              "background-color 1000ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <div className="mx-auto max-w-[1500px] px-6 sm:px-8 lg:px-14">
            <div className="flex h-20 items-center ">
              <p className="text-[11px] uppercase tracking-[0.35em] text-[#102020]/65">
                About
              </p>
            </div>

            <div className="grid gap-12 py-16 md:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20 lg:py-24">
              <div>
                <h2 className="max-w-[820px] text-[3.2rem] font-medium leading-[0.9] tracking-[-0.055em] sm:text-[2.2rem] md:text-[3rem] lg:text-[4.2rem]">
                  <span className="block">The site explains.</span>
                  <span className="block">The system qualifies.</span>
                  <span className="block">The funnel closes.</span>
                </h2>
              </div>

              <p className="max-w-xl pt-3 text-sm leading-7 text-[#102020]/72 md:text-base">
                Marcelo works at the intersection of product clarity, traffic
                intent, and technical execution. The result is a leaner stack
                that looks sharp and performs under real business pressure.
              </p>
            </div>

            <section className="py-14 md:py-16">
              <div className="flex items-end justify-between gap-6">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.35em] text-[#102020]/55">
                    Experience
                  </p>
                  <h3 className="mt-4 text-2xl font-medium tracking-[-0.03em] sm:text-3xl">
                    Built for high-signal growth work.
                  </h3>
                </div>
              </div>

              <div className="mt-10 grid gap-x-8 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
                {EXPERIENCE_ITEMS.map((item) => (
                  <article
                    key={item.title}
                    className="space-y-4   border-[#102020]/10 pt-5"
                  >
                    <h4 className="text-xl font-medium tracking-[-0.03em]">
                      {item.title}
                    </h4>
                    <p className="max-w-sm text-sm leading-7 text-[#102020]/70">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section className="border-t border-[#102020]/[0.06] py-14 md:py-16">
              <p className="text-[11px] uppercase tracking-[0.35em] text-[#102020]/55">
                Work
              </p>

              <div className="mt-8 space-y-8">
                {PROJECTS.map((project) => (
                  <Link
                    key={project.title}
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block w-full rounded-[2rem] bg-[#cfb07f]/18 p-6 transition-all duration-300 hover:bg-[#cfb07f]/28 hover:shadow-[0_22px_60px_rgba(16,32,32,0.12)] md:p-8"
                  >
                    <div className="grid gap-8 md:grid-cols-[1fr_0.9fr] md:items-start md:gap-10">
                      <div>
                        <h4 className="text-2xl font-medium tracking-[-0.04em] md:text-[2.6rem] md:leading-[0.92]">
                          {project.title}
                        </h4>
                      </div>

                      <div className="flex min-h-[11.5rem] flex-col justify-start">
                        <div className="overflow-hidden">
                          <span className="inline-flex -translate-y-4 opacity-0 text-[11px] uppercase tracking-[0.25em] text-[#102020]/72 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                            {project.role}
                          </span>
                        </div>
                        <p className="mt-3 max-w-xl text-sm leading-7 text-[#102020]/70 md:text-base">
                          {project.summary}
                        </p>
                        <div className="mt-6 overflow-hidden">
                          <span className="inline-flex translate-y-4 items-center gap-2 rounded-full bg-[#102020] px-5 py-3 text-sm font-medium text-[#f4e8d0] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                            View Website
                            <ArrowUpRight className="h-4 w-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <section className="border-[#102020]/10 pt-6 pb-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.35em] text-[#102020]/55">
                    Contact
                  </p>
                  <p className="mt-3 text-base text-[#102020]/72">
                    Available for focused product, landing page, and funnel
                    work.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href="mailto:giohanpuentes@gmail.com"
                    className="inline-flex items-center gap-2 rounded-full bg-[#102020]/8 px-5 py-3 text-sm font-medium text-[#102020] transition-colors duration-300 hover:bg-[#102020] hover:text-[#f4e8d0]"
                  >
                    Email Marcelo
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/gh0nt/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#102020]/8 px-5 py-3 text-sm font-medium text-[#102020] transition-colors duration-300 hover:bg-[#102020] hover:text-[#f4e8d0]"
                  >
                    LinkedIn
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>
    </div>
  );
}
