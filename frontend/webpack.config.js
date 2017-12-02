const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    main: './src/index.js',
    demo: [
      'react-hot-loader/patch',
      './test/demo.js'
    ]
  },
  devServer: {
    hot: true,
    contentBase: './dist',
    port: process.env.DEV_SERVER_PORT || 3000,
    host: "0.0.0.0"
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
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
      }
    ]
  }
};
