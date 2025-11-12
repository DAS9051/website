import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains"
});

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dylan Sahota",
  jobTitle: "Infrastructure Architect & Machine Learning Developer",
  url: "https://dylan-sahota.dev",
  sameAs: ["https://linkedin.com/in/dylan-sahota", "https://github.com/DAS9051"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Toronto",
    addressRegion: "ON",
    addressCountry: "CA"
  }
};

export const metadata: Metadata = {
  title: "Dylan Sahota · Portfolio",
  description:
    "Infrastructure Architect and Machine Learning Developer crafting scalable AWS solutions and predictive analytics.",
  metadataBase: new URL("https://dylan-sahota.dev"),
  alternates: {
    canonical: "https://dylan-sahota.dev"
  },
  keywords: [
    "Dylan Sahota",
    "Infrastructure Architect",
    "Machine Learning Developer",
    "AWS",
    "DevOps",
    "Quant Finance",
    "Portfolio Optimization",
    "Toronto"
  ],
  category: "Technology",
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: "Dylan Sahota · Portfolio",
    description:
      "Infrastructure Architect and Machine Learning Developer crafting scalable AWS solutions and predictive analytics.",
    url: "https://dylan-sahota.dev",
    siteName: "Dylan Sahota Portfolio",
    locale: "en_CA",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Dylan Sahota · Portfolio",
    description:
      "Infrastructure Architect and Machine Learning Developer crafting scalable AWS solutions and predictive analytics."
  },
  authors: [{ name: "Dylan Sahota", url: "https://github.com/DAS9051" }],
  icons: {
    icon: "/favicon.svg"
  },
  themeColor: "#0b0d12"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={jetbrainsMono.variable} lang="en">
      <body className="noise-bg bg-background text-foreground antialiased">
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          type="application/ld+json"
        />
        {children}
      </body>
    </html>
  );
}

