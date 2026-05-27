// apps/web/src/components/articles/ArticleShell.tsx
import Link from 'next/link'
import type { ArticleSummary } from '@/content/articles'
import { Container } from '@/components/atoms/Container'

type ArticleShellProps = Readonly<{
  article: ArticleSummary
  children: React.ReactNode
}>

export function ArticleShell({ article, children }: ArticleShellProps) {
  return (
    <article className="border-b border-border py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <Link
            href="/articles"
            className="font-label text-xs font-semibold uppercase tracking-[0.14em] text-primary transition hover:text-primary-soft"
          >
            ← Articles
          </Link>

          <header className="mt-10 border-b border-border pb-10">
            <p className="font-label text-xs uppercase tracking-[0.14em] text-on-surface-muted/60">
              {article.date} · {article.readingTime}
            </p>

            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-on-surface sm:text-5xl">
              {article.title}
            </h1>

            <p className="mt-6 text-lg leading-8 text-on-surface-muted">
              {article.description}
            </p>
          </header>

          <div className="rendernext-prose mt-10">{children}</div>
        </div>
      </Container>
    </article>
  )
}