// apps/web/src/components/articles/ArticleCard.tsx
import Link from 'next/link'
import type { ArticleSummary } from '@/content/articles'

type ArticleCardProps = Readonly<{
  article: ArticleSummary
}>

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="border-border bg-surface-container hover:border-primary border p-6 transition">
      <p className="font-label text-on-surface-muted/60 text-[11px] tracking-[0.14em] uppercase">
        {article.date} · {article.readingTime}
      </p>

      <h2 className="text-on-surface mt-5 text-2xl font-semibold tracking-[-0.03em]">
        <Link href={`/articles/${article.slug}`} className="hover:text-primary">
          {article.title}
        </Link>
      </h2>

      <p className="text-on-surface-muted mt-4 text-sm leading-7">
        {article.description}
      </p>

      <Link
        href={`/articles/${article.slug}`}
        className="font-label text-primary hover:text-primary-soft mt-8 inline-flex text-xs font-semibold tracking-[0.14em] uppercase transition"
      >
        Read article →
      </Link>
    </article>
  )
}
