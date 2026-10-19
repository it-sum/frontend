import type { Metadata } from "next";
import "./globals.css";
import { getLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { alexandria, inter, montserrat, notoSansArabic } from "@/src/lib/fonts";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Metadata");
  const title = t("title");
  const description = t("description");

  return {
    title: { default: title, template: t("titleTemplate") },
    description,
    applicationName: "IT-SUM",
    openGraph: {
      title,
      description,
      siteName: "IT-SUM",
      type: "website",
    },
  };
}

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
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
