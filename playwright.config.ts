import { PlaywrightTestConfig, devices } from "@playwright/test";

const config: PlaywrightTestConfig = {
  // forbidOnly: !!process.env.CI,
  // retries: process.env.CI ? 2 : 0,
  // use: {
  //   trace: "on-first-retry",
  // },
  use: {
    headless: false,
    launchOptions: {
      slowMo: 500,
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
