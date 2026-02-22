import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"]
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"]
});

export const metadata: Metadata = {
  title: "Hasan Ekkeri - Backend & Security Developer",
  description: "Premium developer portfolio. Backend architect & security-focused full-stack developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${poppins.variable} antialiased overflow-x-hidden min-h-screen 
  bg-white dark:bg-black
  text-slate-900 dark:text-slate-100 
  transition-colors duration-500`}
      >
      

        {/* The floating pill navbar */}
        <Navbar />

        {/* Main Content wrapper */}
        <main className="relative z-10 pt-32">
          {children}
        </main>
      </body>
    </html>
  );
}