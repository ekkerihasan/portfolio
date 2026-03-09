import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Hasan Ekkeri | Backend Architect & Security",
  description: "Crafting scalable systems and secure digital architectures.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    /* FIXED: Added bg-[#F8F4EC] and overflow-x-hidden to the root to kill the white edges */
    <html lang="en" className="scroll-smooth bg-[#F8F4EC] overflow-x-hidden">
      <body
        className={`${inter.variable} ${instrumentSerif.variable} antialiased selection:bg-brand-gold selection:text-white bg-[#F8F4EC] min-h-screen relative`}
      >
        {/* Modern Premium Background Layer - ALL ORIGINAL LOGIC PRESERVED */}
        <div className="fixed inset-0 -z-50 bg-[#F8F4EC]">
          {/* Subtle Grain Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          {/* Soft ambient glow */}
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-gold/5 blur-[120px]" />
        </div>

        <Navbar />

        <main className="relative z-10 pt-20 md:pt-32">
          {children}
        </main>
      </body>
    </html>
  );
}