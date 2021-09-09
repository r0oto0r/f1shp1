import { LedMatrix, LedMatrixInstance } from 'rpi-led-matrix';

export class LedMatrixController {
    private runsOnPi: boolean = false;
    private matrix: LedMatrixInstance;
    private clearTimer: NodeJS.Timeout;

    constructor() {
        if(process.env.runOnPi) {
            this.runsOnPi = true;
        }
        if(!this.runsOnPi) {
            return;
        }
        this.matrix = new LedMatrix(
            {
                ...LedMatrix.defaultMatrixOptions(),
                rows: 64,
                cols: 64
            },
            LedMatrix.defaultRuntimeOptions()
        );
    }

    public runTest() {
        if(!this.runsOnPi) {
            return;
        }

        clearTimeout(this.clearTimer);

        this.matrix
            .clear()            // clear the display
            .brightness(100)    // set the panel brightness to 100%
            .fgColor(0x0000FF)  // set the active color to blue
            .fill()             // color the entire diplay blue
            .fgColor(0xFFFF00)  // set the active color to yellow
            // draw a yellow circle around the display
            .drawCircle(this.matrix.width() / 2, this.matrix.height() / 2, this.matrix.width() / 2 - 1)
            // draw a yellow rectangle
            .drawRect(this.matrix.width() / 4, this.matrix.height() / 4, this.matrix.width() / 2, this.matrix.height() / 2)
            // sets the active color to red
            .fgColor({ r: 255, g: 0, b: 0 })
            // draw two diagonal red lines connecting the corners
            .drawLine(0, 0, this.matrix.width(), this.matrix.height())
            .drawLine(this.matrix.width() - 1, 0, 0, this.matrix.height() - 1)
            .sync();

        this.clearTimer = setTimeout(() => {
            console.log('clear screen');
            this.matrix.clear();
        }, 5000);
    }
}
