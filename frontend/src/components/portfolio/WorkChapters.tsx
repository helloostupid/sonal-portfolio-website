import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Plus } from 'lucide-react'
import { work } from '@/data/portfolioData'
import { SectionHeading } from './SectionHeading'

export function WorkChapters() {
  const [open, setOpen] = useState<string | null>(work[0]?.id ?? null)

  return (
    <section id="work" data-testid="work-section" className="px-5 py-16 sm:px-10 sm:py-20 lg:px-16">
      <SectionHeading chapter="02" label="WORK EXPERIENCE" title="Where I've" accent="worked." />

      <div className="border-t border-line">
        {work.map((role, i) => {
          const isOpen = open === role.id
          return (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group border-b border-line"
            >
              <button
                data-testid={`work-role-${i}`}
                data-cursor
                onClick={() => setOpen(isOpen ? null : role.id)}
                className="flex w-full items-baseline gap-4 px-2 py-7 text-left transition-colors duration-500 hover:bg-gold/[0.04] sm:gap-8 sm:px-6 sm:py-9"
                aria-expanded={isOpen}
              >
                <span className="font-mono text-[10px] tracking-[0.25em] text-ink-mute sm:text-xs">0{i + 1}</span>
                <span className="flex-1">
                  <span
                    className={`block font-display text-2xl tracking-tight transition-all duration-500 sm:text-4xl lg:text-5xl ${
                      isOpen ? 'text-gold' : 'text-ink group-hover:translate-x-2 group-hover:text-gold'
                    }`}
                  >
                    {role.position}
                  </span>
                  <span className="mt-1 block text-sm text-ink-mute sm:text-base">{role.company}</span>
                </span>
                <span className="hidden font-mono text-[10px] tracking-[0.2em] text-ink-mute sm:block sm:text-xs">{role.duration}</span>
                <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="text-gold">
                  <Plus size={18} />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 gap-8 px-2 pb-10 sm:grid-cols-12 sm:px-6 lg:pl-24">
                      <p className="text-sm leading-relaxed text-ink-mute sm:col-span-5 sm:text-base">{role.description}</p>
                      <div className="sm:col-span-4">
                        <p className="mb-2 font-mono text-[10px] tracking-[0.3em] text-gold">IMPACT</p>
                        <p className="text-sm leading-relaxed sm:text-base">{role.impact}</p>
                      </div>
                      <div className="sm:col-span-3">
                        <p className="mb-2 font-mono text-[10px] tracking-[0.3em] text-gold">TOOLS</p>
                        <div className="flex flex-wrap gap-1.5">
                          {role.tech.map((t) => (
                            <span key={t} className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] tracking-wider text-ink-mute">
                              {t}
                            </span>
                          ))}
                        </div>
                        <p className="mt-4 font-mono text-[10px] tracking-[0.2em] text-ink-mute sm:hidden">{role.duration}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
