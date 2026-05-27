import { Container } from '@/components/atoms/Container'

export function AboutSection() {
  return (
    <section id="about" className="border-border bg-surface border-b py-20">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2 className="text-on-surface max-w-4xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Small by design. Product focused by default.
            </h2>

            <div className="text-on-surface-muted mt-8 max-w-3xl space-y-5 text-lg leading-8">
              <p>RenderNext is a small product development company.</p>
              <p>
                The focus is on building useful web based products: SaaS
                platforms, dashboards, workflow tools, product websites, and
                interactive digital experiences.
              </p>
              <p>
                The company is intentionally lean, which keeps the work close to
                the product problem and avoids unnecessary layers. When a
                project needs additional specialist support, the structure can
                expand around the work without pretending to be a large agency.
              </p>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="border-border bg-surface-container border p-6">
              <div className="border-border bg-background flex aspect-square items-center justify-center border">
                <div className="text-center">
                  <div className="bg-primary mx-auto mb-6 h-24 w-24 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
