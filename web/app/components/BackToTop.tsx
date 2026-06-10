"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`back-to-top fixed bottom-6 md:bottom-8 right-6 md:right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all duration-300 cursor-pointer active:scale-95 hover:scale-105 hover:shadow-xl
        bg-gradient-to-br from-[#6B1C23] to-[#8B2E3A] text-[#F9F8F6] shadow-[0_4px_14px_rgba(107,28,35,0.35)]
        dark:from-[#D4A843] dark:to-[#E5C158] dark:text-[#121212] dark:shadow-[0_4px_14px_rgba(212,168,67,0.25)]
        sepia:from-[#8C2A34] sepia:to-[#7A2F37] sepia:text-[#F4ECD8] sepia:shadow-[0_4px_14px_rgba(140,42,52,0.35)]
        ${
          visible
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "translate-y-4 opacity-0 pointer-events-none"
        }
      `}
      aria-label="Quay lại đầu trang"
      title="Quay lại đầu trang"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2.5}
        stroke="currentColor"
        className="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 15.75l7.5-7.5 7.5 7.5"
        />
      </svg>
    </button>
  );
}
