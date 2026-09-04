import { motion, useInView } from 'motion/react';
import { Briefcase, Calendar } from 'lucide-react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useReducedMotion } from '../hooks/useReducedMotion';

export function Experience() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  const timeline = t('experience.timeline', { returnObjects: true }) as Array<{
    period: string;
    role: string;
    company: string;
    location: string;
    description: string;
    achievements: string[];
  }>;

  return (
    <section id="experience" className="py-20 px-4 bg-card/30" ref={ref} aria-label={t('a11y.experienceSection') || 'Experience'}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3 mb-12">
            <motion.div
              animate={{
                y: [0, -5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Briefcase className="w-8 h-8" style={{ color: 'var(--purple)' }} />
            </motion.div>
            <h2 className="text-4xl md:text-5xl">{t('experience.title')}</h2>
          </div>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <motion.div 
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 md:-ml-px"
            style={{ background: 'linear-gradient(to bottom, var(--hot-pink), var(--purple), var(--cyan))' }}
            initial={{ scaleY: 0, originY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.3 + index * 0.2,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.5 + index * 0.2,
                    type: "spring",
                    stiffness: 200
                  }}
                  className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full border-4 border-background md:-ml-2 z-10"
                  style={{ backgroundColor: index === 0 ? 'var(--cyan)' : index === 1 ? 'var(--purple)' : 'var(--hot-pink)' }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: index === 0 ? 'var(--cyan)' : index === 1 ? 'var(--purple)' : 'var(--hot-pink)' }}
                    animate={{
                      scale: [1, 2, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5
                    }}
                  />
                </motion.div>

                {/* Spacer for alignment */}
                <div className="hidden md:block md:w-1/2" />

                {/* Content */}
                <div className="pl-8 md:pl-0 md:w-1/2">
                  <motion.div
                    whileHover={{ 
                      scale: 1.03,
                      y: -5
                    }}
                    transition={{ duration: 0.3 }}
                    className="p-6 rounded-lg bg-card border border-border hover:border-primary transition-all"
                  >
                    <motion.div 
                      className="flex items-center gap-2 mb-2 text-sm font-code" 
                      style={{ color: 'var(--cyan)' }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.6 + index * 0.2 }}
                    >
                      <Calendar className="w-4 h-4" />
                      {item.period}
                    </motion.div>
                    
                    <motion.h3 
                      className="text-xl mb-1"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.7 + index * 0.2 }}
                    >
                      {item.role}
                    </motion.h3>
                    <h4 className="text-muted-foreground mb-1">{item.company}</h4>
                    <p className="text-sm text-muted-foreground mb-4 font-code">📍 {item.location}</p>
                    
                    <p className="text-muted-foreground mb-4">{item.description}</p>
                    
                    <ul className="space-y-2">
                      {item.achievements.map((achievement, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ 
                            duration: 0.5, 
                            delay: 0.8 + index * 0.2 + i * 0.1,
                            ease: "easeOut"
                          }}
                          className="flex items-start gap-2 text-sm"
                        >
                          <motion.span 
                            style={{ color: 'var(--periwinkle)' }}
                            initial={{ scale: 0 }}
                            animate={isInView ? { scale: 1 } : {}}
                            transition={{ delay: 0.9 + index * 0.2 + i * 0.1, type: "spring" }}
                          >
                            ▸
                          </motion.span>
                          <span className="text-muted-foreground">{achievement}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}