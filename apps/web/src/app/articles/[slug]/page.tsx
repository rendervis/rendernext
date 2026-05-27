// apps/web/src/app/articles/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArticleShell } from '@/components/articles/ArticleShell'
import { getAllArticles, getArticleBySlug } from '@/content/articles'

type ArticlePageProps = Readonly<{
  params: Promise<{
    slug: string
  }>
}>

export const dynamicParams = false

export async function generateStaticParams() {
  const articles = await getAllArticles()

  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    return {
      title: 'Article not found',
    }
  }

  return {
    title: article.meta.title,
    description: article.meta.description,
    alternates: {
      canonical: `/articles/${article.meta.slug}`,
    },
    openGraph: {
      type: 'article',
      title: article.meta.title,
      description: article.meta.description,
      url: `/articles/${article.meta.slug}`,
      publishedTime: article.meta.date,
    },
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const content = article.Content({})

  return <ArticleShell article={article.meta}>{content}</ArticleShell>
}
