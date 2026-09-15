import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { about } from '@/data/portfolioData'
import { SectionHeading } from './SectionHeading'

function StaggerWords({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split(' ').map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0.12 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.8 }}
          transition={{ duration: 0.5, delay: i * 0.018 }}
          className="inline-block"
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </span>
  )
}

export function AboutManifesto() {
  const imgWrap = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: imgWrap, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section id="about" data-testid="about-section" className="px-5 py-16 sm:px-10 sm:py-20 lg:px-16">
      <SectionHeading chapter={about.chapter} label="ABOUT" title="A little about" accent="me." />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <blockquote className="border-l-2 border-gold pl-6 font-display text-2xl leading-snug sm:pl-8 sm:text-3xl">
            <StaggerWords text={about.quote} />
          </blockquote>

          <div className="mt-8 max-w-prose space-y-5 text-base leading-relaxed text-ink-mute sm:text-lg">
            {about.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {p}
              </motion.p>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-line pt-8">
            {about.stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
              >
                <p className="font-display text-3xl text-gold sm:text-4xl">{s.value}</p>
                <p className="mt-2 font-mono text-[10px] leading-relaxed tracking-[0.15em] text-ink-mute uppercase">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div ref={imgWrap} className="relative max-w-[380px] overflow-hidden rounded-sm">
            <motion.img
              src={about.image}
              alt={about.imageAlt}
              loading="lazy"
              style={{ y, scale: 1.16 }}
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-paper/50 via-transparent to-transparent" />
            <p className="absolute bottom-4 left-4 font-mono text-[10px] tracking-[0.3em] text-paper/90">Sonal Gholap</p>
          </div>

          <div className="mt-8">
            <p className="mb-4 font-mono text-[10px] tracking-[0.3em] text-ink-mute">CURRENT MATERIALS</p>
            <div className="flex flex-wrap gap-2">
              {about.stack.map((tech, i) => (
                <motion.span
                  key={tech}
                  data-cursor
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  whileHover={{ y: -3 }}
                  className="rounded-full border border-line px-3.5 py-1.5 font-mono text-[11px] tracking-wider text-ink transition-colors duration-300 hover:border-gold hover:text-gold"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
