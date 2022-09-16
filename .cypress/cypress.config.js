const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    fixturesFolder: false,
    integrationFolder: ".cypress/integration",
    pluginsFile: false,
    supportFile: ".cypress/support/index.js",
    video: false,
  },
});
