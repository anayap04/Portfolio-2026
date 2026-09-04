import { motion, useInView } from 'motion/react';
import { Rocket, Code, Github, Globe } from 'lucide-react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useReducedMotion } from '../hooks/useReducedMotion';

export function Projects() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  const projects = t('projects.list', { returnObjects: true }) as Array<{
    name: string;
    description: string;
    tech: string[];
    link: string;
    github: string;
  }>;

  return (
    <section id="projects" className="py-20 px-4" ref={ref} aria-label={t('a11y.projectsSection') || 'Projects'}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3 mb-12">
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Rocket className="w-8 h-8" style={{ color: 'var(--cyan)' }} />
            </motion.div>
            <h2 className="text-4xl md:text-5xl">{t('projects.title')}</h2>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: prefersReducedMotion ? 0 : 0.6, 
                delay: prefersReducedMotion ? 0 : 0.2 + index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
              whileHover={prefersReducedMotion ? {} : { 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="group relative p-6 rounded-lg bg-card border border-border hover:border-primary transition-all overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, var(--hot-pink), var(--purple), var(--cyan))`
                }}
              />

              {/* Animated corner accents */}
              <motion.div
                className="absolute top-0 right-0 w-20 h-20 rounded-bl-full opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{ background: 'var(--cyan)' }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-20 h-20 rounded-tr-full opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{ background: 'var(--hot-pink)' }}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <motion.div
                      whileHover={prefersReducedMotion ? {} : { rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Code className="w-6 h-6" style={{ color: 'var(--periwinkle)' }} />
                    </motion.div>
                    <h3 className="text-xl">{project.name}</h3>
                  </div>
                  <div className="flex gap-2">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-accent transition-colors"
                      aria-label={`GitHub: ${project.name}`}
                      whileHover={prefersReducedMotion ? {} : { scale: 1.2, rotate: 360 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Github className="w-5 h-5" />
                    </motion.a>
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-accent transition-colors"
                      aria-label={`Live demo: ${project.name}`}
                      whileHover={prefersReducedMotion ? {} : { scale: 1.2, rotate: -360 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Globe className="w-5 h-5" />
                    </motion.a>
                  </div>
                </div>

                <motion.p 
                  className="text-muted-foreground mb-4"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  {project.description}
                </motion.p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <motion.span
                      key={i}
                      className="px-3 py-1 rounded-full text-xs font-code border border-border bg-muted"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ 
                        delay: 0.4 + index * 0.1 + i * 0.05,
                        type: "spring",
                        stiffness: 200
                      }}
                      whileHover={{ 
                        scale: 1.1,
                        backgroundColor: 'var(--accent)'
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}