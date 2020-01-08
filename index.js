const Image = require('image-raub');
const { Document, requestAnimationFrame, cancelAnimationFrame } = require('./documen');

require.extensions['.dll'] = require.extensions['.node'];

const doc = new Document({ width: 640, height: 480 });

window = doc.window;
global.document = doc;
global.window = window;
global.Image = Image;

global.requestAnimationFrame = requestAnimationFrame;
// global.cancelAnimationFrame = cancelAnimationFrame;

const { Elm } = require('./bundle.js');
// Object.values(Elm)[0].init();
// console.log();
Elm.Extra.Jump.init();

