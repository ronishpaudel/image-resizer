import { createCanvas, loadImage } from "canvas";
import fs from "fs";

interface ResizeOptions {
  width: number;
  height: number;
  format?: "jpeg" | "png";
}

export const resizeImage = async (
  inputPath: string,
  outputPath: string,
  options: ResizeOptions
): Promise<string> => {
  try {
    const { width, height, format = "jpeg" } = options;
    const image = await loadImage(inputPath);
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    ctx.drawImage(image, 0, 0, width, height);

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

    await new Promise((resolve, reject) => {
      stream.pipe(out);
      out.on("finish", resolve);
      out.on("error", reject);
    });

    console.log("Image resized successfully");
    return outputPath;
  } catch (error) {
    console.error("Error resizing image:", error);
    throw error;
  }
};
