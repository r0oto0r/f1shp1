import { LedMatrixController }from "./LedMatrixController";
import { Pixel, PixelGrid } from "./PixelImage";
import { Server } from 'socket.io';

const ledMatrixController: LedMatrixController = new LedMatrixController();
const socketServer = new Server({ transports: [ 'websocket' ] });

(async () => {
    try {
        //await mongoose.connect('mongodb://localhost/papierfitzelchen');
        socketServer.on('connection', client => {
            const ip = client.handshake.address;
            console.log(`${ip} connected`);

			client.on('drawPixelGrid', (pixelGrid: PixelGrid) => {
                ledMatrixController.drawPixelGrid(pixelGrid);
            });

            client.on('drawPixel', (pixel: Pixel) => {
                ledMatrixController.drawPixel(pixel);
            });

			client.on('drawPixels', (pixels: Pixel[]) => {
                ledMatrixController.drawPixels(pixels);
            });

			client.on('setBrightness', (brightness: number) => {
                ledMatrixController.setBrightness(brightness);
            });

			client.on('clear', () => {
                ledMatrixController.clearScreen();
            });

            client.off('disconnect', () => {
                console.log(`${ip} disconnected`);
            });
        });
        socketServer.listen(5000);
    } catch (error: any) {
        console.error(`Error occured: ${error.message}`);
    }
})();
