import { defineConfig } from "cypress";
import cypressReplay from "@replayio/cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    screenshotOnRunFailure: false,
    video: false,
    setupNodeEvents(on, config) {
      cypressReplay(on, config);
      return config;
    },
  },
});
