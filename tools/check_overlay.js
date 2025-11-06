const { chromium } = require('playwright');

(async () => {
  const url = process.env.URL || 'http://localhost:3000/';
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const result = await page.evaluate(() => {
    function clean(el) {
      if (!el) return null;
      const s = window.getComputedStyle(el);
      return {
        tag: el.tagName.toLowerCase(),
        id: el.id || null,
        className: el.className || null,
        pointerEvents: s.pointerEvents,
        opacity: s.opacity,
        zIndex: s.zIndex,
        bg: s.backgroundColor,
        bounds: el.getBoundingClientRect ? {
          x: el.getBoundingClientRect().x,
          y: el.getBoundingClientRect().y,
          width: el.getBoundingClientRect().width,
          height: el.getBoundingClientRect().height
        } : null,
      };
    }

    const article = document.querySelector('article.group');
    if (!article) return { error: 'No article.group found on page' };

    // Find candidate action element (first visible link/button inside article)
    const candidates = Array.from(article.querySelectorAll('a, button')).filter(el => {
      const r = el.getBoundingClientRect();
      return r.width > 10 && r.height > 10;
    });

    const firstAction = candidates[0] || null;
    if (!firstAction) return { error: 'No action link/button found inside first article' };

    const rect = firstAction.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // element at that point
    const topEl = document.elementFromPoint(centerX, centerY);

    // Walk up from topEl to see if it's the action element or a covering element
    let cur = topEl;
    let isActionCovered = true;
    while (cur && cur !== document.body) {
      if (cur === firstAction) { isActionCovered = false; break; }
      cur = cur.parentElement;
    }

    return {
      pageTitle: document.title,
      firstAction: clean(firstAction),
      pointTop: clean(topEl),
      isActionCovered: isActionCovered,
      topElPath: (function buildPath(el){
        if (!el) return null;
        const parts = [];
        let node = el;
        while (node && node !== document.body) {
          let part = node.tagName.toLowerCase();
          if (node.id) part += `#${node.id}`;
          else if (node.className) part += `.${node.className.split(' ').slice(0,2).join('.')}`;
          parts.unshift(part);
          node = node.parentElement;
        }
        return parts.join(' > ');
      })(topEl),
      overlays: Array.from(article.querySelectorAll('*')).filter(el => {
        const s = window.getComputedStyle(el);
        return (s.position === 'absolute' || s.position === 'fixed') && s.opacity && parseFloat(s.opacity) > 0 && el.getBoundingClientRect().width > 20 && el.getBoundingClientRect().height > 20;
      }).slice(0,5).map(clean),
    };
  });

  console.log('Overlay check result:\n', JSON.stringify(result, null, 2));

  await browser.close();
})();
