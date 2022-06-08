import { PlaywrightTestConfig, devices } from "@playwright/test";
import { devices as replayDevices } from "@replayio/playwright";

import dotenv from "dotenv";

const inCI = !!process.env.CI;

if (!inCI) {
  dotenv.config();
}

const config: PlaywrightTestConfig = {
  timeout: 10 * 1000,
  use: {
    launchOptions: {
      slowMo: inCI ? 0 : 500,
    },
  },

  projects: [
    inCI
      ? {
          name: "firefox",
          use: { ...replayDevices["Replay Firefox"] },
        }
      : {
          name: "chromium",
          use: { ...devices["Chromium"] },
        },
  ],
};
export default config;
