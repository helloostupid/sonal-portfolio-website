import { motion, useScroll, useSpring } from 'motion/react'
import { Toaster } from '@/components/ui/sonner'
import { useLenis, scrollToSection } from '@/lib/lenis'
import { CustomCursor } from '@/components/portfolio/CustomCursor'
import { NavigationHeader } from '@/components/portfolio/NavigationHeader'
import { HeroOpening } from '@/components/portfolio/HeroOpening'
import { Marquee } from '@/components/portfolio/Marquee'
import { AboutManifesto } from '@/components/portfolio/AboutManifesto'
import { WorkChapters } from '@/components/portfolio/WorkChapters'
import { ProjectsGallery } from '@/components/portfolio/ProjectsGallery'
import { EducationVisual } from '@/components/portfolio/EducationVisual'
import { AchievementsArtifacts } from '@/components/portfolio/AchievementsArtifacts'
import { ContactEnding } from '@/components/portfolio/ContactEnding'

export default function Home() {
  useLenis(true)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26 })

  const handleNavigate = (id: string) => scrollToSection(id)

  return (
    <div data-testid="portfolio-root" className="grain relative min-h-svh">
      <CustomCursor />
      <motion.div
        data-testid="scroll-progress"
        aria-hidden
        className="fixed inset-x-0 top-0 z-[110] h-[2px] origin-left bg-gold/70"
        style={{ scaleX: progress }}
      />
      <NavigationHeader onNavigate={handleNavigate} />
      <main>
        <HeroOpening />
        <Marquee />
        <AboutManifesto />
        <WorkChapters />
        <ProjectsGallery />
        <EducationVisual />
        <AchievementsArtifacts />
        <ContactEnding />
      </main>
      <Toaster position="bottom-center" />
    </div>
  )
}
