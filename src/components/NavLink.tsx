<div className="grid grid-cols-12 gap-4 items-end">
            {/* Col 1-3: Logo/Identity */}
            <div className="col-span-12 md:col-span-3 mb-8 md:mb-0">
              <motion.div
                {...ANIMATION_CONFIG}
                className="space-y-2"
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    className="w-2 h-2 rounded-full will-change-transform"
                    style={{ backgroundColor: 'var(--action-primary)' }}
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <span
                    className="text-xs tracking-[0.3em] uppercase"
                    style={{ color: 'color-mix(in srgb, var(--text-on-dark) 50%, transparent)' }}
                  >
                    Since 2025
                  </span>
                </div>
                <div className="text-4xl md:text-5xl tracking-tighter" style={{ color: 'var(--text-on-dark)' }}>
                  DESIGN SYSTEM
                </div>
              </motion.div>
            </div>

            {/* Col 4-9: Large navigation */}
            <nav
              className="col-span-12 md:col-span-6 border-l border-r"
              style={{ borderColor: 'var(--border-default)' }}
              aria-label="Primary navigation"
            >
              <div className="px-8 flex flex-col gap-2">
                {NAV_ITEMS.map((item, index) => (
                  <motion.button
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
                    onClick={handleNavClick(index, item.href)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className="text-left relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--action-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-inverse)] rounded"
                    aria-current={activeIndex === index ? 'page' : undefined}
                  >
                    <div className="flex items-baseline gap-6 py-1">
                      <motion.span
                        className="text-4xl md:text-5xl tracking-tighter will-change-transform will-change-opacity"
                        animate={{
                          color:
                            activeIndex === index
                              ? 'var(--action-primary)'
                              : 'color-mix(in srgb, var(--text-on-dark) 50%, transparent)',
                          x: activeIndex === index ? 10 : 0,
                          opacity: activeIndex === index ? 1 : 0.4,
                        }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                      >
                        {item.label}
                      </motion.span>
                    </div>
                    {activeIndex === index && (
                      <motion.div
                        layoutId="navUnderline"
                        className="absolute bottom-0 left-0 right-0 h-px will-change-transform"
                        style={{ backgroundColor: 'var(--action-primary)' }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </nav>

            {/* Col 10-12: Status & Contact */}
            <div className="col-span-12 md:col-span-3 flex flex-col gap-6 md:items-end">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex items-center gap-3"
              >
                <div
                  className="text-xs tracking-widest uppercase"
                  style={{ color: 'color-mix(in srgb, var(--text-on-dark) 50%, transparent)' }}
                >
                  Production Ready
                </div>
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-3 h-3 rounded-full will-change-transform"
                  style={{ backgroundColor: 'var(--state-success)' }}
                  aria-hidden="true"
                />
              </motion.div>

              <motion.a
                href="#overview"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(0, '#overview')(e as any);
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="text-xs tracking-[0.3em] uppercase px-8 py-4 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--action-primary)] rounded will-change-transform"
                style={{
                  color: 'var(--text-on-dark)',
                  borderColor: 'var(--action-primary)',
                  backgroundColor: 'transparent',
                }}
              >
                Get Started
              </motion.a>
            </div>
          </div>