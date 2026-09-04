import { motion, useInView } from 'motion/react';
import { User, MapPin, Code, Award } from 'lucide-react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeInOut"
    }
  }
} as const;

export function About() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const highlights = t('about.highlights', { returnObjects: true }) as Record<string, { title: string; description: string }>;
  const skillsConfig = t('about.skills', { returnObjects: true }) as { title: string; items: string[] };

  const highlightIcons = {
    experience: Code,
    wcag: Award,
    work: MapPin
  };

  return (
    <section id="about" className="py-20 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3 mb-8">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              <User className="w-8 h-8" style={{ color: 'var(--hot-pink)' }} />
            </motion.div>
            <h2 className="text-4xl md:text-5xl">{t('about.title')}</h2>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.p 
              className="text-lg text-muted-foreground leading-relaxed"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.4 }}
            >
              {t('about.bio')}
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-4"
          >
            {Object.entries(highlights).map(([key, highlight]) => {
              const Icon = highlightIcons[key as keyof typeof highlightIcons];
              return (
                <motion.div
                  key={key}
                  variants={itemVariants}
                  className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border"
                  whileHover={{ 
                    scale: 1.02,
                    borderColor: 'var(--periwinkle)',
                    boxShadow: '0 0 20px rgba(67, 97, 238, 0.2)'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: 'var(--periwinkle)' }} />
                  </motion.div>
                  <div>
                    <h4 className="mb-1">{highlight.title}</h4>
                    <p className="text-sm text-muted-foreground">{highlight.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-2xl mb-6" style={{ color: 'var(--cyan)' }}>
            {skillsConfig.title}
          </h3>
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {skillsConfig.items.map((skill) => (
              <motion.div
                key={skill}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.1,
                  y: -5,
                  borderColor: 'var(--cyan)',
                  boxShadow: '0 0 20px rgba(76, 201, 240, 0.3)'
                }}
                className="px-4 py-3 rounded-lg bg-card border border-border text-center font-code text-sm transition-all"
              >
                <motion.span
                  initial={{ opacity: 0.7 }}
                  whileHover={{ opacity: 1 }}
                >
                  {skill}
                </motion.span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}