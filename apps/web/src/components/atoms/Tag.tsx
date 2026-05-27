import { cn } from '@/lib/cn'

type TagProps = Readonly<{
  children: React.ReactNode
  className?: string
}>

export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex rounded bg-primary px-2 py-1 font-label text-[10px] font-semibold uppercase tracking-[0.14em] text-[#2a1700]',
        className
      )}
    >
      {children}
    </span>
  )
}