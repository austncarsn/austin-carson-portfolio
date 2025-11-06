const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const url = process.env.URL || 'http://localhost:3001/';
  const outDir = 'build/screenshots';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Desktop
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800); // small pause for animations
  await page.screenshot({ path: `${outDir}/desktop.png`, fullPage: true });
  console.log('Saved desktop screenshot');

  // Mobile
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${outDir}/mobile.png`, fullPage: true });
  console.log('Saved mobile screenshot');

  await browser.close();
})();
