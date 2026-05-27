import { Container } from '@/components/atoms/Container'
import { SectionHeader } from '@/components/atoms/SectionHeader'
import { ServiceCard } from '@/components/molecules/ServiceCard'
import { services } from '@/data/services'

export function ServicesSection() {
  return (
    <section id="services" className="border-border bg-surface border-b py-20">
      <Container>
        <SectionHeader
          title="Web products built around real business workflows"
          description="RenderNext focuses on practical software: custom web apps, SaaS MVPs, product websites, dashboards, and interactive product presentation tools."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </Container>
    </section>
  )
}
