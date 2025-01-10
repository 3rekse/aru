import type { Metadata } from "next";
import { Geist, Geist_Mono, Doto } from "next/font/google";
import "./globals.css";

const doto = Doto({
  variable: "--font-doto",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CCLA",
  description: "Binary Arithmetic Certificate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <head>
        <link rel="icon" href="/ccla.svg" type="image/svg+xml" />
      </head>
      <body className={`${doto.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
