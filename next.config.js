/* eslint-disable import/no-extraneous-dependencies */

const { RelativeCiAgentWebpackPlugin } = require("@relative-ci/agent");

const shouldAnalyze = process.env.ANALYZE_BUNDLE === "enabled";

const webpack = (config, options) => {
  const { isServer } = options;

  if (shouldAnalyze && !isServer) {
    config.plugins.push(new RelativeCiAgentWebpackPlugin());
  }

  return config;
};

module.exports = {
  images: {
    domains: ["media.graphcms.com"],
  },
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  webpack,
};
