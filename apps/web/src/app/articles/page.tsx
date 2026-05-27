// apps/web/src/app/articles/page.tsx
import type { Metadata } from 'next'
import { Container } from '@/components/atoms/Container'
import { ArticleCard } from '@/components/articles/ArticleCard'
import { getAllArticles } from '@/content/articles'

export const metadata: Metadata = {
  title: 'Articles',
  description:
    'Articles from Render Next about web app development, SaaS product development, product websites, workflows, and interactive product presentation.',
  alternates: {
    canonical: '/articles',
  },
}

export default async function ArticlesPage() {
  const articles = await getAllArticles()

  return (
    <section className="border-b border-border py-20">
      <Container>
        <div className="max-w-3xl">
          <p className="font-label text-xs font-medium uppercase tracking-[0.18em] text-primary">
            [ Articles ]
          </p>

          <h1 className="mt-6 text-5xl font-semibold tracking-[-0.05em] text-on-surface sm:text-6xl">
            Practical notes on web products, workflows, and digital product
            presentation.
          </h1>

          <p className="mt-8 text-lg leading-8 text-on-surface-muted">
            Thinking from Render Next on custom web apps, SaaS MVPs, product
            websites, interactive product experiences, and building useful
            software for real business workflows.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </Container>
    </section>
  )
}