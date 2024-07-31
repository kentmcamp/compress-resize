const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

const MAX_WIDTH = 960; // Images with a width greater then this value will be resized to it.
const COMPRESSION_QUALITY = 80; // Quality of the compressed images.

(async () => {
    const inputDir = './images-input';
    const outputDir = './images-output';

    // Ensure the output directory exists
    await fs.mkdir(outputDir, { recursive: true });

    // Read input files
    const inputFiles = await fs.readdir(inputDir);
    console.log('Input files:', inputFiles);

    // Resize images using sharp and save them to a temporary directory
    const resizedDir = './resized-images';
    await fs.mkdir(resizedDir, { recursive: true });

    for (const file of inputFiles) {
        const inputFilePath = path.join(inputDir, file);
        const outputFilePath = path.join(resizedDir, file);

        const image = sharp(inputFilePath);
        const metadata = await image.metadata();

        if (metadata.width > 960) {
            await image.resize({ width: 960 }).toFile(outputFilePath);
        } else {
            await fs.copyFile(inputFilePath, outputFilePath);
        }
    }

    // Dynamically import imagemin and its plugins for compression
    const imagemin = (await import('imagemin')).default;
    const imageminMozjpeg = (await import('imagemin-mozjpeg')).default;
    const imageminPngquant = (await import('imagemin-pngquant')).default;

    // Imagemin compression
    const convertedImages = await imagemin([`${resizedDir}/*.{jpg,png}`], {
        destination: outputDir,
        plugins: [
            imageminMozjpeg({ quality: 80 }),
            imageminPngquant()
        ]
    });

    console.log('Converted images:', convertedImages);

    // Remove the temporary resized images directory
    await fs.rm(resizedDir, { recursive: true });
})();
