import { motion, useInView } from 'motion/react';
import { Mail, MapPin } from 'lucide-react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { SOCIAL_LINKS } from '../constants/social-links';

export function Contact() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="contact" className="py-20 px-4 bg-card/30" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Mail className="w-8 h-8" style={{ color: 'var(--hot-pink)' }} />
            </motion.div>
            <h2 className="text-4xl md:text-5xl">{t('contact.title')}</h2>
          </div>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {t('contact.subtitle')}
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <motion.div 
              className="p-6 rounded-lg bg-card border border-border"
              whileHover={{ 
                scale: 1.02,
                borderColor: 'var(--cyan)',
                boxShadow: '0 0 30px rgba(76, 201, 240, 0.2)'
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                >
                  <Mail className="w-6 h-6" style={{ color: 'var(--cyan)' }} />
                </motion.div>
                <h3>{t('contact.email')}</h3>
              </div>
              <motion.a 
                href={`mailto:${t('contact.emailAddress')}`}
                className="font-code text-muted-foreground hover:text-primary transition-colors"
                whileHover={{ x: 5 }}
              >
                {t('contact.emailAddress')}
              </motion.a>
            </motion.div>

            <motion.div 
              className="p-6 rounded-lg bg-card border border-border"
              whileHover={{ 
                scale: 1.02,
                borderColor: 'var(--purple)',
                boxShadow: '0 0 30px rgba(114, 9, 183, 0.2)'
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                >
                  <MapPin className="w-6 h-6" style={{ color: 'var(--purple)' }} />
                </motion.div>
                <h3>{t('contact.location')}</h3>
              </div>
              <p className="font-code text-muted-foreground">
                {t('contact.locationValue')}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {t('contact.availability')}
              </p>
            </motion.div>

            <div className="flex gap-4">
              {SOCIAL_LINKS.filter(link => link.isExternal).map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    whileHover={{ 
                      scale: 1.1,
                      y: -5,
                      borderColor: social.color
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 p-4 rounded-lg bg-card border border-border transition-all"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-code text-sm">{social.label}</span>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="h-full p-8 rounded-lg bg-card border border-border flex items-center justify-center relative overflow-hidden">
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 opacity-20"
                style={{
                  background: `radial-gradient(circle at center, var(--hot-pink), transparent 70%)`
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.1, 0.3, 0.1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <div className="text-center relative z-10">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center relative"
                  style={{
                    background: `linear-gradient(135deg, var(--hot-pink), var(--purple), var(--cyan))`,
                  }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `linear-gradient(135deg, var(--hot-pink), var(--purple), var(--cyan))`,
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.8, 0, 0.8]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                  />
                  <Mail className="w-10 h-10 text-white relative z-10" />
                </motion.div>
                <motion.a
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 0 40px rgba(76, 201, 240, 0.5)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  href={`mailto:${t('contact.emailAddress')}`}
                  className="inline-block px-8 py-4 rounded-lg transition-all"
                  style={{ backgroundColor: 'var(--cyan)', color: 'var(--dark-bg)' }}
                >
                  {t('contact.cta')}
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center pt-8 border-t border-border"
        >
          <p className="text-sm text-muted-foreground font-code">
            {t('contact.footerText')}
          </p>
        </motion.footer>
      </div>
    </section>
  );
}