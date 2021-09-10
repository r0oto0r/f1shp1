import mongoose from 'mongoose';
import { Color } from 'rpi-led-matrix';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

export type PixelGrid = Array<Array<Pixel>>;
const pixelGrid: PixelGrid = new Array<Array<Pixel>>();

export interface Pixel extends Color {
    x: number;
    y: number;
}

export const PixelImage = new Schema({
    author: ObjectId,
    pixelGrid
});

mongoose.model('PixelImage', PixelImage)
