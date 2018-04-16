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
            presets: ['env', 'es2015', 'react'],
            plugins: [
              'react-hot-loader/babel',
              'transform-class-properties'
            ]
          }
        }
      },
      {
        test: /\.css$/,

        use: [{
          loader: 'style-loader', // inject CSS to page
        }, {
          loader: 'css-loader', // translates CSS into CommonJS modules
          options: {
            modules: true,
            localIdentName: '[local]--[hash:base64:5]'
          }
        }, {
          loader: 'postcss-loader', // Run post css actions
          options: {
            plugins: function () { // post css plugins, can be exported to postcss.config.js
              return [
                require('postcss-import'),
                require('postcss-autoreset')({
                  reset: {
                    all: 'initial',
                    boxSizing: 'border-box',
                    fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,sans-serif'
                  },
                  rulesMatcher: 'bem'
                }),
                require('postcss-initial'),
                require('autoprefixer')
              ];
            }
          }
        }]
      },
    ]
  }
};
