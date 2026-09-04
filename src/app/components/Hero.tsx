import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { SOCIAL_LINKS } from '../constants/social-links';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export function Hero() {
  const { t } = useTranslation();
  
  return (
    <section 
      className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden"
      aria-label={t('a11y.heroSection') || 'Hero section'}
    >
      {/* Animated background gradient - decorative, hidden from screen readers */}
      <div className="absolute inset-0 opacity-30" aria-hidden="true">
        <motion.div
          className="absolute top-1/4 -left-20 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'var(--hot-pink)' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'var(--cyan)' }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
            x: [0, -50, 0],
            y: [0, -30, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'var(--purple)' }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <motion.div 
        className="max-w-4xl mx-auto text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Memoji Avatar */}
        <motion.div
          variants={itemVariants}
          className="mb-8 flex justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <motion.div
              className="absolute inset-0 rounded-full blur-2xl opacity-50"
              style={{ background: 'linear-gradient(135deg, var(--hot-pink), var(--purple), var(--cyan))' }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <ImageWithFallback
              src="/profile.png"
              alt="Alex Rivera Memoji"
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 relative z-10"
              style={{ borderColor: 'var(--cyan)' }}
            />
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-2 mb-4"
        >
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="w-6 h-6" style={{ color: 'var(--cyan)' }} />
          </motion.div>
          <span className="text-muted-foreground">{t('hero.greeting')}</span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-2"
        >
          <motion.span
            style={{ 
              background: `linear-gradient(135deg, var(--hot-pink), var(--purple), var(--cyan))`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              backgroundSize: '200% 200%'
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {t('hero.name')}
          </motion.span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-muted-foreground mb-6 font-code text-sm"
        >
          {t('hero.pronouns')}
        </motion.p>

        <motion.div variants={itemVariants}>
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl mb-4" 
            style={{ color: 'var(--periwinkle)' }}
          >
            {t('hero.title').split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 1 + index * 0.03
                }}
                style={{ display: 'inline-block' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.h2>
          <p className="text-lg text-muted-foreground mb-2 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
          <p className="text-sm text-muted-foreground mb-8 font-code">
            📍 {t('hero.location')}
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
        >
          <motion.a
            href="#projects"
            className="flex items-center gap-2 px-6 py-3 rounded-lg transition-all"
            style={{ backgroundColor: 'var(--cyan)', color: 'var(--dark-bg)' }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 30px rgba(76, 201, 240, 0.5)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            {t('hero.cta')}
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.a>
          <motion.a
            href="#contact"
            className="flex items-center gap-2 px-6 py-3 rounded-lg border transition-all hover:bg-accent"
            style={{ borderColor: 'var(--cyan)' }}
            whileHover={{ 
              scale: 1.05,
              borderColor: 'var(--hot-pink)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            {t('hero.contact')}
            <Mail className="w-5 h-5" />
          </motion.a>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-4"
        >
          {SOCIAL_LINKS.map((social, index) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.isExternal ? '_blank' : undefined}
                rel={social.isExternal ? 'noopener noreferrer' : undefined}
                className="p-3 rounded-lg bg-card hover:bg-accent transition-colors border border-border"
                aria-label={social.label}
                whileHover={{ 
                  scale: 1.1, 
                  y: -5,
                  borderColor: social.color
                }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 + index * 0.1 }}
              >
                <Icon className="w-6 h-6" />
              </motion.a>
            );
          })}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          aria-hidden="true"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 rounded-full flex items-start justify-center p-2"
            style={{ borderColor: 'var(--cyan)' }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: 'var(--cyan)' }}
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}