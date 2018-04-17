const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'form_ujs.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.join(__dirname, 'src'),
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['env', { modules: false }], 'react'],
            plugins: [
              'transform-class-properties'
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
            minimize: true
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
          loader: 'css-loader',
          options: {
            minimize: true
          }
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
