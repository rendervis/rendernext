import type { WorkItem } from '@/data/work'
import { Tag } from '@/components/atoms/Tag'

type WorkCardProps = Readonly<{
  work: WorkItem
}>

export function WorkCard({ work }: WorkCardProps) {
  return (
    <article className="group border border-border bg-surface-container transition hover:border-primary">
      <div
        aria-hidden="true"
        className="relative aspect-video overflow-hidden border-b border-border bg-background"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#333333_1px,transparent_1px),linear-gradient(to_bottom,#333333_1px,transparent_1px)] bg-[size:48px_48px] opacity-30" />
        <div className="absolute inset-6 border border-primary/30 bg-surface/80" />
        <div className="absolute left-10 top-10 h-20 w-40 border border-border bg-surface-container-high" />
        <div className="absolute bottom-10 right-10 h-24 w-32 border border-primary/50 bg-primary/10" />
        <div className="absolute bottom-6 left-6">
          <Tag>{work.label}</Tag>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h3 className="text-3xl font-semibold tracking-[-0.04em] text-on-surface">
              {work.name}
            </h3>
            <p className="mt-3 text-base leading-7 text-on-surface-muted">
              {work.description}
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6">
          <p className="font-label text-[11px] uppercase tracking-[0.14em] text-primary">
            What it shows
          </p>
          <ul className="mt-4 space-y-3">
            {work.proofPoints.map((point) => (
              <li
                key={point}
                className="flex gap-3 text-sm leading-6 text-on-surface-muted"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-primary" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <a
          href={work.href}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-8 inline-flex font-label text-xs font-semibold uppercase tracking-[0.14em] text-primary transition hover:text-primary-soft"
        >
          View project →
        </a>
      </div>
    </article>
  )
}