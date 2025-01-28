import "@/styles/globals.css";
import "@/styles/animations.css";
import "@/styles/gradients.css";
import type { Metadata } from "next";
import type React from "react";
import { Roboto, Aleo } from "next/font/google";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

const aleo = Aleo({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-aleo",
});

export const viewport: Metadata = {
  title: "The Waiter Company - Menu",
  description: "Order your favorite dishes",
};

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${aleo.variable} ${roboto.variable} font-sans bg-primary`}
      >
        {children}
      </body>
    </html>
  );
}
