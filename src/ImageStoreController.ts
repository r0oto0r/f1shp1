import mongoose from 'mongoose';
import { PixelGrid, PixelImage as PixelImageShema } from './PixelImage';

const PixelImage = mongoose.model('PixelImage', PixelImageShema);

export class ImageStoreController {
    private constructor() {}

	public static async init() {
		return mongoose.connect('mongodb://localhost/papierfitzelchen');
	}

	public static async savePixelImage(name: string, pixelGrid: PixelGrid) {
		const pixelImage = new PixelImage({
			name,
			pixelGrid
		});

		return pixelImage.save();
	}

	public static async getPixelImagesPaginated(skip: number, limit: number) {
		return PixelImage.find().skip(skip).limit(limit);
	}
}
