import Link from 'next/link'
import { Container } from '@/components/atoms/Container'
import { footerContentItems, navigationItems, siteConfig } from '@/data/site'

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface-container-lowest">
      <Container className="py-12">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div>
            <Link
              href="/"
              className="font-display text-3xl font-semibold uppercase tracking-[-0.04em] text-on-surface"
            >
              {siteConfig.name}
            </Link>
            <p className="mt-4 max-w-sm font-label text-xs uppercase tracking-[0.12em] text-on-surface-muted">
              {siteConfig.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <p className="mb-4 font-label text-[11px] uppercase tracking-[0.14em] text-primary">
                Navigation
              </p>
              <div className="flex flex-col gap-3">
                {navigationItems.slice(0, 4).map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm text-on-surface-muted transition hover:text-primary-soft"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-4 font-label text-[11px] uppercase tracking-[0.14em] text-primary">
                Content
              </p>
              <div className="flex flex-col gap-3">
                {footerContentItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm text-on-surface-muted transition hover:text-primary-soft"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-4 font-label text-[11px] uppercase tracking-[0.14em] text-primary">
                Contact
              </p>
              <div className="flex flex-col gap-3">
                <Link
                  href="/contact"
                  className="text-sm text-on-surface-muted transition hover:text-primary-soft"
                >
                  Start a project
                </Link>
                <a
                  href="mailto:office.rendernext@gmail.com"
                  className="text-sm text-on-surface-muted transition hover:text-primary-soft"
                >
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6">
          <p className="font-label text-[11px] uppercase tracking-[0.14em] text-on-surface-muted/60">
            © 2022 RenderNext. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}