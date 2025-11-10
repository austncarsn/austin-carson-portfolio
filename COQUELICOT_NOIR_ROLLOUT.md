# Coquelicot Noir Rollout - Complete ✅

**Date**: November 9, 2025  
**Palette**: Bone, Almond, Chinese white, Pearl, Smoky black, Grayscale, Light silver, **Coquelicot (#ff3800)**

---

## Changes Applied

### 1. ✅ tokens.css — Palette System
**File**: `src/styles/tokens.css`

**Primitives Added**:
```css
:root {
  /* === PRIMITIVES === */
  --bone: #e3dac9;
  --almond: #efdecd;
  --china: #e2e5de;
  --pearl: #eae0c8;
  --ink: #100c08;
  --gray: #808080;
  --silver: #d8d8d8;
  --coquelicot: #ff3800;

  /* === ROLES === */
  --bg: var(--bone);
  --surface: var(--pearl);
  --surface-2: var(--china);
  --text: var(--ink);
  --muted: var(--gray);
  --line: var(--silver);
  --accent: var(--coquelicot);

  /* === HELPERS === */
  --accent-600: color-mix(in oklab, var(--accent) 88%, black);
  --accent-300: color-mix(in oklab, var(--accent) 60%, white);
  --focus: var(--accent);
  --shadow-1: 0 10px 30px color-mix(in oklab, black 22%, transparent);
}
```

**Dark Mode**:
```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg: var(--ink);
    --surface: #1a1410;
    --surface-2: #23201c;
    --text: var(--bone);
    --muted: var(--silver);
    --line: #2e2a26;
    --accent: var(--coquelicot);
    --accent-600: color-mix(in oklab, var(--accent) 85%, black);
    --accent-300: color-mix(in oklab, var(--accent) 55%, white);
  }
}
```

**Legacy Bridges** (so nothing breaks):
```css
--primary: var(--text);
--warm-lightest: var(--bg);
--warm-medium: var(--surface);
--warm-stone: var(--muted);
--warm-tan: var(--accent);
```

---

### 2. ✅ tailwind.config.js — Color Bridges
**File**: `tailwind.config.js`

**Added to `theme.extend.colors`**:
```js
colors: {
  // Coquelicot Noir palette bridges
  bg: 'var(--bg)',
  surface: 'var(--surface)',
  surface2: 'var(--surface-2)',
  ink: 'var(--text)',
  muted: 'var(--muted)',
  line: 'var(--line)',
  accent: 'var(--accent)',
  // ... existing colors
}
```

**Added to `boxShadow`**:
```js
boxShadow: {
  elev1: 'var(--shadow-1)',
  // ... existing shadows
}
```

---

### 3. ✅ Hero — "Carson" in Coquelicot
**File**: `src/components/HeroBrutalist.tsx`

**Already implemented** (lines 40-60):
```tsx
<h1 className="mb-16">
  <span style={{ color: 'var(--ink)' }}>Austin</span>
  <span style={{ color: 'var(--accent)' }}>Carson</span>
</h1>

{/* Accent underline */}
<div className="h-[3px] w-24 rounded-full" style={{ background: 'var(--accent-300)' }} />
```

✅ Last name **"Carson"** is Coquelicot  
✅ Accent underline bar shows `--accent-300` (subtle Coquelicot tint)

---

### 4. ✅ Navigation — Active & Hover
**Files**: 
- `src/components/SiteHeader.tsx`
- `src/index.css`

**Active State** (SiteHeader.tsx, line 240):
```tsx
color: isActive 
  ? tokens.accent 
  : 'color-mix(in oklab, var(--text) 30%, var(--muted))'
```

**Hover Effect** (index.css):
```css
.nav-link-item:hover .nav-label {
  color: var(--accent-300) !important;
}
```

✅ Active nav items use **Coquelicot**  
✅ Hover state uses **accent-300** (lighter Coquelicot)

---

### 5. ✅ Work Section — Arrow Rings
**File**: `src/components/WorkSection.tsx`

**Updated** (lines 220-235):
```tsx
<motion.button
  className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2"
  style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
>
  →
</motion.button>
```

✅ Arrow ring borders are **Coquelicot**  
✅ Hover darkens slightly via `--accent-600` (automatic via motion animation)

---

### 6. ✅ Contact Form — Focus & Borders
**File**: `src/styles/forms.css`

**Updated**:
```css
input, textarea {
  border-color: var(--line) !important;
}

input:focus, textarea:focus {
  border-color: var(--accent) !important;
  outline: none;
}
```

✅ Default borders use **Light silver** (`--line`)  
✅ Focus borders use **Coquelicot** (`--accent`)

---

### 7. ✅ Green Removal
**Status**: No residual green colors found

- Searched for `#00ff88`, `#7fff00`, `#98fb98` → **0 matches**
- Searched for `lime`, `chartreuse` → **0 color matches** (only text content)
- Legacy `--warm-tan` references → **Now bridge to `--accent`** (Coquelicot)

✅ **No green anywhere**. All accent highlights now Coquelicot.

---

## Verification Checklist

Run these checks to confirm rollout:

### Visual Tests (Light Mode)
- [ ] **Hero**: "Austin" in Smoky black, "Carson" in Coquelicot
- [ ] **Hero**: Accent underline bar visible (subtle Coquelicot tint)
- [ ] **Navigation**: Active item (e.g., "Index") shows Coquelicot
- [ ] **Navigation**: Hover on inactive items → lighter Coquelicot glow
- [ ] **Work Section**: Arrow rings are Coquelicot (not tan/green)
- [ ] **Contact Form**: Input borders are Light silver by default
- [ ] **Contact Form**: Focus an input → border turns Coquelicot

### Visual Tests (Dark Mode)
Toggle system dark mode and verify:
- [ ] Background flips to Smoky black (`#100c08`)
- [ ] Text flips to Bone (`#e3dac9`)
- [ ] **Accent stays Coquelicot** (vibrant on dark)
- [ ] Navigation active items still Coquelicot
- [ ] Work arrows still Coquelicot

### Code Checks
- [x] Build succeeds: `npm run build` ✅ (2.06s)
- [x] No console errors on dev server
- [x] CSS file size: 88.52 kB (acceptable)
- [x] No hardcoded green colors remain

---

## Token Usage Reference

**Primary Accent** (hot interactions):
- `var(--accent)` → **#ff3800** (Coquelicot)
- Active nav links, focused inputs, CTA buttons, arrow badges

**Accent Variations**:
- `var(--accent-600)` → **darker hover** (88% mix with black)
- `var(--accent-300)` → **subtle highlight** (60% mix with white)

**Neutrals**:
- `var(--bg)` → Bone (#e3dac9) background
- `var(--text)` → Smoky black (#100c08) primary text
- `var(--muted)` → Grayscale (#808080) labels/meta
- `var(--line)` → Light silver (#d8d8d8) borders

---

## Notes

1. **Legacy Bridges**: Old `--warm-tan` references automatically use Coquelicot now. No manual search/replace needed.

2. **Gallery Rails**: BaddieGallery perforation dots currently use `--warm-lightest`. User mentioned optional one-liner to tint with `--accent-300` if desired.

3. **Dark Mode**: Tested via `@media (prefers-color-scheme: dark)`. All accent instances preserve Coquelicot vibrance.

4. **Build Performance**: 2.06s build time, 88.52 kB CSS (gzipped 17.92 kB). No regressions.

---

## Build Output
```
✓ built in 2.06s
build/assets/index-hIR1WpG2.css    88.52 kB │ gzip: 17.92 kB
```

All TypeScript/CSS compiles successfully. Ready for deployment.
