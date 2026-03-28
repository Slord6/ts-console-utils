"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Control = void 0;
class Control {
    static clear() {
        console.clear();
    }
    static write(text) {
        process.stdout.write(text);
    }
    static hideCursor() {
        Control.write("\x1B[?25l");
    }
    static showCursor() {
        Control.write("\x1B[?25h");
    }
    static moveCursor(column, row) {
        Control.write(`\x1B[${row};${column}H`);
    }
    static clearLine() {
        Control.write(`\x1b[2K\r`);
    }
    static moveCursorUp() {
        Control.write(`\x1b[1A`);
    }
    static moveCursorDown() {
        Control.write(`\x1b[1B`);
    }
    static moveCursorLeft() {
        Control.write(`\x1b[1D`);
    }
    static moveCursorRight() {
        Control.write(`\x1b[1C`);
    }
    static cursorToLineStart() {
        Control.write(`\r`);
    }
    static cursorToLineEnd() {
        process.stdout.write(`\x1b[999C`);
    }
    static getCursorPosition() {
        return new Promise((resolve) => {
            const termcodes = { cursorGetPosition: '\u001b[6n' };
            process.stdin.setEncoding('utf8');
            process.stdin.setRawMode(true);
            const readfx = function () {
                const buf = process.stdin.read();
                const str = JSON.stringify(buf); // "\u001b[9;1R"
                const regex = /\[(.*)/g;
                const regResult = regex.exec(str);
                if (!regResult) {
                    process.stdin.setRawMode(false);
                    resolve(null);
                    return;
                }
                const xy = regResult[0].replace(/\[|R"/g, '').split(';');
                const pos = { x: parseInt(xy[1], 10), y: parseInt(xy[0], 10) };
                process.stdin.setRawMode(false);
                resolve(pos);
            };
            process.stdin.once('readable', readfx);
            process.stdout.write(termcodes.cursorGetPosition);
        });
    }
    static getTerminalSize() {
        const { columns, rows } = process.stdout;
        return { columns, rows };
    }
    static getTerminalCenter() {
        const terminalSize = Control.getTerminalSize();
        return {
            columns: Math.floor(terminalSize.columns / 2),
            rows: Math.floor(terminalSize.rows / 2),
        };
    }
    static writeStacked(text, isRightAligned = false) {
        text.split("").forEach(char => {
            Control.write(char);
            Control.moveCursorDown();
            if (!isRightAligned) {
                Control.moveCursorLeft();
            }
        });
    }
}
exports.Control = Control;
