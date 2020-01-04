const Image = require('image-raub');
const { Document, requestAnimationFrame, cancelAnimationFrame } = require('./documen');

const doc = new Document({ width: 640, height: 480 });
window = doc.window;
global.document = doc;
global.window = window;
global.Image = Image;

global.requestAnimationFrame = requestAnimationFrame;
// global.cancelAnimationFrame = cancelAnimationFrame;

const { Elm } = require('./bundle.js');
Object.values(Elm)[0].init();


