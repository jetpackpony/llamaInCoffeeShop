var path = require('path');

module.exports = {
  entry: './www/js/index.js',
  output: {
    path: path.join(__dirname, 'www'),
    filename: 'bundle.js'
  }
};
