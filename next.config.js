/* eslint-disable import/no-extraneous-dependencies */

const bundleAnalyzer = require("@next/bundle-analyzer");

const config = {
  images: {
    domains: ["media.graphcms.com"],
  },
  reactStrictMode: true,
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE_BUNDLE === "enabled",
});

module.exports = withBundleAnalyzer(config);
