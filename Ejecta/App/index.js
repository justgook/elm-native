document.createTextNode = (text) => {
    return {
        nodeName: "#text",
        nodeType: 3,
        nodeValue: text
    }
}

window.canvas.setAttribute = (key, value) => {
    window.canvas[key] = value
}
document.body.childNodes = document.body.children

window.clientWidth = window.innerWidth
window.clientHeight = window.innerHeight

createElement = document.createElement
document.createElement = (name) => {
    switch (name) {
        case "body":
            return document.body
        case "style":
            return {
                nodeType: 1,
                children: [],
                appendChild: () => {
                }
            }
        case "canvas":
            return window.canvas
        default:
            createElement(name)
    }
}

window.canvas.addEventListener("touchstart", console.log)
// document.addEventListener("touchstart", console.log)
require("./bundle.js")

Elm.Extra.Jump.init();
