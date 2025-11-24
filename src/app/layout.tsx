import React from 'react';
import type { Metadata } from "next";
import { Inter, Fragment_Mono } from 'next/font/google';
import "./globals.css";
import ClientBody from "./ClientBody";

// Setup Inter font
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Setup Fragment Mono font
const fragmentMono = Fragment_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-fragment-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "momo the monad monkey",
  description: "momo the monad monkey",
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: "momo the monad monkey",
    description: "momo the monad monkey",
    siteName: "MoMo",
    images: [
      {
        url: "/images/momo-banner.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "momo the monad monkey",
    description: "momo the monad monkey",
    images: ["/images/momo-banner.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fragmentMono.variable}`}>
      <body suppressHydrationWarning className="antialiased font-sans">
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
