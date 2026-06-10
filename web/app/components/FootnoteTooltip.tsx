"use client";

import { useState, useRef, useEffect } from "react";

interface FootnoteTooltipProps {
  id: string;
  href: string;
  children: React.ReactNode;
}

export default function FootnoteTooltip({ id, href, children }: FootnoteTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<HTMLAnchorElement>(null);

  // Detect mobile viewport on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Prevent background scrolling on mobile when footnote is open
  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, isMobile]);

  // Load content from the DOM footnotes section when the tooltip is opened
  useEffect(() => {
    if (isOpen && !content) {
      const el = document.getElementById(id);
      if (el) {
        const clone = el.cloneNode(true) as HTMLElement;
        
        // Remove backrefs and arrows
        clone.querySelectorAll(".footnote-backref, .data-footnote-backref, [class*='backref'], [href*='fnref']").forEach((node) => {
          node.remove();
        });
        
        let html = clone.innerHTML.trim();
        
        // Remove back-reference symbol (e.g. ↩)
        html = html.replace(/↩\s*$/, "").replace(/↩\ufe0e/g, "").replace(/↩/g, "").trim();
        
        if (html.startsWith("<p>") && html.endsWith("</p>")) {
          html = html.substring(3, html.length - 4);
        }
        
        html = html.replace(/^\d+\.\s*/, "");
        
        setContent(html || "Không có nội dung chú thích.");
      } else {
        setContent("Không tìm thấy thông tin chú thích.");
      }
    }
  }, [isOpen, id, content]);

  // Handle click outside to close (especially for mobile tap)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        tooltipRef.current && !tooltipRef.current.contains(e.target as Node) &&
        triggerRef.current && !triggerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <span className="relative inline-block not-prose">
      <a
        ref={triggerRef}
        href={href}
        onClick={handleClick}
        onMouseEnter={() => {
          if (!isMobile) setIsOpen(true);
        }}
        onMouseLeave={() => {
          if (!isMobile) setIsOpen(false);
        }}
        className="footnote-ref text-[#8B2E3A] dark:text-[#D4A843] hover:text-[#B8860B] dark:hover:text-[#E5C158] font-bold px-0.5 cursor-pointer no-underline select-none align-super text-[0.7em] font-sans transition-colors"
        aria-describedby={isOpen ? `tooltip-${id}` : undefined}
      >
        {children}
      </a>
      {isOpen && (
        isMobile ? (
          <>
            {/* Backdrop for mobile bottom drawer */}
            <span
              className="fixed inset-0 bg-black/50 z-50 block animate-fade-in"
              onClick={() => setIsOpen(false)}
            />
            {/* Slide up bottom drawer */}
            <span
              ref={tooltipRef}
              id={`tooltip-${id}`}
              className="fixed bottom-0 left-0 right-0 z-51 p-6 pb-8 bg-[#F9F8F6] dark:bg-[#1E1E1E] sepia:bg-[#F4ECD8] text-[#2D2D2D] dark:text-[#E0E0E0] sepia:text-[#4A3E3D] rounded-t-2xl shadow-[0_-8px_30px_rgb(0,0,0,0.15)] border-t border-[rgba(107,28,35,0.15)] dark:border-[rgba(212,168,67,0.3)] text-base font-normal normal-case leading-relaxed text-left animate-slide-up block max-h-[45vh] overflow-y-auto"
              style={{ fontFamily: "var(--font-body), serif" }}
            >
              {/* Drag Indicator Accent */}
              <span className="block w-12 h-1 bg-stone-300 dark:bg-stone-700 sepia:bg-stone-400 rounded-full mx-auto mb-4" />
              
              <span className="flex items-center justify-between mb-3 border-b border-[rgba(107,28,35,0.1)] dark:border-[rgba(212,168,67,0.1)] pb-2">
                <span className="block text-xs uppercase tracking-wider text-[#8B2E3A] dark:text-[#E5C158] font-bold">
                  Chú thích {children}
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full text-stone-400 hover:text-stone-600 dark:text-stone-500 dark:hover:text-stone-300 focus:outline-none"
                  aria-label="Đóng chú thích"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
              <span
                className="block text-[#3B3B3B] dark:text-[#CCCCCC] prose-sm"
                dangerouslySetInnerHTML={{ __html: content || "Đang tải..." }}
              />
            </span>
          </>
        ) : (
          <span
            ref={tooltipRef}
            id={`tooltip-${id}`}
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 sm:w-96 p-4 bg-[#F0EDE8] dark:bg-[#1E1E1E] text-[#2D2D2D] dark:text-[#E0E0E0] rounded-lg shadow-xl border border-[rgba(107,28,35,0.15)] dark:border-[rgba(212,168,67,0.3)] text-sm font-normal normal-case leading-relaxed text-left animate-fade-in block"
            style={{ fontFamily: "var(--font-body), serif" }}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <span className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#F0EDE8] dark:border-t-[#1E1E1E] w-0 h-0" />
            
            <span className="block text-xs uppercase tracking-wider text-[#8B2E3A] dark:text-[#E5C158] font-bold mb-1 border-b border-[rgba(107,28,35,0.1)] dark:border-[rgba(212,168,67,0.1)] pb-1">
              Chú thích {children}
            </span>
            <span
              className="block text-[#3B3B3B] dark:text-[#CCCCCC] prose-sm"
              dangerouslySetInnerHTML={{ __html: content || "Đang tải..." }}
            />
          </span>
        )
      )}
    </span>
  );
}
