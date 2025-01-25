"use client";

import "../../styles/globals.css";
import "../../styles/animations.css";
import "../../styles/gradients.css";
import type React from "react";
import { Roboto, Aleo } from "next/font/google";
import LoadingAnimations from "@/components/LoadingAnimations";
import { useState } from "react";

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

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
   const [isLoading, setIsLoading] = useState(true);

  return (
    <html lang="en">
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="
          default-src 'self';
          script-src 'self' 'unsafe-eval' 'unsafe-inline';
          style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
          font-src 'self' https://fonts.gstatic.com;
          img-src 'self' data: https:;
          media-src 'self' https: data:;
        "
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${aleo.variable} ${roboto.variable} font-sans bg-primary`}
      >
        {isLoading && (
          <LoadingAnimations onComplete={() => setIsLoading(false)} />
        )}
        {!isLoading && children}
      </body>
    </html>
  );
}
