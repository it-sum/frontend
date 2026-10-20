"use client";

import { useLocale } from "next-intl";
import { useEffect } from "react";
import { getLocaleDirection } from "@/src/constants/variables";

export default function LocaleSync() {
  const locale = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getLocaleDirection(locale);
  }, [locale]);

  return null;
}
