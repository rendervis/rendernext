import { cn } from '@/lib/cn'

type ContainerProps = Readonly<{
  children: React.ReactNode
  className?: string
}>

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full max-w-site px-6 sm:px-10', className)}>
      {children}
    </div>
  )
}