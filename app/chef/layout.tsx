import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "The Waiter Company - Chef Dashboard",
  description: "Kitchen staff dashboard for managing orders",
};

export default function ChefLayout({
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
        className={`${roboto.className} antialiased bg-[#F1EEE6]`}
      >
        {children}
      </body>
    </html>
  );
}
