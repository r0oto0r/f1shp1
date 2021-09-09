import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

export interface Pixel {
    r: number;
    b: number;
    g: number;
}

export const PixelImage = new Schema({
    author: ObjectId,
    pixelGrid: Array<Array<Pixel>>()
});

mongoose.model('PixelImage', PixelImage)
