import { Container } from '@/components/atoms/Container'
import { Eyebrow } from '@/components/atoms/Eyebrow'

export function ProductVisualizationSection() {
  return (
    <section className="border-b border-border py-20">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div
              aria-hidden="true"
              className="relative aspect-square overflow-hidden border border-border bg-surface"
            >
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#333333_1px,transparent_1px),linear-gradient(to_bottom,#333333_1px,transparent_1px)] bg-[size:42px_42px] opacity-30" />
              <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-primary/60 bg-primary/10" />
              <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 border border-on-surface-muted/30 bg-background/70" />
              <div className="absolute bottom-6 left-6 border border-border bg-background px-3 py-2 font-label text-[10px] uppercase tracking-[0.14em] text-on-surface-muted">
                Product visualization
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <Eyebrow>[ 3D product presentation ]</Eyebrow>

            <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-on-surface sm:text-5xl">
              3D rendering and interactive product visuals, connected to the web experience.
            </h2>

            <div className="mt-8 max-w-3xl space-y-5 text-lg leading-8 text-on-surface-muted">
              <p>
                RenderNext can support 3D rendering, product visualization, and
                browser-based 3D presentation when a product needs to be shown
                more clearly online.
              </p>
              <p>
                This is especially useful for furniture, configurable products,
                material options, product catalogs, sales presentations, and
                product pages where static images do not explain enough.
              </p>
              <p>
                The goal is not to mix unrelated services. The goal is to use 3D
                where it helps a buyer understand the product, compare options,
                or see the product in context.
              </p>
            </div>

            <ul className="mt-8 grid grid-cols-1 gap-4 font-label text-xs uppercase tracking-[0.12em] text-on-surface sm:grid-cols-3">
              <li className="border border-border bg-surface-container p-4">
                3D product rendering
              </li>
              <li className="border border-border bg-surface-container p-4">
                Product configurators
              </li>
              <li className="border border-border bg-surface-container p-4">
                AR product viewers
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}