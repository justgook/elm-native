if (global['segfault-raub']) {
    module.exports = global['segfault-raub'];
} else {
    const core = require("./build/segfault")
    global['segfault-raub'] = core;
    module.exports = core;
}
