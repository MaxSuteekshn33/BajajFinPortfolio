import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { FinAskWidget } from "@/components/finask/FinAskWidget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Bajaj Finserv AMC — Direct. Personal. Yours.",
  description:
    "FinAI-driven, direct-to-customer investing on Bajaj Finserv Asset Management's own mutual fund schemes. Hackathon prototype for ATOM Season 9, PS5.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FinAskWidget />
      </body>
    </html>
  );
}
