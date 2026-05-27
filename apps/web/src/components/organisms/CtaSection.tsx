import { Button } from '@/components/atoms/Button'
import { Container } from '@/components/atoms/Container'

export function CtaSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-primary py-20 text-[#2a1700]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,#2a1700_1px,transparent_1px)] bg-[size:80px_80px] opacity-10"
      />

      <Container className="relative text-center">
        <h2 className="mx-auto max-w-4xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
          Have a product, workflow, or web app that needs to become real?
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-7">
          Tell us what you are building, what problem it needs to solve, and
          where the project is today. We will help clarify the next practical
          step.
        </p>

        <Button
          href="/contact"
          className="mt-10 bg-background text-on-surface hover:bg-surface"
        >
          Start a project
        </Button>
      </Container>
    </section>
  )
}