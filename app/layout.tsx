import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { studio } from "@/lib/studio";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tejaslabs.co.in";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tejas Labs — AI automation that survives production",
    template: "%s · Tejas Labs",
  },
  description:
    "Tejas Labs builds production-ready AI automation, agentic workflows, RAG systems, and full-stack AI apps. Trusted by the Government of Chhattisgarh. Based in Raipur, India.",
  keywords: [
    "AI automation",
    "RAG",
    "AI agents",
    "LangGraph",
    "production AI",
    "Tejas Labs",
  ],
  authors: [{ name: "Tejas Labs" }],
  creator: "Tejas Labs",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Tejas Labs",
    title: "Tejas Labs — AI automation that survives production",
    description:
      "Production-ready AI automation, agentic workflows, RAG systems, and full-stack AI apps. Trusted by the Government of Chhattisgarh.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tejas Labs — AI automation that survives production",
    description:
      "Production-ready AI automation, agentic workflows, RAG systems, and full-stack AI apps.",
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
      name: "Tejas Labs",
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.svg`,
      description:
        "AI automation studio building production-ready agentic workflows, RAG systems, and full-stack AI apps. Based in Raipur, India.",
      foundingDate: "2021",
      areaServed: "Worldwide",
      knowsAbout: [
        "AI agents",
        "Retrieval-augmented generation",
        "LangGraph",
        "Robotic process automation",
        "Vertical SaaS integrations",
        "Full-stack AI applications",
      ],
      founder: [
        { "@id": `${SITE_URL}#person-tushar` },
        { "@id": `${SITE_URL}#person-ansh` },
      ],
      sameAs: [studio.upwork],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      url: SITE_URL,
      name: "Tejas Labs",
      publisher: { "@id": `${SITE_URL}#organization` },
      inLanguage: "en",
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}#person-tushar`,
      name: "Tushar Naidu",
      jobTitle: "Founder",
      worksFor: { "@id": `${SITE_URL}#organization` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}#person-ansh`,
      name: "Ansh Pandey",
      jobTitle: "Founder",
      worksFor: { "@id": `${SITE_URL}#organization` },
    },
  ],
};

/**
 * Inline theme bootstrap.
 *
 * Runs synchronously during HTML parsing, before the first paint, so the
 * saved theme is applied with no flash. Reads the stored theme, falls back
 * to the OS preference, and reflects that onto <html data-theme="…">.
 * Also subscribes to cross-tab changes via the `storage` event so toggling
 * the theme in one tab updates the other.
 */
const themeBootstrap = `(function(){try{var k="tejas-theme";var s=localStorage.getItem(k);var t=s||(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.setAttribute("data-theme",t);window.addEventListener("storage",function(e){if(e.key===k&&(e.newValue==="light"||e.newValue==="dark")){document.documentElement.setAttribute("data-theme",e.newValue)}})}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      data-theme="light"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: themeBootstrap,
          }}
        />
      </head>
      <body className="min-h-full selection:bg-[var(--selection-bg)] selection:text-[var(--selection-fg)]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
