import type { Metadata } from "next";
import "./globals.css";
import { getLocale } from "next-intl/server";
import { alexandria, inter, montserrat, notoSansArabic } from "@/src/lib/fonts";

export const metadata: Metadata = {
  title: "IT-SUM",
  description: "Enterprise Educational Platform",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
      className={`${inter.variable} ${montserrat.variable} ${alexandria.variable} ${notoSansArabic.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme');var t=s||'dark';if(t==='dark'){document.documentElement.classList.add('dark')}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
