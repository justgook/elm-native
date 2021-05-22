const fs = require("fs");
const path = require("path")
const os = require("os");
const tmpFolder = fs.mkdtempSync(path.join(os.tmpdir(), "pkg-"));

// The magic to have access to dylib of project (pkg@4.5.1)
["freeimage.dylib", "glew.dylib", "glfw.dylib"].forEach((item) => {
    const fileFrom = `${__dirname}/desktop/build/${item}`
    const fileTo = `${path.dirname(tmpFolder)}/${item}`
    fs.writeFileSync(fileTo, fs.readFileSync(fileFrom));
})

const { Document, requestAnimationFrame, cancelAnimationFrame } = require("./documen");
const doc = new Document({width: 640, height: 480});

window = doc.window;
global.document = doc;
global.window = window;
global.Image = require("./desktop/image");

global.requestAnimationFrame = requestAnimationFrame;
// global.cancelAnimationFrame = cancelAnimationFrame;

const {Elm} = require("./bundle.js");
// Object.values(Elm)[0].init();
// console.log();
Elm.Extra.Jump.init();
