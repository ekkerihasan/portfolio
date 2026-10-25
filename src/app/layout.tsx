import type { Metadata } from 'next';
import { Geist, Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Hasan Ekkeri | Software Engineer',
  description:
    "Hasan Ekkeri's portfolio site focused on React, Next.js, Node.js, Python, and Django work.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth bg-bone overflow-x-hidden">
      <body
        className={`${inter.variable} ${geist.variable} antialiased bg-bone text-basalt min-h-screen relative overflow-x-hidden`}
      >
        <main className="relative z-10 w-full">{children}</main>
      </body>
    </html>
  );
}
