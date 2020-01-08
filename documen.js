const webgl = require('webgl-raub');
const glfw = require('glfw-raub');
const { Window } = glfw;

//Build iOS https://github.com/phoboslab/Ejecta
class Body {
    constructor(window = {}) {
        // this.window = window;
    }

    nodeType = 1;
    attributes = [];
    tagName = "body";
    childNodes = [];

    insertBefore(newNode, referenceNode) {
        this.childNodes.push(newNode);
    }

    appendChild(node) {
        this.childNodes.push(node)
    }
}

class Canvas {
    constructor(webgl_) {
        // this.webgl = new (proxy(webgl_));
        this.webgl = webgl_;
        this.webgl.init();
    }

    nodeType = 1;
    attributes = [];
    tagName = "canvas";
    childNodes = [];

    getContext(what, how) {
        console.log("Canvas::getContext", how);
        return this.webgl;
    }

    setAttribute(name, value) {
        console.log("Canvas::setAttribute", name, value);
    }
}


class Document {

    constructor(opts = {}) {

        const window = new Window(opts);
        console.log("joystickPresent(0)", glfw.joystickPresent(0));
        // console.log("joystickPresent(1)", glfw.joystickPresent(1));
        // console.log("getJoystickName(0)",glfw.getJoystickName(0));
        // console.log("getJoystickName(1)", glfw.getJoystickName(1));
        // console.log("UpdateGamepadMappings", glfw.updateGamepadMappings);


        window.pageXOffset = 0;
        window.pageYOffset = 0;
        window.pos = { x: 300, y: 200 };
        window.addEventListener = function (evn, callback) {
            if (evn === 'resize') {
                callback.wrap = ({ width, height }) => callback({ target: { innerWidth: width, innerHeight: height } });
                window.on('resize', callback.wrap);
            } else {
                return console.log("addEventListener::FIX ME", evn);
            }

        };
        window.removeEventListener = (sub, cb) => {
            window.off(sub, cb.wrap);
        };

        window.on('quit', evt => {
            // Close OpenGL window and terminate GLFW
            window.destroy();
            glfw.terminate();
            process.exit(0);

        });
        this.window = window;
        // const body = new (proxy(new Body(window)));
        const body = new Body(window);
        this.body = body;


        body.scrollWidth = window.width;
        body.offsetWidth = window.width;
        body.clientWidth = window.width;
        body.scrollHeight = window.height;
        body.offsetHeight = window.height;
        body.clientHeight = window.height;

        this.documentElement = this;
        this.documentElement.scrollWidth = body.scrollWidth;
        this.documentElement.offsetWidth = body.offsetWidth;
        this.documentElement.clientWidth = body.clientWidth;
        this.documentElement.scrollHeight = body.scrollHeight;
        this.documentElement.offsetHeight = body.offsetHeight;
        this.documentElement.clientHeight = body.clientHeight;


        // this.canvas = new (proxy(new Canvas(webgl)));
        // const refresh = ()=> requestAnimationFrame(() => {
        //     window.swapBuffers();
        //     glfw.pollEvents();
        //     refresh();
        // });

        this.canvas = new Canvas(webgl);


    }

    hidden = false;

    set title(value) {

        this.window.title = value;
    }

    get title() {
        return this.window.title;
    }

    createElement(tagName) {
        switch (tagName) {
            case "body":
                return this.body;
            case "canvas":
                // return new (proxy(this.canvas));
                return this.canvas;
            case "style":
                // return new (proxy({ appendChild() {} }));
                return {
                    appendChild() {
                    }
                };
            default:
                // return new (proxy({ constructor: { name: `createElement::${tagName}` } }));
            {
            }
        }

    };

    createTextNode() {
    }

    addEventListener(sub, cb) {
        switch (sub) {
            case 'visibilitychange':
                cb.blur = () => {
                    cb({ target: { hidden: true } })
                };
                cb.focus = () => {
                    cb({ target: { hidden: false } })
                };
                window.on('blur', cb.blur);
                window.on('focus', cb.focus);
                break;
            case "keydown":
            case "keyup":
                cb.wrap = cb;
                this.window.on(sub, cb.wrap);
                break;
            case "mouseup":
            case "mousemove":
            case "mousedown":
            case "click":
                cb.wrap = (env) => {
                    ["movementX", "movementY", "clientX", "clientY", "pageX", "pageY", "x", "y"]
                        .forEach((k) => env[k] *= window.devicePixelRatio);

                    cb(env)
                };
                this.window.on(sub, cb.wrap);
                break;
            default:
                console.log("DOC::addEventListener", sub)
                break;

        }
    }

    removeEventListener(sub, cb) {
        if (sub === "visibilitychange") {
            window.off(sub, cb.blur);
            window.off(sub, cb.focus);
        } else {

            window.off(sub, cb.wrap);
        }

    }
}



/// ---------------------requestAnimationFrame Start ---------------------
const FRAME_RATE_INTERVAL = 1000 / 60;

let allCallbacks = [];

let executeAllScheduled = false;

let shouldCheckCancelRaf = false;
const callbacksForCancellation = [];

const isToBeCancelled = function (cb) {
    for (let i = 0; i < callbacksForCancellation.length; i++) {
        if (callbacksForCancellation[i] === cb) {
            callbacksForCancellation.splice(i, 1);
            return true;
        }
    }
};

const executeAll = function () {
    window.swapBuffers();
    glfw.pollEvents();
    executeAllScheduled = false;
    const _allCallbacks = allCallbacks;
    allCallbacks = [];
    for (var i = 0; i < _allCallbacks.length; i++) {
        if (shouldCheckCancelRaf === true) {
            if (isToBeCancelled(_allCallbacks[i])) {
                shouldCheckCancelRaf = false;
                return;
            }
        }
        _allCallbacks[i](Date.now());
    }
};

const requestAnimationFrame = function (callback) {
    allCallbacks.push(callback);
    if (executeAllScheduled === false) {
        setTimeout(executeAll, FRAME_RATE_INTERVAL);
        executeAllScheduled = true;
    }
    return callback;
};


const cancelAnimationFrame = function (callback) {
    callbacksForCancellation.push(callback);
    shouldCheckCancelRaf = true;
};

/// ---------------------requestAnimationFrame End ---------------------
// module.exports = { Document: proxy(new Document()) };
module.exports = { Document, requestAnimationFrame, cancelAnimationFrame };
