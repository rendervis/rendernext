import type { ServiceItem } from '@/data/services'

type ServiceCardProps = Readonly<{
  service: ServiceItem
}>

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="group flex h-full flex-col border border-border bg-surface-container p-6 transition hover:border-primary">
      <div className="mb-8 flex items-start justify-between gap-6">
        <span className="block h-8 w-8 border border-primary bg-primary/10" />
        <span className="font-label text-[11px] uppercase tracking-[0.14em] text-on-surface-muted/50">
          [{service.eyebrow}]
        </span>
      </div>

      <h3 className="text-xl font-semibold tracking-[-0.02em] text-on-surface">
        {service.title}
      </h3>

      <p className="mt-4 flex-1 text-sm leading-7 text-on-surface-muted">
        {service.description}
      </p>
    </article>
  )
}