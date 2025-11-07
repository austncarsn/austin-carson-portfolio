import React, { memo } from 'react';
import Section from './Section';

/**
 * Retro Pinball Hero
 * Bold colors, chrome effects, neon glows, arcade energy
 */

const PRINCIPLES = [
  'Tabs over spaces. Always.',
  'Commit messages are poetry.',
  'Dark mode is a lifestyle choice.',
  'Console.log is my therapist.',
] as const;

function HeroBase(): React.JSX.Element {
  return (
    <Section
      id="hero"
      bgClass="bg-canvas"
      labelNumber="01"
      labelTitle="HERO"
      labelDelay={0}
      ptClass="pt-18 px-4 sm:px-6 lg:px-16 xl:px-20 pb-16 sm:pb-20 lg:pb-24"
    >
      <div className="relative mx-auto max-w-[1200px]">
        {/* Pinball bumper lights - decorative orbs */}
        <div className="absolute -top-8 left-1/4 w-4 h-4 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 blur-[2px] animate-pulse" style={{ animationDuration: '2s' }} />
        <div className="absolute -top-4 right-1/3 w-3 h-3 rounded-full bg-gradient-to-br from-pink-400 to-red-500 blur-[2px] animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
        <div className="absolute top-12 -right-2 w-5 h-5 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 blur-[2px] animate-pulse" style={{ animationDuration: '3s', animationDelay: '1s' }} />

        <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,720px)_1fr]">
          {/* Main Pinball Card */}
          <div 
            className="relative rounded-3xl border-4 overflow-hidden"
            style={{
              borderColor: '#FFD700',
              background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
              boxShadow: `
                0 0 0 2px rgba(255, 215, 0, 0.3),
                0 0 20px rgba(255, 215, 0, 0.4),
                0 8px 32px rgba(0, 0, 0, 0.4),
                inset 0 1px 0 rgba(255, 255, 255, 0.1)
              `
            }}
          >
            {/* Chrome reflection strip */}
            <div 
              className="absolute top-0 left-0 right-0 h-2 opacity-60"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8) 30%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.8) 70%, transparent)'
              }}
            />

            {/* Neon grid pattern background */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0,255,255,0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,255,255,0.3) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px'
              }}
            />

            <div className="relative p-8 md:p-12">
              {/* Score-style badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border-2 border-yellow-400/50 bg-black/30 backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-bold text-yellow-300 tracking-wider">PLAYER 1</span>
              </div>

              {/* Chrome text effect name */}
              <h1 
                className="text-[clamp(48px,8vw,96px)] font-black tracking-tight leading-[.9] mb-4"
                style={{
                  background: 'linear-gradient(180deg, #fff 0%, #f0f0f0 40%, #d0d0d0 60%, #a0a0a0 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 2px 8px rgba(255,255,255,0.3), 0 0 40px rgba(255,255,255,0.2)',
                  filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))'
                }}
              >
                AUSTIN
                <br />
                CARSON
              </h1>

              {/* Neon subtitle */}
              <p 
                className="text-xl md:text-2xl font-bold mb-6 tracking-wide"
                style={{
                  color: '#00ffff',
                  textShadow: '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff, 0 0 40px #00ffff'
                }}
              >
                WEB • IMPLEMENTATION • INTERFACE
              </p>

              {/* Description with retro terminal feel */}
              <div className="space-y-3 text-[15px] leading-relaxed mb-8 text-cyan-100/90 max-w-[55ch]">
                <p className="font-mono">
                  &gt; Building fast, accessible websites with production-grade components and design tokens.
                </p>
                <p className="font-mono">
                  &gt; From Figma to deployed. Pixel-accurate pages, reusable UI, clean performance baselines.
                </p>
              </div>

              {/* Arcade-style buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#work"
                  className="group relative px-8 py-4 rounded-xl font-black text-lg tracking-wider overflow-hidden transition-all duration-200 hover:scale-105 active:scale-95"
                  style={{
                    background: 'linear-gradient(135deg, #ff0080 0%, #ff8c00 100%)',
                    boxShadow: `
                      0 0 20px rgba(255,0,128,0.5),
                      0 4px 0 #8b0045,
                      0 8px 16px rgba(0,0,0,0.4),
                      inset 0 1px 0 rgba(255,255,255,0.3)
                    `,
                    color: '#fff',
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                  }}
                >
                  <span className="relative z-10">START ▶</span>
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </a>

                <a
                  href="#contact"
                  className="px-6 py-4 rounded-xl font-bold text-base tracking-wide border-3 transition-all duration-200 hover:scale-105 active:scale-95"
                  style={{
                    borderColor: '#00ffff',
                    color: '#00ffff',
                    background: 'rgba(0,0,0,0.3)',
                    boxShadow: '0 0 15px rgba(0,255,255,0.3), inset 0 1px 0 rgba(0,255,255,0.2)',
                    textShadow: '0 0 8px #00ffff'
                  }}
                >
                  INSERT COIN
                </a>
              </div>

              {/* Score counter aesthetic */}
              <div className="mt-8 flex items-center gap-4 text-yellow-300 font-mono text-sm">
                <div className="flex items-center gap-2">
                  <span className="opacity-60">CREDITS:</span>
                  <span className="font-bold">∞</span>
                </div>
                <div className="w-px h-4 bg-yellow-300/30" />
                <div className="flex items-center gap-2">
                  <span className="opacity-60">HIGH SCORE:</span>
                  <span className="font-bold tabular-nums">999,999</span>
                </div>
              </div>
            </div>

            {/* Bottom chrome reflection */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-2 opacity-40"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6) 50%, transparent)'
              }}
            />
          </div>

          {/* Pinball Bumpers Sidebar */}
          <aside className="pt-2">
            <div 
              className="rounded-2xl border-4 overflow-hidden"
              style={{
                borderColor: '#ff00ff',
                background: 'linear-gradient(180deg, #1a1a2e 0%, #0f3460 100%)',
                boxShadow: `
                  0 0 0 2px rgba(255, 0, 255, 0.3),
                  0 0 20px rgba(255, 0, 255, 0.3),
                  0 8px 24px rgba(0, 0, 0, 0.4)
                `
              }}
            >
              <div className="p-1">
                {PRINCIPLES.map((principle, idx) => (
                  <div
                    key={principle}
                    className="group relative m-2 p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 cursor-default"
                    style={{
                      borderColor: idx % 2 === 0 ? '#ffff00' : '#ff00ff',
                      background: 'rgba(0,0,0,0.4)',
                      boxShadow: `
                        0 0 15px ${idx % 2 === 0 ? 'rgba(255,255,0,0.2)' : 'rgba(255,0,255,0.2)'},
                        inset 0 1px 0 rgba(255,255,255,0.1)
                      `
                    }}
                  >
                    {/* Bumper light indicator */}
                    <div 
                      className="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-pulse"
                      style={{
                        background: idx % 2 === 0 ? '#ffff00' : '#ff00ff',
                        boxShadow: `0 0 10px ${idx % 2 === 0 ? '#ffff00' : '#ff00ff'}`
                      }}
                    />
                    <p className="text-[15px] font-mono text-cyan-100 leading-relaxed">
                      {principle}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Retro arrow indicators */}
            <div className="mt-4 flex justify-center gap-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{
                    background: `hsl(${i * 72}, 100%, 50%)`,
                    boxShadow: `0 0 10px hsl(${i * 72}, 100%, 50%)`,
                    animationDelay: `${i * 0.2}s`
                  }}
                />
              ))}
            </div>
          </aside>
        </div>
      </div>
    </Section>
  );
}

const Hero = memo(HeroBase);
export default Hero;
