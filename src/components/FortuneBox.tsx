import type { ReactElement } from 'react';
import { memo, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/* ------------------- Data ------------------- */

const FORTUNES = [
  "You'll stumble on purpose and call it character development.",
  "A pigeon will look at you like it pays your rent. Challenge it.",
  "Your snack will outshine your coping strategies.",
  "Someone nearby is working hard to look busy. Respect the craft.",
  "The Wi‑Fi will stall exactly when you need it most.",
  "Tomorrow, you'll be kinder to yourself.",
  "Your coffee understands you. Cherish it.",
  "You will wave at someone by accident; they'll be waving behind you. Smile and move on.",
  "Destiny saw your message and replied 'lol.'",
  "You are someone else's plot twist. They aren't ready.",
  "Your charger cable survives purely out of spite.",
  "You will meet someone whose energy matches yours. Enjoy the moment.",
  "You will laugh during a serious moment. The correct reaction.",
  "Your houseplant knows your secrets. Keep watering it.",
  "You'll typo something and accidentally sound intellectual. Keep it going.",
  "Someone will mispronounce your name. Enjoy your new alias.",
  "Your playlist shuffle may surprise you.",
  "A tiny inconvenience will carry a week's worth of stories.",
  "You will invent a new walk today. Others will stare — take the spotlight.",
  "Autocorrect will make bold creative choices today.",
  "Your socks and the dryer have an ongoing disagreement.",
  "A mystery crumb lives inside your keyboard now. Do not disturb it.",
  "You will zone out during the most important sentence. Perfect timing.",
  "Your browser history will remain safely private.",
  "An unexpected conversation will spark a new connection.",
  "You'll relate to a meme from 2012. Time is a circle.",
  "The group chat will combust into drama just as you leave. Ideal timing.",
  "Your 'five minutes' will become an epic saga. Vintage you.",
  "A cat will appear where a cat should not be. Adopt curiosity.",
  "You'll get a delayed joke and laugh alone; it's worth it.",
  "Your parallel parking will astonish a passerby.",
  "A package you didn't order will arrive. Surprise!",
  "You'll remember something awkward from years ago and shrug.",
  "Your screen time numbers will be creatively interpreted.",
  "Someone will ask how you are; answer with kindness.",
  "You will save a file as 'final_FINAL_v4'. It'll be fine.",
  "A bird will pause and look thoughtful. Tomorrow keeps mysteries.",
  "Your aesthetic will evolve after a bold purchase.",
  "You will send a message and the typing dots will keep you curious.",
  "Someone will say 'We should hang out' and it will nudge you to follow up.",
  "Your to-do list becomes wall art.",
  "Someone will wave; you'll wave back; confidence rewarded.",
  "You will mispronounce a word with full confidence. It's charming.",
  "Your horoscope and this message were both chaotic and delightful.",
  "Your main character moment will have an audience of one. It's still yours.",
  "You will find $1.37. Celebrate the small wins.",
  "Someone will screenshot your message today; take it as a compliment.",
  "Your potential is greater than any obstacle in your path.",
  "Every small step forward is building something remarkable.",
  "You have the strength to turn challenges into opportunities.",
  "Your unique perspective is exactly what the world needs.",
  "Progress isn't always visible, but it's always happening.",
  "You're capable of more than you give yourself credit for.",
  "The work you do today will matter more than you realize.",
  "Your creativity and resilience will open unexpected doors.",
  "Growth happens in moments when you choose not to give up.",
  "You're exactly where you need to be on your journey.",
  "Your ideas have value. Share them boldly.",
  "The courage to start is already within you.",
  "Your persistence will pay off in ways you can't yet imagine.",
  "You bring light to spaces that need it most.",
  "Tomorrow holds possibilities today hasn't revealed yet.",
  "Your efforts are planting seeds for future success.",
  "You have everything you need to take the next step.",
  "The path forward becomes clearer with each brave decision.",
  "Your growth inspires others more than you know.",
  "You're building a life worth being proud of."
];

/* ------------------- Helpers ------------------- */

function useRandomFortune() {
  const [lastIndex, setLastIndex] = useState<number | null>(null);
  
  const pick = () => {
    let newIndex: number;
    
    // Ensure we don't repeat the same fortune twice in a row
    do {
      newIndex = Math.floor(Math.random() * FORTUNES.length);
    } while (newIndex === lastIndex && FORTUNES.length > 1);
    
    setLastIndex(newIndex);
    return FORTUNES[newIndex];
  };
  
  return { pick };
}

/* ------------------- Sub‑components ------------------- */
/* Commented out unused components - can be re-enabled if needed
const Label = ({ children }: { children: ReactNode }) => (
  <div className="font-satoshi tracking-[0.15em] text-[11px] text-white/70 uppercase mb-3">
    {children}
  </div>
);

const Hint = ({ children }: { children: ReactNode }) => (
  <div className="font-satoshi text-xs text-white/60">{children}</div>
);

const FortuneText = ({ text }: { text: string }) => (
  <p
    className="font-satoshi text-sm text-white leading-relaxed mb-3 min-h-[60px] flex items-center"
    aria-live="polite"
  >
    {text}
  </p>
);

/* ------------------- Main component ------------------- */

const FortuneBox = memo(function FortuneBox(): ReactElement {
  const [fortune, setFortune] = useState('Click to Reveal');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { pick } = useRandomFortune();

  const reveal = () => {
    if (prefersReducedMotion) {
      setFortune(pick());
      setIsAnimating(true);
    } else {
      // Fade out with scale
      setIsFading(true);
      setTimeout(() => {
        setFortune(pick());
        setIsFading(false);
        setIsAnimating(true);
      }, 300);
    }
  };

  const onAnimationEnd = () => setIsAnimating(false);

  return (
    <div className="inline-block mx-auto w-[640px] max-w-[92vw]">
      <button
        type="button"
        className="group relative w-full rounded-2xl overflow-hidden transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-900/50 ring-offset-[var(--canvas,oklch(91%_0.01_68))]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Reveal a fortune message"
        onClick={reveal}
        onAnimationEnd={onAnimationEnd}
        style={{
          transform: isHovered && !prefersReducedMotion ? 'scale(1.01)' : 'scale(1)',
        }}
      >
        {/* Holographic shimmer background */}
        <div 
          className="absolute inset-0 opacity-60"
          style={{
            background: `
              linear-gradient(135deg, 
                rgba(139, 92, 246, 0.15) 0%, 
                rgba(236, 72, 153, 0.12) 25%,
                rgba(59, 130, 246, 0.15) 50%,
                rgba(236, 72, 153, 0.12) 75%,
                rgba(139, 92, 246, 0.15) 100%)
            `,
            backgroundSize: '400% 400%',
            animation: !prefersReducedMotion ? 'shimmer 8s ease-in-out infinite' : 'none',
          }}
        />

        {/* Floating particles overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.4) 1px, transparent 1px),
              radial-gradient(circle at 60% 70%, rgba(236, 72, 153, 0.4) 1px, transparent 1px),
              radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.4) 1px, transparent 1px),
              radial-gradient(circle at 40% 80%, rgba(167, 139, 250, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px, 100px 100px, 60px 60px, 90px 90px',
            backgroundPosition: '0 0, 40px 40px, 80px 0, 20px 60px',
            animation: !prefersReducedMotion ? 'float-particles 20s linear infinite' : 'none',
          }}
        />

        {/* Glass frosted layer */}
        <div 
          className="absolute inset-0 backdrop-blur-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 100%)',
            boxShadow: `
              inset 0 1px 0 rgba(255, 255, 255, 0.2),
              inset 0 -1px 0 rgba(0, 0, 0, 0.1)
            `,
          }}
        />

        {/* Border glow */}
        <div 
          className="absolute inset-0 rounded-2xl transition-opacity duration-300"
          style={{
            boxShadow: `
              0 0 0 1px rgba(255, 255, 255, 0.15),
              0 8px 32px rgba(139, 92, 246, ${isHovered ? '0.25' : '0.15'}),
              0 0 80px rgba(236, 72, 153, ${isHovered ? '0.2' : '0.1'})
            `,
          }}
        />

        {/* Content */}
        <div className="relative px-8 py-7 text-left">
          <div 
            className="text-[11px] tracking-[0.2em] uppercase font-semibold transition-colors duration-300"
            style={{
              color: isHovered ? 'rgba(167, 139, 250, 0.9)' : 'rgba(139, 92, 246, 0.7)',
              textShadow: isHovered ? '0 0 8px rgba(167, 139, 250, 0.5)' : 'none',
            }}
          >
            ✦ Fortune
          </div>
          
          <div 
            className={`
              mt-3 text-[24px] leading-tight font-semibold
              transition-all duration-300
              ${isFading ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}
              ${isAnimating && !prefersReducedMotion ? 'animate-[gentle-rise_0.6s_ease-out]' : ''}
            `}
            style={{
              background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: isHovered ? 'brightness(1.15)' : 'brightness(1)',
            }}
          >
            <span className="flex items-center min-h-[60px]">{fortune}</span>
          </div>
          
          <p 
            className="mt-6 text-sm transition-colors duration-300"
            style={{
              color: isHovered ? 'rgba(236, 72, 153, 0.8)' : 'rgba(167, 139, 250, 0.6)',
            }}
          >
            Tap for Another ✨
          </p>
        </div>
      </button>
    </div>
  );
});

export { FortuneBox };
   