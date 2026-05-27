import type { ProcessStepItem } from '@/data/process'

type ProcessStepProps = Readonly<{
  step: ProcessStepItem
}>

export function ProcessStep({ step }: ProcessStepProps) {
  return (
    <article className="border-t border-border pt-6">
      <span className="block text-5xl font-semibold tracking-[-0.06em] text-primary/20">
        {step.number}
      </span>

      <h3 className="mt-4 text-xl font-semibold tracking-[-0.02em] text-on-surface">
        {step.title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-on-surface-muted">
        {step.description}
      </p>
    </article>
  )
}