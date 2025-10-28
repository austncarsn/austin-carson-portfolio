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
  "Someone will screenshot your message today; take it as a compliment."
];

/* ------------------- Helpers ------------------- */

function useRandomFortune() {
  const pick = () => FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
  return { pick };
}

/* ------------------- Sub‑components ------------------- */

const Label = ({ children }: { children: React.ReactNode }) => (
  <div className="font-satoshi tracking-[0.15em] text-[11px] text-white/70 uppercase mb-3">
    {children}
  </div>
);

const Hint = ({ children }: { children: React.ReactNode }) => (
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
  const prefersReducedMotion = usePrefersReducedMotion();
  const { pick } = useRandomFortune();

  const reveal = () => {
    setFortune(pick());
    setIsAnimating(true);
  };

  const onAnimationEnd = () => setIsAnimating(false);

  return (
    <div className="inline-block">
      <button
        type="button"
        className={`
          relative min-w-[280px] max-w-[400px]
          bg-black border-2 border-white/10 text-white
          px-6 py-4 text-left rounded-md
          ${prefersReducedMotion
            ? ''
            : 'transition-transform duration-200 ease-in-out hover:shadow-sm active:translate-x-2 active:translate-y-2'}
          hover:border-white/30
          focus-visible:outline-none
          focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/30
          ${isAnimating && !prefersReducedMotion ? 'animate-[shake_0.5s_ease-in-out]' : ''}
        `}
        aria-label="Reveal a fortune message"
        onClick={reveal}
        onAnimationEnd={onAnimationEnd}
      >
        <Label>Fortune</Label>
        <FortuneText text={fortune} />
        <Hint>Tap Again for Another.</Hint>
        <div className="pointer-events-none absolute bottom-4 right-6 h-2 w-8 rounded-[1px] bg-white/20" />
      </button>
    </div>
  );
});

export { FortuneBox };
   