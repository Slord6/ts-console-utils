export const BLOCK_CHARS = Object.freeze({
    FULL: "█",
    SEVEN_EIGHTHS: "▉",
    THREE_QUARTERS: "▊",
    FIVE_EIGHTHS: "▋",
    HALF: "▌",
    THREE_EIGHTHS: "▍",
    ONE_QUARTER: "▎",
    ONE_EIGHTH: "▏",
    EMPTY: " ",
});

export const BLOCK_SHADE_CHARS = Object.freeze({
    FULL: "█",
    DARK: "▓",
    MEDIUM: "▒",
    LIGHT: "░",
    EMPTY: " ",
});

export const HASHED_CHARS = Object.freeze({
    FINE: "🮐",
    HASH: "#",
    STRIPE_DIAGONAL_LEFT: "🮘",
    STRIPE_DIAGONAL_RIGHT: "🮙",
    CHECKER_COARSE_LEFT: "🮕",
    CHECKER_COARSE_RIGHT: "🮖",
    EMPTY: " ",
});


export const BRAILLE_DOTS = Object.freeze({
    /*
    ⠁ 	⠃ 	⠉ 	⠙ 	⠑ 	⠋ 	⠛ 	⠓ 	⠊ 	⠚ 	⠈ 	⠘
    ⠄ 	⠅ 	⠇ 	⠍ 	⠝ 	⠕ 	⠏ 	⠟ 	⠗ 	⠎ 	⠞ 	⠌ 	⠜
    ⠤ 	⠥ 	⠧ 	⠭ 	⠽ 	⠵ 	⠯ 	⠿ 	⠷ 	⠮ 	⠾ 	⠬ 	⠼
    ⠠ 	⠡ 	⠣ 	⠩ 	⠹ 	⠱ 	⠫ 	⠻ 	⠳ 	⠪ 	⠺ 	⠨ 	⠸
    ⠀ 	⠂ 	⠆ 	⠒ 	⠲ 	⠢ 	⠖ 	⠶ 	⠦ 	⠔ 	⠴ 	⠐ 	⠰
    */
    getBrailleChar: (x: number, y: number): string => {
        const baseCode = 0x2800;
        const dotIndex = y * 2 + x;
        return String.fromCharCode(baseCode + (1 << dotIndex));
    },

    getBrailleFillSequence: (small = false): string[] => {
        return small ? Array.from([
            "⠟",
            "⠯",
            "⠷",
            "⠾",
            "⠽",
            "⠻"
        ]) : Array.from([
            "⡿",
            "⣟",
            "⣯",
            "⣷",
            "⣾",
            "⣽",
            "⣻",
            "⢿"
        ])
    },

    FULL: "⣿",
});

export const OPEN_BOX = Object.freeze({
    fullBox: "🮮",
    getBoxSequence(): string[] {
        return Array.from([
            "🮪", "🮫", "🮭", "🮬"
        ]);
    }
});