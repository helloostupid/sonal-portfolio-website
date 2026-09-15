import { useEffect, useRef } from 'react'
import { marqueeWords } from '@/data/portfolioData'

// Velocity-reactive marquee: glides on its own, speeds up and skews with scroll velocity.
export function Marquee() {
  const track = useRef<HTMLDivElement>(null)
  const wrap = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = track.current
    const w = wrap.current
    if (!t || !w) return
    let x = 0
    let vel = 0
    let last = window.scrollY
    let raf = 0
    const loop = () => {
      const s = window.scrollY
      vel += (s - last - vel) * 0.08
      last = s
      x -= 0.55 + Math.min(Math.abs(vel) * 0.3, 9)
      const half = t.scrollWidth / 2
      if (half > 0 && -x >= half) x += half
      t.style.transform = `translate3d(${x}px,0,0)`
      const skew = Math.max(-7, Math.min(7, -vel * 0.1))
      w.style.transform = `skewX(${skew}deg)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  const row = (key: string, hidden = false) => (
    <div key={key} aria-hidden={hidden} className="flex shrink-0 items-center">
      {marqueeWords.map((word, i) => (
        <span key={`${key}-${i}`} className="flex items-center">
          <span
            className={`px-6 font-display text-3xl tracking-tight sm:px-10 sm:text-4xl ${i % 2 ? 'italic text-gold' : 'text-ink'}`}
          >
            {word}
          </span>
          <span className="text-xl text-gold/70">✳</span>
        </span>
      ))}
    </div>
  )

  return (
    <div className="overflow-hidden border-y border-line py-6 sm:py-8" data-testid="marquee">
      <div ref={wrap} className="will-change-transform">
        <div ref={track} className="flex w-max will-change-transform">
          {row('a')}
          {row('b', true)}
        </div>
      </div>
    </div>
  )
}
