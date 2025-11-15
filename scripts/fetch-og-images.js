const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const fetch = global.fetch || require('node-fetch');
const cheerio = require('cheerio');
let puppeteer;
try {
  puppeteer = require('puppeteer');
} catch (e) {
  // puppeteer is optional; script will still work (use placeholders) if not installed
  puppeteer = null;
}

// Edit this list: each entry should have a live site 'url' and an output filename 'out'.
// The script will fetch the HTML, read og:image (or twitter:image) and download & convert to webp.
const projects = [
  {
    id: 'pattern-gallery',
    url: 'https://patterngallery.vercel.app',
    out: 'patterngallery.webp',
  },
  // Example entry - add more projects here
  // { id: 'cell-biology', url: 'https://biology-virtual-textbook.vercel.app', out: 'cell-biology.webp' }
];

const outDir = path.resolve(__dirname, '../src/assets-optimized');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function fetchHtml(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'fetch-og-images-script' } });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return await res.text();
}

function findOgImage(html, baseUrl) {
  const $ = cheerio.load(html);
  const og = $('meta[property="og:image"]').attr('content');
  const tw = $('meta[name="twitter:image"]').attr('content');
  const link = $('link[rel="image_src"]').attr('href');
  const candidate = og || tw || link || null;
  if (!candidate) return null;
  try {
    return new URL(candidate, baseUrl).href;
  } catch (e) {
    return candidate;
  }
}

async function downloadToWebp(url, outPath) {
  const res = await fetch(url, { headers: { 'User-Agent': 'fetch-og-images-script' } });
  if (!res.ok) throw new Error(`Failed to download image ${url}: ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());

  // Use sharp to convert/resize for consistent previews
  await sharp(buffer)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(outPath);
}

async function screenshotToWebp(url, outPath) {
  if (!puppeteer) {
    throw new Error('Puppeteer not available');
  }

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630 });
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

    // Capture a screenshot of the viewport
    const buffer = await page.screenshot({ type: 'png', fullPage: false });

    await sharp(buffer).webp({ quality: 80 }).toFile(outPath);
  } finally {
    await browser.close();
  }
}

(async () => {
  for (const p of projects) {
    try {
      console.log(`Processing ${p.id} — ${p.url}`);
      const html = await fetchHtml(p.url);
      const imageUrl = findOgImage(html, p.url);
      const outPath = path.join(outDir, p.out);

      if (imageUrl) {
        console.log(`  Found image: ${imageUrl}`);
        await downloadToWebp(imageUrl, outPath);
        console.log(`  Saved optimized image to ${outPath}`);
        continue;
      }

      // No OG image — try Puppeteer screenshot fallback if available
      if (puppeteer) {
        try {
          console.log('  No og:image found — capturing screenshot via Puppeteer');
          await screenshotToWebp(p.url, outPath);
          console.log(`  Saved screenshot preview to ${outPath}`);
          continue;
        } catch (sErr) {
          console.warn(`  Puppeteer screenshot failed: ${sErr.message || sErr}`);
        }
      } else {
        console.log('  No og:image and Puppeteer not installed — skipping screenshot');
      }

      console.warn(
        `  No og:image/twitter:image found for ${p.url} — generating placeholder`
      );
      // Fallback: generate a simple SVG placeholder via sharp
      const svg = `<?xml version="1.0" encoding="utf-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">\n  <rect width="100%" height="100%" fill="#e5e7eb" />\n  <text x="50%" y="50%" font-size="36" text-anchor="middle" dy=".3em" fill="#374151">${p.id}</text>\n</svg>`;
      await sharp(Buffer.from(svg, 'utf8')).webp({ quality: 80 }).toFile(outPath);
      console.log(`  Saved placeholder to ${outPath}`);
    } catch (err) {
      console.error(`  Error for ${p.id}:`, err.message || err);
    }
  }
  console.log('Done.');
})();
