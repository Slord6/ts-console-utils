export class Control {
    public static clear() {
        console.clear();
    }

    public static write(text: string) {
        process.stdout.write(text);
    }

    public static hideCursor() {
        Control.write("\x1B[?25l");
    }

    public static showCursor() {
        Control.write("\x1B[?25h");
    }

    public static moveCursor(column: number, row: number) {
        Control.write(`\x1B[${row};${column}H`);
    }

    public static clearLine() {
        Control.write(`\x1b[2K\r`);
    }

    public static moveCursorUp() {
        Control.write(`\x1b[1A`);
    }

    public static moveCursorDown() {
        Control.write(`\x1b[1B`);
    }

    public static moveCursorLeft() {
        Control.write(`\x1b[1D`);
    }

    public static moveCursorRight() {
        Control.write(`\x1b[1C`);
    }

    public static cursorToLineStart() {
        Control.write(`\r`);
    }

    public static cursorToLineEnd() {
        process.stdout.write(`\x1b[999C`);
    }

    public static getCursorPosition(): Promise<{ x: number, y: number } | null> {
        return new Promise((resolve) => {
            const termcodes = { cursorGetPosition: '\u001b[6n' };

            process.stdin.setEncoding('utf8');
            process.stdin.setRawMode(true);

            const readfx = function () {
                const buf = process.stdin.read();
                const str = JSON.stringify(buf); // "\u001b[9;1R"
                const regex = /\[(.*)/g;
                const regResult = regex.exec(str);
                if(!regResult) {
                    process.stdin.setRawMode(false);
                    resolve(null);
                    return;
                }
                const xy = regResult[0].replace(/\[|R"/g, '').split(';');
                const pos = { x: parseInt(xy[1], 10), y: parseInt(xy[0], 10) };
                process.stdin.setRawMode(false);
                resolve(pos);
            }

            process.stdin.once('readable', readfx);
            process.stdout.write(termcodes.cursorGetPosition);
        });
    }

    public static getTerminalSize() {
        const { columns, rows } = process.stdout;
        return { columns, rows };
    }

    public static getTerminalCenter() {
        const terminalSize = Control.getTerminalSize();
return {
    columns: Math.floor(terminalSize.columns / 2),
    rows: Math.floor(terminalSize.rows / 2),
};
    }

    public static writeStacked(text: string, isRightAligned = false) {
        text.split("").forEach(char => {
            Control.write(char);
            Control.moveCursorDown();
            if(!isRightAligned) {
                Control.moveCursorLeft();
            }
        });
    }
}