/* eslint-disable import/no-extraneous-dependencies */

const { RelativeCiAgentWebpackPlugin } = require("@relative-ci/agent");

const webpack = (config, options) => {
  const isEnabled = process.env.ANALYZE_BUNDLE === "enabled";
  const { dev, isServer } = options;
  const shouldAnalyze = !dev && !isServer && isEnabled;

  if (shouldAnalyze) {
    config.plugins.push(new RelativeCiAgentWebpackPlugin());
  }

  return config;
};

module.exports = {
  images: {
    domains: ["media.graphcms.com"],
  },
  reactStrictMode: true,
  webpack,
};
