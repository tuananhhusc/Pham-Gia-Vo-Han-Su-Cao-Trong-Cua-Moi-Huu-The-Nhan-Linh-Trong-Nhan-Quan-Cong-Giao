"use client";

import { useEffect, useState } from "react";
import type { TOCItem } from "@/lib/markdown";

export default function TableOfContents({ items }: { items: TOCItem[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px" }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (!items.length) return null;

  return (
    <nav
      className="sticky top-24 hidden lg:block w-full max-h-[calc(100vh-8rem)] overflow-y-auto pr-6 xl:pr-10"
      aria-label="Mục lục bài viết"
    >
      <h3
        className="text-lg xl:text-xl font-bold mb-6 uppercase tracking-wider text-[#4A0E15] dark:text-[#E5C158]"
        style={{ fontFamily: "var(--font-heading), 'Playfair Display', serif" }}
      >
        Mục Lục
      </h3>
      <ul className="space-y-4 text-sm xl:text-base" style={{ fontFamily: "var(--font-body), 'EB Garamond', serif" }}>
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
                className={`block leading-relaxed transition-all duration-300 border-l-2 pl-4 py-1.5 ${
                  isActive
                    ? "border-[#B8860B] dark:border-[#D4A843] sepia:border-[#8C2A34] text-[#8B2E3A] dark:text-[#E5C158] sepia:text-[#7A2F37] font-semibold bg-[rgba(184,134,11,0.04)] dark:bg-[rgba(212,168,67,0.04)] sepia:bg-[rgba(140,42,52,0.04)]"
                    : "border-transparent text-[#6B6B6B] dark:text-stone-400 sepia:text-[#7A6968] hover:text-[#4A0E15] dark:hover:text-[#E5C158] sepia:hover:text-[#7A2F37] hover:border-[rgba(184,134,11,0.3)] dark:hover:border-[rgba(212,168,67,0.3)] sepia:hover:border-[rgba(140,42,52,0.3)]"
                }`}
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
