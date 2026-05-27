import { AboutSection } from '@/components/organisms/AboutSection'
import { CtaSection } from '@/components/organisms/CtaSection'
import { HeroSection } from '@/components/organisms/HeroSection'
import { ProcessSection } from '@/components/organisms/ProcessSection'
import { ServicesSection } from '@/components/organisms/ServicesSection'
import { ProductVisualizationSection } from '@/components/organisms/ProductVisualizationSection'
import { WorkSection } from '@/components/organisms/WorkSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <WorkSection />
      <ProcessSection />
      <ProductVisualizationSection />
      <AboutSection />
      <CtaSection />
    </>
  )
}
