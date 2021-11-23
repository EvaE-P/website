const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: [
    "@babel/polyfill", // enables async-await
    "./client/index.js"
  ],
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development")
    })
  ],
  output: {
    path: __dirname,
    filename: "./public/bundle.js",
    // publicPath: "/public/"
    publicPath: "/"
  },
  devServer: {
    contentBase: path.resolve(__dirname, "public"),
    // publicPath: "/public/"
    publicPath: "/"
  },
  resolve: {
    extensions: [".js", ".jsx", "*"]
  },
  devtool: "inline-source-map",
  watchOptions: {
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        // test: /\.(png|jpe?g|gif)$/i,
        // // use: "file-loader?name=[name].[ext]&outputPath=./images/",
        // // options: {
        // //   esModule: false
        // // }
        // use: [
        //   {
        //   loader: "file-loader?name=/img/[name].[ext]",
        //   options: {
        //     esModule: false
        //   }
        // }
        // ]
        // test: /\.(png|jpg|gif)$/i,
        // use: [
        //   {
        //     loader: "url-loader",
        //     options: {
        //       fallback: require.resolve("file-loader"),
        //       limit: 8192
        //     }
        //   }
        // ]
        test: /\.(png|jp(e*)g|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8000, // Convert images < 8kb to base64 strings
              // name: "images/[hash]-[name].[ext]"
              name: "[path][name].[ext]"
            }
            // loader: "file-loader?name=/img/[name].[ext]",
            // options: {
            //   esModule: false
            // }
          }
        ]
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false
            }
          }
        ]
      }
    ]
  },
  performance: { hints: false }
};
