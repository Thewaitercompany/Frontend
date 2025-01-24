import "./globals.css";
import type { Metadata } from "next";
import { Roboto, Aleo } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

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

export const metadata: Metadata = {
  title: "The Waiter Company",
  description: "Empowering your cafe business with innovative solutions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${roboto.variable} ${aleo.variable}`}
    >
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="
          default-src 'self';
          script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com;
          style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
          font-src 'self' https://fonts.gstatic.com;
          img-src 'self' data: https:;
          media-src 'self' https: data:;
          connect-src 'self' https://analytics.languagetoolplus.com https://vitals.vercel-insights.com;
        "
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${roboto.className} antialiased`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
