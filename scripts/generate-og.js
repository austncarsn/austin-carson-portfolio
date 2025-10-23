// Generates a monochrome OG image from an SVG using sharp
// Usage: node scripts/generate-og.js

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const svgPath = path.join(__dirname, '..', 'build', 'assets', 'FloralEighteen.svg');
const outDir = path.join(__dirname, '..', 'src', 'assets');
const outBuildDir = path.join(__dirname, '..', 'build', 'assets');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

(async () => {
  try {
    const svgBuffer = fs.readFileSync(svgPath);

    // Convert to monochrome by desaturating and setting a threshold
    const pngBuffer = await sharp(svgBuffer)
      .resize(1200, 630, { fit: 'contain', background: '#ffffff' })
      .grayscale()
      .threshold(200) // increase for more stark black/white
      .png()
      .toBuffer();

    const outPath = path.join(outDir, 'og-image.png');
    fs.writeFileSync(outPath, pngBuffer);

    // Also write to build assets so immediate deploys use it
    const outBuildPath = path.join(outBuildDir, 'og-image.png');
    fs.writeFileSync(outBuildPath, pngBuffer);

    console.log('Generated', outPath);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();