const { withPlaiceholder } = require("@plaiceholder/next");

module.exports = withPlaiceholder({
  images: {
    domains: ["media.graphassets.com"],
  },
  reactStrictMode: true,
});
