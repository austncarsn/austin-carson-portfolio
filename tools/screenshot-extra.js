const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const url = process.env.URL || 'http://localhost:3001/';
  const outDir = 'build/screenshots';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Desktop 1440
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${outDir}/desktop-1440.png`, fullPage: true });
  console.log('Saved desktop-1440 screenshot');

  // Tablet 1024
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${outDir}/tablet-1024.png`, fullPage: true });
  console.log('Saved tablet-1024 screenshot');

  await browser.close();
})();
