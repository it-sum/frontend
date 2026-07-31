"use client";

import QueryProvider from "./query-provider";
import { SessionRestorer } from "@/src/components/providers/session-restorer";

/**
 * AppProvider — root client provider tree.
 * Add any future global providers (toast, analytics, etc.) here.
 */
export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <SessionRestorer />
      {children}
    </QueryProvider>
  );
}
