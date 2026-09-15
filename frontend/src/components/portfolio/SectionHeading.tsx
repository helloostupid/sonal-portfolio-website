import { motion } from 'motion/react'

interface Props {
  chapter: string
  label: string
  title: string
  accent?: string
  testId?: string
}

export function SectionHeading({ chapter, label, title, accent, testId }: Props) {
  return (
    <div data-testid={testId} className="mb-12 sm:mb-16">
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-4 font-mono text-[10px] tracking-[0.35em] text-gold sm:text-xs"
      >
        {chapter} // {label}
      </motion.p>
      <motion.h2
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        className="overflow-hidden font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
      >
        <motion.span
          variants={{ hidden: { y: '110%' }, show: { y: 0 } }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="block"
        >
          {title} {accent && <em className="text-gold">{accent}</em>}
        </motion.span>
      </motion.h2>
    </div>
  )
}
