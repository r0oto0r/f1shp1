"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PixelImage = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ObjectId = Schema.Types.ObjectId;
exports.PixelImage = new Schema({
    author: ObjectId,
    pixelGrid: Array()
});
mongoose_1.default.model('PixelImage', exports.PixelImage);
