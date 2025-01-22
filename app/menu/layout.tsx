import "../../styles/globals.css";
import "../../styles/animations.css";
import type { Metadata } from "next";
import { aleo, roboto } from "../../app/fonts";
import "../../styles/gradients.css";
import type React from "react";

export const metadata: Metadata = {
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
