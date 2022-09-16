const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    fixturesFolder: false,
    specPattern: ".cypress/integration",
    supportFile: ".cypress/support/index.js",
    video: false,
  },
});
