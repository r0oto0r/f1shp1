import { LedMatrix, LedMatrixInstance } from 'rpi-led-matrix';

export class LedMatrixController {
    private matrix: LedMatrixInstance;
    private counter: number;

    constructor() {
        this.matrix = new LedMatrix(
            {
                ...LedMatrix.defaultMatrixOptions(),
                rows: 64,
                cols: 64
            }, {
                ...LedMatrix.defaultRuntimeOptions(),
                gpioSlowdown: 1
            }
        );
        this.counter = 0;

        this.matrix.afterSync((mat, dt, t) => {
            this.counter = this.counter + t;

            this.matrix
                .clear()
                .brightness(100)
                .fgColor(this.counter % 0xFFFFFF)
                .fill()
                .sync();
            
            setTimeout(() => this.matrix.sync(), 100);
        });
    }

    public runTest() {
        this.matrix.sync();
    }
}
