export declare const BLOCK_CHARS: Readonly<{
    FULL: "█";
    SEVEN_EIGHTHS: "▉";
    THREE_QUARTERS: "▊";
    FIVE_EIGHTHS: "▋";
    HALF: "▌";
    THREE_EIGHTHS: "▍";
    ONE_QUARTER: "▎";
    ONE_EIGHTH: "▏";
    EMPTY: " ";
}>;
export declare const BLOCK_SHADE_CHARS: Readonly<{
    FULL: "█";
    DARK: "▓";
    MEDIUM: "▒";
    LIGHT: "░";
    EMPTY: " ";
}>;
export declare const HASHED_CHARS: Readonly<{
    FINE: "🮐";
    HASH: "#";
    STRIPE_DIAGONAL_LEFT: "🮘";
    STRIPE_DIAGONAL_RIGHT: "🮙";
    CHECKER_COARSE_LEFT: "🮕";
    CHECKER_COARSE_RIGHT: "🮖";
    EMPTY: " ";
}>;
export declare const BRAILLE_DOTS: Readonly<{
    getBrailleChar: (x: number, y: number) => string;
    getBrailleFillSequence: (small?: boolean) => string[];
    FULL: "⣿";
}>;
export declare const OPEN_BOX: Readonly<{
    fullBox: "🮮";
    getBoxSequence(): string[];
}>;
