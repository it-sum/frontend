"use client";

import { ThemeProvider } from "next-themes";
import type { PropsWithChildren } from "react";

const ThemeProviderWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      {children}
    </ThemeProvider>
  );
};

export default ThemeProviderWrapper;