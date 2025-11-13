import { motion } from "motion/react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { Mail, Phone, MapPin, Linkedin, Github, Instagram, ArrowRight, type LucideIcon } from "lucide-react";
import { memo, useMemo, useCallback, useState } from "react";
import type { ReactElement } from "react";

type Contact2Props = {
  directEmail: string;
  phone?: string;
  office?: { lines: string[] };
  socials?: { label: string; href: string }[];
};

type ContactMethod = {
  icon: LucideIcon;
  label: string;
  value: string;
  description: string;
};

type ContactMethod3DProps = {
  method: ContactMethod;
  index: number;
  isActive: boolean;
  onClick: () => void;
};

const ContactMethod3D = memo(({ method, index, isActive, onClick }: ContactMethod3DProps) => {
  const reduce = usePrefersReducedMotion();
  return (
  <motion.div
    onClick={onClick}
    initial={reduce ? undefined : { opacity: 0, y: 30 }}
    whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
    transition={reduce ? undefined : { delay: index * 0.15, duration: 0.6 }}
    viewport={{ once: true }}
    whileHover={reduce ? undefined : {
      y: -8,
      transition: { duration: 0.3 }
    }}
    className="cursor-pointer relative group rounded-2xl md:rounded-3xl shadow-lg"
    style={{
      transformStyle: 'preserve-3d',
      perspective: '1000px'
    }}
  >
    <div 
      className="p-6 md:p-8 rounded-2xl md:rounded-3xl transition-all duration-500"
      style={{ 
        backgroundColor: isActive ? 'var(--accent)' : 'white',
        boxShadow: isActive 
          ? '0 20px 40px rgba(255, 66, 0, 0.2)' 
          : '0 10px 30px rgba(0, 0, 0, 0.08)'
      }}
    >
      <div className="flex items-start justify-between mb-4 md:mb-6">
        <div 
          className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-300"
          style={{ 
            backgroundColor: isActive ? 'rgba(255, 255, 255, 0.2)' : 'var(--bg)'
          }}
        >
          <method.icon 
            size={24} 
            className="md:w-7 md:h-7"
            style={{ color: isActive ? 'white' : 'var(--accent)' }}
          />
        </div>
        <ArrowRight 
          size={20} 
          className="md:w-6 md:h-6 transition-transform duration-300 group-hover:translate-x-2"
          style={{ color: isActive ? 'white' : 'var(--accent)' }}
        />
      </div>
      <div 
        className="text-[10px] md:text-xs tracking-[0.25em] md:tracking-[0.3em] uppercase mb-2 md:mb-3"
        style={{ 
          color: isActive ? 'white' : 'var(--ink)',
          opacity: 0.7
        }}
      >
        {method.label}
      </div>
      <div 
        className="text-xl md:text-2xl mb-1 md:mb-2 break-all"
        style={{ color: isActive ? 'white' : 'var(--ink)' }}
      >
        {method.value}
      </div>
      <div 
        className="text-sm"
        style={{ 
          color: isActive ? 'white' : 'var(--ink)',
          opacity: 0.6
        }}
      >
        {method.description}
      </div>
    </div>
  </motion.div>
  );
});

ContactMethod3D.displayName = 'ContactMethod3D';

export function Contact2({
  directEmail,
  phone = "",
  socials = [],
}: Contact2Props): ReactElement {
  const [activeMethod, setActiveMethod] = useState<number>(0);
  const [formStep, setFormStep] = useState(1);

  const contactMethods = useMemo(() => [
    {
      icon: Mail,
      label: 'Email',
      value: directEmail,
      description: 'Best for detailed inquiries'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: phone || 'Available upon request',
      description: 'Quick questions and support'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Seattle, WA',
      description: 'Remote & on-site available'
    }
  ], [directEmail, phone]);

  const socialIcons = useMemo(() => ({
    'LinkedIn': Linkedin,
    'GitHub': Github,
    'Instagram': Instagram,
  }), []);

  const handleMethodClick = useCallback((index: number) => {
    setActiveMethod(index);
  }, []);

  const nextStep = useCallback(() => {
    setFormStep(prev => Math.min(prev + 1, 3));
  }, []);

  return (
    <section 
      className="relative min-h-screen px-4 md:px-8 lg:px-20 py-16 md:py-24 lg:py-32"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      <div className="relative z-10 max-w-[1800px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-20"
        >
          <div className="flex items-center justify-center gap-3 md:gap-4 mb-6">
            <div 
              className="w-12 md:w-16 h-[1px]"
              style={{ backgroundColor: 'var(--accent)' }}
            />
            <span 
              className="text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] uppercase font-medium"
              style={{ color: 'var(--muted)' }}
            >
              Get In Touch
            </span>
            <div 
              className="w-12 md:w-16 h-[1px]"
              style={{ backgroundColor: 'var(--accent)' }}
            />
          </div>
          <h2 
            className="text-6xl md:text-8xl lg:text-9xl tracking-[-0.02em]"
            style={{ color: 'var(--ink)', fontWeight: 600 }}
          >
            Let's Talk
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {/* Left - Contact Methods */}
          <div className="space-y-4 md:space-y-6">
            {contactMethods.map((method, i) => (
              <ContactMethod3D
                key={i}
                method={method}
                index={i}
                isActive={activeMethod === i}
                onClick={() => handleMethodClick(i)}
              />
            ))}

            {/* Social Links */}
            {socials.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
                className="p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-lg"
                style={{ backgroundColor: 'white' }}
              >
                <div 
                  className="text-[10px] md:text-xs tracking-[0.25em] md:tracking-[0.3em] uppercase mb-4 md:mb-6"
                  style={{ color: 'var(--ink)', opacity: 0.6 }}
                >
                  Follow Me
                </div>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {socials.map((social, i) => {
                    const IconComponent = socialIcons[social.label as keyof typeof socialIcons];
                    return (
                      <motion.a
                        key={i}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 + i * 0.05 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05, y: -3 }}
                        className="flex items-center gap-2 md:gap-3 p-3 md:p-4 rounded-xl md:rounded-2xl transition-all duration-300"
                        style={{ backgroundColor: 'rgba(39, 37, 31, 0.04)' }}
                      >
                        {IconComponent && (
                          <IconComponent size={18} className="md:w-5 md:h-5" style={{ color: 'var(--accent)' }} />
                        )}
                        <span 
                          className="text-xs md:text-sm"
                          style={{ color: 'var(--ink)' }}
                        >
                          {social.label}
                        </span>
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right - Multi-step form */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1]
            }}
            viewport={{ once: true }}
            className="p-6 md:p-10 lg:p-12 rounded-2xl md:rounded-3xl"
            style={{ 
              backgroundColor: 'white',
              boxShadow: '0 30px 60px rgba(0, 0, 0, 0.12), 0 10px 20px rgba(0, 0, 0, 0.08)'
            }}
          >
            {/* Step indicator */}
            <div className="flex items-center justify-between mb-8 md:mb-12">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center gap-2 md:gap-3">
                  <motion.div 
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-500"
                    animate={{
                      backgroundColor: formStep >= step ? 'var(--accent)' : 'transparent',
                      scale: formStep === step ? [1, 1.1, 1] : 1
                    }}
                    transition={{
                      scale: {
                        duration: 0.6,
                        repeat: formStep === step ? Infinity : 0,
                        repeatDelay: 1
                      }
                    }}
                    style={{ 
                      border: `2px solid ${formStep >= step ? 'var(--accent)' : 'rgba(39, 37, 31, 0.2)'}`
                    }}
                  >
                    <span 
                      className="text-xs md:text-sm"
                      style={{ color: formStep >= step ? 'white' : 'var(--ink)' }}
                    >
                      {step}
                    </span>
                  </motion.div>
                  {step < 3 && (
                    <motion.div 
                      className="w-8 md:w-12 h-px"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: formStep > step ? 1 : 0 }}
                      transition={{ duration: 0.5 }}
                      style={{ 
                        backgroundColor: 'var(--accent)',
                        transformOrigin: 'left'
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            <form className="space-y-6 md:space-y-8">
              {formStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-4 md:space-y-6"
                >
                  <div>
                    <label 
                      className="text-[10px] md:text-xs tracking-[0.25em] md:tracking-[0.3em] uppercase block mb-2 md:mb-3"
                      style={{ color: 'var(--ink)', opacity: 0.6 }}
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-transparent border-b-2 pb-3 md:pb-4 text-lg md:text-xl outline-none transition-all duration-300 focus:border-accent rounded-lg px-2"
                      style={{ 
                        borderColor: 'rgba(39, 37, 31, 0.2)',
                        color: 'var(--ink)'
                      }}
                    />
                  </div>
                  <div>
                    <label 
                      className="text-[10px] md:text-xs tracking-[0.25em] md:tracking-[0.3em] uppercase block mb-2 md:mb-3"
                      style={{ color: 'var(--ink)', opacity: 0.6 }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full bg-transparent border-b-2 pb-3 md:pb-4 text-lg md:text-xl outline-none transition-all duration-300 focus:border-accent rounded-lg px-2"
                      style={{ 
                        borderColor: 'rgba(39, 37, 31, 0.2)',
                        color: 'var(--ink)'
                      }}
                    />
                  </div>
                </motion.div>
              )}

              {formStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-4 md:space-y-6"
                >
                  <div>
                    <label 
                      className="text-[10px] md:text-xs tracking-[0.25em] md:tracking-[0.3em] uppercase block mb-2 md:mb-3"
                      style={{ color: 'var(--ink)', opacity: 0.6 }}
                    >
                      Project Type
                    </label>
                    <select
                      className="w-full bg-transparent border-b-2 pb-3 md:pb-4 text-lg md:text-xl outline-none transition-all duration-300 focus:border-accent rounded-lg px-2"
                      style={{ 
                        borderColor: 'rgba(39, 37, 31, 0.2)',
                        color: 'var(--ink)'
                      }}
                    >
                      <option>Web Design</option>
                      <option>Mobile App</option>
                      <option>AI/ML Project</option>
                      <option>Full-Stack Development</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label 
                      className="text-[10px] md:text-xs tracking-[0.25em] md:tracking-[0.3em] uppercase block mb-2 md:mb-3"
                      style={{ color: 'var(--ink)', opacity: 0.6 }}
                    >
                      Budget Range
                    </label>
                    <select
                      className="w-full bg-transparent border-b-2 pb-3 md:pb-4 text-lg md:text-xl outline-none transition-all duration-300 focus:border-accent rounded-lg px-2"
                      style={{ 
                        borderColor: 'rgba(39, 37, 31, 0.2)',
                        color: 'var(--ink)'
                      }}
                    >
                      <option>$5k - $10k</option>
                      <option>$10k - $25k</option>
                      <option>$25k - $50k</option>
                      <option>$50k+</option>
                    </select>
                  </div>
                </motion.div>
              )}

              {formStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div>
                    <label 
                      className="text-[10px] md:text-xs tracking-[0.25em] md:tracking-[0.3em] uppercase block mb-2 md:mb-3"
                      style={{ color: 'var(--ink)', opacity: 0.6 }}
                    >
                      Project Details
                    </label>
                    <textarea
                      rows={6}
                      className="w-full border-2 p-4 outline-none resize-none transition-all duration-300 focus:border-accent rounded-2xl"
                      style={{ 
                        borderColor: 'rgba(39, 37, 31, 0.2)',
                        color: 'var(--ink)',
                        backgroundColor: 'rgba(39, 37, 31, 0.02)'
                      }}
                      placeholder="Tell us about your project..."
                    />
                  </div>
                </motion.div>
              )}

              <div className="flex gap-3 md:gap-4">
                {formStep > 1 && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setFormStep(prev => prev - 1)}
                    className="flex-1 py-3 md:py-4 text-xs md:text-sm tracking-[0.25em] md:tracking-[0.3em] uppercase border-2 rounded-2xl transition-all duration-300 flex items-center justify-center"
                    style={{ 
                      borderColor: 'rgba(39, 37, 31, 0.2)',
                      color: 'var(--ink)'
                    }}
                  >
                    Back
                  </motion.button>
                )}
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={formStep < 3 ? nextStep : undefined}
                  className="flex-1 py-3 md:py-4 text-xs md:text-sm tracking-[0.25em] md:tracking-[0.3em] uppercase rounded-2xl transition-all duration-300 flex items-center justify-center"
                  style={{ 
                    backgroundColor: 'var(--accent)',
                    color: 'white',
                    boxShadow: '0 10px 25px rgba(255, 66, 0, 0.3)'
                  }}
                >
                  {formStep < 3 ? 'Next' : 'Submit'}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
