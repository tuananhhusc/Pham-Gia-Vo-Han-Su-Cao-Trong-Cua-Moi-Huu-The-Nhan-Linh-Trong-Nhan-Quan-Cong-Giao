"use client";

import { useState, useEffect, useRef, useCallback } from "react";

type Theme = "parchment" | "dark" | "sepia";
type FontSize = "sm" | "md" | "lg" | "xl";
type FontFamily = "serif" | "sans";

export default function ReadingSettings() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("parchment");
  const [fontSize, setFontSize] = useState<FontSize>("md");
  const [fontFamily, setFontFamily] = useState<FontFamily>("serif");
  const [focusMode, setFocusMode] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load settings on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("read-theme") as Theme || "parchment";
    const savedFontSize = localStorage.getItem("read-font-size") as FontSize || "md";
    const savedFontFamily = localStorage.getItem("read-font-family") as FontFamily || "serif";
    const savedFocusMode = localStorage.getItem("read-focus-mode") === "true";

    setTheme(savedTheme);
    setFontSize(savedFontSize);
    setFontFamily(savedFontFamily);
    setFocusMode(savedFocusMode);

    applyTheme(savedTheme);
    applyFontSize(savedFontSize);
    applyFontFamily(savedFontFamily);
    applyFocusMode(savedFocusMode);
  }, []);

  // Auto-hide on scroll down, show on scroll up or stop
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    // Always show at the very top of the page
    if (currentScrollY < 100) {
      setIsVisible(true);
      lastScrollY.current = currentScrollY;
      return;
    }

    // If panel is open, keep button visible
    if (isOpen) {
      lastScrollY.current = currentScrollY;
      return;
    }

    const scrollDelta = currentScrollY - lastScrollY.current;

    if (scrollDelta > 10) {
      // Scrolling down — hide
      setIsVisible(false);
    } else if (scrollDelta < -10) {
      // Scrolling up — show
      setIsVisible(true);
    }

    lastScrollY.current = currentScrollY;

    // Show again after scroll stops (800ms idle)
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      setIsVisible(true);
    }, 800);
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [handleScroll]);

  const applyTheme = (t: Theme) => {
    const html = document.documentElement;
    html.classList.remove("theme-dark", "theme-sepia");
    if (t === "dark") html.classList.add("theme-dark");
    if (t === "sepia") html.classList.add("theme-sepia");
  };

  const applyFontSize = (s: FontSize) => {
    const html = document.documentElement;
    html.classList.remove("font-size-sm", "font-size-md", "font-size-lg", "font-size-xl");
    html.classList.add(`font-size-${s}`);
  };

  const applyFontFamily = (f: FontFamily) => {
    const html = document.documentElement;
    if (f === "sans") {
      html.classList.add("font-sans-active");
    } else {
      html.classList.remove("font-sans-active");
    }
  };

  const applyFocusMode = (active: boolean) => {
    const html = document.documentElement;
    if (active) {
      html.classList.add("focus-mode-active");
    } else {
      html.classList.remove("focus-mode-active");
    }
  };

  const handleThemeChange = (t: Theme) => {
    setTheme(t);
    applyTheme(t);
    localStorage.setItem("read-theme", t);
  };

  const handleFontSizeChange = (s: FontSize) => {
    setFontSize(s);
    applyFontSize(s);
    localStorage.setItem("read-font-size", s);
  };

  const handleFontFamilyChange = (f: FontFamily) => {
    setFontFamily(f);
    applyFontFamily(f);
    localStorage.setItem("read-font-family", f);
  };

  const handleFocusModeToggle = () => {
    const nextState = !focusMode;
    setFocusMode(nextState);
    applyFocusMode(nextState);
    localStorage.setItem("read-focus-mode", String(nextState));
  };

  // Click outside listener to close settings panel
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        panelRef.current && !panelRef.current.contains(e.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div
      className={`fixed top-4 right-4 md:top-6 md:right-6 z-40 print:hidden transition-all duration-300 ${
        isVisible || isOpen
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-3 pointer-events-none"
      }`}
    >
      {/* Compact Icon Button */}
      <button
        ref={buttonRef}
        id="reading-settings-btn"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center w-10 h-10 rounded-full shadow-md border transition-all duration-200 backdrop-blur-sm ${
          isOpen
            ? "bg-[#6B1C23] dark:bg-[#D4A843] border-[#6B1C23] dark:border-[#D4A843] text-white dark:text-[#121212] scale-105"
            : "bg-white/80 dark:bg-[#1E1E1E]/80 border-[#B8860B]/30 dark:border-[#D4A843]/30 text-[#6B1C23] dark:text-[#E5C158] hover:bg-white dark:hover:bg-[#1E1E1E] hover:shadow-lg hover:scale-105"
        }`}
        title="Tùy chỉnh giao diện đọc"
        aria-label="Tùy chỉnh giao diện đọc"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <span className="text-base font-bold leading-none" style={{ fontFamily: "var(--font-heading), serif" }}>Aa</span>
        )}
      </button>

      {/* Settings Card */}
      {isOpen && (
        <div
          ref={panelRef}
          className="absolute top-12 right-0 w-72 md:w-80 p-4 md:p-5 rounded-xl shadow-2xl border border-[rgba(107,28,35,0.15)] dark:border-[rgba(212,168,67,0.3)] sepia:border-[rgba(140,42,52,0.3)] bg-[#F9F8F6]/95 dark:bg-[#1E1E1E]/95 sepia:bg-[#F4ECD8]/95 backdrop-blur-md text-[#2D2D2D] dark:text-[#E0E0E0] sepia:text-[#4A3E3D] animate-fade-in z-50"
          style={{ fontFamily: "var(--font-body), serif" }}
        >
          <h4
            className="text-sm font-bold mb-3 uppercase tracking-wider text-[#6B1C23] dark:text-[#E5C158] sepia:text-[#7A2F37] border-b border-[rgba(107,28,35,0.1)] dark:border-[rgba(212,168,67,0.1)] sepia:border-[rgba(140,42,52,0.1)] pb-2"
            style={{ fontFamily: "var(--font-heading), serif" }}
          >
            Tùy chọn đọc sách
          </h4>

          {/* Theme option */}
          <div className="mb-3">
            <span className="block text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400 font-semibold mb-1.5">
              Giao diện màu
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleThemeChange("parchment")}
                className={`py-1.5 px-2 text-xs rounded border transition-all ${
                  theme === "parchment"
                    ? "border-[#6B1C23] bg-[#F9F8F6] text-[#4A0E15] font-bold"
                    : "border-stone-300 dark:border-stone-700 bg-[#F9F8F6] text-stone-800"
                }`}
              >
                Giấy Cổ
              </button>
              <button
                onClick={() => handleThemeChange("sepia")}
                className={`py-1.5 px-2 text-xs rounded border transition-all ${
                  theme === "sepia"
                    ? "border-[#8C2A34] bg-[#F4ECD8] text-[#5C4D4C] font-bold"
                    : "border-stone-300 dark:border-stone-700 bg-[#F4ECD8] text-[#5C4D4C]"
                }`}
              >
                Sepia
              </button>
              <button
                onClick={() => handleThemeChange("dark")}
                className={`py-1.5 px-2 text-xs rounded border transition-all ${
                  theme === "dark"
                    ? "border-[#D4A843] bg-[#121212] text-white font-bold"
                    : "border-stone-300 dark:border-stone-700 bg-[#121212] text-stone-300"
                }`}
              >
                Bóng Đêm
              </button>
            </div>
          </div>

          {/* Font Size option */}
          <div className="mb-3">
            <span className="block text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400 font-semibold mb-1.5">
              Cỡ chữ
            </span>
            <div className="grid grid-cols-4 gap-2">
              {(["sm", "md", "lg", "xl"] as FontSize[]).map((size) => {
                const labels = { sm: "Nhỏ", md: "Vừa", lg: "Lớn", xl: "R.Lớn" };
                return (
                  <button
                    key={size}
                    onClick={() => handleFontSizeChange(size)}
                    className={`py-1 px-1.5 text-xs rounded border transition-all ${
                      fontSize === size
                        ? "border-[#6B1C23] dark:border-[#D4A843] bg-[rgba(107,28,35,0.06)] dark:bg-[rgba(212,168,67,0.1)] text-[#6B1C23] dark:text-[#E5C158] font-bold"
                        : "border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300"
                    }`}
                  >
                    {labels[size]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Font Family option */}
          <div className="mb-4">
            <span className="block text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400 font-semibold mb-1.5">
              Kiểu phông
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleFontFamilyChange("serif")}
                className={`py-1.5 px-3 text-xs rounded border transition-all font-serif ${
                  fontFamily === "serif"
                    ? "border-[#6B1C23] dark:border-[#D4A843] bg-[rgba(107,28,35,0.06)] dark:bg-[rgba(212,168,67,0.1)] text-[#6B1C23] dark:text-[#E5C158] font-bold"
                    : "border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300"
                }`}
              >
                Garamond
              </button>
              <button
                onClick={() => handleFontFamilyChange("sans")}
                className={`py-1.5 px-3 text-xs rounded border transition-all font-sans ${
                  fontFamily === "sans"
                    ? "border-[#6B1C23] dark:border-[#D4A843] bg-[rgba(107,28,35,0.06)] dark:bg-[rgba(212,168,67,0.1)] text-[#6B1C23] dark:text-[#E5C158] font-bold"
                    : "border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300"
                }`}
              >
                Inter (Sans)
              </button>
            </div>
          </div>

          {/* Focus Mode option */}
          <div className="flex items-center justify-between border-t border-[rgba(107,28,35,0.1)] dark:border-[rgba(212,168,67,0.1)] sepia:border-[rgba(140,42,52,0.1)] pt-3">
            <div>
              <span className="block text-sm font-semibold text-[#6B1C23] dark:text-[#E5C158] sepia:text-[#7A2F37]">
                Chế độ tập trung
              </span>
              <span className="block text-[11px] text-stone-500 dark:text-stone-400 sepia:text-stone-600">
                Ẩn các thanh công cụ để đọc sâu
              </span>
            </div>
            <button
              onClick={handleFocusModeToggle}
              role="checkbox"
              aria-checked={focusMode}
              className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none ${
                focusMode ? "bg-[#6B1C23] dark:bg-[#D4A843] sepia:bg-[#8C2A34]" : "bg-stone-300 dark:bg-stone-700 sepia:bg-stone-400"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                  focusMode ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
