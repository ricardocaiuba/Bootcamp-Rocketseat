"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helloWorld = void 0;
function helloWorld(_, res) {
    return res.json({
        message: "Hello world!!!!!",
    });
}
exports.helloWorld = helloWorld;
