const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const outDir = path.resolve(__dirname, '../src/assets-optimized');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const filename = 'patterngallery.webp';
const outPath = path.join(outDir, filename);

const title = 'Pattern Gallery';
const subtitle = 'patterngallery.vercel.app';

const svg = `<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="g" x1="0" x2="1">
      <stop offset="0%" stop-color="#2dd4bf" />
      <stop offset="100%" stop-color="#60a5fa" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)" />
  <g font-family="Inter, system-ui, -apple-system, Arial, sans-serif">
    <text x="60" y="220" font-size="64" fill="#041124" font-weight="700">${title}</text>
    <text x="60" y="300" font-size="28" fill="#021824">${subtitle}</text>
  </g>
</svg>`;

(async () => {
  try {
    const buffer = Buffer.from(svg, 'utf8');
    await sharp(buffer).resize({ width: 1200 }).webp({ quality: 80 }).toFile(outPath);
    console.log('Generated placeholder at', outPath);
  } catch (err) {
    console.error('Failed to generate placeholder:', err);
    process.exit(1);
  }
})();
