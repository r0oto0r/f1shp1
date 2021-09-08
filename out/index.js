"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rpi_led_matrix_1 = require("rpi-led-matrix");
const matrix = new rpi_led_matrix_1.LedMatrix(rpi_led_matrix_1.LedMatrix.defaultMatrixOptions(), rpi_led_matrix_1.LedMatrix.defaultRuntimeOptions());
const app = (0, express_1.default)();
const port = 3000;
// Body parsing Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", async (req, res) => {
    console.log(req.ip, req.url);
    return res.status(200).send({
        message: "Hello World!",
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
