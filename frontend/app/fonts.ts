import { Manrope, Onest } from "next/font/google";

export const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-secondary",
  display: "swap",
});

export const onest = Onest({
  subsets: ["latin", "cyrillic"],
  variable: "--font-primary",
  display: "swap",
});
