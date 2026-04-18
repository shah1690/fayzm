import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { manrope, plusJakartaSans } from "@/app/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "FAYZ-M - Multi-Sector Textile Cluster",
  description: "Multi-Sector Textile Cluster",
  icons: {
    icon: "/favicon.ico",
  },
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${manrope.variable} ${plusJakartaSans.variable}`}>
      <body className="bg-white font-secondary">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
