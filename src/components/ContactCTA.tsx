import type { ReactElement } from 'react';
import { useEffect } from 'react';
import FadeInSection from './FadeInSection';
import Section from './Section';
import { Mail, Linkedin, Github } from 'lucide-react';

// Nature sound generator - respects reduced motion
const useNatureSounds = () => {
  useEffect(() => {
    let ctx: AudioContext | null = null;
    let comp: DynamicsCompressorNode | null = null;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const init = () => {
      if (ctx) return;
      ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      comp = ctx.createDynamicsCompressor();
      comp.threshold.value = -20;
      comp.knee.value = 24;
      comp.ratio.value = 6;
      comp.attack.value = 0.003;
      comp.release.value = 0.12;
      comp.connect(ctx.destination);
    };

    // Utilities
    const rng = (a: number, b: number) => a + Math.random() * (b - a);
    const env = (g: GainNode, t0: number, a: number, d: number, s = 0.0001) => {
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(a, t0 + 0.02);
      g.gain.exponentialRampToValueAtTime(s, t0 + d);
    };

    // 1) Leaf rustle: filtered noise bursts with slight bandpass sweep
    const playLeaf = (duration = 0.25, panPos = 0) => {
      if (prefersReduced || !ctx || !comp) return;
      init();
      if (!ctx || !comp) return;
      
      const t0 = ctx.currentTime;
      const noiseBuf = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
      const ch = noiseBuf.getChannelData(0);
      for (let i = 0; i < ch.length; i++) {
        ch[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / ch.length, 2.2);
      }
      const src = ctx.createBufferSource();
      src.buffer = noiseBuf;

      const bp = ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.setValueAtTime(rng(1200, 1800), t0);
      bp.Q.setValueAtTime(rng(1.2, 2.0), t0);
      const pan = ctx.createStereoPanner();
      pan.pan.value = panPos;

      const g = ctx.createGain();
      env(g, t0, rng(0.04, 0.06), duration); // Reduced from 0.12-0.18

      // gentle frequency sweep like foliage moving
      bp.frequency.exponentialRampToValueAtTime(bp.frequency.value * rng(0.6, 0.8), t0 + duration * 0.8);

      src.connect(bp);
      bp.connect(g);
      g.connect(pan);
      pan.connect(comp);
      src.start(t0);
      src.stop(t0 + duration + 0.02);
    };

    // 2) Bird chirp: quick upward sweep + tiny breath noise
    const playBird = (base = 440, duration = 0.22, panPos = 0) => {
      if (prefersReduced || !ctx || !comp) return;
      init();
      if (!ctx || !comp) return;
      
      const t0 = ctx.currentTime;

      // tone
      const o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.setValueAtTime(base * rng(0.95, 1.05), t0);
      o.frequency.exponentialRampToValueAtTime(base * rng(1.7, 2.1), t0 + duration * 0.18);
      o.frequency.exponentialRampToValueAtTime(base * rng(1.2, 1.35), t0 + duration * 0.8);

      const g = ctx.createGain();
      env(g, t0, 0.06, duration); // Reduced from 0.18
      const pan = ctx.createStereoPanner();
      pan.pan.value = panPos;

      // breathy attack
      const nBuf = ctx.createBuffer(1, ctx.sampleRate * 0.08, ctx.sampleRate);
      const n = ctx.createBufferSource();
      n.buffer = nBuf;
      const nc = nBuf.getChannelData(0);
      for (let i = 0; i < nc.length; i++) {
        nc[i] = (Math.random() * 2 - 1) * Math.exp(-i / (nc.length * 0.6));
      }
      const nf = ctx.createBiquadFilter();
      nf.type = 'highpass';
      nf.frequency.value = 2500;
      const ng = ctx.createGain();
      env(ng, t0, 0.03, 0.09); // Reduced from 0.08

      o.connect(g);
      g.connect(pan);
      pan.connect(comp);
      n.connect(nf);
      nf.connect(ng);
      ng.connect(pan);

      o.start(t0);
      o.stop(t0 + duration + 0.02);
      n.start(t0);
      n.stop(t0 + 0.12);
    };

    // 3) Water drop: sine "plop" with quick downward pitch and resonant bloom
    const playDrop = (base = 520, duration = 0.28, panPos = 0) => {
      if (prefersReduced || !ctx || !comp) return;
      init();
      if (!ctx || !comp) return;
      
      const t0 = ctx.currentTime;

      // main drop
      const o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.setValueAtTime(base, t0);
      o.frequency.exponentialRampToValueAtTime(base * 0.45, t0 + 0.10);

      const g = ctx.createGain();
      env(g, t0, 0.08, duration); // Reduced from 0.22
      const pan = ctx.createStereoPanner();
      pan.pan.value = panPos;

      // little resonant ripple (pinged bandpass)
      const pink = ctx.createBufferSource();
      const buf = ctx.createBuffer(1, ctx.sampleRate * 0.08, ctx.sampleRate);
      const cd = buf.getChannelData(0);
      for (let i = 0; i < cd.length; i++) {
        cd[i] = (Math.random() * 2 - 1) * Math.exp(-i / (cd.length * 0.9));
      }
      pink.buffer = buf;
      const bp = ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.setValueAtTime(rng(800, 1200), t0);
      bp.Q.value = 8;
      const pg = ctx.createGain();
      env(pg, t0, 0.04, 0.12); // Reduced from 0.10

      o.connect(g);
      g.connect(pan);
      pan.connect(comp);
      pink.connect(bp);
      bp.connect(pg);
      pg.connect(pan);

      o.start(t0);
      o.stop(t0 + duration + 0.02);
      pink.start(t0 + 0.03);
      pink.stop(t0 + 0.18);
    };

    const handleSound = (e: Event, index: number) => {
      if (prefersReduced) return;
      init();
      
      const target = e.currentTarget as HTMLElement;
      const base = parseFloat(target.dataset.note || '440');
      const panPos = [-0.25, 0, 0.25][index % 3];
      const type = (target.dataset.sound || 'leaf').toLowerCase();

      if (type === 'bird') return playBird(base, 0.22, panPos);
      if (type === 'drop') return playDrop(base, 0.28, panPos);
      return playLeaf(0.25, panPos);
    };

    const keys = document.querySelectorAll('.piano-key');
    const handlers = new Map<Element, (e: Event) => void>();
    
    keys.forEach((key, index) => {
      const trigger = (e: Event) => handleSound(e, index);
      handlers.set(key, trigger);
      key.addEventListener('mouseenter', trigger);
      key.addEventListener('focus', trigger);
      key.addEventListener('keydown', (e: Event) => {
        const kbd = e as KeyboardEvent;
        if (kbd.key === 'Enter' || kbd.key === ' ') trigger(e);
      });
    });

    return () => {
      keys.forEach((key) => {
        const trigger = handlers.get(key);
        if (trigger) {
          key.removeEventListener('mouseenter', trigger);
          key.removeEventListener('focus', trigger);
          key.removeEventListener('keydown', trigger);
        }
      });
    };
  }, []);
};

export default function ContactCTA(): ReactElement {
  useNatureSounds();

  return (
  <Section id="contact" bgClass="bg-canvas">
  <div className="grid grid-cols-1 items-start gap-12 sm:gap-16 md:gap-20 lg:grid-cols-2 lg:gap-24 xl:gap-28">
        {/* Left — Heading */}
        <FadeInSection delay={0} direction="right">
          <div className="space-y-6 sm:space-y-8">
            <h2 className="font-satoshi font-bold text-h3 sm:text-h2 md:text-display-lg lg:text-display-xl leading-none tracking-tighter text-text-primary">
              Let's build something together.
            </h2>
            <p className="font-satoshi font-normal text-base sm:text-body-lg leading-relaxed text-text-secondary max-w-[560px]">
              If you have a project, an idea, or just want to collaborate, reach out and say hello.
            </p>
            <div className="mt-3 sm:mt-4 h-[3px] w-12 sm:w-16 rounded-full bg-gradient-to-r from-brand to-accent" />
          </div>
        </FadeInSection>

        {/* Right — Piano Keys */}
        <FadeInSection delay={100} direction="left">
          <div className="mx-auto max-w-2xl space-y-4">
            {/* Email Key - G4 */}
            <a
              href="mailto:austncarsn@gmail.com"
              className="piano-key group relative grid grid-cols-[56px_1fr_auto] items-center gap-5 rounded-2xl bg-white px-6 py-5 transition-all duration-200 hover:-translate-y-[2px] active:translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
              style={{
                boxShadow: 'inset 0 -1px 0 rgba(255,255,255,0.9), inset 0 1px 0 rgba(0,0,0,0.03), inset 2px 0 0 rgba(255,255,255,0.4), inset -2px 0 0 rgba(0,0,0,0.08), 0 10px 25px rgba(0,0,0,0.15), 0 2px 5px rgba(0,0,0,0.08)',
                borderTop: '1px solid rgba(255,255,255,0.8)',
                borderLeft: '1px solid rgba(255,255,255,0.4)',
                borderRight: '1px solid rgba(0,0,0,0.1)',
                borderBottom: '2px solid rgba(0,0,0,0.2)',
              }}
              data-note="440"
              data-sound="leaf"
              data-label="Email"
              aria-label="Email Austin"
            >
              <div className="text-[#0F1720]/80 flex items-center justify-center">
                <Mail className="w-7 h-7 opacity-80" strokeWidth={1.5} />
              </div>

              <div className="min-w-0">
                <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#0F1720]/70">EMAIL</p>
                <p className="mt-1 text-[18px] leading-tight text-[#0F1720] font-medium truncate">austncarsn@gmail.com</p>
              </div>

              <div className="justify-self-end">
                <span 
                  className="inline-flex h-9 items-center rounded-full bg-white/90 px-3 text-[11px] font-semibold tracking-[0.14em] text-[#0B0D0F]/70"
                  style={{
                    boxShadow: 'inset 0 -1px 2px rgba(255,255,255,0.6), inset 0 6px 14px rgba(0,0,0,0.12), 0 6px 12px rgba(0,0,0,0.10)',
                  }}
                >
                  VIEW
                </span>
              </div>

              {/* Piano key edge highlight - enhanced 3D effect */}
              <span 
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[18px] rounded-b-2xl bg-gradient-to-b from-transparent via-black/4 to-black/12"
              />
              <span 
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-[2px] rounded-t-2xl bg-gradient-to-b from-white/60 to-transparent"
              />
            </a>

            {/* LinkedIn Key - A4 */}
            <a
              href="https://www.linkedin.com/in/austncarsn"
              target="_blank"
              rel="noopener noreferrer"
              className="piano-key group relative grid grid-cols-[56px_1fr_auto] items-center gap-5 rounded-2xl bg-white px-6 py-5 transition-all duration-200 hover:-translate-y-[2px] active:translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
              style={{
                boxShadow: 'inset 0 -1px 0 rgba(255,255,255,0.9), inset 0 1px 0 rgba(0,0,0,0.03), inset 2px 0 0 rgba(255,255,255,0.4), inset -2px 0 0 rgba(0,0,0,0.08), 0 10px 25px rgba(0,0,0,0.15), 0 2px 5px rgba(0,0,0,0.08)',
                borderTop: '1px solid rgba(255,255,255,0.8)',
                borderLeft: '1px solid rgba(255,255,255,0.4)',
                borderRight: '1px solid rgba(0,0,0,0.1)',
                borderBottom: '2px solid rgba(0,0,0,0.2)',
              }}
              data-note="528"
              data-sound="bird"
              data-label="LinkedIn"
            >
              <div className="text-[#0F1720]/80 flex items-center justify-center">
                <Linkedin className="w-7 h-7 opacity-80" strokeWidth={1.5} />
              </div>

              <div className="min-w-0">
                <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#0F1720]/70">LINKEDIN</p>
                <p className="mt-1 text-[18px] leading-tight text-[#0F1720] font-medium">View professional profile</p>
              </div>

              <div className="justify-self-end">
                <span 
                  className="inline-flex h-9 items-center rounded-full bg-white/90 px-3 text-[11px] font-semibold tracking-[0.14em] text-[#0B0D0F]/70"
                  style={{
                    boxShadow: 'inset 0 -1px 2px rgba(255,255,255,0.6), inset 0 6px 14px rgba(0,0,0,0.12), 0 6px 12px rgba(0,0,0,0.10)',
                  }}
                >
                  VIEW
                </span>
              </div>

              <span 
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[18px] rounded-b-2xl bg-gradient-to-b from-transparent via-black/4 to-black/12"
              />
              <span 
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-[2px] rounded-t-2xl bg-gradient-to-b from-white/60 to-transparent"
              />
            </a>

            {/* GitHub Key - B4 */}
            <a
              href="https://github.com/austncarsn"
              target="_blank"
              rel="noopener noreferrer"
              className="piano-key group relative grid grid-cols-[56px_1fr_auto] items-center gap-5 rounded-2xl bg-white px-6 py-5 transition-all duration-200 hover:-translate-y-[2px] active:translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
              style={{
                boxShadow: 'inset 0 -1px 0 rgba(255,255,255,0.9), inset 0 1px 0 rgba(0,0,0,0.03), inset 2px 0 0 rgba(255,255,255,0.4), inset -2px 0 0 rgba(0,0,0,0.08), 0 10px 25px rgba(0,0,0,0.15), 0 2px 5px rgba(0,0,0,0.08)',
                borderTop: '1px solid rgba(255,255,255,0.8)',
                borderLeft: '1px solid rgba(255,255,255,0.4)',
                borderRight: '1px solid rgba(0,0,0,0.1)',
                borderBottom: '2px solid rgba(0,0,0,0.2)',
              }}
              data-note="594"
              data-sound="drop"
              data-label="GitHub"
            >
              <div className="text-[#0F1720]/80 flex items-center justify-center">
                <Github className="w-7 h-7 opacity-80" strokeWidth={1.5} />
              </div>

              <div className="min-w-0">
                <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#0F1720]/70">GITHUB</p>
                <p className="mt-1 text-[18px] leading-tight text-[#0F1720] font-medium">Browse code repositories</p>
              </div>

              <div className="justify-self-end">
                <span 
                  className="inline-flex h-9 items-center rounded-full bg-white/90 px-3 text-[11px] font-semibold tracking-[0.14em] text-[#0B0D0F]/70"
                  style={{
                    boxShadow: 'inset 0 -1px 2px rgba(255,255,255,0.6), inset 0 6px 14px rgba(0,0,0,0.12), 0 6px 12px rgba(0,0,0,0.10)',
                  }}
                >
                  VIEW
                </span>
              </div>

              <span 
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[18px] rounded-b-2xl bg-gradient-to-b from-transparent via-black/4 to-black/12"
              />
              <span 
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-[2px] rounded-t-2xl bg-gradient-to-b from-white/60 to-transparent"
              />
            </a>
          </div>
        </FadeInSection>
      </div>
    </Section>
  );
}
