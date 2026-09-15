import { useEffect, useRef, useState } from 'react'
import { Sparkles, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { gsap } from '@/lib/lenis'
import { identity, hero } from '@/data/portfolioData'
import { Abacus } from './Abacus'
import { useTheme } from '@/lib/theme'

function AmbientCanvas({ theme }: { theme: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    let raf = 0
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 }

    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const dark = theme === 'dark'
    const glows = dark
      ? ['227,162,184', '176,141,209', '240,198,212']
      : ['172,77,109', '199,110,139', '176,141,209']

    const onMove = (e: MouseEvent) => {
      mouse.tx = e.clientX / window.innerWidth
      mouse.ty = e.clientY / window.innerHeight
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    let t = 0
    const draw = () => {
      t += 1
      mouse.x += (mouse.tx - mouse.x) * 0.045
      mouse.y += (mouse.ty - mouse.y) * 0.045
      ctx.clearRect(0, 0, w, h)

      // soft color washes
      glows.forEach((g, i) => {
        const gx = w * (0.25 + i * 0.25) + (mouse.x - 0.5) * (60 + i * 45)
        const gy = h * (0.3 + (i % 2) * 0.35) + (mouse.y - 0.5) * (50 + i * 35)
        const rad = Math.max(w, h) * (0.28 + i * 0.06)
        const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, rad)
        grad.addColorStop(0, `rgba(${g},${dark ? 0.1 : 0.12})`)
        grad.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, w, h)
      })

      // silk threads — layered curves that bend toward the cursor
      for (let k = 0; k < 6; k++) {
        const baseY = h * (0.28 + k * 0.1)
        ctx.beginPath()
        for (let sx = -20; sx <= w + 20; sx += 24) {
          const drift = reduced ? 0 : Math.sin(sx * 0.004 + t * 0.006 + k * 0.9) * 26 + Math.sin(sx * 0.009 - t * 0.004 + k) * 12
          const pull = Math.exp(-Math.pow((sx - mouse.x * w) / 260, 2)) * (mouse.y * h - baseY) * 0.28
          const ny = baseY + drift + pull
          if (sx === -20) ctx.moveTo(sx, ny)
          else ctx.lineTo(sx, ny)
        }
        ctx.strokeStyle =
          k === 2
            ? dark
              ? 'rgba(227,162,184,0.5)'
              : 'rgba(172,77,109,0.4)'
            : `rgba(${glows[k % 3]},${dark ? 0.14 : 0.17})`
        ctx.lineWidth = k === 2 ? 1.4 : 1
        ctx.stroke()
      }

      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [theme])

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />
}

export function HeroOpening() {
  const root = useRef<HTMLElement>(null)
  const { theme } = useTheme()
  const [abacusOpen, setAbacusOpen] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set('[data-hero-fade]', { opacity: 1 })
        gsap.set('[data-hero-line] > span', { yPercent: 0 })
        gsap.set('[data-hero-rule]', { scaleX: 1 })
        gsap.set('[data-hero-orb]', { scale: 1, opacity: 1 })
        gsap.set('[data-hero-portrait]', { clipPath: 'inset(0% 0% 0% 0%)' })
        return
      }
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl.fromTo('[data-hero-fade]', { opacity: 0 }, { opacity: 1, duration: 1, stagger: 0.08 }, 0.2)
        .fromTo(
          '[data-hero-line] > span',
          { yPercent: 115, rotate: 2 },
          { yPercent: 0, rotate: 0, duration: 1.3, stagger: 0.14 },
          0.55,
        )
        .fromTo(
          '[data-hero-portrait]',
          { clipPath: 'inset(100% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.25 },
          0.85,
        )
        .fromTo('[data-hero-rule]', { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: 'expo.inOut' }, 1.15)
        .fromTo('[data-hero-orb]', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.4, ease: 'elastic.out(1,0.6)' }, 0.9)
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} data-testid="hero-section" className="relative flex min-h-svh flex-col overflow-hidden" id="hero">
      <AmbientCanvas theme={theme} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--paper)_92%)]" aria-hidden />

      <div className="relative z-10 flex flex-1 flex-col justify-between px-5 pb-10 pt-24 sm:px-10 lg:px-16">
        <div className="flex items-start justify-end" data-hero-fade style={{ opacity: 0 }}>
          <p className="hidden items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-ink-mute sm:flex sm:text-xs">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
            {hero.availability.toUpperCase()}
          </p>
        </div>

        <div className="relative mt-10 sm:mt-0">
          <div data-hero-portrait className="hero-abacus" style={{ clipPath: 'inset(100% 0% 0% 0%)' }}>
            <Abacus />
          </div>

          <div data-hero-fade style={{ opacity: 0 }} className="mb-6 flex items-center gap-3 sm:mb-10">
            <span data-hero-orb className="spin-slow flex h-10 w-10 items-center justify-center rounded-full border border-line text-gold" style={{ opacity: 0 }}>
              <Sparkles size={15} />
            </span>
            <span className="font-mono text-[10px] tracking-[0.35em] text-gold sm:text-xs">{identity.role.toUpperCase()}</span>
          </div>

          <h1 className="font-display tracking-tight">
            <span data-hero-line className="block overflow-hidden pb-1">
              <span className="block text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">{identity.firstName}</span>
            </span>
            <span data-hero-line className="block overflow-hidden pb-2">
              <span className="block text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">{identity.lastName}</span>
            </span>
          </h1>

          <div data-hero-rule className="my-6 h-px w-full origin-left bg-line sm:my-8" style={{ transform: 'scaleX(0)' }} />

          <div className="hero-cta-row">
            <p className="max-w-xl font-display text-2xl leading-snug text-ink sm:text-3xl lg:text-4xl">
              <span data-hero-line className="block overflow-hidden">
                <span className="block">{identity.taglineLines[0]}</span>
              </span>
              <span data-hero-line className="block overflow-hidden">
                <span className="block text-ink-mute">
                  clarity and <em className="not-italic text-gold">intent.</em>
                </span>
              </span>
            </p>
          </div>

          <div className="hero-abacus-cta" data-hero-fade style={{ opacity: 0 }}>
            <button
              data-testid="open-abacus-modal-button"
              data-cursor
              onClick={() => setAbacusOpen(true)}
              className="group flex items-center gap-3 rounded-full border border-line bg-chapter/60 px-7 py-3.5 font-mono text-[10px] tracking-[0.3em] text-ink backdrop-blur-sm transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold transition-transform duration-300 group-hover:scale-125" />
              TRY THE ABACUS
            </button>
          </div>
        </div>

        <div className="flex items-end justify-between" data-hero-fade style={{ opacity: 0 }}>
          <p className="max-w-[240px] text-xs leading-relaxed text-ink-mute sm:max-w-xs sm:text-sm">{hero.manifesto}</p>
        </div>
      </div>

      <AnimatePresence>
        {abacusOpen && (
          <motion.div
            data-testid="abacus-modal"
            className="fixed inset-0 z-[130] flex items-center justify-center bg-ink/55 p-6 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setAbacusOpen(false)}
          >
            <motion.div
              className="relative flex flex-col items-center gap-5 rounded-2xl border border-line bg-paper p-6 shadow-2xl"
              initial={{ scale: 0.92, y: 24, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 12, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                data-testid="close-abacus-modal-button"
                data-cursor
                aria-label="Close abacus"
                onClick={() => setAbacusOpen(false)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink-mute transition-colors hover:border-gold hover:text-gold"
              >
                <X size={14} />
              </button>
              <p className="pr-10 font-mono text-[9px] tracking-[0.3em] text-ink-mute">
                A LITTLE SOROBAN — DRAG THE BEADS
              </p>
              <Abacus />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
