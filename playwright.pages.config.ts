import { defineConfig } from "@playwright/test";
import { readFileSync } from "node:fs";
const { basePath } = JSON.parse(readFileSync("out/pages-preview.json", "utf8"));
const url = `http://127.0.0.1:4173${basePath}/`;
export default defineConfig({
  testDir: "./tests/pages",
  workers: 1,
  timeout: 60000,
  reporter: [["list"]],
  use: {
    baseURL: url,
    channel: "chrome",
    viewport: { width: 1440, height: 1000 },
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "node scripts/serve-pages.mjs",
    url,
    reuseExistingServer: false,
    timeout: 30000,
  },
});
