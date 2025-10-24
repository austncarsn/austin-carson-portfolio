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
    const base = sharp(svgBuffer).resize(1200, 630, { fit: 'contain', background: '#ffffff' }).grayscale();

    // Variant 1: High-contrast monochrome
    const monoBuffer = await base.clone().threshold(200).png().toBuffer();
    const outPath = path.join(outDir, 'og-image.png');
    fs.writeFileSync(outPath, monoBuffer);

    // Variant 2: Labeled overlay (site title) — create an SVG overlay and composite
    const labelText = 'AUSTIN CARSON';
    const svgLabel = `
      <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="transparent" />
        <style>
          .title { font-family: 'Space Grotesk', 'IBM Plex Sans', sans-serif; font-weight:700; font-size:48px; fill:#000000; }
          .back { fill: rgba(255,255,255,0.8); }
        </style>
        <!-- subtle white pill behind text for readability -->
        <rect x="80" y="480" rx="8" ry="8" width="1040" height="72" fill="#ffffff" fill-opacity="0.85" />
        <text x="120" y="532" class="title">${labelText}</text>
      </svg>
    `;

    const labeledBuffer = await base
      .clone()
      .composite([{ input: Buffer.from(svgLabel), gravity: 'southwest' }])
      // apply threshold to make the floral art mono while preserving label legibility
      .threshold(200)
      .png()
      .toBuffer();

    const outLabelPath = path.join(outDir, 'og-image-text.png');
    fs.writeFileSync(outLabelPath, labeledBuffer);

    // Also write to build assets so immediate deploys use them
    const outBuildMono = path.join(outBuildDir, 'og-image.png');
    const outBuildLabel = path.join(outBuildDir, 'og-image-text.png');
    fs.writeFileSync(outBuildMono, monoBuffer);
    fs.writeFileSync(outBuildLabel, labeledBuffer);

    console.log('Generated:', outPath, 'and', outLabelPath);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();