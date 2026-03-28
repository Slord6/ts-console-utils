import { BRAILLE_DOTS, OPEN_BOX } from "./src/characters";
import { Colour } from "./src/colour";
import { Control } from "./src/control";
import { getProgressAscii, getElipseAscii, getProgressRaw, sequenceAnimate } from "./src/progress";
import { centerText } from "./src/text";

const brailleSpinner = BRAILLE_DOTS.getBrailleFillSequence();
const boxSpinner = OPEN_BOX.getBoxSequence();

const terminalSize = Control.getTerminalSize();
const terminalCenter = Control.getTerminalCenter();

Control.clear();
Control.moveCursor(0, terminalCenter.rows);
Colour.writeWithColour(Colour.COLOURS.CYAN, centerText(`Pretend OS™ is loading`, terminalSize.columns), Control.write);

Control.getCursorPosition().then((loadingElipsePos) => {
    Control.hideCursor();
    let progress = 0;
    const start = Date.now();

    let i = 1;
    let interval = setInterval(() => {
        Colour.push(Colour.COLOURS.YELLOW);
        progress += Math.random() < 0.25 ? Math.random() * 0.1 : 0;
        i++;
        const slowI = Math.floor(i / 5);
        
        // == Loading text '...' ==
        if (loadingElipsePos) {
            Control.moveCursor(loadingElipsePos.x, loadingElipsePos.y);
            Colour.writeWithColour(Colour.COLOURS.CYAN, getElipseAscii(Math.floor(i / 10)));
        }
        // == End loading text '...' ==

        // == Loading bar ==
        function moveToStartPoint() {
            Control.moveCursor(terminalCenter.columns - 25, terminalSize.rows - 2);
        }
        
        moveToStartPoint();
        Control.clearLine();
        moveToStartPoint();
        Control.write(getProgressAscii(progress, {
            size: 50,
            fillChar: "🮛",
            wrapLeftChar: "╟",
            wrapRightChar: "╢",
        }));
        // == End loading bar ==

        // == Percentage text ==
        Colour.replace(Colour.COLOURS.BRIGHT_YELLOW);
        moveToStartPoint();
        Control.moveCursorDown();
        Control.write(centerText(`${Math.min(100, Math.round(progress * 100))}%`, 50));
        Colour.pop();
        // == End percentage text ==
        
        // == Side vertical loading bars ==
        const verticalProgress = getProgressRaw(progress, {
            fillChar: BRAILLE_DOTS.FULL,
            emptyChar: " ",
            size: terminalSize.rows - 1,
        });
        Control.moveCursor(1, 1);
        Control.writeStacked(verticalProgress);
        Control.moveCursor(terminalSize.columns, 0);
        Control.writeStacked(verticalProgress, true);
        // == End side vertical loading bars ==
        
        // == Top spinners ==
        Control.moveCursor(1, 1);
        Colour.writeWithColour(Colour.COLOURS.YELLOW, sequenceAnimate(boxSpinner, slowI));
        Control.moveCursor(terminalSize.columns, 1);
        Colour.writeWithColour(Colour.COLOURS.YELLOW, sequenceAnimate(boxSpinner.reverse(), slowI));
        // == End top spinners ==
        
        // == Timer ==
        const timeTaken = (Date.now() - start) / 1000;
        Control.moveCursor(terminalCenter.columns - 1, 1);
        const timeMsg = `${timeTaken.toFixed(1)}s`;
        Colour.writeWithColour(Colour.COLOURS.BRIGHT_GREEN, centerText(timeMsg, timeMsg.length));
        // == End timer ==
        
        // == Complete ==
        if (progress >= 1) {
            clearInterval(interval);
            Control.clear();

            Control.moveCursor(1, 1);
            Colour.writeWithColour(Colour.COLOURS.CYAN, centerText(`Welcome to Pretend OS™!`, terminalSize.columns));

            Control.moveCursor(1, 2);
            Control.write("> ");
            Control.showCursor();
            Colour.reset();

            while (true) {}
        }
    }, 100);

});