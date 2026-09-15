import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import { Trophy, Code2, Award, Sparkles } from 'lucide-react'
import { achievements } from '@/data/portfolioData'
import type { Achievement } from '@/data/portfolioData'
import { SectionHeading } from './SectionHeading'

const icons = { trophy: Trophy, code: Code2, award: Award, sparkle: Sparkles }

function Card({ item, index }: { item: Achievement; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })
  const Icon = icons[item.icon]

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    setTilt({
      rx: ((e.clientY - r.top) / r.height - 0.5) * -8,
      ry: ((e.clientX - r.left) / r.width - 0.5) * 8,
    })
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 34, rotate: index % 2 ? 1.5 : -1.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="h-full w-[80vw] max-w-[400px] shrink-0 sm:w-[380px]"
    >
      <div
        ref={ref}
        data-testid={`achievement-card-${index}`}
        data-cursor
        onMouseMove={onMove}
        onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
        style={{ transform: `perspective(800px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`, transition: 'transform 0.3s ease-out' }}
        className="group relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-md border border-line bg-chapter p-7 transition-colors duration-500 hover:border-gold/50 sm:p-9"
      >
        <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-gold/10 blur-2xl transition-opacity duration-700 group-hover:opacity-100 sm:opacity-0" />
        <div className="flex items-start justify-between">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
            <Icon size={18} />
          </span>
          <span className="font-mono text-[10px] tracking-[0.3em] text-ink-mute">{item.serial}</span>
        </div>
        <h3 className="mt-8 font-display text-2xl tracking-tight sm:text-3xl">{item.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-mute">{item.detail}</p>
        <div className="mt-6 h-px w-full origin-left scale-x-0 bg-gold/50 transition-transform duration-700 group-hover:scale-x-100" />
      </div>
    </motion.article>
  )
}

// Awards shelf: vertical scroll drives a horizontal glide through the cards.
export function AchievementsArtifacts() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [range, setRange] = useState(0)
  const [reduced, setReduced] = useState(false)
  const [current, setCurrent] = useState(1)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    const measure = () => {
      const el = trackRef.current
      if (el) setRange(Math.max(0, el.scrollWidth - window.innerWidth + 128))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -range])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const n = Math.min(achievements.length, Math.max(1, Math.ceil(v * achievements.length)))
    setCurrent((c) => (c === n ? c : n))
  })

  const counter = (
    <p data-testid="achievements-counter" className="font-mono text-[10px] tracking-[0.3em] text-gold">
      {String(current).padStart(2, '0')} / {String(achievements.length).padStart(2, '0')}
    </p>
  )

  if (reduced) {
    return (
      <section id="achievements" data-testid="achievements-section" className="px-5 py-16 sm:px-10 sm:py-20 lg:px-16">
        <SectionHeading chapter="05" label="ACHIEVEMENTS" title="Things I'm" accent="proud of." />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {achievements.map((a, i) => (
            <Card key={a.id} item={a} index={i} />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} id="achievements" data-testid="achievements-section" className="relative" style={{ height: '260vh' }}>
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <div className="px-5 sm:px-10 lg:px-16">
          <SectionHeading chapter="05" label="ACHIEVEMENTS" title="Things I'm" accent="proud of." />
        </div>

        <motion.div ref={trackRef} data-testid="achievements-track" style={{ x }} className="flex items-stretch gap-6 px-5 sm:gap-8 sm:px-16">
          {achievements.map((a, i) => (
            <Card key={a.id} item={a} index={i} />
          ))}
          <div className="flex w-[40vw] shrink-0 items-center justify-center sm:w-[280px]">
            <p className="rotate-90 font-mono text-[10px] tracking-[0.35em] text-ink-mute sm:rotate-0">FIN — 05</p>
          </div>
        </motion.div>

        <div className="mt-10 flex items-center gap-4 px-5 sm:px-16">
          <p className="hidden font-mono text-[9px] tracking-[0.3em] text-ink-mute sm:block">ACHIEVEMENTS</p>
          <div className="h-px flex-1 bg-line">
            <motion.div className="h-px origin-left bg-gold" style={{ scaleX: scrollYProgress }} />
          </div>
          {counter}
        </div>
      </div>
    </section>
  )
}
