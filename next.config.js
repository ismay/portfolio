/* eslint-disable import/no-extraneous-dependencies, no-param-reassign */

const HoneybadgerSourceMapPlugin = require("@honeybadger-io/webpack");

const webpack = (config) => {
  // Upload sourcemaps whenever building on Vercel
  if (process.env.VERCEL) {
    config.devtool = "source-map";
    config.plugins.push(
      new HoneybadgerSourceMapPlugin({
        apiKey: process.env.HONEYBADGER_API_KEY,
        assetsUrl: `${process.env.VERCEL_URL}/_next`,
        deploy: {
          environment: process.env.VERCEL_ENV,
          localUsername: process.env.VERCEL_GIT_COMMIT_AUTHOR_NAME,
          repository: "https://github.com/ismay/superwolff",
        },
        revision: process.env.VERCEL_GIT_COMMIT_SHA,
      })
    );
  }

  return config;
};

// https://nextjs.org/docs/api-reference/next.config.js/introduction
module.exports = {
  images: {
    domains: ["media.graphcms.com"],
  },
  reactStrictMode: true,
  webpack,
};
