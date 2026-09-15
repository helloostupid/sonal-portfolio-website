import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { useTheme } from '@/lib/theme'
import { scrollToTop } from '@/lib/lenis'
import { chime } from '@/lib/ambient'
import { Magnetic } from './Magnetic'

const LINKS = [
  { id: 'about', label: 'About', num: '01' },
  { id: 'work', label: 'Work', num: '02' },
  { id: 'projects', label: 'Projects', num: '03' },
  { id: 'education', label: 'Education', num: '04' },
  { id: 'achievements', label: 'Awards', num: '05' },
  { id: 'contact', label: 'Contact', num: '06' },
]

interface Props {
  onNavigate: (id: string) => void
}

export function NavigationHeader({ onNavigate }: Props) {
  const { theme, toggle } = useTheme()
  const [open, setOpen] = useState(false)

  const go = (id: string) => {
    setOpen(false)
    onNavigate(id)
  }

  return (
    <>
      <motion.header
        data-testid="nav-header"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-[100] flex items-center justify-between px-5 py-4 sm:px-8"
      >
        <Magnetic strength={0.25}>
          <button
            data-testid="nav-brand"
            data-cursor
            onClick={scrollToTop}
            className="glass-hud flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[11px] tracking-[0.25em] text-ink"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" />
            SG — VOL.01
          </button>
        </Magnetic>

        <nav className="glass-hud hidden items-center gap-0.5 rounded-full px-1.5 py-1 lg:flex" aria-label="Sections">
          {LINKS.map((l) => (
            <button
              key={l.id}
              data-testid={`nav-link-${l.id}`}
              data-cursor
              onClick={() => go(l.id)}
              className="rounded-full px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] text-ink-mute transition-colors duration-300 hover:bg-gold/10 hover:text-ink"
            >
              {l.label.toUpperCase()}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Magnetic strength={0.3}>
            <button
              data-testid="theme-toggle-button"
              data-cursor
              onClick={toggle}
              aria-label="Toggle atmosphere"
              className="glass-hud flex h-9 w-9 items-center justify-center rounded-full text-ink transition-transform duration-500 hover:rotate-180"
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </Magnetic>

          <Magnetic strength={0.3}>
            <button
              data-testid="nav-menu-button"
              data-cursor
              onClick={() => {
                setOpen(true)
                chime()
              }}
              aria-label="Open menu"
              className="glass-hud flex h-9 w-9 items-center justify-center rounded-full text-ink lg:hidden"
            >
              <Menu size={15} />
            </button>
          </Magnetic>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="nav-mobile-menu"
            initial={{ opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[160] flex flex-col justify-between bg-paper/95 px-6 pb-10 pt-5 backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-[0.3em] text-ink-mute">SG — INDEX</span>
              <button
                data-testid="nav-menu-close"
                data-cursor
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="glass-hud flex h-10 w-10 items-center justify-center rounded-full text-ink"
              >
                <X size={16} />
              </button>
            </div>
            <nav className="flex flex-col" aria-label="Sections">
              {LINKS.map((l, i) => (
                <motion.button
                  key={l.id}
                  data-testid={`nav-mobile-link-${l.id}`}
                  data-cursor
                  onClick={() => go(l.id)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex items-baseline gap-4 border-b border-line py-3.5 text-left"
                >
                  <span className="font-mono text-[10px] tracking-[0.25em] text-gold">{l.num}</span>
                  <span className="font-display text-4xl tracking-tight transition-all duration-300 group-hover:translate-x-2 group-hover:text-gold">
                    {l.label}
                  </span>
                </motion.button>
              ))}
            </nav>
            <p className="font-mono text-[9px] tracking-[0.3em] text-ink-mute">CURIOUS BY DEFAULT</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
