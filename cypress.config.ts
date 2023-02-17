import { defineConfig } from "cypress";
import cypressReplay from "@replayio/cypress";

module.exports = defineConfig({
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
