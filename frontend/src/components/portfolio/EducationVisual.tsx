import { motion } from 'motion/react'
import { education } from '@/data/portfolioData'
import { SectionHeading } from './SectionHeading'

export function EducationVisual() {
  return (
    <section id="education" data-testid="education-section" className="px-5 py-16 sm:px-10 sm:py-20 lg:px-16">
      <SectionHeading chapter={education.chapter} label="EDUCATION" title="My" accent="education." />

      <div className="relative border border-line p-6 sm:p-12">
        <span className="absolute -left-px -top-px h-4 w-4 border-l-2 border-t-2 border-gold" aria-hidden />
        <span className="absolute -right-px -top-px h-4 w-4 border-r-2 border-t-2 border-gold" aria-hidden />
        <span className="absolute -bottom-px -left-px h-4 w-4 border-b-2 border-l-2 border-gold" aria-hidden />
        <span className="absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2 border-gold" aria-hidden />
        <p className="absolute -top-2.5 left-6 bg-paper px-3 font-mono text-[10px] tracking-[0.3em] text-ink-mute">ACADEMICS</p>

        <div className={`grid grid-cols-1 gap-10 ${education.degrees.length === 1 ? 'mx-auto max-w-2xl' : education.degrees.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
          {education.degrees.map((d, i) => (
            <motion.figure
              key={d.fig}
              data-testid={`education-degree-${i}`}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="relative border border-dashed border-line p-6 sm:p-8"
            >
              <figcaption className="mb-5 flex items-center justify-between font-mono text-[10px] tracking-[0.3em] text-gold">
                <span>{d.fig}</span>
                <span className="text-ink-mute">{d.period}</span>
              </figcaption>
              <h3 className="font-display text-2xl leading-tight tracking-tight sm:text-3xl">{d.degree}</h3>
              <p className="mt-1 text-sm italic text-ink-mute sm:text-base">{d.school}</p>
              <p className="mt-5 text-sm leading-relaxed text-ink-mute">{d.notes}</p>
              <div className="mt-6 flex flex-wrap gap-1.5">
                {d.modules.map((m) => (
                  <span key={m} className="rounded-sm border border-line px-2.5 py-1 font-mono text-[10px] tracking-wider text-ink-mute">
                    {m}
                  </span>
                ))}
              </div>
              <span className="absolute -bottom-2 right-6 bg-paper px-2 font-mono text-[9px] tracking-[0.25em] text-ink-mute/70">EDUCATION</span>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
