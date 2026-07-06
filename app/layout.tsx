import type { Metadata } from "next";
import "./globals.css";

import {
  alexandria,
  inter,
  montserrat,
  notoSansArabic,
} from "@/src/lib/fonts";

export const metadata: Metadata = {
  title: "IT-SUM",
  description: "Enterprise Educational Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`
        ${inter.variable}
        ${montserrat.variable}
        ${alexandria.variable}
        ${notoSansArabic.variable}
      `}
    >
      <body>{children}</body>
    </html>
  );
}