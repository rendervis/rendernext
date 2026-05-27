import { Eyebrow } from '@/components/atoms/Eyebrow'
import { cn } from '@/lib/cn'

type SectionHeaderProps = Readonly<{
  eyebrow?: string
  title: string
  description?: string
  className?: string
}>

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('max-w-3xl border-l-4 border-primary pl-6', className)}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-on-surface sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 max-w-2xl text-lg leading-8 text-on-surface-muted">
          {description}
        </p>
      ) : null}
    </div>
  )
}