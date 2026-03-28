export type ProgressOptions = {
    size?: number;
    fillChar?: string;
    emptyChar?: string;
};
export type ProgressBarOptions = ProgressOptions & {
    wrapLeftChar?: string;
    wrapRightChar?: string;
};
export declare function getProgressAscii(percent: number, options?: ProgressBarOptions): string;
export declare function sequenceAnimate(sequence: string[], frame: number): string;
export declare function getElipseAscii(frame: number): string;
export declare function getProgressRaw(percent: number, options?: ProgressOptions): string;
