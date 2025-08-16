import React from "react";
import type { Metadata } from "next";
import { Inter, Silkscreen } from "next/font/google";

import "./globals.css";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const silkscreen = Silkscreen({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-silkscreen",
});

export const metadata: Metadata = {
  title: "Mikael K. Aboagye",
  description: `Hi 👋, Hi 👋, I'm Mikael Aboagye, Im a passionate c++ software engineer with a knack for creating scalable, high-performance software and amazingly rendered graphics. With a strong foundation in Graphics Programming and Consoles, Everyday, I attempt to make worlds that can make someone smile.`,
  creator: "Mikael Kwaku Aboagye",
  applicationName: "scrumpysfindings",
  keywords: [
    "Mikael Aboagye",
    "Mikael",
    "Aboagye",
    "Portfolio",
    "C++",
    "Software engineer",
    "Aperture UI",
    "WD Studios",
    "Watch Dogs",
    "Phantom Corporation",
    "Phantom",
  ],
  icons: {
    icon: "./favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        url: "/favicon.ico",
        sizes: "32x32",
      },
      {
        rel: "icon",
        url: "/favicon.ico",
        sizes: "16x16",
      },
      {
        rel: "icon",
        url: "/favicon.ico",
        sizes: "192x192",
      },
      {
        rel: "icon",
        url: "/favicon-96x96.ico",
        sizes: "96x96",
      },
    ],
  },
  openGraph: {
    type: "website",
    url: "https://scrumpysfindings.me",
    title: "Mikael Aboagye - Software Engineer",
    description: `Hi 👋, I'm Mikael Aboagye, Im a passionate c++ software engineer with a knack for creating scalable, high-performance software and amazingly rendered graphics. With a strong foundation in Graphics Programming and Consoles, Everyday, I attempt to make worlds that can make someone smile.`,
    images: [
      {
        url: "/67095081.png",
        width: 1200,
        height: 628,
        alt: "Mikael Aboagye",
      },
    ],
  },
  twitter: {
    title: "Mikael Aboagye",
    description: `Hi 👋, I'm Mikael Aboagye, Im a passionate c++ software engineer with a knack for creating scalable, high-performance software and amazingly rendered graphics. With a strong foundation in Graphics Programming and Consoles, Everyday, I attempt to make worlds that can make someone smile.`,
    card: "summary_large_image",
    site: "@AmanfoMike",
    images: "/67095081.png",
  },
  verification: {
    google: "k83JtkKiU8MvRqLS05NLwZPSOGLJXbZpzln4wdJ-iPI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${silkscreen.variable} win96-desktop starry-night retro-crt relative`}
      >
        <ThemeProvider
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          {/* Parallax nebula layers */}
          <div className="starry-layer layer-slow" />
          <div className="starry-layer layer-medium" />
          <div className="starry-layer layer-fast" />
          <main className="relative z-10">{children}</main>
          <Footer />
          {/* Global shooting stars overlays (pointer-events: none) */}
          <div className="shooting-star shooting-star-1" />
          <div className="shooting-star shooting-star-2" />
          <div className="shooting-star shooting-star-3" />
          <div className="main-mask pointer-events-none absolute inset-0 -z-50" />
        </ThemeProvider>
      </body>
    </html>
  );
}
