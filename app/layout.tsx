import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "@/app/globals.css";
import { CursorAura } from "@/components/cursor-aura";
import { SmoothScroll } from "@/components/smooth-scroll";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-luxury-serif",
  weight: ["400", "500", "600", "700"],
  display: "swap"
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-luxury-sans",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://grand-opulence.vercel.app"),
  title: "Maison Aurum | Cinematic Luxury Ecommerce",
  description:
    "A premium high-fashion ecommerce experience blending cinematic editorial design, gold-dusted interaction, and modern performance.",
  keywords: [
    "luxury ecommerce",
    "high fashion",
    "jewelry",
    "lifestyle brand",
    "cinematic retail",
    "Next.js luxury website"
  ],
  openGraph: {
    title: "Maison Aurum | Cinematic Luxury Ecommerce",
    description:
      "Apple-smooth, Chanel-elegant, and Awwwards-inspired luxury ecommerce for fashion, jewelry, and lifestyle.",
    type: "website"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
  colorScheme: "dark"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} scroll-smooth`}>
      <body>
        <SmoothScroll>
          <CursorAura />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
