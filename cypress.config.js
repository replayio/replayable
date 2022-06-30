const { defineConfig } = require("cypress");
const cypressReplay = require("@replayio/cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    screenshotOnRunFailure: false,
    video: false,
    setupNodeEvents(on, config) {
      cypressReplay.default(on, config);
      return config;
    },
  },
});
