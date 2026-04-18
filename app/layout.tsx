import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "fayzm",
  description: "fayzm",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="uz">
      <body>{children}</body>
    </html>
  );
}
