import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react'
import { ArrowUpRight, X } from 'lucide-react'
import type { Project } from '@/data/portfolioData'
import { projects } from '@/data/portfolioData'
import { SectionHeading } from './SectionHeading'
import { startScroll, stopScroll } from '@/lib/lenis'

function ProjectPanel({ project, index, onOpen }: { project: Project; index: number; onOpen: (p: Project) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 0.96])
  const dim = useTransform(scrollYProgress, [0.55, 1], [0, 0.55])

  return (
    <div ref={ref} className="sticky top-0 mb-[6vh] h-[92svh] last:mb-0">
      <motion.article
        data-testid={`project-card-${index}`}
        style={{ scale }}
        className="relative h-full overflow-hidden rounded-md bg-chapter"
      >
        <motion.img
          src={project.image}
          alt={project.title}
          loading="lazy"
          style={{ y: imgY, scale: 1.25 }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/20" />
        <motion.div style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-black" />

        <div className="absolute inset-0 flex flex-col justify-between p-6 text-[#F4F4F6] sm:p-10 lg:p-14">
          <div className="flex items-start justify-between font-mono text-[10px] tracking-[0.3em] sm:text-xs">
            <span className="text-[#D1B280]">{project.index}</span>
            <span>{project.year}</span>
          </div>

          <div>
            {project.label && (
              <p className="mb-3 font-mono text-[9px] tracking-[0.25em] text-[#D1B280]/80 sm:text-[10px]">
                {project.label}
              </p>
            )}
            <p className="mb-2 font-mono text-[10px] tracking-[0.3em] text-[#D1B280] sm:text-xs">{project.subtitle.toUpperCase()}</p>
            <h3 className="font-display text-5xl leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">{project.title}</h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/85 sm:text-base">{project.blurb}</p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {project.tags.map((t) => (
                <span key={t} className="rounded-full border border-white/25 px-3 py-1 font-mono text-[10px] tracking-wider text-white/80">
                  {t}
                </span>
              ))}
            </div>
            <button
              data-testid={`project-open-${index}`}
              data-cursor
              onClick={() => onOpen(project)}
              className="group mt-7 inline-flex items-center gap-3 rounded-full bg-[#F4F4F6] px-6 py-3.5 font-mono text-[11px] tracking-[0.25em] text-[#0B0C10] transition-transform duration-500 hover:scale-105 active:scale-95"
            >
              {project.link ? 'VIEW PAPER' : 'GITHUB'}
              <ArrowUpRight size={14} className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </motion.article>
    </div>
  )
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    stopScroll()
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', esc)
    return () => {
      startScroll()
      window.removeEventListener('keydown', esc)
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[150] flex items-end justify-center bg-black/60 backdrop-blur-md sm:items-center sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
    >
      <motion.div
        initial={{ y: 80, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 60, opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[88svh] w-full max-w-4xl overflow-y-auto rounded-t-2xl bg-chapter text-ink shadow-2xl sm:rounded-2xl"
      >
        <div className="relative h-56 overflow-hidden sm:h-72">
          <img src={project.image} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-chapter via-transparent to-transparent" />
          <button
            data-testid="project-modal-close"
            data-cursor
            onClick={onClose}
            aria-label="Close case study"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition-transform duration-300 hover:rotate-90"
          >
            <X size={16} />
          </button>
        </div>

        <div className="px-6 pb-10 sm:px-12 sm:pb-14">
          <p className="font-mono text-[10px] tracking-[0.3em] text-gold sm:text-xs">
            {project.index} — {project.year}
          </p>
          <h3 className="mt-3 font-display text-4xl tracking-tight sm:text-6xl">{project.title}</h3>
          <p className="mt-2 font-display text-lg italic text-ink-mute sm:text-xl">{project.subtitle}</p>

          <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-12">
            <div className="sm:col-span-7">
              <p className="mb-3 font-mono text-[10px] tracking-[0.3em] text-ink-mute">OVERVIEW</p>
              <p className="text-base leading-relaxed">{project.overview}</p>
              <p className="mb-3 mt-8 font-mono text-[10px] tracking-[0.3em] text-ink-mute">WHAT MADE IT HARD</p>
              <ul className="space-y-3">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm leading-relaxed sm:text-base">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
            <div className="sm:col-span-5">
              <p className="mb-3 font-mono text-[10px] tracking-[0.3em] text-ink-mute">MY ROLE</p>
              <p className="text-sm leading-relaxed sm:text-base">{project.role}</p>
              <p className="mb-3 mt-8 font-mono text-[10px] tracking-[0.3em] text-ink-mute">BUILT WITH</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((t) => (
                  <span key={t} className="rounded-full border border-line px-3 py-1 font-mono text-[10px] tracking-wider text-ink-mute">
                    {t}
                  </span>
                ))}
              </div>
              {(project.link || project.repo) && (
                <div className="mt-8 flex gap-3">
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noreferrer" data-cursor className="rounded-full bg-ink px-5 py-2.5 font-mono text-[10px] tracking-[0.2em] text-paper">
                      VISIT
                    </a>
                  )}
                  {project.repo && (
                    <a href={project.repo} target="_blank" rel="noreferrer" data-cursor className="rounded-full border border-line px-5 py-2.5 font-mono text-[10px] tracking-[0.2em]">
                      SOURCE
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function ProjectsGallery() {
  const [active, setActive] = useState<Project | null>(null)

  return (
    <section id="projects" data-testid="projects-section" className="px-3 py-16 sm:px-6 sm:py-20 lg:px-10">
      <div className="px-2 sm:px-4 lg:px-6">
        <SectionHeading chapter="03" label="PROJECTS" title="Selected" accent="projects." />
        <p className="-mt-8 mb-14 max-w-md text-sm leading-relaxed text-ink-mute sm:-mt-10">
          Four builds, chosen for the problems they solve — not the logos on them. Keep scrolling; each one takes the stage.
        </p>
      </div>

      <div className="relative">
        {projects.map((p, i) => (
          <ProjectPanel key={p.id} project={p} index={i} onOpen={setActive} />
        ))}
      </div>

      <AnimatePresence>{active && <ProjectModal project={active} onClose={() => setActive(null)} />}</AnimatePresence>
    </section>
  )
}
