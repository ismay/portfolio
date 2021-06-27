/* eslint-disable import/no-extraneous-dependencies */

const { RelativeCiAgentWebpackPlugin } = require("@relative-ci/agent");

const webpack = (config, options) => {
  const isEnabled = process.env.ANALYZE_BUNDLE === "enabled";
  const { isServer } = options;

  // Only analyze the client bundle
  const shouldAnalyze = !isServer && isEnabled;

  if (shouldAnalyze) {
    config.plugins.push(new RelativeCiAgentWebpackPlugin());
  }

  return config;
};

module.exports = {
  i18n: {
    defaultLocale: "en-US",
    locales: ["en-US"],
  },
  images: {
    domains: ["media.graphcms.com"],
  },
  reactStrictMode: true,
  webpack,
};
