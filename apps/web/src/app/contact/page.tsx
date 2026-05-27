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
    <section className="border-b border-border py-20">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="font-label text-xs font-medium uppercase tracking-[0.18em] text-primary">
              [ Contact ]
            </p>

            <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.05em] text-on-surface sm:text-6xl">
              Tell us what you want to build.
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-on-surface-muted">
              Render Next works on practical web products: custom web apps, SaaS
              MVPs, dashboards, product websites, and interactive 3D product
              presentation tools.
            </p>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-on-surface-muted">
              Share the problem, the current state of the project, and what the
              first useful version needs to accomplish. We will help clarify the
              next practical step.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button href="mailto:rendervis333@gmail.com">
                Email Render Next
              </Button>
              <Button href="/#work" variant="secondary">
                View work
              </Button>
            </div>

            <p className="mt-6 font-label text-xs uppercase tracking-[0.14em] text-on-surface-muted/60">
              rendervis333@gmail.com
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="border border-border bg-surface-container p-6">
              <p className="font-label text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                Good-fit projects
              </p>

              <ul className="mt-6 space-y-4">
                {projectTypes.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-6 text-on-surface-muted"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 border border-border bg-background p-6">
              <p className="font-label text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                Useful context to include
              </p>

              <ul className="mt-6 space-y-4">
                {usefulContext.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-6 text-on-surface-muted"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-primary" />
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