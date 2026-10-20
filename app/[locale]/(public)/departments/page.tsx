"use client";

import React, { useState } from "react";
import { useLocale } from "next-intl";
import { isArabicLocale } from "@/src/constants/variables";
import DepartmentsHero from "@/src/components/layouts/departments/DepartmentsHero";
import DepartmentsGrid from "@/src/components/layouts/departments/DepartmentsGrid";
import DepartmentsFeatured from "@/src/components/layouts/departments/DepartmentsFeatured";

export default function DepartmentsPage() {
  const [search, setSearch] = useState("");
  const locale = useLocale();
  const isArabic = isArabicLocale(locale);

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      className="min-h-screen w-full overflow-hidden bg-transparent text-slate-950 transition-colors dark:text-white"
    >
      <DepartmentsHero search={search} setSearch={setSearch} />
      <DepartmentsGrid search={search} />
      <DepartmentsFeatured />
    </main>
  );
}
