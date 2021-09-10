import { LedMatrix, LedMatrixInstance } from 'rpi-led-matrix';

export class LedMatrixController {
    private matrix: LedMatrixInstance;
    private clearTimer: NodeJS.Timeout;

    constructor() {
        this.matrix = new LedMatrix(
            {
                ...LedMatrix.defaultMatrixOptions(),
                rows: 64,
                cols: 64,
                chainLength: 1
            },
            LedMatrix.defaultRuntimeOptions()
        );
    }

    public runTest() {
        clearTimeout(this.clearTimer);

        this.matrix
            .clear()            // clear the display
            .brightness(100)    // set the panel brightness to 100%
            .fgColor(0x0000FF)  // set the active color to blue
            .fill()             // color the entire diplay blue
            .sync();

        this.clearTimer = setTimeout(() => {
            console.log('clear screen');
            this.matrix.clear().sync();;
        }, 10000);
    }
}
