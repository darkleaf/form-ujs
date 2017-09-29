const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    './src/index.js'
  ],
  devServer: {
    hot: true,
    contentBase: './dist',
    port: process.env.DEV_SERVER_PORT || 3000,
    host: "0.0.0.0"
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'es2015', 'react'],
            plugins: ['react-hot-loader/babel']
          }
        }
      }
    ]
  }
};
