"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

interface ImageModalProps {
  imageUrl: string;
  onClose: () => void;
}

export default function ImageModal({ imageUrl, onClose }: ImageModalProps) {
  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal Content */}
      <div
        className="relative z-10 max-w-6xl max-h-[90vh] w-full animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 md:-right-12 md:top-0 bg-[var(--background-secondary)] hover:bg-[var(--primary-orange)] hover:text-black text-[var(--foreground)] rounded-full p-3 transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg z-20 border border-[var(--glass-border)]"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        {/* Image Container */}
        <div className="bg-[var(--background-secondary)] rounded-2xl overflow-hidden shadow-2xl border border-[var(--glass-border)]">
          <img
            src={imageUrl}
            alt="Full size preview"
            className="w-full h-auto max-h-[85vh] object-contain"
          />
        </div>

        {/* Image Info */}
        <div className="mt-4 text-center">
          <p className="text-sm text-[var(--foreground-secondary)]">
            Press{" "}
            <kbd className="px-2 py-1 bg-[var(--background-secondary)] rounded text-[var(--primary-orange)] border border-[var(--glass-border)]">
              ESC
            </kbd>{" "}
            or click outside to close
          </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
