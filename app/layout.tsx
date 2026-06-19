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
      email: studio.email,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white text-black selection:bg-black selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
