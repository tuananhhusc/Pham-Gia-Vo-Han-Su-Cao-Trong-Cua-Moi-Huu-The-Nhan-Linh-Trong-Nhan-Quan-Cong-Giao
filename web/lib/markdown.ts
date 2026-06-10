import fs from "fs";
import path from "path";

/**
 * Reads the markdown content from the KDCTC.md file.
 * The file is located one directory above the Next.js project root.
 */
export function getMarkdownContent(): string {
  const filePath = path.join(process.cwd(), "..", "KDCTC.md");
  const content = fs.readFileSync(filePath, "utf-8");
  return content;
}

/**
 * Extracts the title (first line) from the markdown content.
 */
export function extractTitle(content: string): string {
  const lines = content.split("\n");
  // The first line is the title (not prefixed with #)
  return lines[0]?.trim() || "Nghiên Cứu Thần Học";
}

/**
 * Extracts the introduction paragraph (second non-empty line) from the markdown.
 */
export function extractIntro(content: string): string {
  const lines = content.split("\n").filter((line) => line.trim() !== "");
  // The second line is the intro paragraph
  return lines[1]?.trim() || "";
}

export interface TOCItem {
  id: string;
  title: string;
  level: number;
}

/**
 * Extracts headings from the body of the markdown.
 * Assumes headings start with numbers like "1.", "1.1.", "2."
 * We inject anchor IDs into the content and return a TOC list.
 */
export function processContentForTOC(content: string): { bodyContent: string, toc: TOCItem[] } {
  const lines = content.split("\n");
  const nonEmptyLines = lines.map((line, i) => ({ line, index: i }));

  let titleLineIndex = -1;
  let introLineIndex = -1;
  for (const { line, index } of nonEmptyLines) {
    if (line.trim() !== "") {
      if (titleLineIndex === -1) {
        titleLineIndex = index;
      } else if (introLineIndex === -1) {
        introLineIndex = index;
        break;
      }
    }
  }

  const rawBodyLines = lines.slice(introLineIndex + 1);
  const toc: TOCItem[] = [];
  const processedBodyLines = rawBodyLines.map((line) => {
    // Regex for headings: e.g., "1. Mầu Nhiệm...", "1.1. Khải Tượng...", "Tổng Kết"
    // In KDCTC.md, some headings don't have markdown '#' so we convert them if needed
    // or just look for the pattern.
    // Wait, KDCTC.md headings don't have # prefixes! They are just numbered.
    // Let's identify headings by matching start of line with number dot or specific words like "Tổng Kết"
    const headingMatch = line.match(/^(\d+(?:\.\d+)*\.)\s+(.+)$/);
    const isTongKet = line.trim() === "Tổng Kết";
    
    if (headingMatch || isTongKet) {
      let level = 2; // Default to H2
      let title = "";
      let id = "";

      if (headingMatch) {
        const numberPart = headingMatch[1];
        title = headingMatch[2];
        level = numberPart.split(".").filter(Boolean).length === 1 ? 2 : 3;
        id = `section-${numberPart.replace(/\./g, "-").replace(/-$/, "")}`;
      } else if (isTongKet) {
        title = "Tổng Kết";
        level = 2;
        id = "section-tong-ket";
      }

      toc.push({ id, title: headingMatch ? `${headingMatch[1]} ${title}` : title, level });
      
      // Convert to Markdown heading so react-markdown renders it as H2/H3
      const hashes = "#".repeat(level);
      return `${hashes} ${headingMatch ? headingMatch[0] : line}`;
    }

    // Convert markdown tables that don't have leading/trailing pipes (if any) or just leave it to remark-gfm
    return line;
  });

  return {
    bodyContent: processedBodyLines.join("\n").trim(),
    toc
  };
}
