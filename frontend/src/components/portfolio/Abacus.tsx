import { useRef, useState, type CSSProperties, type PointerEvent } from 'react'
import { motion } from 'motion/react'
import { click, clack } from '@/lib/ambient'

const YEAR = new Date().getFullYear()
const ROD_W = 56
const DECK_TOP = 84
const BAR_H = 14
const H = 312
const BEAD_W = 44
const BEAD_H = 28
const GAP = 34

interface RodState {
  heaven: boolean
  earth: number
}

const fromDigit = (d: number): RodState => ({ heaven: d >= 5, earth: d % 5 })

const yearRods = (): RodState[] =>
  String(YEAR).padStart(4, '0').slice(-4).split('').map((c) => fromDigit(Number(c)))

const heavenY = (on: boolean) => (on ? DECK_TOP - BEAD_H - 5 : 12)
const earthY = (i: number, engaged: boolean) =>
  engaged ? DECK_TOP + BAR_H + 5 + i * GAP : H - 4 * GAP - 6 + i * GAP

const FRAME: CSSProperties = {
  background: 'color-mix(in srgb, var(--chapter) 72%, transparent)',
  border: '1px solid var(--line)',
  boxShadow: '0 24px 50px -24px rgba(34,23,34,0.28), inset 0 1px 2px rgba(255,255,255,0.35)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
}

const WELL: CSSProperties = {
  background: 'color-mix(in srgb, var(--paper) 55%, transparent)',
  border: '1px solid var(--line)',
  boxShadow: 'inset 0 3px 12px rgba(34,23,34,0.09)',
}

const BAR: CSSProperties = {
  background: 'color-mix(in srgb, var(--ink) 16%, transparent)',
  boxShadow: '0 2px 4px rgba(34,23,34,0.12), inset 0 1px 1px rgba(255,255,255,0.25)',
}

const ROD: CSSProperties = {
  background: 'color-mix(in srgb, var(--ink) 22%, transparent)',
}

const bicone = (base: string): CSSProperties => ({
  width: BEAD_W,
  height: BEAD_H,
  clipPath: 'polygon(26% 0%, 74% 0%, 100% 50%, 74% 100%, 26% 100%, 0% 50%)',
  background: [
    'radial-gradient(ellipse 55% 42% at 34% 28%, rgba(255,255,255,0.5), transparent 62%)',
    `linear-gradient(180deg, color-mix(in srgb, ${base} 88%, #fff 12%) 0%, ${base} 44%, color-mix(in srgb, ${base} 60%, #000 40%) 50%, color-mix(in srgb, ${base} 76%, #000 24%) 56%, ${base} 100%)`,
  ].join(','),
  filter: 'drop-shadow(0 3px 4px rgba(34,23,34,0.28))',
  touchAction: 'none',
})

const HEAVEN_BEAD = bicone('var(--gold)')
const EARTH_BEAD = bicone('var(--gold-soft)')

type Kind = 'heaven' | 'earth'

export function Abacus() {
  const [rods, setRods] = useState<RodState[]>(yearRods)
  const dragRef = useRef<{ startY: number } | null>(null)
  const draggedRef = useRef(false)
  const value = rods.reduce((acc, r) => acc * 10 + (r.heaven ? 5 : 0) + r.earth, 0)

  const applyDrag = (ri: number, kind: Kind, bi: number, dy: number) => {
    draggedRef.current = true
    if (kind === 'heaven') {
      const want = dy > 0
      setRods((rs) => rs.map((r, i) => (i === ri && r.heaven !== want ? (click(), { ...r, heaven: want }) : r)))
    } else {
      const want = dy < 0 ? bi + 1 : bi
      setRods((rs) => rs.map((r, i) => (i === ri && r.earth !== want ? (clack(), { ...r, earth: want }) : r)))
    }
  }

  const onDown = (e: PointerEvent<HTMLButtonElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    dragRef.current = { startY: e.clientY }
  }

  const onMove = (ri: number, kind: Kind, bi: number) => (e: PointerEvent<HTMLButtonElement>) => {
    const d = dragRef.current
    if (!d) return
    const dy = e.clientY - d.startY
    if (Math.abs(dy) < 9) return
    applyDrag(ri, kind, bi, dy)
  }

  const onUp = () => {
    dragRef.current = null
  }

  const onTap = (ri: number, kind: Kind, bi: number) => () => {
    if (draggedRef.current) {
      draggedRef.current = false
      return
    }
    ;(kind === 'earth' ? clack : click)()
    setRods((rs) =>
      rs.map((r, i) => {
        if (i !== ri) return r
        if (kind === 'heaven') return { ...r, heaven: !r.heaven }
        const engaged = bi < r.earth
        return { ...r, earth: engaged ? bi : bi + 1 }
      }),
    )
  }

  const reset = () => {
    click()
    setRods(yearRods())
  }

  const beadHandlers = (ri: number, kind: Kind, bi: number) => ({
    onPointerDown: onDown,
    onPointerMove: onMove(ri, kind, bi),
    onPointerUp: onUp,
    onPointerCancel: onUp,
    onClick: onTap(ri, kind, bi),
  })

  return (
    <div data-testid="hero-abacus" className="select-none">
      <div className="rounded-[10px] p-[14px]" style={FRAME}>
        <div className="relative rounded-[4px]" style={{ ...WELL, height: H, width: ROD_W * 4 }}>
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="absolute bottom-0 top-0 w-[3px] rounded-full"
              style={{ ...ROD, left: i * ROD_W + ROD_W / 2 - 1.5 }}
              aria-hidden
            />
          ))}
          <span
            className="absolute inset-x-0 rounded-[2px]"
            style={{ ...BAR, top: DECK_TOP, height: BAR_H }}
            aria-hidden
          />
          {rods.map((rod, ri) => (
            <span key={ri}>
              <motion.button
                data-testid={`abacus-heaven-${ri}`}
                data-cursor
                aria-label={`Rod ${ri + 1} heaven bead, currently ${rod.heaven ? 'engaged' : 'resting'}`}
                {...beadHandlers(ri, 'heaven', 0)}
                className="absolute cursor-grab active:cursor-grabbing"
                style={{ ...HEAVEN_BEAD, left: ri * ROD_W + ROD_W / 2 - BEAD_W / 2 }}
                initial={false}
                animate={{ y: heavenY(rod.heaven) }}
                transition={{ type: 'spring', stiffness: 520, damping: 26 }}
              />
              {[0, 1, 2, 3].map((bi) => (
                <motion.button
                  key={bi}
                  data-testid={`abacus-earth-${ri}-${bi}`}
                  data-cursor
                  aria-label={`Rod ${ri + 1} earth bead ${bi + 1}`}
                  {...beadHandlers(ri, 'earth', bi)}
                  className="absolute cursor-grab active:cursor-grabbing"
                  style={{ ...EARTH_BEAD, left: ri * ROD_W + ROD_W / 2 - BEAD_W / 2 }}
                  initial={false}
                  animate={{ y: earthY(bi, bi < rod.earth) }}
                  transition={{ type: 'spring', stiffness: 520, damping: 26 }}
                />
              ))}
            </span>
          ))}
        </div>
      </div>
      <div
        className="mt-3 flex items-center justify-between font-mono text-[9px] tracking-[0.3em] text-ink-mute"
        style={{ width: ROD_W * 4 + 28 }}
      >
        <span data-testid="abacus-value">READS {value}</span>
        {value !== YEAR && (
          <button data-testid="abacus-reset" data-cursor onClick={reset} className="text-gold transition-opacity hover:opacity-70">
            RESET — {YEAR}
          </button>
        )}
      </div>
    </div>
  )
}
