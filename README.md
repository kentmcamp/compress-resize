# compress-resize

This is a simple script that compresses and resizes all images in the input directory.

It uses `Node.js` with the `imagemin` for compression and `sharp` for resizing. It also has the imagemin plugins `imagemin-mozjpeg` and `imagemin-pngquant` for better compression of jpg and png images.

The script has to const variables to change a max width and a compression quality.
* `MAX_WIDTH`: The script will compare image width with this value. If an image is wider, it will be resized down to this value, and it's height will change to keep the original ratio. If an image is smaller, it's width will remain the same.
* `COMPRESSION_QUALITY`: The compression quality of the images. It's commonly suggested to use a value above 75 to maintain a good quality.
* You can also change the input and output directories by changing the `inputDir` and `outputDir` variables in the script.

### How To Use
1. Clone the repository or download the files.
2. Install the dependencies with `npm install`.
3. *Optional*: Change the `MAX_WIDTH` and `COMPRESSION_QUALITY` values in the `compress-resize.js` file to your desired values.
4. Place all the images you want to compress and resize in the `image-input` directory.
5. Run the script with `node compress-resize.js` in the terminal.
6. The compressed and resized images will be in the `image-output` directory.


 *Note:* The script outputs images with the same name as the input images. So if you make both directories the same, the original images will be overwritten.
