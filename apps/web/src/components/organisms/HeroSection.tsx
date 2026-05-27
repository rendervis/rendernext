import { Button } from '@/components/atoms/Button'
import { Container } from '@/components/atoms/Container'
import { Eyebrow } from '@/components/atoms/Eyebrow'
import { P5EffectFrame } from '../effects/P5EffectFrame'

function HeroVisual() {
  return (
    <div
      aria-hidden="true"
      className="border-border bg-surface-container relative min-h-[420px] overflow-hidden border md:min-h-[520px]"
    >
      <P5EffectFrame
        id="rendernext-hero-pointillism"
        variant="pointillism"
        className="opacity-35"
      />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#333333_1px,transparent_1px),linear-gradient(to_bottom,#333333_1px,transparent_1px)] bg-[size:56px_56px] opacity-25" />

      <div className="border-border bg-background font-label text-on-surface-muted absolute top-6 left-6 border px-3 py-2 text-[10px] tracking-[0.14em] uppercase">
        Active session: product execution
      </div>

      <div className="border-border bg-surface absolute top-24 right-8 left-8 border p-4">
        <div className="bg-primary mb-4 h-2 w-24" />
        <div className="grid grid-cols-3 gap-3">
          <div className="border-border bg-surface-container-high h-20 border" />
          <div className="border-border bg-surface-container-high h-20 border" />
          <div className="border-primary/50 bg-primary/10 h-20 border" />
        </div>
      </div>

      <div className="border-border bg-background/90 absolute bottom-20 left-10 h-36 w-40 border p-3">
        <div className="bg-on-surface-muted/40 mb-3 h-2 w-16" />
        <div className="space-y-2">
          <div className="bg-on-surface-muted/30 h-2" />
          <div className="bg-on-surface-muted/20 h-2" />
          <div className="bg-primary/60 h-2" />
        </div>
      </div>

      <div className="border-primary/50 bg-primary/10 absolute right-8 bottom-8 h-40 w-40 border" />

      <div className="border-border bg-background font-label text-on-surface-muted absolute right-6 bottom-6 border px-3 py-2 text-[10px] tracking-[0.14em] uppercase">
        [ web / saas / 3d ]
      </div>
    </div>
  )
}

export function HeroSection() {
  return (
    <section className="border-border border-b py-20 sm:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col justify-center lg:col-span-7">
            <Eyebrow>[ Product-minded web development ]</Eyebrow>

            <h1 className="text-on-surface mt-6 max-w-5xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl lg:text-7xl">
              Web apps, SaaS products, and interactive product experiences.
            </h1>

            <p className="text-on-surface-muted mt-8 max-w-2xl text-lg leading-8">
              RenderNext builds custom web applications, SaaS MVPs, product
              websites, dashboards, and 3D product presentation tools for
              businesses that need practical software around real workflows.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button href="/contact">Start a project</Button>
              <Button href="/#work" variant="secondary">
                View selected work
              </Button>
            </div>

            <p className="font-label text-on-surface-muted/60 mt-10 text-xs tracking-[0.14em] uppercase">
              Small, senior-led, execution-focused.
            </p>
          </div>

          <div className="lg:col-span-5">
            <HeroVisual />
          </div>
        </div>
      </Container>
    </section>
  )
}
