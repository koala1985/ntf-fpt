const path = require('path');

module.exports = {
  mode: 'production',
  entry: './server.mjs',
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    filename: 'final.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?|\.jsx?|\.js?|\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  target: 'node',
};