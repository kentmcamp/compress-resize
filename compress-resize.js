const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = path.join(__dirname, 'images-input');
const outputDir = path.join(__dirname, 'images-output');
const fallbacksDir = path.join(outputDir, 'fallbacks');
const MAX_WIDTH = 960;
const COMPRESSION_QUALITY = 80;

(async () => {
  // Ensure the output and fallbacks directories exist
  await fs.promises.mkdir(outputDir, { recursive: true });
  await fs.promises.mkdir(fallbacksDir, { recursive: true });

  const imageFiles = fs.readdirSync(inputDir).filter(file => /\.(jpe?g|png|gif|webp)$/i.test(file));

  // Resize images using sharp and save them to the output directory
  for (const file of imageFiles) {
    const inputFilePath = path.join(inputDir, file);
    const outputFilePath = path.join(outputDir, path.parse(file).name + ".webp");
    const fallbackFilePath = path.join(fallbacksDir, file);

    let image = sharp(inputFilePath);
    const metadata = await image.metadata();

    if (metadata.width > MAX_WIDTH) {
      image = image.resize({ width: MAX_WIDTH });
    }

    // Save the image in its original format to the fallbacks directory
    await image
      .toFormat(metadata.format, { quality: COMPRESSION_QUALITY })
      .toFile(fallbackFilePath);

    // Save the image as .webp to the output directory
    await image
      .webp({ quality: COMPRESSION_QUALITY })
      .toFile(outputFilePath);
  }

  console.log("Image processing complete.");
})();
