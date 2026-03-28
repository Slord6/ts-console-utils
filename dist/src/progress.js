"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProgressAscii = getProgressAscii;
exports.sequenceAnimate = sequenceAnimate;
exports.getElipseAscii = getElipseAscii;
exports.getProgressRaw = getProgressRaw;
const characters_1 = require("./characters");
function getProgressAscii(percent, options = {}) {
    const { size: width = 25, fillChar = characters_1.BLOCK_CHARS.FULL, emptyChar = characters_1.HASHED_CHARS.FINE, wrapLeftChar = "", wrapRightChar = "", } = options;
    const filled = Math.round(width * percent);
    const remaining = width - filled;
    return `${wrapLeftChar}${getProgressRaw(percent, { size: width, fillChar, emptyChar })}${wrapRightChar}`;
}
function sequenceAnimate(sequence, frame) {
    return sequence[frame % sequence.length];
}
function getElipseAscii(frame) {
    const frames = ["   ", ".  ", ".. ", "..."];
    return sequenceAnimate(frames, frame);
}
function getProgressRaw(percent, options = {}) {
    const { size: height = 10, fillChar = "█", emptyChar = " ", } = options;
    const filled = Math.round(height * percent);
    const remaining = height - filled;
    return `${fillChar.repeat(filled) + emptyChar.repeat(Math.max(0, remaining))}`;
}
