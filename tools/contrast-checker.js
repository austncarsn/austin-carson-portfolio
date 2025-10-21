const fs = require('fs');
const path = require('path');
const css = fs.readFileSync(path.join(__dirname, '..', 'src', 'index.css'), 'utf8');

// Extract CSS vars from :root
const rootMatch = css.match(/:root\s*{([\s\S]*?)}/m);
const vars = {};
if (rootMatch) {
  const body = rootMatch[1];
  body.split(/;\s*/).forEach(line => {
    const m = line.match(/--([\w-]+)\s*:\s*(.+)/);
    if (m) vars[m[1]] = m[2].trim();
  });
}

// Simple luminance and contrast functions
function hexToRgb(hex) {
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(h => h+h).join('');
  const r = parseInt(hex.slice(0,2), 16);
  const g = parseInt(hex.slice(2,4), 16);
  const b = parseInt(hex.slice(4,6), 16);
  return [r,g,b];
}
function lum([r,g,b]) {
  [r,g,b] = [r,g,b].map(v => {
    v = v/255;
    return v <= .03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4);
  });
  return 0.2126*r + 0.7152*g + 0.0722*b;
}
function contrast(hexA, hexB) {
  const a = lum(hexToRgb(hexA));
  const b = lum(hexToRgb(hexB));
  const L1 = Math.max(a,b);
  const L2 = Math.min(a,b);
  return (L1 + 0.05) / (L2 + 0.05);
}

// Check pairs of tokens used for text on backgrounds
const checks = [
  { text: 'text-primary', bg: 'bg-paper' },
  { text: 'text-primary', bg: 'bg-surface' },
  { text: 'text-muted', bg: 'bg-paper' },
  { text: 'text-muted', bg: 'bg-surface' },
  { text: 'text-primary', bg: 'bg-dark' },
  { text: 'text-on-dark', bg: 'bg-dark' },
];

const results = checks.map(c => {
  const t = vars[c.text];
  const b = vars[c.bg];
  if (!t || !b) return { ...c, ok: false, reason: 'missing var' };
  const ratio = contrast(t, b);
  return { ...c, ratio: Number(ratio.toFixed(2)), ok: ratio >= 4.5 };
});

console.log('CSS vars:', Object.keys(vars));
console.log('Contrast checks:');
results.forEach(r => console.log(r));

const outPath = path.join(__dirname, 'contrast-report.json');
fs.writeFileSync(outPath, JSON.stringify({ vars, results }, null, 2));
console.log('Saved report to', outPath);
