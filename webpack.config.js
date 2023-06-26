const path = require("path");

module.exports = {
  entry: "./extension-frontend/src/index.jsx", // The entry point of your React app
  output: {
    path: path.resolve(__dirname, "./extensions/badges/assets"), // The output directory
    filename: "bundle.js", // The name of the bundled file
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/, // Match .css files
        use: ["style-loader", "css-loader"], // Use style-loader and css-loader
      },
    ],
  },
};
