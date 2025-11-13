const { chromium } = require('playwright');

(async () => {
  const url = process.env.URL || 'http://localhost:3000/';
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);

  const result = await page.evaluate(() => {
    function stats(el) {
      if (!el) return null;
      const s = window.getComputedStyle(el);
      return {
        tag: el.tagName.toLowerCase(),
        className: el.className || null,
        text: (el.textContent || '').trim().slice(0, 120),
        fontSize: s.fontSize,
        lineHeight: s.lineHeight,
        fontWeight: s.fontWeight,
        letterSpacing: s.letterSpacing,
        marginTop: s.marginTop,
        marginBottom: s.marginBottom,
        paddingTop: s.paddingTop,
        paddingBottom: s.paddingBottom,
        color: s.color,
      };
    }

    const article = document.querySelector('article.group');
    if (!article) return { error: 'No article.group found' };

    article.scrollIntoView({ block: 'center' });

    const title = article.querySelector('h1,h2,h3,h4,h5,h6');
    const desc = article.querySelector('p');
    const spans = Array.from(article.querySelectorAll('span')).slice(0, 6);

    let contentDiv = null;
    const divs = article.querySelectorAll('div');
    for (const d of divs) {
      const cs = window.getComputedStyle(d);
      if (parseFloat(cs.paddingTop) > 0 || parseFloat(cs.paddingLeft) > 0) {
        contentDiv = d;
        break;
      }
    }

    return {
      title: stats(title),
      description: stats(desc),
      spans: spans.map(stats),
      contentPadding: contentDiv
        ? {
            paddingTop: window.getComputedStyle(contentDiv).paddingTop,
            paddingBottom: window.getComputedStyle(contentDiv).paddingBottom,
            paddingLeft: window.getComputedStyle(contentDiv).paddingLeft,
            paddingRight: window.getComputedStyle(contentDiv).paddingRight,
          }
        : null,
    };
  });

  console.log('Typography mobile check result:\n', JSON.stringify(result, null, 2));

  await browser.close();
})();
