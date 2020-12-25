const path = require("path");

module.exports = {
  mode: "development",
  entry: "./app/src/index.js",
  output: {
    path: path.resolve(__dirname, "app/build"),
    filename: "main.bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/env",
                {
                  targets: {
                    browsers: ["last 2 versions"],
                  },
                },
                "@babel/react"
              ],
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
          },
        },
      },
    ],
  },
  devtool: "cheap-source-map",
  stats: {
    colors: true,
  },
};
