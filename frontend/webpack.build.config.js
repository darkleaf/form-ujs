const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'frontend.js', // todo: add digest and manifest; *.gz version
    path: path.resolve(__dirname, 'dist', 'production')
  },
  devtool: 'source-map',
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production'
    }),

    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    }),

    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.join(__dirname, 'src')
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'es2015', 'react'],
            plugins: [
              'transform-class-properties'
            ]
          }
        }
      }
    ]
  }
};
