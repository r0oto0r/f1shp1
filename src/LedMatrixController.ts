import { LedMatrix, LedMatrixInstance } from 'rpi-led-matrix';

export class LedMatrixController {
    private matrix: LedMatrixInstance;
    private clearTimer: NodeJS.Timeout;
    private counter: number;

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
        this.counter = 0;
    }

    public runTest() {
        clearTimeout(this.clearTimer);

        this.counter = this.counter + 1;

        this.matrix
            .clear()
            .brightness(100)
            .fgColor(this.counter % 0xFFFFFF)
            .fill()
            .sync();

        this.clearTimer = setTimeout(() => this.runTest, 10000);
    }
}
