import type { Metadata } from 'next'
import { Button } from '@/components/atoms/Button'
import { Container } from '@/components/atoms/Container'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Render Next to discuss a custom web app, SaaS MVP, dashboard, product website, or interactive 3D product presentation project.',
  alternates: {
    canonical: '/contact',
  },
}

const projectTypes = [
  'Custom web app or dashboard',
  'SaaS MVP or product platform',
  'Product website or launch page',
  'Interactive 3D product presentation',
  'Configurator, catalog, or workflow tool',
] as const

const usefulContext = [
  'What you want to build',
  'What exists today',
  'Who will use it',
  'What the first useful version needs to do',
  'Whether the project involves 3D, product visualization, or configuration logic',
] as const

export default function ContactPage() {
  return (
    <section className="border-border border-b py-20">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="font-label text-primary text-xs font-medium tracking-[0.18em] uppercase">
              [ Contact ]
            </p>

            <h1 className="text-on-surface mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">
              Tell us what you want to build.
            </h1>

            <p className="text-on-surface-muted mt-8 max-w-2xl text-lg leading-8">
              Render Next works on practical web products: custom web apps, SaaS
              MVPs, dashboards, product websites, and interactive 3D product
              presentation tools.
            </p>

            <p className="text-on-surface-muted mt-5 max-w-2xl text-lg leading-8">
              Share the problem, the current state of the project, and what the
              first useful version needs to accomplish. We will help clarify the
              next practical step.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button href="mailto:office.rendernext@gmail.com">
                Email Render Next
              </Button>
              <Button href="/#work" variant="secondary">
                View work
              </Button>
            </div>

            <p className="font-label text-on-surface-muted/60 mt-6 text-xs tracking-[0.14em] uppercase">
              office.rendernext@gmail.com
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="border-border bg-surface-container border p-6">
              <p className="font-label text-primary text-xs font-semibold tracking-[0.14em] uppercase">
                Good-fit projects
              </p>

              <ul className="mt-6 space-y-4">
                {projectTypes.map((item) => (
                  <li
                    key={item}
                    className="text-on-surface-muted flex gap-3 text-sm leading-6"
                  >
                    <span className="bg-primary mt-2 h-1.5 w-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-border bg-background mt-6 border p-6">
              <p className="font-label text-primary text-xs font-semibold tracking-[0.14em] uppercase">
                Useful context to include
              </p>

              <ul className="mt-6 space-y-4">
                {usefulContext.map((item) => (
                  <li
                    key={item}
                    className="text-on-surface-muted flex gap-3 text-sm leading-6"
                  >
                    <span className="bg-primary mt-2 h-1.5 w-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
