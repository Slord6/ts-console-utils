import { Control } from "./control";

export class Colour {
    public static COLOURS = Object.freeze({
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
    private static colourStack: string[] = [Colour.COLOURS.RESET];
    public static get currentColour(): string {
        return this.colourStack[this.colourStack.length - 1];
    }

    private static set(writeFn: (text: string) => void = Control.write): void {
        writeFn(Colour.currentColour);
    }

    public static push(colourCode: string) {
        this.colourStack.push(colourCode);
        this.set();
    }

    public static pop() {
        if (this.colourStack.length > 1) {
            this.colourStack.pop();
            this.set();
        }
    }

    public static replace(colourCode: string) {
        Colour.pop();
        Colour.push(colourCode);
    }

    public static reset(): void {
        Colour.colourStack = [Colour.COLOURS.RESET];
        this.set();
    }

    public static writeWithColour(colourCode: string, text: string, writeFn: (text: string) => void = Control.write): void {
        this.push(colourCode);
        try {
            writeFn(text);
        } finally {
            this.pop();
        }
    }
}