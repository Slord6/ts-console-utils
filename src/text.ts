export function centerText(text: string, width: number, postPad = false): string {
    const padding = Math.max(0, width - text.length);
    const padStart = Math.floor(padding / 2);
    const padEnd = padding - padStart;
    return " ".repeat(padStart) + text + (postPad ? " ".repeat(padEnd) : "");
}
