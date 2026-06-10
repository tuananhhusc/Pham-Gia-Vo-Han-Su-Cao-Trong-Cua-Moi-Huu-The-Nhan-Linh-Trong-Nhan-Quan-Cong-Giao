"use client";

import { useState, useEffect } from "react";
import type { TOCItem } from "@/lib/markdown";

interface MobileTOCProps {
  items: TOCItem[];
}

export default function MobileTOC({ items }: MobileTOCProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (!isOpen) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -85% 0px" }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items, isOpen]);

  // Disable scrolling on body when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!items.length) return null;

  return (
    <div className="lg:hidden print:hidden">
      {/* Floating Toggle Button */}
      <button
        id="mobile-toc-btn"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 md:bottom-8 left-6 md:left-8 z-50 flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-[#6B1C23] hover:bg-[#8B2E3A] dark:bg-[#D4A843] dark:hover:bg-[#E5C158] sepia:bg-[#8C2A34] sepia:hover:bg-[#7A2F37] text-white dark:text-[#121212] sepia:text-[#F4ECD8] transition-transform active:scale-95 hover:scale-105"
        title="Mục lục bài viết"
        aria-label="Mở mục lục điều hướng"
      >
        {/* Simple list icon */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Drawer Overlay (Backdrop) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-50 transition-opacity duration-300 animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-[#F9F8F6] dark:bg-[#1A1A1A] sepia:bg-[#F4ECD8] text-[#2D2D2D] dark:text-[#E0E0E0] sepia:text-[#4A3E3D] z-[51] shadow-2xl transition-transform duration-300 transform border-r border-[rgba(107,28,35,0.15)] dark:border-[rgba(212,168,67,0.3)] sepia:border-[rgba(140,42,52,0.2)] flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-[rgba(107,28,35,0.1)] dark:border-[rgba(212,168,67,0.1)] sepia:border-[rgba(140,42,52,0.1)] flex items-center justify-between">
          <h3
            className="text-base font-bold uppercase tracking-wider text-[#6B1C23] dark:text-[#E5C158] sepia:text-[#7A2F37]"
            style={{ fontFamily: "var(--font-heading), serif" }}
          >
            Mục lục bài viết
          </h3>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-full text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200"
            aria-label="Đóng mục lục"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <nav className="flex-1 overflow-y-auto p-4 pr-6">
          <ul className="space-y-4 text-sm" style={{ fontFamily: "var(--font-body), serif" }}>
            {items.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li
                  key={item.id}
                  style={{
                    paddingLeft: item.level === 3 ? "1.25rem" : "0",
                  }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    className={`block leading-relaxed border-l-2 pl-4 py-1.5 transition-all duration-300 ${
                      isActive
                        ? "border-[#B8860B] dark:border-[#D4A843] sepia:border-[#8C2A34] text-[#8B2E3A] dark:text-[#E5C158] sepia:text-[#7A2F37] font-semibold bg-[rgba(184,134,11,0.04)] dark:bg-[rgba(212,168,67,0.04)] sepia:bg-[rgba(140,42,52,0.04)]"
                        : "border-transparent text-stone-500 dark:text-stone-400 sepia:text-stone-600 hover:text-[#4A0E15] dark:hover:text-[#E5C158] sepia:hover:text-[#7A2F37]"
                    }`}
                  >
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
