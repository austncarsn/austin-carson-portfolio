const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '../src/assets');
const outputDir = path.join(__dirname, '../src/assets-optimized');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Thresholds for optimization
const SIZE_THRESHOLD = 500000; // 500KB - only optimize files larger than this
const MAX_WIDTH = 2000; // Maximum width in pixels
const MAX_HEIGHT = 2000; // Maximum height in pixels
const WEBP_QUALITY = 85; // WebP quality (0-100)

async function optimizeImages() {
  const files = fs.readdirSync(assetsDir);
  let totalSaved = 0;
  let filesProcessed = 0;

  console.log('🖼️  Image Optimization Script');
  console.log('================================\n');

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    
    // Only process image files
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;

    const inputPath = path.join(assetsDir, file);
    const stats = fs.statSync(inputPath);
    
    // Skip files already small enough
    if (stats.size < SIZE_THRESHOLD) {
      console.log(`⏭️  Skipping ${file} (already optimized: ${(stats.size / 1024).toFixed(0)}KB)`);
      continue;
    }

    const baseName = path.basename(file, ext);
    const outputPath = path.join(outputDir, `${baseName}.webp`);

    try {
      // Optimize and convert to WebP
      await sharp(inputPath)
        .resize(MAX_WIDTH, MAX_HEIGHT, { 
          fit: 'inside',
          withoutEnlargement: true 
        })
        .webp({ quality: WEBP_QUALITY })
        .toFile(outputPath);

      const newStats = fs.statSync(outputPath);
      const savedBytes = stats.size - newStats.size;
      const savingsPercent = ((savedBytes / stats.size) * 100).toFixed(1);
      
      totalSaved += savedBytes;
      filesProcessed++;

      console.log(`✅ ${file}`);
      console.log(`   Original: ${(stats.size / 1024 / 1024).toFixed(2)}MB`);
      console.log(`   Optimized: ${(newStats.size / 1024 / 1024).toFixed(2)}MB`);
      console.log(`   Savings: ${savingsPercent}% (${(savedBytes / 1024 / 1024).toFixed(2)}MB)\n`);
    } catch (error) {
      console.error(`❌ Failed to optimize ${file}:`, error.message, '\n');
    }
  }

  console.log('================================');
  console.log(`\n📊 Summary:`);
  console.log(`   Files processed: ${filesProcessed}`);
  console.log(`   Total space saved: ${(totalSaved / 1024 / 1024).toFixed(2)}MB`);
  console.log(`\n✨ Optimized images saved to: ${outputDir}`);
  console.log('\n💡 Next steps:');
  console.log('   1. Review optimized images for quality');
  console.log('   2. Replace original files with optimized versions');
  console.log('   3. Update ImageWithFallback component for WebP support');
  console.log('   4. Test on dev server and verify load times\n');
}

optimizeImages().catch(console.error);
