import "./globals.css";
import type { Metadata } from "next";
import { Roboto, Aleo } from "next/font/google";
// import { Analytics } from "@vercel/analytics/react";
// import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Viewport } from "next";

// export const viewport: Viewport = {
//   width: "device-width",
//   initialScale: 1,
//   maximumScale: 1,
// };
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
  title: "The Waiter Company",
  description: "Empowering your cafe business with innovative solutions",
  viewport: "width=device-width, initial-scale=1",
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
      <body
        suppressHydrationWarning
        className={`${roboto.className} antialiased`}
      >
        {children}
        {/* <Analytics />
        <SpeedInsights /> */}
      </body>
    </html>
  );
}
