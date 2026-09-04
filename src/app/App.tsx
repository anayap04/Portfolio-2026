import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useReducedMotion } from './hooks/useReducedMotion';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { t, i18n } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

  // Set dark theme on mount
  useEffect(() => {
    document.documentElement.classList.add('dark');
    const delay = prefersReducedMotion ? 0 : 1000;
    setTimeout(() => setIsLoading(false), delay);
  }, [prefersReducedMotion]);

  // Sync <html lang> attribute with i18n language
  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: 'var(--dark-bg)' }}
            role="status"
            aria-live="polite"
          >
            <span className="sr-only">{t('a11y.loading')}</span>
            <motion.div
              className="flex items-center gap-3"
              initial={prefersReducedMotion ? undefined : { scale: 0.8, opacity: 0 }}
              animate={prefersReducedMotion ? undefined : { scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {[
                { color: 'var(--hot-pink)', delay: 0 },
                { color: 'var(--purple)', delay: 0.2 },
                { color: 'var(--cyan)', delay: 0.4 },
              ].map(({ color, delay }) => (
                <motion.div
                  key={color}
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: color }}
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : {
                          scale: [1, 1.5, 1],
                          opacity: [1, 0.5, 1],
                        }
                  }
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip to content link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm"
        style={{ backgroundColor: 'var(--cyan)', color: 'var(--dark-bg)' }}
      >
        {t('a11y.skipToContent')}
      </a>

      <div className="min-h-screen">
        {/* Language Switcher - Fixed position */}
        <div className="fixed top-6 right-6 z-50">
          <LanguageSwitcher />
        </div>

        {/* Main Content */}
        <motion.main
          id="main-content"
          initial={prefersReducedMotion ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Contact />
        </motion.main>
      </div>
    </>
  );
}