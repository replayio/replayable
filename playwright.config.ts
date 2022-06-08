import { PlaywrightTestConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

const inCI = !!process.env.CI;

const config: PlaywrightTestConfig = {
  timeout: 10 * 1000,
  use: {
    launchOptions: {
      slowMo: inCI ? 0 : 500,
    },
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
};
export default config;
