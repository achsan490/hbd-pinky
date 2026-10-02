import type { Metadata } from "next";
import { Nunito, Caveat } from "next/font/google";
import "./globals.css";
import { MusicProvider } from "@/context/MusicContext";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Happy Birthday Sayang! 🐷💕",
  description: "A cute, playful, romantic birthday surprise made with all my love.",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Happy Birthday Sayang! 🐷💕",
    description: "A cute romantic birthday surprise with lots of love.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${nunito.variable} ${caveat.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-[#fff5f7] text-[#4a2e35] selection:bg-pink-300 selection:text-pink-900 overflow-x-hidden min-h-screen">
        <MusicProvider>{children}</MusicProvider>
      </body>
    </html>
  );
}
