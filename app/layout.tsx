import type { Metadata } from "next";
import { JetBrains_Mono, Outfit, Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import { Toaster } from "@/components/ui/sonner";

// Font Imports
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-outfit",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-orbitron",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-rajdhani",
});

export const metadata: Metadata = {
  title: "CodeSnap",
  description: "AI-powered UI design to Code converter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jetbrains.variable} ${outfit.variable} ${orbitron.variable} ${rajdhani.variable}`}
    >
      <body
        className={`font-[var(--font-jetbrains)] text-gray-900 dark:text-white bg-white dark:bg-neutral-900`}
      >
        <Provider>
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
