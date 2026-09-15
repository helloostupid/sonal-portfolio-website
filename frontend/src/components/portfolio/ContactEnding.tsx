import { motion } from 'motion/react'
import { ArrowUpRight, Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { contact, identity } from '@/data/portfolioData'
import { Magnetic } from './Magnetic'

export function ContactEnding() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(identity.email)
      setCopied(true)
      toast.success('Email copied — talk soon.')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error(`Copy failed — it's ${identity.email}`)
    }
  }

  const channels = [
    { label: 'GitHub', value: identity.github.replace('https://', ''), href: identity.github, testId: 'contact-github-link' },
    { label: 'LinkedIn', value: identity.linkedin.replace('https://', ''), href: identity.linkedin, testId: 'contact-linkedin-link' },
  ]

  return (
    <section id="contact" data-testid="contact-section" className="relative flex flex-col overflow-hidden px-5 py-16 sm:px-10 sm:py-20 lg:px-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,var(--gold)_-60%,transparent_55%)] opacity-[0.14]" aria-hidden />

      <div className="relative">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8 font-mono text-[10px] tracking-[0.35em] text-gold sm:text-xs"
        >
          {contact.chapter} // CONTACT
        </motion.p>

        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="font-display leading-[1.02] tracking-tight"
        >
          {contact.heading.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-1">
              <motion.span
                variants={{ hidden: { y: '112%' }, show: { y: 0 } }}
                transition={{ duration: 1.1, delay: i * 0.14, ease: [0.16, 1, 0.3, 1] }}
                className={`block text-4xl sm:text-6xl lg:text-7xl ${i === 1 ? 'italic text-gold' : ''}`}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 max-w-sm text-sm leading-relaxed text-ink-mute"
        >
          {contact.note}
        </motion.p>
      </div>

      <div className="relative mt-12 flex flex-1 flex-col">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="border-t border-line"
        >
          <div className="group flex items-center justify-between gap-4 border-b border-line py-6 sm:py-8">
            <Magnetic strength={0.15} className="min-w-0 flex-1">
              <button
                data-testid="contact-email-trigger"
                data-cursor
                onClick={copyEmail}
                className="flex min-w-0 items-baseline gap-4 text-left sm:gap-8"
              >
                <span className="shrink-0 font-mono text-[10px] tracking-[0.3em] text-ink-mute sm:text-xs">EMAIL</span>
                <span className="truncate font-display text-xl tracking-tight transition-all duration-500 group-hover:translate-x-2 group-hover:text-gold sm:text-4xl">
                  {identity.email}
                </span>
              </button>
            </Magnetic>
            <button
              data-testid="contact-email-copy"
              data-cursor
              onClick={copyEmail}
              aria-label="Copy email"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-ink-mute transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              {copied ? <Check size={15} className="text-gold" /> : <Copy size={15} />}
            </button>
          </div>

          {channels.map((c) => (
            <div key={c.label} className="group border-b border-line">
              <Magnetic strength={0.15}>
                <a
                  data-testid={c.testId}
                  data-cursor
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-4 py-6 sm:py-8"
                >
                  <span className="flex min-w-0 items-baseline gap-4 sm:gap-8">
                    <span className="shrink-0 font-mono text-[10px] tracking-[0.3em] text-ink-mute sm:text-xs">{c.label.toUpperCase()}</span>
                    <span className="truncate font-display text-xl tracking-tight transition-all duration-500 group-hover:translate-x-2 group-hover:text-gold sm:text-4xl">
                      {c.value}
                    </span>
                  </span>
                  <ArrowUpRight size={20} className="shrink-0 text-ink-mute transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-gold" />
                </a>
              </Magnetic>
            </div>
          ))}
        </motion.div>

        <div className="mt-auto flex items-center justify-between pt-10 font-mono text-[9px] tracking-[0.25em] text-ink-mute sm:text-[10px]">
          <span>© 2026 {identity.name.toUpperCase()}</span>
          <span className="hidden sm:inline">CURIOUS BY DEFAULT</span>
          <span>{identity.location.toUpperCase()}</span>
        </div>
      </div>
    </section>
  )
}
