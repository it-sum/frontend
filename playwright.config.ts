import { defineConfig } from "@playwright/test";

const baseURL = "http://localhost:3000";
const isCI = Boolean(process.env.CI);

export default defineConfig({
  testDir: "./e2e",
  testMatch: "**/*.spec.ts",
  fullyParallel: false,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  reporter: "list",
  timeout: 90_000,
  workers: 1,
  expect: { timeout: 15_000 },
  use: {
    baseURL,
    channel: process.platform === "win32" ? "msedge" : undefined,
    viewport: { width: 1280, height: 900 },
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run dev",
    url: `${baseURL}/ar`,
    reuseExistingServer: !isCI,
    timeout: 120_000,
  },
});
