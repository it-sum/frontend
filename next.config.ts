import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const enableDemoAccounts =
  process.env.NEXT_PUBLIC_ENABLE_DEMO_ACCOUNTS ??
  (process.env.VERCEL === "1" && process.env.VERCEL_ENV === "production"
    ? "true"
    : "false");

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_ENABLE_DEMO_ACCOUNTS: enableDemoAccounts,
  },
  // Force full stack traces during build
  productionBrowserSourceMaps: true,
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(nextConfig);
