const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

require("dotenv").config({
  path: ".env.development",
})
const DEV_MODE = process.env.NODE_ENV !== "production"

module.exports = {
  entry: path.resolve(__dirname, process.env.CURRENT_STEP_ENTRY),

  devServer: {
    contentBase: path.resolve(__dirname, process.env.CURRENT_STEP_ROOT),
  },

  module: {
    rules: [
      {
        test: /\.(sc|sa|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { hmr: process.env.NODE_ENV === "development" },
          },
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|gif|jpe?g|svg)$/,
        loader: "url-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, process.env.CURRENT_STEP_INDEX),
    }),
    new MiniCssExtractPlugin({
      filename: DEV_MODE ? "[name].css" : "[name].[hash].css",
      chunkFilename: DEV_MODE ? "[id].css" : "[id].[hash].css",
    }),
  ],
}
