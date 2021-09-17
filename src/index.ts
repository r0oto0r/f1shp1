import { LedMatrixController }from "./LedMatrixController";
import { Pixel, PixelGrid } from "./PixelImage";
import { Server } from 'socket.io';
import { ImageStoreController } from "./ImageStoreController";

const ledMatrixController: LedMatrixController = new LedMatrixController();
const socketServer = new Server({ transports: [ 'websocket' ] });

(async () => {
    try {
		await ImageStoreController.init();

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

			client.on('getPixelImages', async ({ skip, take }: { skip: number, take: number }) => {
                client.emit('getPixelImagesResult', await ImageStoreController.getPixelImagesPaginated(skip, take));
            });

			client.on('savePixelImage', async ({ name, pixelGrid }: { name: string, pixelGrid: PixelGrid }) => {
                client.emit('savePixelImageResult', await ImageStoreController.savePixelImage(name, pixelGrid));
            });

			client.on('clear', () => {
                ledMatrixController.clearScreen();
            });

            client.on('disconnect', () => {
                console.log(`${ip} disconnected`);
				client.offAny();
            });
        });
        socketServer.listen(5000);
    } catch (error: any) {
        console.error(`Error occured: ${error.message}`);
    }
})();
