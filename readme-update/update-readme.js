const fs = require('fs');

const readmeContent = `
# Image Resizer

A simple npm package to resize images using the Canvas API.

## Installation

To install the package, run:

\`\`\`bash
npm install image-resizer
\`\`\`

## Usage

Below is an example of how to use the \`image-resizer\` package:

\`\`\`javascript
const { resizeImage } = require('image-resizer');

(async () => {
  try {
    const outputPath = await resizeImage('input.jpg', 'output.jpg', { width: 800, height: 600, format: 'jpeg' });
    console.log(\`Image resized successfully: \${outputPath}\`);
  } catch (error) {
    console.error('Error:', error);
  }
})();
\`\`\`

## API

### resizeImage(inputPath, outputPath, options)

#### Parameters

- \`inputPath\` (string): The path to the input image file.
- \`outputPath\` (string): The path where the resized image will be saved.
- \`options\` (object): An object containing the following properties:
  - \`width\` (number): The width of the resized image.
  - \`height\` (number): The height of the resized image.
  - \`format\` (string, optional): The format of the resized image. Can be either \`jpeg\` or \`png\`. Default is \`jpeg\`.

#### Returns

- A Promise that resolves to the output path of the resized image.

### Example

#### Resize to JPEG

\`\`\`javascript
const { resizeImage } = require('image-resizer');

(async () => {
  try {
    const outputPath = await resizeImage('input.jpg', 'output.jpg', { width: 800, height: 600, format: 'jpeg' });
    console.log(\`Image resized successfully: \${outputPath}\`);
  } catch (error) {
    console.error('Error:', error);
  }
})();
\`\`\`

#### Resize to PNG

\`\`\`javascript
const { resizeImage } = require('image-resizer');

(async () => {
  try {
    const outputPath = await resizeImage('input.jpg', 'output.png', { width: 800, height: 600, format: 'png' });
    console.log(\`Image resized successfully: \${outputPath}\`);
  } catch (error) {
    console.error('Error:', error);
  }
})();
\`\`\`

## Error Handling

Make sure to handle errors appropriately when using the package. Here’s an example:

\`\`\`javascript
const { resizeImage } = require('image-resizer');

(async () => {
  try {
    const outputPath = await resizeImage('input.jpg', 'output.jpg', { width: 800, height: 600, format: 'jpeg' });
    console.log(\`Image resized successfully: \${outputPath}\`);
  } catch (error) {
    console.error('Error:', error);
  }
})();
\`\`\`

## Dependencies

This package relies on the following dependencies:

- \`canvas\`: ^2.8.0
- \`fs\`: Built-in Node.js module

Make sure to install the dependencies by running:

\`\`\`bash
npm install
\`\`\`

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request. We welcome contributions from the community!

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For any questions or inquiries, please contact Ronish Paudel at [your-email@example.com].
`;

fs.writeFile('README.md', readmeContent, (err) => {
  if (err) {
    console.error('Error writing README.md:', err);
  } else {
    console.log('README.md has been updated successfully.');
  }
});
