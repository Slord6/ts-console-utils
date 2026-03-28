"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const characters_1 = require("./src/characters");
const colour_1 = require("./src/colour");
const control_1 = require("./src/control");
const progress_1 = require("./src/progress");
const text_1 = require("./src/text");
const brailleSpinner = characters_1.BRAILLE_DOTS.getBrailleFillSequence();
const boxSpinner = characters_1.OPEN_BOX.getBoxSequence();
const terminalSize = control_1.Control.getTerminalSize();
const terminalCenter = control_1.Control.getTerminalCenter();
control_1.Control.clear();
control_1.Control.moveCursor(0, terminalCenter.rows);
colour_1.Colour.writeWithColour(colour_1.Colour.COLOURS.CYAN, (0, text_1.centerText)(`Pretend OS™ is loading`, terminalSize.columns), control_1.Control.write);
control_1.Control.getCursorPosition().then((loadingElipsePos) => {
    control_1.Control.hideCursor();
    let progress = 0;
    const start = Date.now();
    let i = 1;
    let interval = setInterval(() => {
        colour_1.Colour.push(colour_1.Colour.COLOURS.YELLOW);
        progress += Math.random() < 0.25 ? Math.random() * 0.1 : 0;
        i++;
        const slowI = Math.floor(i / 5);
        // == Loading text '...' ==
        if (loadingElipsePos) {
            control_1.Control.moveCursor(loadingElipsePos.x, loadingElipsePos.y);
            colour_1.Colour.writeWithColour(colour_1.Colour.COLOURS.CYAN, (0, progress_1.getElipseAscii)(Math.floor(i / 10)));
        }
        // == End loading text '...' ==
        // == Loading bar ==
        function moveToStartPoint() {
            control_1.Control.moveCursor(terminalCenter.columns - 25, terminalSize.rows - 2);
        }
        moveToStartPoint();
        control_1.Control.clearLine();
        moveToStartPoint();
        control_1.Control.write((0, progress_1.getProgressAscii)(progress, {
            size: 50,
            fillChar: "🮛",
            wrapLeftChar: "╟",
            wrapRightChar: "╢",
        }));
        // == End loading bar ==
        // == Percentage text ==
        colour_1.Colour.replace(colour_1.Colour.COLOURS.BRIGHT_YELLOW);
        moveToStartPoint();
        control_1.Control.moveCursorDown();
        control_1.Control.write((0, text_1.centerText)(`${Math.min(100, Math.round(progress * 100))}%`, 50));
        colour_1.Colour.pop();
        // == End percentage text ==
        // == Side vertical loading bars ==
        const verticalProgress = (0, progress_1.getProgressRaw)(progress, {
            fillChar: characters_1.BRAILLE_DOTS.FULL,
            emptyChar: " ",
            size: terminalSize.rows - 1,
        });
        control_1.Control.moveCursor(1, 1);
        control_1.Control.writeStacked(verticalProgress);
        control_1.Control.moveCursor(terminalSize.columns, 0);
        control_1.Control.writeStacked(verticalProgress, true);
        // == End side vertical loading bars ==
        // == Top spinners ==
        control_1.Control.moveCursor(1, 1);
        colour_1.Colour.writeWithColour(colour_1.Colour.COLOURS.YELLOW, (0, progress_1.sequenceAnimate)(boxSpinner, slowI));
        control_1.Control.moveCursor(terminalSize.columns, 1);
        colour_1.Colour.writeWithColour(colour_1.Colour.COLOURS.YELLOW, (0, progress_1.sequenceAnimate)(boxSpinner.reverse(), slowI));
        // == End top spinners ==
        // == Timer ==
        const timeTaken = (Date.now() - start) / 1000;
        control_1.Control.moveCursor(terminalCenter.columns - 1, 1);
        const timeMsg = `${timeTaken.toFixed(1)}s`;
        colour_1.Colour.writeWithColour(colour_1.Colour.COLOURS.BRIGHT_GREEN, (0, text_1.centerText)(timeMsg, timeMsg.length));
        // == End timer ==
        // == Complete ==
        if (progress >= 1) {
            clearInterval(interval);
            control_1.Control.clear();
            control_1.Control.moveCursor(1, 1);
            colour_1.Colour.writeWithColour(colour_1.Colour.COLOURS.CYAN, (0, text_1.centerText)(`Welcome to Pretend OS™!`, terminalSize.columns));
            control_1.Control.moveCursor(1, 2);
            control_1.Control.write("> ");
            control_1.Control.showCursor();
            colour_1.Colour.reset();
            while (true) { }
        }
    }, 100);
});
