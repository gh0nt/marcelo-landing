"use client";

import React from "react";
import { cn } from "@/app/lib/utils";

type FloatingDotsProps = {
  className?: string;
};

const DOTS: Array<{ className: string }> = [
  {
    className:
      "top-[12%] left-[10%] h-3 w-3 bg-dots-green opacity-70 animate-float",
  },
  {
    className:
      "top-[18%] left-[70%] h-2.5 w-2.5 bg-dots-blue opacity-70 animate-float-delayed",
  },
  {
    className:
      "top-[30%] left-[85%] h-4 w-4 bg-dots-purple opacity-60 animate-float-slow",
  },
  {
    className:
      "top-[42%] left-[15%] h-2 w-2 bg-dots-pink opacity-70 animate-float-delayed",
  },
  {
    className:
      "top-[55%] left-[55%] h-3.5 w-3.5 bg-primary-orange opacity-30 animate-float",
  },
  {
    className:
      "top-[62%] left-[25%] h-5 w-5 bg-dots-blue opacity-50 animate-float-slow",
  },
  {
    className:
      "top-[70%] left-[80%] h-3 w-3 bg-dots-green opacity-60 animate-float",
  },
  {
    className:
      "top-[78%] left-[40%] h-2.5 w-2.5 bg-dots-purple opacity-60 animate-float-delayed",
  },
  {
    className:
      "top-[85%] left-[12%] h-4 w-4 bg-dots-pink opacity-55 animate-float-slow",
  },
  {
    className:
      "top-[88%] left-[68%] h-2 w-2 bg-primary-orange opacity-35 animate-float",
  },
];

export default function FloatingDots({ className }: FloatingDotsProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none",
        className,
      )}
    >
      {DOTS.map((dot) => (
        <span
          key={dot.className}
          className={cn(
            "absolute rounded-full blur-[0.5px] shadow-none",
            dot.className,
          )}
        />
      ))}
    </div>
  );
}
