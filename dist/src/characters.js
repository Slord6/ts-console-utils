"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPEN_BOX = exports.BRAILLE_DOTS = exports.HASHED_CHARS = exports.BLOCK_SHADE_CHARS = exports.BLOCK_CHARS = void 0;
exports.BLOCK_CHARS = Object.freeze({
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
exports.BLOCK_SHADE_CHARS = Object.freeze({
    FULL: "█",
    DARK: "▓",
    MEDIUM: "▒",
    LIGHT: "░",
    EMPTY: " ",
});
exports.HASHED_CHARS = Object.freeze({
    FINE: "🮐",
    HASH: "#",
    STRIPE_DIAGONAL_LEFT: "🮘",
    STRIPE_DIAGONAL_RIGHT: "🮙",
    CHECKER_COARSE_LEFT: "🮕",
    CHECKER_COARSE_RIGHT: "🮖",
    EMPTY: " ",
});
exports.BRAILLE_DOTS = Object.freeze({
    /*
    ⠁ 	⠃ 	⠉ 	⠙ 	⠑ 	⠋ 	⠛ 	⠓ 	⠊ 	⠚ 	⠈ 	⠘
    ⠄ 	⠅ 	⠇ 	⠍ 	⠝ 	⠕ 	⠏ 	⠟ 	⠗ 	⠎ 	⠞ 	⠌ 	⠜
    ⠤ 	⠥ 	⠧ 	⠭ 	⠽ 	⠵ 	⠯ 	⠿ 	⠷ 	⠮ 	⠾ 	⠬ 	⠼
    ⠠ 	⠡ 	⠣ 	⠩ 	⠹ 	⠱ 	⠫ 	⠻ 	⠳ 	⠪ 	⠺ 	⠨ 	⠸
    ⠀ 	⠂ 	⠆ 	⠒ 	⠲ 	⠢ 	⠖ 	⠶ 	⠦ 	⠔ 	⠴ 	⠐ 	⠰
    */
    getBrailleChar: (x, y) => {
        const baseCode = 0x2800;
        const dotIndex = y * 2 + x;
        return String.fromCharCode(baseCode + (1 << dotIndex));
    },
    getBrailleFillSequence: (small = false) => {
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
        ]);
    },
    FULL: "⣿",
});
exports.OPEN_BOX = Object.freeze({
    fullBox: "🮮",
    getBoxSequence() {
        return Array.from([
            "🮪", "🮫", "🮭", "🮬"
        ]);
    }
});
