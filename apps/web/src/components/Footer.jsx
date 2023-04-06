import Link from 'next/link'

import { Container } from '@/components/Container'

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="transition hover:text-teal-500"
    >
      {children}
    </Link>
  )
}

export function Footer() {
  return (
    <footer className="mb-0 mt-auto">
      <Container>
        <div className="border-t border-zinc-100 pt-10 pb-16">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex gap-6 text-sm font-medium text-zinc-800">
              <NavLink href="/">About</NavLink>
              <NavLink href="/articles">Articles</NavLink>
              <NavLink href="/projects">Projects</NavLink>
            </div>
            <p className="text-sm text-zinc-400">
              &copy; {new Date().getFullYear()} RENDERNEXT. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
