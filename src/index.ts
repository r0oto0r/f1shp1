import express, { Application, Request, Response } from "express";
import { LedMatrixController }from "./LedMatrixController";
import mongoose from 'mongoose';
import { Pixel, PixelImage as PixelImageShema } from "./PixelImage";

const ledMatrixController: LedMatrixController = new LedMatrixController();
const PixelImage = mongoose.model('PixelImage', PixelImageShema);

const app: Application = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req: Request, res: Response): Promise<Response> => {
	console.log(req.ip, req.url);
    console.log('draw test screen');

    /*const pixelGrid = new Array<Array<Pixel>>();

    for(let i = 0; i < 64; i++) {
        pixelGrid[i] = new Array<Pixel>(64);
        for(let j = 0; j < 64; j++) {
            pixelGrid[i][j] = <Pixel> {
                r: 0,
                g: 0,
                b: 0
            }
        }
    }

    const pixelImage = new PixelImage({
        pixelGrid
    });

    console.log((await pixelImage.save())._id);

    console.log(await PixelImage.find());*/

    ledMatrixController.runTest();

	return res.status(200).send({
            result: "OK",
        });
    }
);

(async () => {
    try {
        await mongoose.connect('mongodb://localhost/papierfitzelchen');
        app.listen(port, (): void => {
            console.log(`Connected successfully on port ${port}`);
        });
    } catch (error: any) {
        console.error(`Error occured: ${error.message}`);
    }
})();
