import { Container } from '@/components/atoms/Container'
import { SectionHeader } from '@/components/atoms/SectionHeader'
import { WorkCard } from '@/components/molecules/WorkCard'
import { workItems } from '@/data/work'

export function WorkSection() {
  return (
    <section id="work" className="border-b border-border py-20">
      <Container>
        <SectionHeader
          title="Products built by RenderNext"
          description="The best proof is working software. FurnishAR and Propunem show how RenderNext approaches web applications, product workflows, business logic, and buyer-facing digital experiences."
        />

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {workItems.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
      </Container>
    </section>
  )
}