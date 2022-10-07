const { withPlaiceholder } = require("@plaiceholder/next");

module.exports = withPlaiceholder({
  images: {
    domains: ["media.graphassets.com"],
  },
  reactStrictMode: process.env.NODE_ENV === "development",
});
