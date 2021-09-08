"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rpi_led_matrix_1 = require("rpi-led-matrix");
const matrix = new rpi_led_matrix_1.LedMatrix({
    ...rpi_led_matrix_1.LedMatrix.defaultMatrixOptions(),
    rows: 64,
    cols: 64
}, rpi_led_matrix_1.LedMatrix.defaultRuntimeOptions());
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
let clearTimer;
app.get("/", async (req, res) => {
    console.log(req.ip, req.url);
    clearTimeout(clearTimer);
    console.log('draw test screen');
    matrix
        .clear() // clear the display
        .brightness(100) // set the panel brightness to 100%
        .fgColor(0x0000FF) // set the active color to blue
        .fill() // color the entire diplay blue
        .fgColor(0xFFFF00) // set the active color to yellow
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
    clearTimer = setTimeout(() => {
        console.log('clear screen');
        matrix.clear();
    }, 5000);
    return res.status(200).send({
        result: "OK",
    });
});
try {
    app.listen(port, () => {
        console.log(`Connected successfully on port ${port}`);
    });
}
catch (error) {
    console.error(`Error occured: ${error.message}`);
}
