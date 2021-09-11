import mongoose from 'mongoose';
import { Color } from 'rpi-led-matrix';
//import mongoose from 'mongoose';

//const PixelImage = mongoose.model('PixelImage', PixelImageShema);


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