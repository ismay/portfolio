const applyMocks = (config) => {
  config.resolve.alias["next/router"] = require.resolve(
    "./mocks/next-router.js"
  );

  return config;
};

module.exports = {
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  core: {
    builder: "webpack5",
  },
  stories: ["../components/**/*.stories.js"],
  typescript: { reactDocgen: false },
  webpackFinal: applyMocks,
};
