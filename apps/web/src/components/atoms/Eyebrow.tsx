import { cn } from '@/lib/cn'

type EyebrowProps = Readonly<{
  children: React.ReactNode
  className?: string
}>

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        'font-label text-xs font-medium uppercase tracking-[0.18em] text-primary',
        className
      )}
    >
      {children}
    </p>
  )
}