export declare class Control {
    static clear(): void;
    static write(text: string): void;
    static hideCursor(): void;
    static showCursor(): void;
    static moveCursor(column: number, row: number): void;
    static clearLine(): void;
    static moveCursorUp(): void;
    static moveCursorDown(): void;
    static moveCursorLeft(): void;
    static moveCursorRight(): void;
    static cursorToLineStart(): void;
    static cursorToLineEnd(): void;
    static getCursorPosition(): Promise<{
        x: number;
        y: number;
    } | null>;
    static getTerminalSize(): {
        columns: number;
        rows: number;
    };
    static getTerminalCenter(): {
        columns: number;
        rows: number;
    };
    static writeStacked(text: string, isRightAligned?: boolean): void;
}
