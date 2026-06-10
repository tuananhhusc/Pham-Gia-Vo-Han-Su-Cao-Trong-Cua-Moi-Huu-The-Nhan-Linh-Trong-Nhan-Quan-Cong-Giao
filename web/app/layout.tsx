import type { Metadata } from "next";
import { EB_Garamond, Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const garamond = EB_Garamond({
  variable: "--font-body",
  subsets: ["latin", "vietnamese"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin", "vietnamese"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kdctc.netlify.app"),
  title: "Phẩm Giá Vô Hạn: Sự Cao Trọng Của Mỗi Hữu Thể Nhân Linh",
  description:
    "Nghiên cứu chuyên sâu về sự cao trọng của mỗi hữu thể nhân linh trong nhãn quan Công giáo qua các chủ đề Imago Dei, Thân xác con người, và Dignitas Infinita.",
  keywords: [
    "Công giáo",
    "Phẩm giá con người",
    "Imago Dei",
    "Dignitas Infinita",
    "Evangelium Vitae",
    "Nhân vị tính",
    "Thân xác con người",
  ],
  authors: [{ name: "Nghiên Cứu Thần Học" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Phẩm Giá Vô Hạn: Sự Cao Trọng Của Mỗi Hữu Thể Nhân Linh",
    description:
      "Nghiên cứu chuyên sâu về sự cao trọng của mỗi hữu thể nhân linh trong nhãn quan Công giáo qua các chủ đề Imago Dei, Thân xác con người, và Dignitas Infinita.",
    type: "article",
    locale: "vi_VN",
    url: "https://kdctc.netlify.app",
    siteName: "Nghiên Cứu Thần Học Công Giáo",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Phẩm Giá Vô Hạn: Sự Cao Trọng Của Mỗi Hữu Thể Nhân Linh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Phẩm Giá Vô Hạn: Sự Cao Trọng Của Mỗi Hữu Thể Nhân Linh",
    description:
      "Nghiên cứu chuyên sâu về sự cao trọng của mỗi hữu thể nhân linh trong nhãn quan Công giáo qua các chủ đề Imago Dei, Thân xác con người, và Dignitas Infinita.",
    images: ["/og-image.png"],
  },
  other: {
    "citation_title": "Phẩm Giá Vô Hạn: Sự Cao Trọng Của Mỗi Hữu Thể Nhân Linh",
    "citation_author": "Nghiên Cứu Thần Học",
    "citation_publication_date": "2026/06/04",
    "citation_language": "vi",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const scholarlyArticleSchema = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    "headline": "Phẩm Giá Vô Hạn: Sự Cao Trọng Của Mỗi Hữu Thể Nhân Linh",
    "description": "Nghiên cứu chuyên sâu về sự cao trọng của mỗi hữu thể nhân linh trong nhãn quan Công giáo qua các chủ đề Imago Dei, Thân xác con người, và Dignitas Infinita.",
    "author": {
      "@type": "Person",
      "name": "Nghiên Cứu Thần Học"
    },
    "datePublished": "2026-06-04",
    "inLanguage": "vi",
  };

  return (
    <html
      lang="vi"
      className={`${garamond.variable} ${playfairDisplay.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(scholarlyArticleSchema) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('read-theme') || 'parchment';
                  var fontSize = localStorage.getItem('read-font-size') || 'md';
                  var fontFamily = localStorage.getItem('read-font-family') || 'serif';
                  var focusMode = localStorage.getItem('read-focus-mode');
                  
                  var html = document.documentElement;
                  html.classList.remove('theme-dark', 'theme-sepia');
                  if (theme === 'dark') html.classList.add('theme-dark');
                  if (theme === 'sepia') html.classList.add('theme-sepia');
                  
                  html.classList.remove('font-size-sm', 'font-size-md', 'font-size-lg', 'font-size-xl');
                  html.classList.add('font-size-' + fontSize);
                  
                  if (fontFamily === 'sans') {
                    html.classList.add('font-sans-active');
                  } else {
                    html.classList.remove('font-sans-active');
                  }
                  
                  if (focusMode === 'true') {
                    html.classList.add('focus-mode-active');
                  } else {
                    html.classList.remove('focus-mode-active');
                  }
                } catch (e) {}
              })();
            `
          }}
        />
      </head>
      <body className="min-h-full flex flex-col transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
