import { getMarkdownContent, extractTitle, extractIntro, processContentForTOC } from "@/lib/markdown";
import ReadingProgressBar from "./components/ReadingProgressBar";
import BackToTop from "./components/BackToTop";
import ArticleRenderer from "./components/ArticleRenderer";
import TableOfContents from "./components/TableOfContents";
import ReadingSettings from "./components/ReadingSettings";
import MobileTOC from "./components/MobileTOC";

export default function Home() {
  const rawContent = getMarkdownContent();
  const title = extractTitle(rawContent);
  const intro = extractIntro(rawContent);

  const { bodyContent, toc } = processContentForTOC(rawContent);

  return (
    <>
      <ReadingProgressBar />
      <MobileTOC items={toc} />
      <ReadingSettings />

      {/* Hero Header */}
      <header className="relative overflow-hidden" id="article-header">
        {/* Subtle background pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236B1C23' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative mx-auto max-w-4xl px-6 pt-20 pb-16 sm:px-8 lg:px-12">
          {/* Decorative cross ornament */}
          <div className="flex justify-center mb-8 animate-fade-in">
            <div className="ornament-line w-full max-w-xs">
              <span className="text-[#B8860B] text-2xl" aria-hidden="true">
                ✝
              </span>
            </div>
          </div>

          {/* Title */}
          <h1
            className="text-center text-3xl sm:text-4xl lg:text-[2.65rem] leading-tight sm:leading-snug font-extrabold tracking-tight animate-fade-in-up text-[#4A0E15] dark:text-[#E5C158]"
            style={{
              fontFamily: "var(--font-heading), 'Playfair Display', serif",
            }}
          >
            {title}
          </h1>

          {/* Subtitle / Meta */}
          <div className="mt-6 flex flex-col items-center gap-3 text-sm text-[#6B6B6B] dark:text-stone-400 animate-fade-in">
            <div className="flex items-center gap-2">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: "#B8860B" }}
                aria-hidden="true"
              />
              <span>Báo Cáo Nghiên Cứu Thần Học Công Giáo</span>
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: "#B8860B" }}
                aria-hidden="true"
              />
            </div>
            <div className="text-xs uppercase tracking-[0.2em] text-[#8B2E3A] dark:text-[#D4A843]">
              Phẩm Giá &bull; Imago Dei &bull; Nhân Vị Tính &bull; Dignitas Infinita
            </div>
          </div>

          {/* Decorative separator */}
          <div className="mt-10 flex items-center gap-4">
            <div
              className="flex-1 h-px"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(184,134,11,0.4), transparent)",
              }}
            />
            <span className="text-[#B8860B] text-xs opacity-60" aria-hidden="true">
              ◆ ◆ ◆
            </span>
            <div
              className="flex-1 h-px"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(184,134,11,0.4), transparent)",
              }}
            />
          </div>
        </div>
      </header>

      {/* Main Content with Sidebar */}
      <main className="mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-12 xl:px-16 pb-32" id="article-content">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-24">
          
          {/* Left Sidebar (Table of Contents) */}
          <aside className="lg:w-72 xl:w-[22rem] flex-shrink-0">
            <TableOfContents items={toc} />
          </aside>

          {/* Article Content Column */}
          <div className="flex-1 min-w-0">

            {/* Introduction paragraph with drop-cap */}
            <div className="prose prose-lg md:prose-xl xl:prose-2xl prose-stone max-w-[85ch] mt-4">
              <p className="drop-cap leading-[1.8] text-justify text-[#3B3B3B] dark:text-stone-300">
                {intro}
              </p>
            </div>

            {/* Article body */}
            <div className="relative">
              <article
                className="prose prose-lg md:prose-xl xl:prose-2xl prose-stone max-w-[85ch] mt-8 xl:mt-12"
                id="article-body"
              >
                <ArticleRenderer content={bodyContent} />
              </article>
            </div>

            {/* Footer ornament */}
            <div className="mt-24 flex items-center gap-4 max-w-[85ch]">
              <div
                className="flex-1 h-px"
                style={{
                  background:
                    "linear-gradient(to right, transparent, rgba(184,134,11,0.4), transparent)",
                }}
              />
              <span className="text-[#B8860B] text-xl opacity-60" aria-hidden="true">
                ✝
              </span>
              <div
                className="flex-1 h-px"
                style={{
                  background:
                    "linear-gradient(to right, transparent, rgba(184,134,11,0.4), transparent)",
                }}
              />
            </div>

            {/* Footer text */}
            <footer className="mt-12 text-center max-w-[85ch]" id="article-footer">
              <p
                className="text-base italic text-[#6B6B6B] dark:text-stone-400"
              >
                &ldquo;Gloria Dei vivens homo, vita autem hominis visio Dei&rdquo;
              </p>
              <p className="mt-2 text-sm text-[#8B8B8B] dark:text-stone-500">
                — Thánh Irênê thành Lyon (Adversus Haereses, IV.20.7)
              </p>
              <p className="mt-8 text-xs text-[#AAAAAA] dark:text-stone-600 tracking-[0.25em] uppercase">
                Ad Maiorem Dei Gloriam
              </p>
            </footer>
          </div>
        </div>
      </main>

      <BackToTop />
    </>
  );
}
