"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const LedMatrixController_1 = require("./LedMatrixController");
const mongoose_1 = __importDefault(require("mongoose"));
const PixelImage_1 = require("./PixelImage");
const ledMatrixController = new LedMatrixController_1.LedMatrixController();
const PixelImage = mongoose_1.default.model('PixelImage', PixelImage_1.PixelImage);
const app = (0, express_1.default)();
const port = 4000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", async (req, res) => {
    console.log(req.ip, req.url);
    console.log('draw test screen');
    const pixelGrid = new Array();
    for (let i = 0; i < 64; i++) {
        pixelGrid[i] = new Array(64);
        for (let j = 0; j < 64; j++) {
            pixelGrid[i][j] = {
                r: 0,
                g: 0,
                b: 0
            };
        }
    }
    const pixelImage = new PixelImage({
        pixelGrid
    });
    console.log(await pixelImage.save());
    console.log(await PixelImage.find());
    ledMatrixController.runTest();
    return res.status(200).send({
        result: "OK",
    });
});
(async () => {
    try {
        await mongoose_1.default.connect('mongodb://localhost/papierfitzelchen');
        app.listen(port, () => {
            console.log(`Connected successfully on port ${port}`);
        });
    }
    catch (error) {
        console.error(`Error occured: ${error.message}`);
    }
})();
