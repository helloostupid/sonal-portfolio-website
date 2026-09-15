import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { useTheme } from '@/lib/theme'

interface Sparkle {
  id: number
  x: number
  y: number
  c: string
}

const GLITTER = ['#E3A2B8', '#F0C987', '#F7EEF3']

export function CustomCursor() {
  const { theme } = useTheme()
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [sparkles, setSparkles] = useState<Sparkle[]>([])
  const idRef = useRef(0)
  const lastRef = useRef(0)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 260, damping: 24, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 260, damping: 24, mass: 0.6 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    setEnabled(true)
    document.body.classList.add('cursor-custom')
    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const now = performance.now()
      if (now - lastRef.current > 70) {
        lastRef.current = now
        const id = idRef.current++
        setSparkles((s) => [
          ...s.slice(-13),
          {
            id,
            x: e.clientX + (Math.random() - 0.5) * 16,
            y: e.clientY + (Math.random() - 0.5) * 16,
            c: GLITTER[id % GLITTER.length],
          },
        ])
      }
    }
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null
      setHovering(!!t?.closest('[data-cursor], a, button, [role="button"]'))
    }
    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mouseover', over, { passive: true })
    return () => {
      document.body.classList.remove('cursor-custom')
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      {theme === 'dark' &&
        sparkles.map((s) => (
          <motion.span
            key={s.id}
            aria-hidden
            className="pointer-events-none fixed z-[204] block"
            style={{
              left: s.x,
              top: s.y,
              width: 5,
              height: 5,
              marginLeft: -2.5,
              marginTop: -2.5,
              background: s.c,
              boxShadow: `0 0 8px ${s.c}`,
              mixBlendMode: 'screen',
            }}
            initial={{ scale: 0, rotate: 45, opacity: 0 }}
            animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0], rotate: [45, 135, 225] }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            onAnimationComplete={() => setSparkles((cur) => cur.filter((c) => c.id !== s.id))}
          />
        ))}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[210] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold mix-blend-difference"
        style={{ x, y }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[209] flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ink/60 mix-blend-difference"
        style={{ x: ringX, y: ringY }}
        animate={{ scale: hovering ? 2.1 : 1, opacity: hovering ? 0.9 : 0.55 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      />
    </>
  )
}
