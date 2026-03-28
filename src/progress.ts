import { BLOCK_CHARS, BRAILLE_DOTS, HASHED_CHARS } from "./characters";

export type ProgressOptions = {
  size?: number;
  fillChar?: string;
  emptyChar?: string;
}

export type ProgressBarOptions = ProgressOptions & {
  wrapLeftChar?: string;
  wrapRightChar?: string;
};

export function getProgressAscii(percent: number, options: ProgressBarOptions = {}): string {
  const {
    size: width = 25,
    fillChar = BLOCK_CHARS.FULL,
    emptyChar = HASHED_CHARS.FINE,
    wrapLeftChar = "",
    wrapRightChar = "",
  } = options;

  const filled = Math.round(width * percent);
  const remaining = width - filled;
  return `${wrapLeftChar}${getProgressRaw(percent, {size: width, fillChar, emptyChar})}${wrapRightChar}`;
}

export function sequenceAnimate(sequence: string[], frame: number): string {
    return sequence[frame % sequence.length];
}

export function getElipseAscii(frame: number): string {
    const frames = ["   ", ".  ", ".. ", "..."];
    return sequenceAnimate(frames, frame);
}

export function getProgressRaw(percent: number, options: ProgressOptions = {}): string {
    const {
        size: height = 10,
        fillChar = "█",
        emptyChar = " ",
    } = options;

    const filled = Math.round(height * percent);
    const remaining = height - filled;
    return `${fillChar.repeat(filled) + emptyChar.repeat(Math.max(0, remaining))}`;
}