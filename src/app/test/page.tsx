"use client";

import ChatInterface from "./components/ChatInterface";

export default function TestPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-4 md:p-6">
      <div className="max-w-6xl w-full">
        <div className="mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-1">
            Marcelo's Test for <span className="gradient-text">INCSUB</span>
          </h1>
        </div>
        <ChatInterface />
      </div>
    </div>
  );
}
