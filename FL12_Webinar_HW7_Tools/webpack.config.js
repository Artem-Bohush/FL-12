const path = require('path');

const PATHS = {
  source: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'dist/js'),
};

module.exports = {
  mode: 'production',
  entry: `${PATHS.source}/js/index.js`,
  output: {
    filename: 'app.js',
    path: PATHS.build,
  },
  watch: true,
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader?optional[]=runtime',
          options: {
            presets: [
              ['@babel/env'],
            ],
          },
        },
      },
    ],
  },
};
