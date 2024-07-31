# Image Resizer

A simple npm package to resize images using the Canvas API.

## Installation

```bash
npm install image-resizer
```

Usage

```bash
const { resizeImage } = require('image-resizer');

(async () => {
  try {
    const outputPath = await resizeImage('input.jpg', 'output.jpg', { width: 800, height: 600, format: 'jpeg' });
    console.log(`Image resized successfully: ${outputPath}`);
  } catch (error) {
    console.error('Error:', error);
  }
})();
;
```
