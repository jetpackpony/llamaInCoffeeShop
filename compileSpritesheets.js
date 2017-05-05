var spritesheet = require('spritesheet-js');

spritesheet('www/img/source/*.png', {
  format: 'json',
  name: 'spriteSheet',
  path: 'www/img'
}, function (err) {
  if (err) throw err;

  console.log('spritesheet successfully generated');
});
