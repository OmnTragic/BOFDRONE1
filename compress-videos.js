import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set FFmpeg path
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const publicDir = path.join(__dirname, 'public');

// Videos that need compression (over 500MB)
const videosToCompress = [
  {
    name: 'dji_fly_20240804_063730_0013_1773680751936_video.MP4',
    targetBitrate: '2000k',
    scale: '720'
  },
  {
    name: 'dji_fly_20240804_063800_0014_1773680743823_video.MP4',
    targetBitrate: '2000k',
    scale: '720'
  },
  {
    name: 'dji_fly_20240804_063836_0015_1773680731805_video.MP4',
    targetBitrate: '2000k',
    scale: '720'
  },
  {
    name: 'dji_fly_20240804_063908_0017_1773680727544_video.MP4',
    targetBitrate: '2000k',
    scale: '720'
  },
  {
    name: 'dji_fly_20240804_063942_0018_1773680722662_video.MP4',
    targetBitrate: '2000k',
    scale: '720'
  },
  {
    name: 'dji_fly_20240804_064030_0020_1773680711171_video.MP4',
    targetBitrate: '2000k',
    scale: '720'
  },
  {
    name: 'dji_fly_20240804_064018_0019_1773680717295_video.MP4',
    targetBitrate: '2000k',
    scale: '720'
  },
  {
    name: 'dji_fly_20240804_064122_0021_1773680696653_video.MP4',
    targetBitrate: '2000k',
    scale: '720'
  },
  {
    name: 'dji_fly_20240804_064348_0022_1773680684838_video.MP4',
    targetBitrate: '2000k',
    scale: '720'
  },
  {
    name: 'dji_fly_20240804_064432_0023_1773680679698_video.MP4',
    targetBitrate: '2000k',
    scale: '720'
  },
  {
    name: 'dji_fly_20240804_064504_0024_1773680669220_video.MP4',
    targetBitrate: '2000k',
    scale: '720'
  },
  {
    name: 'dji_fly_20241026_183526_0032_1773680658495_video.MP4',
    targetBitrate: '2000k',
    scale: '720'
  },
  {
    name: 'dji_fly_20241026_183732_0033_1773680652351_video.MP4',
    targetBitrate: '2000k',
    scale: '720'
  },
  {
    name: 'dji_fly_20241027_143254_0036_1773680640899_video.MP4',
    targetBitrate: '2000k',
    scale: '720'
  },
  {
    name: 'dji_fly_20250414_192830_0039_1773680598112_video.MP4',
    targetBitrate: '1500k',
    scale: '480' // Very large file, compress more aggressively
  },
  {
    name: 'dji_fly_20260317_050846_0041_1773697960866_video.MP4',
    targetBitrate: '2000k',
    scale: '720'
  },
  {
    name: 'dji_fly_20260317_054014_0042_1773697929708_video.MP4',
    targetBitrate: '2000k',
    scale: '720'
  },
  {
    name: 'dji_fly_20260317_102208_0053_1773715554317_video.MP4',
    targetBitrate: '2000k',
    scale: '720'
  },
  {
    name: 'dji_fly_20260317_102310_0054_1773715537901_video.MP4',
    targetBitrate: '2000k',
    scale: '720'
  },
  {
    name: 'dji_fly_20260317_102408_0055_1773715516775_video.MP4',
    targetBitrate: '2000k',
    scale: '720'
  },
  {
    name: 'dji_fly_20260317_102658_0056_1773715462517_video.MP4',
    targetBitrate: '2000k',
    scale: '720'
  },
  {
    name: 'dji_fly_20260317_102914_0057_1773715421464_video.MP4',
    targetBitrate: '2000k',
    scale: '720'
  },
  {
    name: 'dji_fly_20260317_102958_0058_1773715411958_video.MP4',
    targetBitrate: '2000k',
    scale: '720'
  },
  {
    name: 'dji_fly_20260317_103218_0059_1773715376262_video.MP4',
    targetBitrate: '2000k',
    scale: '720'
  },
  {
    name: 'dji_fly_20260317_103420_0060_1773715365852_video.MP4',
    targetBitrate: '2000k',
    scale: '720'
  },
  {
    name: 'dji_fly_20260317_103456_0061_1773715351730_video.MP4',
    targetBitrate: '2000k',
    scale: '720'
  },
  {
    name: 'dji_fly_20260317_172952_0064_1773794242039_video.MP4',
    targetBitrate: '2000k',
    scale: '720'
  },
  {
    name: 'dji_fly_20260317_155352_0062_1773788832153_video.MP4',
    targetBitrate: '1500k',
    scale: '480' // Very large file
  },
  {
    name: 'dji_fly_20260317_173142_0065_1773794180658_video.MP4',
    targetBitrate: '2000k',
    scale: '720'
  },
  {
    name: 'dji_fly_20260317_155732_0063_1773788713921_video.MP4',
    targetBitrate: '1500k',
    scale: '480' // Very large file
  },
  {
    name: 'dji_fly_20260317_173220_0066_1773794159999_video.MP4',
    targetBitrate: '2000k',
    scale: '720'
  },
  {
    name: 'dji_fly_20260317_173250_0067_1773794157327_video.MP4',
    targetBitrate: '2000k',
    scale: '720'
  },
  {
    name: 'dji_fly_20260317_173302_0068_1773794153762_video.MP4',
    targetBitrate: '2000k',
    scale: '720'
  },
  {
    name: 'dji_fly_20260317_173332_0069_1773794137795_video.MP4',
    targetBitrate: '2000k',
    scale: '720'
  },
  {
    name: 'dji_fly_20260318_063802_0072_1773841472260_video.MP4',
    targetBitrate: '2000k',
    scale: '720'
  },
  {
    name: 'dji_fly_20260318_063618_0071_1773841528491_video.MP4',
    targetBitrate: '1500k',
    scale: '480' // Very large file
  },
  {
    name: 'dji_fly_20260318_063912_0074_1773841437074_video.MP4',
    targetBitrate: '2000k',
    scale: '720'
  },
  {
    name: 'dji_fly_20260318_063816_0073_1773841466789_video.MP4',
    targetBitrate: '1500k',
    scale: '480' // Very large file
  },
  {
    name: 'dji_fly_20260318_063924_0075_1773841433221_video.MP4',
    targetBitrate: '2000k',
    scale: '720'
  },
  {
    name: 'dji_fly_20260318_063948_0076_1773841423164_video.MP4',
    targetBitrate: '2000k',
    scale: '720'
  },
  {
    name: 'dji_fly_20260318_064028_0077_1773841399705_video.MP4',
    targetBitrate: '2000k',
    scale: '720'
  },
  {
    name: 'dji_fly_20260318_064622_0079_1773842507581_video.MP4',
    targetBitrate: '2000k',
    scale: '720'
  },
  {
    name: 'dji_fly_20260318_064036_0078_1773841396771_video.MP4',
    targetBitrate: '2000k',
    scale: '720'
  },
  {
    name: 'dji_fly_20260318_064638_0080_1773842499634_video.MP4',
    targetBitrate: '2000k',
    scale: '720'
  },
  {
    name: 'dji_fly_20260318_064718_0081_1773842479188_video.MP4',
    targetBitrate: '1500k',
    scale: '480' // Very large file
  },
  {
    name: 'dji_fly_20260318_064956_0082_1773842398213_video.MP4',
    targetBitrate: '1500k',
    scale: '480' // Very large file
  },
  {
    name: 'dji_fly_20260318_065124_0083_1773842351774_video.MP4',
    targetBitrate: '2000k',
    scale: '720'
  },
  {
    name: 'dji_fly_20260318_065146_0084_1773842341701_video.MP4',
    targetBitrate: '2000k',
    scale: '720'
  },
  {
    name: 'dji_fly_20260318_065206_0085_1773842332705_video.MP4',
    targetBitrate: '2000k',
    scale: '720'
  },
  {
    name: 'dji_fly_20260318_065216_0086_1773842330083_video.MP4',
    targetBitrate: '2000k',
    scale: '720'
  },
  {
    name: 'dji_fly_20260318_065234_0087_1773842322259_video.MP4',
    targetBitrate: '1500k',
    scale: '480' // Very large file
  },
  {
    name: 'dji_fly_20260320_184212_0090_1774058242831_video.MP4',
    targetBitrate: '2000k',
    scale: '720'
  },
  {
    name: 'dji_fly_20260320_184146_0089_1774058260742_video.MP4',
    targetBitrate: '2000k',
    scale: '720'
  },
  {
    name: 'dji_fly_20260320_184252_0091_1774058236563_video.MP4',
    targetBitrate: '2000k',
    scale: '720'
  },
  {
    name: 'dji_fly_20260320_184404_0092_1774058190530_video.MP4',
    targetBitrate: '2000k',
    scale: '720'
  },
  {
    name: 'dji_fly_20260320_184436_0093_1774058171602_video.MP4',
    targetBitrate: '2000k',
    scale: '720'
  },
  {
    name: 'dji_fly_20260320_184750_0094_1774058097158_video.MP4',
    targetBitrate: '2000k',
    scale: '720'
  }
];

function compressVideo(videoConfig) {
  return new Promise((resolve, reject) => {
    const inputPath = path.join(publicDir, videoConfig.name);
    const outputPath = path.join(publicDir, `compressed_${videoConfig.name}`);

    if (!fs.existsSync(inputPath)) {
      console.log(`Skipping ${videoConfig.name} - file not found`);
      resolve();
      return;
    }

    const stats = fs.statSync(inputPath);
    const originalSizeMB = (stats.size / 1024 / 1024).toFixed(2);

    console.log(`Compressing ${videoConfig.name} (${originalSizeMB}MB)...`);

    ffmpeg(inputPath)
      .videoCodec('libx264')
      .videoBitrate(videoConfig.targetBitrate)
      .audioCodec('aac')
      .audioBitrate('128k')
      .size(`?x${videoConfig.scale}`)
      .outputOptions([
        '-preset medium',
        '-crf 23',
        '-movflags +faststart'
      ])
      .output(outputPath)
      .on('end', () => {
        try {
          const newStats = fs.statSync(outputPath);
          const newSizeMB = (newStats.size / 1024 / 1024).toFixed(2);
          const savings = (((stats.size - newStats.size) / stats.size) * 100).toFixed(1);

          console.log(`${videoConfig.name}: ${originalSizeMB}MB → ${newSizeMB}MB (${savings}% savings)`);

          // Replace original with compressed version
          fs.renameSync(outputPath, inputPath);
          resolve();
        } catch (error) {
          console.error(`Error replacing ${videoConfig.name}:`, error.message);
          // Clean up temp file if it exists
          if (fs.existsSync(outputPath)) {
            fs.unlinkSync(outputPath);
          }
          reject(error);
        }
      })
      .on('error', (err) => {
        console.error(`Error compressing ${videoConfig.name}:`, err.message);
        reject(err);
      })
      .run();
  });
}

async function compressAllVideos() {
  console.log('Starting video compression...\n');

  // Process videos in batches to avoid overwhelming the system
  const batchSize = 3;
  for (let i = 0; i < videosToCompress.length; i += batchSize) {
    const batch = videosToCompress.slice(i, i + batchSize);
    console.log(`Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(videosToCompress.length / batchSize)}...`);

    await Promise.all(batch.map(video => compressVideo(video)));
  }

  console.log('\nVideo compression complete!');
}

compressAllVideos().catch(console.error);