"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import FootnoteTooltip from "./FootnoteTooltip";

// Helper to recursively extract text from React nodes
function getTextFromChildren(children: React.ReactNode): string {
  if (children === null || children === undefined) return "";
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) {
    return children.map(getTextFromChildren).join("");
  }
  if (React.isValidElement(children)) {
    const elementProps = children.props as { children?: React.ReactNode };
    return getTextFromChildren(elementProps.children);
  }
  return "";
}

// Helper to generate the exact ID for headings to match TOC
function generateIdFromHeadingText(text: string): string | undefined {
  const trimmed = text.trim();
  
  // Regex for headings: e.g., "1. Mầu Nhiệm...", "1.1. Khải Tượng..."
  const headingMatch = trimmed.match(/^(\d+(?:\.\d+)*\.)\s+(.+)$/);
  if (headingMatch) {
    const numberPart = headingMatch[1];
    return `section-${numberPart.replace(/\./g, "-").replace(/-$/, "")}`;
  }
  
  if (trimmed === "Tổng Kết") {
    return "section-tong-ket";
  }
  
  return undefined;
}

interface ArticleRendererProps {
  content: string;
}

// Custom components for react-markdown to enhance the academic style
const markdownComponents: Components = {
  h2: ({ children, ...props }) => {
    const text = getTextFromChildren(children);
    const id = generateIdFromHeadingText(text);
    return (
      <h2 id={id} className={`scroll-mt-24 ${props.className || ""}`.trim()} {...props}>
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }) => {
    const text = getTextFromChildren(children);
    const id = generateIdFromHeadingText(text);
    return (
      <h3 id={id} className={`scroll-mt-24 ${props.className || ""}`.trim()} {...props}>
        {children}
      </h3>
    );
  },
  // Make the first paragraph have a drop-cap
  p: ({ children, ...props }) => {
    return <p {...props}>{children}</p>;
  },
  // Enhanced blockquote with decorative styling
  blockquote: ({ children, ...props }) => {
    return <blockquote {...props}>{children}</blockquote>;
  },
  // External links open in new tab / Inline footnotes mapped to popovers
  a: ({ href, children, ...props }) => {
    const isFootnote = href?.startsWith("#fn-") && !href?.startsWith("#fnref-");
    if (href && isFootnote) {
      const footnoteId = href.substring(1);
      return (
        <FootnoteTooltip id={footnoteId} href={href}>
          {children}
        </FootnoteTooltip>
      );
    }

    const isExternal = href?.startsWith("http");
    return (
      <a
        href={href}
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        {...props}
      >
        {children}
      </a>
    );
  },
  // Tables get a wrapper for responsive scrolling
  table: ({ children, ...props }) => {
    return (
      <div className="overflow-x-auto my-8 rounded-lg border border-[rgba(107,28,35,0.12)]">
        <table {...props}>{children}</table>
      </div>
    );
  },
};

export default function ArticleRenderer({ content }: ArticleRendererProps) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
      {content}
    </ReactMarkdown>
  );
}
