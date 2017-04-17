var path = require('path');

module.exports = {
  devtool: 'eval-source-map',
  entry: ['babel-polyfill', './www/js/index.js'],
  output: {
    path: path.join(__dirname, 'www'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, "www"),
    host: '192.168.1.35'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins: [require('babel-plugin-transform-object-rest-spread'), require('babel-plugin-transform-react-jsx')]
          }
        }
      }
    ]
  }
};
