import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import "./globals.css";
import BackgroundPattern from "@/components/BackgroundPattern";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hasan Ekkeri | Software Engineer",
  description: "Hasan Ekkeri's portfolio site focused on React, Next.js, Node.js, Python, and Django work.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth bg-brand-cream overflow-x-hidden">
      <body
        className={`${inter.variable} ${geist.variable} antialiased bg-brand-cream text-brand-ink min-h-screen relative overflow-x-hidden`}
      >
        <BackgroundPattern variant="page" className="fixed inset-0 -z-50" />
        <div className="fixed inset-0 -z-40 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_48%)]" />

        <main className="relative z-10 w-full">
          {children}
        </main>
      </body>
    </html>
  );
}