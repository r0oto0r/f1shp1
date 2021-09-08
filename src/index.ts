import express, { Application, Request, Response } from "express";
import { LedMatrix } from 'rpi-led-matrix';
 
const matrix = new LedMatrix(
  {
        ...LedMatrix.defaultMatrixOptions(),
        rows: 64,
        cols: 64
  },
  LedMatrix.defaultRuntimeOptions()
);

const app: Application = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req: Request, res: Response): Promise<Response> => {
	console.log(req.ip, req.url);

    matrix
        .clear()            // clear the display
        .brightness(100)    // set the panel brightness to 100%
        .fgColor(0x0000FF)  // set the active color to blue
        .fill()             // color the entire diplay blue
        .fgColor(0xFFFF00)  // set the active color to yellow
        // draw a yellow circle around the display
        .drawCircle(matrix.width() / 2, matrix.height() / 2, matrix.width() / 2 - 1)
        // draw a yellow rectangle
        .drawRect(matrix.width() / 4, matrix.height() / 4, matrix.width() / 2, matrix.height() / 2)
        // sets the active color to red
        .fgColor({ r: 255, g: 0, b: 0 })
        // draw two diagonal red lines connecting the corners
        .drawLine(0, 0, matrix.width(), matrix.height())
        .drawLine(matrix.width() - 1, 0, 0, matrix.height() - 1)
        .sync();

	return res.status(200).send({
            result: "OK",
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
