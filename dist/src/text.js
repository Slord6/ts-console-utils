"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.centerText = centerText;
function centerText(text, width, postPad = false) {
    const padding = Math.max(0, width - text.length);
    const padStart = Math.floor(padding / 2);
    const padEnd = padding - padStart;
    return " ".repeat(padStart) + text + (postPad ? " ".repeat(padEnd) : "");
}
