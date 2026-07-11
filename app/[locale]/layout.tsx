import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/src/i18n/routing";
import Responsive from "@/src/components/layouts/navigation/responsive";
import ThemeProvider from "@/src/components/providers/theme-provider";
import {
  alexandria,
  inter,
  montserrat,
  notoSansArabic,
} from "@/src/lib/fonts";
import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "IT-SUM",
  description: "Enterprise Educational Platform",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
      className={`${inter.variable} ${montserrat.variable} ${alexandria.variable} ${notoSansArabic.variable}`}
    >
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <Responsive />
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}