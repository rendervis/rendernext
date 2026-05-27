import Link from 'next/link'
import { cn } from '@/lib/cn'

type ButtonVariant = 'primary' | 'secondary'

type ButtonProps = Readonly<{
  children: React.ReactNode
  href?: string
  className?: string
  variant?: ButtonVariant
}>

const variantClassName: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-[#2a1700] hover:bg-primary-soft focus-visible:outline-primary',
  secondary:
    'border border-on-surface text-on-surface hover:bg-on-surface hover:text-background focus-visible:outline-on-surface',
}

export function Button({
  children,
  href,
  className,
  variant = 'primary',
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center rounded px-6 py-3 font-label text-xs font-semibold uppercase tracking-[0.12em] transition active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
    variantClassName[variant],
    className
  )

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return <button className={classes}>{children}</button>
}