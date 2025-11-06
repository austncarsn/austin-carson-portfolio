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
  const [isBlurred, setIsBlurred] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { pick } = useRandomFortune();

  const reveal = () => {
    if (prefersReducedMotion) {
      setFortune(pick());
      setIsAnimating(true);
    } else {
      // Blur out
      setIsBlurred(true);
      setTimeout(() => {
        setFortune(pick());
        setIsBlurred(false);
        setIsAnimating(true);
      }, 400);
    }
  };

  const onAnimationEnd = () => setIsAnimating(false);

  return (
    <div className="inline-block mx-auto w-[640px] max-w-[92vw]">
      <button
        type="button"
        className={`
          w-full rounded-xl ring-1 ring-white/8 backdrop-blur-sm
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-[#18A56C]/40
          ${!prefersReducedMotion ? 'hover:ring-white/12' : ''}
          ${isAnimating && !prefersReducedMotion ? 'animate-[gentle-settle_0.8s_ease-out]' : ''}
        `}
        style={{
          background: 'rgba(18,19,20,0.72)',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.03), 0 6px 24px rgba(0,0,0,0.45)',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Reveal a fortune message"
        onClick={reveal}
        onAnimationEnd={onAnimationEnd}
      >
        <div className="px-8 py-7 text-left">
          <div className="text-[11px] tracking-[0.18em] text-white/55 uppercase">Fortune</div>
          
          <div 
            className={`
              mt-3 text-[24px] leading-tight font-medium 
              transition-all duration-500
              ${isBlurred ? 'blur-md opacity-70' : 'blur-0 opacity-100'}
            `}
            style={{ color: isHovered ? '#18A56C' : '#1FB97A' }}
          >
            <span className="flex items-center min-h-[60px]">{fortune}</span>
          </div>
          
          <p className="mt-6 text-white/55 text-sm">Tap Again for Another.</p>
        </div>
      </button>
    </div>
  );
});

export { FortuneBox };
   