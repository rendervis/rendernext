import type { MetadataRoute } from 'next'
import { getAllArticles } from '@/content/articles'

const baseUrl = 'https://www.rendernext.eu'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticles()

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...articles.map((article) => ({
      url: `${baseUrl}/articles/${article.slug}`,
      lastModified: new Date(article.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}