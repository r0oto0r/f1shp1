import { LedMatrix, LedMatrixInstance } from 'rpi-led-matrix';
import { Pixel, PixelGrid } from './PixelImage';

export class LedMatrixController {
    private matrix: LedMatrixInstance;

    constructor() {
        this.matrix = new LedMatrix(
            {
                ...LedMatrix.defaultMatrixOptions(),
                rows: 64,
                cols: 64
            }, {
                ...LedMatrix.defaultRuntimeOptions(),
                gpioSlowdown: 2
            }
        );
    }

    public drawPixelGrid(pixelGrid: PixelGrid) {
        if(!pixelGrid) return;
        this.matrix.clear();
        for(let i = 0; i < pixelGrid.length; ++i) {
            for(let j = 0; j < pixelGrid.length; ++j) {
                const pixel: Pixel = pixelGrid[i][j];
                
                this.matrix.fgColor(pixel)
                this.matrix.setPixel(j, i);
            }
        }
        this.matrix.sync();
    }

    public drawPixel(pixel: Pixel) {
        if(!pixel) return;
        this.matrix
            .fgColor(pixel)
            .setPixel(pixel.x, pixel.y)
            .sync();
    }

    public clearScreen() {
        this.matrix
            .clear()
            .sync();
    }

    public setBrightness(brightness: number) {
        this.matrix
            .brightness(brightness)
            .sync();
    }
}
