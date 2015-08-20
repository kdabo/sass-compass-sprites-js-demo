var sprite = require('sprity');

sprite.create({
    src: ['images/*.png'],
    out: 'sprites',
    name: 'sprites',
    style: 'sprites/_sprites.scss',
    cssPath: 'sprites',
    processor: 'scss'
}, function () {
    console.log('done');
});


