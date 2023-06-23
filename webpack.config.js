const path = require("path");

module.exports = {
  entry: "./extensions/badges/assets/badges.js",
  output: {
    filename: "bundled-badges.js",
    path: path.resolve(__dirname, "./extensions/badges/assets"),
  },
};
