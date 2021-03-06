import { LedMatrix, LedMatrixInstance } from 'rpi-led-matrix';
import { Pixel, PixelGrid } from './PixelImage';

export class LedMatrixController {
	private pixelGrid: PixelGrid = Array<Array<Pixel>>();
    private matrix: LedMatrixInstance;
	private brightness: number;

    constructor() {
        this.matrix = new LedMatrix(
            {
                ...LedMatrix.defaultMatrixOptions(),
                rows: 64,
                cols: 64
            }, {
                ...LedMatrix.defaultRuntimeOptions(),
                gpioSlowdown: 3,
            }
        );
		this.resetPixelGrid();
		this.brightness = 100;
    }

	private sync() {
		this.matrix.brightness(this.brightness).sync();
	}

	private resetPixelGrid() {
		this.pixelGrid = Array<Array<Pixel>>(64);
		for(let i = 0; i < this.pixelGrid.length; ++i) {
			this.pixelGrid[i] = new Array<Pixel>(64);
			for(let j = 0; j < this.pixelGrid[i].length; ++j) {
				this.pixelGrid[i][j] = {
					x: j,
					y: i,
					r: 0,
					g: 0,
					b: 0
				} as Pixel
			}
		}}

    public drawPixelGrid(pixelGrid: PixelGrid) {
        if(!pixelGrid) return;
		this.pixelGrid = pixelGrid;
        this.matrix.clear();
        for(let i = 0; i < pixelGrid.length; ++i) {
            for(let j = 0; j < pixelGrid.length; ++j) {
                const pixel: Pixel = pixelGrid[i][j];
                this.matrix.fgColor(pixel)
                this.matrix.setPixel(j, i);
            }
        }
        this.sync();
    }

    public drawPixel(pixel: Pixel) {
        if(!pixel) return;
		this.pixelGrid[pixel.y][pixel.x] = pixel;
        this.matrix
            .fgColor(pixel)
            .setPixel(pixel.x, pixel.y);
		this.sync();
    }

	public drawPixels(pixels: Pixel[]) {
        if(!pixels || pixels.length < 1) return;
		for(const pixel of pixels) {
			this.pixelGrid[pixel.y][pixel.x] = pixel;
			this.matrix
				.fgColor(pixel)
				.setPixel(pixel.x, pixel.y)
		}
		this.sync();
    }

    public clearScreen() {
		this.resetPixelGrid();
        this.matrix.clear();
		this.sync();
    }

    public setBrightness(brightness: number) {
        this.brightness = brightness;
		this.drawPixelGrid(this.pixelGrid);
    }
}
