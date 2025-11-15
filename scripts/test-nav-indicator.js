const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const tried = [3000, 3001, 3002, 3003, 3004, 3005];
  let url = '';
  for (const p of tried) {
    try {
      await page.goto(`http://localhost:${p}/`, { timeout: 5000 });
      url = `http://localhost:${p}/`;
      break;
    } catch (e) {
      // try next port
    }
  }
  if (!url) {
    console.error(
      'Could not connect to localhost on ports 3000-3003. Start dev server and retry.'
    );
    await browser.close();
    process.exit(1);
  }
  console.log('Opening', url);
  await page.goto(url, { waitUntil: 'networkidle' });

  await page.waitForSelector('.nav-pill-track');
  const track = await page.$('.nav-pill-track');
  if (!track) {
    console.error('Could not locate .nav-pill-track');
    await browser.close();
    process.exit(1);
  }

  // Helper to get CSS vars from track
  async function getVars() {
    return await page.evaluate((el) => {
      const s = getComputedStyle(el);
      return {
        left: s.getPropertyValue('--nav-ind-left'),
        width: s.getPropertyValue('--nav-ind-width'),
      };
    }, track);
  }

  async function getHoverVars() {
    return await page.evaluate((el) => {
      const s = getComputedStyle(el);
      return {
        hoverLeft: s.getPropertyValue('--nav-ind-hover-left'),
        hoverWidth: s.getPropertyValue('--nav-ind-hover-width'),
        hoverVisible: s.getPropertyValue('--nav-ind-hover-visible'),
      };
    }, track);
  }

  // Validate initial state
  console.log('Initial vars:', await getVars());

  // Click each nav link
  const links = await page.$$('.nav-pill-track a.nav-pill-item');
  if (!links.length) {
    console.error('No nav links with .nav-pill-item found');
    await browser.close();
    process.exit(1);
  }

  for (let i = 0; i < links.length; i++) {
    await links[i].click();
    await page.waitForTimeout(150); // allow animation to settle
    console.log('After click', i, await getVars());
    // Hover test
    await links[i].hover();
    await page.waitForTimeout(80);
    console.log('After hover', i, await getHoverVars());
    // Move away so hover clears
    await page.mouse.move(0, 0);
  }

  // Resize to mobile and back to desktop to ensure resize listener works
  await page.setViewportSize({ width: 480, height: 800 });
  await page.waitForTimeout(250);
  console.log('After mobile resize:', await getVars());

  await page.setViewportSize({ width: 1200, height: 800 });
  await page.waitForTimeout(250);
  console.log('After desktop resize:', await getVars());

  await browser.close();
  console.log('Indicator test complete');
})();
