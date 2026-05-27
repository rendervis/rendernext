// apps/web/src/content/articles/index.ts
import { readdir } from 'node:fs/promises'
import path from 'node:path'
import type { ReactNode } from 'react'

const ARTICLES_DIRECTORY = path.join(process.cwd(), 'src/content/articles')

const ARTICLE_FILE_EXTENSION = '.mdx'

const articleSlugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export type ArticleMetadata = Readonly<{
  title: string
  description: string
  date: string
  readingTime: string
}>

export type ArticleSummary = ArticleMetadata &
  Readonly<{
    slug: string
  }>

type ArticleModule = Readonly<{
  default: (props: Record<string, never>) => ReactNode
  metadata: ArticleMetadata
}>

export type LoadedArticle = Readonly<{
  meta: ArticleSummary
  Content: (props: Record<string, never>) => ReactNode
}>

function isValidArticleSlug(slug: string): boolean {
  return articleSlugPattern.test(slug)
}

async function getArticleSlugs(): Promise<string[]> {
  const files = await readdir(ARTICLES_DIRECTORY)

  return files
    .filter((file) => file.endsWith(ARTICLE_FILE_EXTENSION))
    .map((file) => file.replace(ARTICLE_FILE_EXTENSION, ''))
    .filter(isValidArticleSlug)
}

async function importArticleModule(slug: string): Promise<ArticleModule> {
  if (!isValidArticleSlug(slug)) {
    throw new Error(`Invalid article slug: ${slug}`)
  }

  const mdxModule = await import(`@/content/articles/${slug}.mdx`)
  return mdxModule as ArticleModule
}

export async function getAllArticles(): Promise<ArticleSummary[]> {
  const slugs = await getArticleSlugs()

  const articles = await Promise.all(
    slugs.map(async (slug) => {
      const articleModule = await importArticleModule(slug)

      return {
        slug,
        ...articleModule.metadata,
      }
    }),
  )

  return articles.sort(
    (a, z) => new Date(z.date).getTime() - new Date(a.date).getTime(),
  )
}

export async function getArticleBySlug(
  slug: string,
): Promise<LoadedArticle | null> {
  if (!isValidArticleSlug(slug)) {
    return null
  }

  try {
    const articleModule = await importArticleModule(slug)

    return {
      meta: {
        slug,
        ...articleModule.metadata,
      },
      Content: articleModule.default,
    }
  } catch {
    return null
  }
}
