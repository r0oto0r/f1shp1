import express, { Application, Request, Response } from "express";
import { LedMatrixController }from "./LedMatrixController";
import { Pixel, PixelGrid } from "./PixelImage";
import cors from 'cors';
import compression from "compression";

const ledMatrixController: LedMatrixController = new LedMatrixController();

const app: Application = express();
const port = 4000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cors({
    origin: '*'
}));

app.post("/drawPixelGrid", async (req: Request, res: Response): Promise<Response> => {
	console.log(req.ip, req.url);
    console.log('draw pixelgrid');
    const pixelGrid: PixelGrid = <PixelGrid> req.body.pixelGrid;

    ledMatrixController.drawPixelGrid(pixelGrid);

	return res.status(200).send({
            result: "OK",
        });
    }
);

app.post("/drawPixel", async (req: Request, res: Response): Promise<Response> => {
	console.log(req.ip, req.url);
    console.log('draw pixel');
    const pixel: Pixel = <Pixel> req.body.pixel;

    ledMatrixController.drawPixel(pixel);

	return res.status(200).send({
            result: "OK",
        });
    }
);

app.post("/setBrightness", async (req: Request, res: Response): Promise<Response> => {
	console.log(req.ip, req.url);
    console.log('set brightness');
    const brightness: number = parseInt(req.body.brightness);

    ledMatrixController.setBrightness(brightness);

	return res.status(200).send({
            result: "OK",
        });
    }
);

app.get("/clear", async (req: Request, res: Response): Promise<Response> => {
	console.log(req.ip, req.url);
    console.log('clear screen');

    ledMatrixController.clearScreen();

	return res.status(200).send({
            result: "OK",
        });
    }
);

(async () => {
    try {
        //await mongoose.connect('mongodb://localhost/papierfitzelchen');
        app.listen(port, (): void => {
            console.log(`Connected successfully on port ${port}`);
        });
    } catch (error: any) {
        console.error(`Error occured: ${error.message}`);
    }
})();
