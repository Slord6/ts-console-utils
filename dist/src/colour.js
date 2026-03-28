"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Colour = void 0;
const control_1 = require("./control");
class Colour {
    static get currentColour() {
        return this.colourStack[this.colourStack.length - 1];
    }
    static set(writeFn = control_1.Control.write) {
        writeFn(Colour.currentColour);
    }
    static push(colourCode) {
        this.colourStack.push(colourCode);
        this.set();
    }
    static pop() {
        if (this.colourStack.length > 1) {
            this.colourStack.pop();
            this.set();
        }
    }
    static replace(colourCode) {
        Colour.pop();
        Colour.push(colourCode);
    }
    static reset() {
        Colour.colourStack = [Colour.COLOURS.RESET];
        this.set();
    }
    static writeWithColour(colourCode, text, writeFn = control_1.Control.write) {
        this.push(colourCode);
        try {
            writeFn(text);
        }
        finally {
            this.pop();
        }
    }
}
exports.Colour = Colour;
Colour.COLOURS = Object.freeze({
    BLACK: "\x1b[30m",
    RED: "\x1b[31m",
    GREEN: "\x1b[32m",
    YELLOW: "\x1b[33m",
    BLUE: "\x1b[34m",
    MAGENTA: "\x1b[35m",
    CYAN: "\x1b[36m",
    WHITE: "\x1b[37m",
    BRIGHT_BLACK: "\x1b[90m",
    BRIGHT_RED: "\x1b[91m",
    BRIGHT_GREEN: "\x1b[92m",
    BRIGHT_YELLOW: "\x1b[93m",
    BRIGHT_BLUE: "\x1b[94m",
    BRIGHT_MAGENTA: "\x1b[95m",
    BRIGHT_CYAN: "\x1b[96m",
    BRIGHT_WHITE: "\x1b[97m",
    RESET: "\x1b[0m",
});
Colour.colourStack = [Colour.COLOURS.RESET];
