const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const fetch = global.fetch || require('node-fetch');
const cheerio = require('cheerio');
let puppeteer;
try {
  puppeteer = require('puppeteer');
} catch (e) {
  puppeteer = null;
}

const galleryPath = path.resolve(__dirname, '../src/data/projectsGallery.ts');
const outDir = path.resolve(__dirname, '../src/assets-optimized');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function parseProjects(fileContent) {
  const projects = [];
  const objectRe = /\{([\s\S]*?)\},?/g;
  let m;
  while ((m = objectRe.exec(fileContent))) {
    const block = m[1];
    const idMatch = /id\s*:\s*['"]([^'"]+)['"]/m.exec(block);
    if (!idMatch) continue;
    const id = idMatch[1];
    const linkMatch = /link\s*:\s*['"]([^'"]+)['"]/m.exec(block);
    const link = linkMatch ? linkMatch[1] : null;
    projects.push({ id, link });
  }
  return projects;
}

async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'fetch-og-images-script' },
    timeout: 20000,
  });
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
  await sharp(buffer)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(outPath);
}

async function screenshotToWebp(url, outPath) {
  if (!puppeteer) throw new Error('Puppeteer not available');
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630 });
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    const buffer = await page.screenshot({ type: 'png', fullPage: false });
    await sharp(buffer).webp({ quality: 80 }).toFile(outPath);
  } finally {
    await browser.close();
  }
}

(async () => {
  const content = fs.readFileSync(galleryPath, 'utf8');
  const projects = parseProjects(content);
  console.log(`Found ${projects.length} projects in gallery.`);
  for (const p of projects) {
    if (!p.link || p.link.startsWith('/')) {
      console.log(`Skipping ${p.id} — no external link`);
      continue;
    }
    const url = p.link;
    const outFile = `${p.id}.webp`;
    const outPath = path.join(outDir, outFile);
    try {
      console.log(`Processing ${p.id} — ${url}`);
      const html = await fetchHtml(url);
      const imageUrl = findOgImage(html, url);
      if (imageUrl) {
        console.log(`  Found og image: ${imageUrl}`);
        await downloadToWebp(imageUrl, outPath);
        console.log(`  Saved ${outFile}`);
        continue;
      }
      if (puppeteer) {
        try {
          console.log('  No og:image — capturing screenshot via Puppeteer');
          await screenshotToWebp(url, outPath);
          console.log(`  Saved screenshot ${outFile}`);
          continue;
        } catch (err) {
          console.warn('  Puppeteer failed:', err.message || err);
        }
      }
      // fallback placeholder
      const svg = `<?xml version="1.0" encoding="utf-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="100%" height="100%" fill="#e5e7eb" /><text x="50%" y="50%" font-size="36" text-anchor="middle" dy=".3em" fill="#374151">${p.id}</text></svg>`;
      await sharp(Buffer.from(svg, 'utf8')).webp({ quality: 80 }).toFile(outPath);
      console.log(`  Saved placeholder ${outFile}`);
    } catch (err) {
      console.error(`  Error for ${p.id}:`, err.message || err);
    }
  }
  console.log('Done.');
})();
