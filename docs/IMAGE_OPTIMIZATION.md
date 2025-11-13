# Image Optimization Guide

## Quick Start

Run the image optimization script to convert large images to optimized WebP format:

```bash
npm run optimize-images
```

This will:

- Scan `src/assets/` for images larger than 500KB
- Convert them to WebP format with 85% quality
- Resize to max 2000x2000px (maintaining aspect ratio)
- Save optimized versions to `src/assets-optimized/`

## Manual Steps After Running Script

### 1. Review Optimized Images

Check the `src/assets-optimized/` folder and verify image quality is acceptable.

### 2. Replace Original Files

Once satisfied with quality:

```bash
# Backup originals (optional)
mkdir src/assets-backup
cp src/assets/*.{png,jpg,jpeg} src/assets-backup/

# Replace with optimized versions
cp src/assets-optimized/*.webp src/assets/
```

### 3. Update Image References

Update import statements to use `.webp` extensions:

**Before:**

```tsx
import heroImage from '@/assets/hero.jpeg';
```

**After:**

```tsx
import heroImage from '@/assets/hero.webp';
```

### 4. Test Locally

```bash
npm run dev
```

Verify all images load correctly and quality is acceptable.

### 5. Check Bundle Size

```bash
npm run build
```

Compare build output size before and after optimization.

## Asset Guidelines for Contributors

To maintain optimal performance:

| Asset Type        | Max Size | Recommended Format    | Notes                      |
| ----------------- | -------- | --------------------- | -------------------------- |
| Hero images       | 200KB    | WebP or optimized JPG | Compress before committing |
| Project previews  | 300KB    | WebP or optimized PNG | Use WebP for transparency  |
| Decorative assets | 150KB    | WebP, SVG preferred   | Use SVG for icons/logos    |
| Profile photos    | 100KB    | WebP or optimized JPG | Consider 2x for retina     |

## Optimization Tips

### For PNG with Transparency

```bash
# Use WebP with alpha channel
sharp input.png -o output.webp --webp-quality 85
```

### For JPG Photos

```bash
# Use progressive JPG or WebP
sharp input.jpg -o output.webp --webp-quality 85
```

### For Large Hero Images

```bash
# Create multiple sizes for responsive images
sharp hero.jpg -o hero-640.webp --webp-quality 85 --resize 640
sharp hero.jpg -o hero-1280.webp --webp-quality 85 --resize 1280
sharp hero.jpg -o hero-1920.webp --webp-quality 85 --resize 1920
```

## Troubleshooting

### Images Look Blurry

- Increase `WEBP_QUALITY` in `scripts/optimize-images.js` (try 90-95)
- Check original image resolution is high enough

### WebP Not Supported in Browser

- Modern browsers support WebP (95%+ global support)
- `ImageWithFallback` component provides PNG/JPG fallback
- Consider adding explicit fallback in `<picture>` element

### Script Fails to Run

```bash
# Ensure sharp is installed
npm install sharp --save-dev

# Check Node version (requires Node 14+)
node --version

# Run with verbose logging
node scripts/optimize-images.js 2>&1 | tee optimization.log
```

## Performance Targets

After optimization, aim for:

- ✅ Lighthouse Performance: 90+
- ✅ First Contentful Paint (FCP): <1.5s
- ✅ Largest Contentful Paint (LCP): <2.5s
- ✅ Total asset size: <5MB for entire site

## Further Reading

- [WebP vs PNG vs JPG](https://developers.google.com/speed/webp/docs/webp_study)
- [Image Optimization Guide](https://web.dev/fast/#optimize-your-images)
- [Sharp Documentation](https://sharp.pixelplumbing.com/)
