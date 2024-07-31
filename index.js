"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeImage = void 0;
const canvas_1 = require("canvas");
const fs_1 = __importDefault(require("fs"));
const resizeImage = (inputPath, outputPath, options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { width, height, format = "jpeg" } = options;
        const image = yield (0, canvas_1.loadImage)(inputPath);
        const canvas = (0, canvas_1.createCanvas)(width, height);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, width, height);
        const out = fs_1.default.createWriteStream(outputPath);
        let stream;
        if (format === "jpeg") {
            stream = canvas.createJPEGStream();
        }
        else if (format === "png") {
            stream = canvas.createPNGStream();
        }
        if (!stream) {
            throw new Error("Unsupported image format");
        }
        yield new Promise((resolve, reject) => {
            stream.pipe(out);
            out.on("finish", resolve);
            out.on("error", reject);
        });
        console.log("Image resized successfully");
        return outputPath;
    }
    catch (error) {
        console.error("Error resizing image:", error);
        throw error;
    }
});
exports.resizeImage = resizeImage;
