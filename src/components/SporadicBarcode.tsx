import { useMemo } from 'react';

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hash(str: string) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export type SporadicBarcodeProps = {
  width?: number; // viewBox width (virtual)
  height?: number; // pixel height of the band
  ink?: string; // bar color (uses CSS var by default)
  bg?: string; // background color under bars
  seed: string; // any string to vary pattern
  density?: number; // approx bars per 100px
  minBar?: number; // min bar width
  maxBar?: number; // max bar width
  minGap?: number; // min gap width
  maxGap?: number; // max gap width
  clusterChance?: number; // 0..1, chance to create a thick "band"
  className?: string;
};

export default function SporadicBarcode({
  width = 1200,
  height = 96,
  ink = 'var(--bar-ink)',
  bg = 'var(--bar-surface)',
  seed,
  density = 7,
  minBar = 2,
  maxBar = 8,
  minGap = 3,
  maxGap = 14,
  clusterChance = 0.2,
  className,
}: SporadicBarcodeProps) {
  const bars = useMemo(() => {
    const r = mulberry32(hash(seed));
    const out: { x: number; w: number }[] = [];
    let x = 0;

    const targetBars = Math.max(1, Math.round((width / 100) * density));

    while (x < width && out.length < targetBars + 200) {
      // cluster: occasionally create a thickish bar region
      const makeCluster = r() < clusterChance;
      const barW = makeCluster
        ? Math.round((maxBar + 6) * (0.7 + r() * 0.6)) // 6.. ~10
        : Math.round(minBar + r() * (maxBar - minBar));
      const gapW = Math.round(minGap + r() * (maxGap - minGap));

      out.push({ x, w: barW });
      x += barW + gapW;

      // sometimes add a micro doublet (two tight bars)
      if (r() < 0.18) {
        const microGap = 2 + Math.round(r() * 2); // 2..4
        const microBar = Math.max(minBar, Math.round((minBar + maxBar) / 2));
        out.push({ x: x + microGap, w: microBar });
        x += microGap + microBar;
      }
    }
    return out;
  }, [seed, width, density, minBar, maxBar, minGap, maxGap, clusterChance]);

  return (
    <svg
      className={className}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <rect x="0" y="0" width={width} height={height} fill={bg} />
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y="0" width={b.w} height={height} fill={ink} />
      ))}
    </svg>
  );
}
