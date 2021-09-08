import express, { Application, Request, Response } from "express";
import { LedMatrix } from 'rpi-led-matrix';
 
const matrix = new LedMatrix(
  LedMatrix.defaultMatrixOptions(),
  LedMatrix.defaultRuntimeOptions()
);

const app: Application = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req: Request, res: Response): Promise<Response> => {
	console.log(req.ip, req.url);

    matrix.drawLine(0,0,1,1);

	return res.status(200).send({
            message: "Hello World!",
        });
    }
);

try {
    app.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error: any) {
    console.error(`Error occured: ${error.message}`);
}
