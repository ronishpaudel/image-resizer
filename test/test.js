const { resizeImage } = require('../index'); 
const path = require('path');
const fs = require('fs');

(async () => {
  try {
    const inputPath = path.resolve(__dirname, 'input.jpg');
    const outputPathJpeg = path.resolve(__dirname, 'output.jpg');
    const outputPathPng = path.resolve(__dirname, 'output.png');

//check image exist or not
    if (!fs.existsSync(inputPath)) {
      console.error('Input image not found!');
      return;
    }

   //jpeg resizing
    const resizedJpegPath = await resizeImage(inputPath, outputPathJpeg, { width: 800, height: 700, format: 'jpeg' });
    console.log(`JPEG resizing complete: ${resizedJpegPath}`);

    //png resizing
    const resizedPngPath = await resizeImage(inputPath, outputPathPng, { width: 800, height: 700, format: 'png' });
    console.log(`PNG resizing complete: ${resizedPngPath}`);
  } catch (error) {
    console.error('Error during resizing:', error);
  }
})();
