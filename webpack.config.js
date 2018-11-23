const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: [
    'react-hot-loader/patch',
    './test/demo.js'
  ],
  devServer: {
    hot: true,
    contentBase: './test',
    port: process.env.DEV_SERVER_PORT || 3000,
    host: "0.0.0.0"
  },
  output: {
    filename: 'demo.js',
    path: path.resolve(__dirname, 'test')
  },
  devtool: 'eval',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.join(__dirname, 'src'),
          path.join(__dirname, 'test')
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/env', { modules: false }], '@babel/react'],
            plugins: [
              'react-hot-loader/babel',
              '@babel/proposal-class-properties'
            ]
          }
        }
      }, {
        test: /\.module\.css$/,
        include: path.resolve(__dirname, "src"),
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[local]--[hash:base64:5]'
          }
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: () => [
              require('postcss-import'),
              require('postcss-autoreset')({
                reset: {
                  all: 'initial',
                  boxSizing: 'border-box'
                },
                rulesMatcher: 'bem'
              }),
              require('postcss-initial'),
              require('autoprefixer')
            ]
          }
        }]
      }, {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: () => [
              require('postcss-import'),
              require('autoprefixer')
            ]
          }
        }]
      }
    ]
  }
};
