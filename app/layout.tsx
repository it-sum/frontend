import type { Metadata } from "next";
import "./globals.css";
import { getLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { alexandria, inter, montserrat } from "@/src/lib/fonts";
import {
  getLocaleDirection,
  isArabicLocale,
  THEME_BOOTSTRAP_SCRIPT,
} from "@/src/constants/variables";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Metadata");
  const title = t("title");
  const description = t("description");

  return {
    title: { default: title, template: t("titleTemplate") },
    description,
    applicationName: "IT-SUM",
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon.png", type: "image/png", sizes: "512x512" },
      ],
      apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
    },
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
  const fontVariables =
    isArabicLocale(locale)
      ? alexandria.variable
      : `${inter.variable} ${montserrat.variable}`;

  return (
    <html
      lang={locale}
      dir={getLocaleDirection(locale)}
      suppressHydrationWarning
      className={fontVariables}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: THEME_BOOTSTRAP_SCRIPT,
          }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
