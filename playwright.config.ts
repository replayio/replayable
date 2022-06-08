import { PlaywrightTestConfig, devices } from "@playwright/test";
const { devices } = require("@replayio/playwright");

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
    inCI
      ? {
          name: "firefox",
          use: { ...devices["Replay Firefox"] },
        }
      : {
          name: "chromium",
          use: { ...devices["Chromium"] },
        },
  ],
};
export default config;
