import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Tejas Labs — AI automation that survives production",
  description:
    "Tejas Labs builds production-ready AI automation, agentic workflows, RAG systems, and full-stack AI apps. Trusted by the Government of Chhattisgarh. Based in Raipur, India.",
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
        {children}
      </body>
    </html>
  );
}
