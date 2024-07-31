const { resizeImage } = require('../index');
const path = require('path');

(async () => {
  try {
    const inputPath = path.resolve(__dirname, 'input.jpg');
    const outputPathJpeg = path.resolve(__dirname, 'output.jpg');
    const outputPathPng = path.resolve(__dirname, 'output.png');

    // Test Forr JPEG resizing
  const resizedJpegPath = await resizeImage(inputPath, outputPathJpeg, { width: 800, height: 700, format: 'jpeg' });
    console.log(`JPEG resizing complete: ${resizedJpegPath}`);

    // Test for png resizing
    const resizedPngPath = await resizeImage(inputPath, outputPathPng, { width: 800, height: 700, format: 'png' });
    console.log(`PNG resizing complete: ${resizedPngPath}`);
  } catch (error) {
    console.error(error);
  }
})();
