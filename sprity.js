var sprite = require('css-sprite');

sprite.create({
    src: ['images/*.png'],
    out: 'sprites',
    name: 'sprites',
    style: 'sprites/_sprites.scss',
    cssPath: 'images',
    processor: 'scss'
}, function () {
    console.log('done');
});


