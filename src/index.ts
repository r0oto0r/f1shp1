import express, { Application, Request, Response } from "express";
import { LedMatrixController }from "./LedMatrixController";
import { Pixel, PixelGrid } from "./PixelImage";
import cors from 'cors';
import compression from "compression";
import { Server } from 'socket.io';

const ledMatrixController: LedMatrixController = new LedMatrixController();

const app: Application = express();
const port = 4000;
const socketServer = new Server({ transports: [ 'websocket' ] });

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cors({
    origin: '*'
}));

app.post("/drawPixelGrid", async (req: Request, res: Response): Promise<Response> => {
    const pixelGrid: PixelGrid = <PixelGrid> req.body.pixelGrid;

    ledMatrixController.drawPixelGrid(pixelGrid);

	return res.status(200).send({
            result: "OK",
        });
    }
);

app.post("/drawPixel", async (req: Request, res: Response): Promise<Response> => {
    const pixel: Pixel = <Pixel> req.body.pixel;

    ledMatrixController.drawPixel(pixel);

	return res.status(200).send({
            result: "OK",
        });
    }
);

app.post("/drawPixels", async (req: Request, res: Response): Promise<Response> => {
    const pixels: Pixel[] = <Pixel[]> req.body.pixels;

	ledMatrixController.drawPixels(pixels);

	return res.status(200).send({
            result: "OK",
        });
    }
);

app.post("/setBrightness", async (req: Request, res: Response): Promise<Response> => {
    const brightness: number = parseInt(req.body.brightness);

    ledMatrixController.setBrightness(brightness);

	return res.status(200).send({
            result: "OK",
        });
    }
);

app.get("/clear", async (req: Request, res: Response): Promise<Response> => {
    ledMatrixController.clearScreen();

	return res.status(200).send({
            result: "OK",
        });
    }
);

(async () => {
    try {
        //await mongoose.connect('mongodb://localhost/papierfitzelchen');
        socketServer.on('connection', client => {
            const ip = client.handshake.address;
            console.log(`${ip} connected`);
            client.on('/drawPixels', (pixels: Pixel[]) => {
                console.log(`${ip} /drawPixels`);
                ledMatrixController.drawPixels(pixels);
            });
            client.off('disconnect', () => {
                console.log(`${ip} disconnected`);
            });
        });
        socketServer.listen(5000);
        app.listen(port, (): void => {
            console.log(`Connected successfully on port ${port}`);
        });
    } catch (error: any) {
        console.error(`Error occured: ${error.message}`);
    }
})();
