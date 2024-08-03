import { createCanvas, loadImage } from "canvas";
import fs from "fs";
import { promisify } from "util";
import { pipeline } from "stream";

const pipelineAsync = promisify(pipeline);

interface ResizeOptions {
  width: number;
  height: number;
  format?: "jpeg" | "png";
}

const getMetadata = async (inputPath: string) => {
  const image = await loadImage(inputPath);
  return {
    width: image.width,
    height: image.height,
    type: inputPath.split(".").pop()?.toLowerCase(),
  };
};

export const resizeImage = async (
  inputPath: string,
  outputPath: string,
  options: ResizeOptions
): Promise<string> => {
  try {
    const { width, height, format = "jpeg" } = options;
    const image = await loadImage(inputPath);

    //preserve aspect ratio by calculatingg width and height
    const aspectRatio = image.width / image.height;
    let newWidth = width;
    let newHeight = height;

    if (width / height > aspectRatio) {
      newWidth = height * aspectRatio;
    } else {
      newHeight = width / aspectRatio;
    }

    const canvas = createCanvas(newWidth, newHeight);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, newWidth, newHeight);

    const out = fs.createWriteStream(outputPath);
    let stream;

    if (format === "jpeg") {
      stream = canvas.createJPEGStream();
    } else if (format === "png") {
      stream = canvas.createPNGStream();
    }

    if (!stream) {
      throw new Error("Unsupported image format");
    }

    await pipelineAsync(stream, out);

    const metadata = await getMetadata(inputPath);
    const outputMetadata = {
      ...metadata,
      resized: {
        width: newWidth,
        height: newHeight,
        format: format,
      },
    };

    fs.writeFileSync(
      `${outputPath}.json`,
      JSON.stringify(outputMetadata, null, 2)
    );

    console.log("Image resized successfully");
    return outputPath;
  } catch (error) {
    console.error("Error resizing image:", error);
    throw error;
  }
};
