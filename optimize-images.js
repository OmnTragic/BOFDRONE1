import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'public');
const imagesToOptimize = [
  'dji_fly_20240804_063704_0012_1773680752306_photo.JPG',
  'dji_fly_20240804_063636_0008_1773680753906_photo.JPG',
  'dji_fly_20240804_063702_0011_1773680752709_photo.JPG',
  'dji_fly_20240804_063644_0009_1773680753498_photo.JPG',
  'dji_fly_20240804_063656_0010_1773680753142_photo.JPG',
  'dji_fly_20240804_063902_0016_1773680727808_photo.JPG',
  'dji_fly_20240804_064556_0028_1773680659340_photo.JPG',
  'dji_fly_20240804_064538_0025_1773680663179_photo.JPG',
  'dji_fly_20241026_183140_0029_1773680659116_photo.JPG',
  'dji_fly_20241026_183154_0030_1773680658881_photo.JPG',
  'dji_fly_20241026_183204_0031_1773680658641_photo.JPG',
  'dji_fly_20241026_183754_0034_1773680641027_photo.JPG',
  'dji_fly_20250414_192824_0038_1773680598155_photo.JPG'
];

async function optimizeImage(inputPath, outputPath) {
  try {
    const stats = fs.statSync(inputPath);
    const originalSize = stats.size;

    await sharp(inputPath)
      .jpeg({
        quality: 85,
        progressive: true,
        mozjpeg: true
      })
      .resize(1920, null, { // Max width 1920px, maintain aspect ratio
        withoutEnlargement: true,
        fit: 'inside'
      })
      .toFile(outputPath);

    const newStats = fs.statSync(outputPath);
    const newSize = newStats.size;
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);

    console.log(`${path.basename(inputPath)}: ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(newSize / 1024 / 1024).toFixed(2)}MB (${savings}% savings)`);

    // Replace original with optimized version
    fs.renameSync(outputPath, inputPath);

  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error.message);
  }
}

async function optimizeAllImages() {
  console.log('Starting image optimization...\n');

  for (const imageName of imagesToOptimize) {
    const inputPath = path.join(publicDir, imageName);
    const tempOutputPath = path.join(publicDir, `temp_${imageName}`);

    if (fs.existsSync(inputPath)) {
      await optimizeImage(inputPath, tempOutputPath);
    } else {
      console.log(`Skipping ${imageName} - file not found`);
    }
  }

  console.log('\nImage optimization complete!');
}

optimizeAllImages().catch(console.error);