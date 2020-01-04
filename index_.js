const webgl = require('webgl-raub');
const Image = require('image-raub');
const glfw = require('glfw-raub');
const { Document } = glfw;

Document.setWebgl(webgl); // plug this WebGL impl into the Document
Document.setImage(Image); // plug this Image impl into the Document

const doc = new Document({width:300, height:500});


doc.setAttribute = function (key, value) {
    console.log(key, value)
};
doc.appendChild = function (parent, child) {
};
doc.createElement = function (tagName) {
    return doc
};
doc.documentElement = { clientWidth: 700, clientHeight: 700 };
doc.childNodes = [doc];

let resize = () => {
};
doc.addEventListener = function (name, callback) {
    if (name === "resize")
        resize = callback;
    console.log("addEventListener", name);
};

doc.on("resize",function (env) {
    const wsize1 = doc.framebufferSize;
    resize ({innerWidth:wsize1.width, innerHeight:wsize1.height});
});

global.document = global.window = doc;
global.Image = Image;



const { Elm: { Circles } } = require('./bundle.js');
Circles.init();

const draw = () => {
    const wsize1 = doc.framebufferSize;
    // console.log(doc.framebufferSize, doc.devicePixelRatio);
    // webgl.viewportWidth = wsize1.width * 0.5;
    // webgl.viewportHeight = wsize1.height * 0.5;
    // glfw.testScene(wsize1.width, wsize1.height);
    // webgl.viewport(0,0, wsize1.width, wsize1.height);
    doc.swapBuffers();
    glfw.pollEvents();
};


const animate = () => {
    if (!(
        doc.shouldClose ||
        doc.getKey(glfw.KEY_ESCAPE)
    )) {
        draw();
        setTimeout(animate, 16);

    } else {
        // Close OpenGL window and terminate GLFW
        doc.destroy();
        glfw.terminate();
        process.exit(0);
    }

};


animate();
