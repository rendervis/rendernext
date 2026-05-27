import { Container } from '@/components/atoms/Container'
import { ProcessStep } from '@/components/molecules/ProcessStep'
import { processSteps } from '@/data/process'

export function ProcessSection() {
  return (
    <section
      id="process"
      className="border-b border-border bg-surface-container py-20"
    >
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="text-4xl font-semibold tracking-[-0.04em] text-on-surface sm:text-5xl">
              How we work
            </h2>
            <p className="mt-5 text-lg leading-8 text-on-surface-muted">
              RenderNext is intentionally small and practical. The work starts
              with understanding the product, the workflow, and what needs to be
              true for the software to be useful.
            </p>

            <div className="mt-10 border border-border bg-background p-6">
              <p className="font-label text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                Practical execution
              </p>
              <p className="mt-4 text-sm leading-7 text-on-surface-muted">
                The focus is not decoration or unnecessary process. It is useful
                software, clear structure, and a product that can keep improving.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:col-span-8">
            {processSteps.map((step) => (
              <ProcessStep key={step.id} step={step} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}