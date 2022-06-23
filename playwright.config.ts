import { PlaywrightTestConfig, devices } from "@playwright/test";
import { devices as replayDevices } from "@replayio/playwright";

import dotenv from "dotenv";

const inCI = !!process.env.CI;

if (!inCI) {
  dotenv.config();
}

const config: PlaywrightTestConfig = {
  timeout: 0 * 1000,
  workers: !inCI ? 1 : undefined,
  use: {
    baseURL: !inCI ? "http://localhost:3000" : undefined,
  },

  projects: [
    {
      name: "replay-firefox",
      use: { ...(replayDevices["Replay Firefox"] as any) },
    },
    {
      name: "replay-chromium",
      use: { ...(replayDevices["Replay Chromium"] as any) },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "chromium",
      use: { ...devices["Desktop Chromium"] },
    },
  ],
};
export default config;
