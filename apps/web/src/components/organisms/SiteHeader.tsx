import Link from 'next/link'
import { Button } from '@/components/atoms/Button'
import { Container } from '@/components/atoms/Container'
import { navigationItems, siteConfig } from '@/data/site'

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <Container>
        <nav className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className="font-display text-xl font-bold uppercase tracking-[-0.04em] text-on-surface sm:text-2xl"
          >
            {siteConfig.name}
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-label text-xs font-medium uppercase tracking-[0.14em] text-on-surface-muted transition hover:text-primary-soft"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Button href={siteConfig.cta.href} className="hidden md:inline-flex">
            {siteConfig.cta.label}
          </Button>

          <Link
            href="/contact"
            className="font-label text-xs font-semibold uppercase tracking-[0.14em] text-primary md:hidden"
          >
            Contact
          </Link>
        </nav>
      </Container>
    </header>
  )
}