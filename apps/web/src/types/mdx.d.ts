// apps/web/src/types/mdx.d.ts
declare module '*.mdx' {
  import type { ReactNode } from 'react'

  export const metadata: {
    title: string
    description: string
    date: string
    readingTime: string
  }

  const MDXContent: (props: Record<string, never>) => ReactNode

  export default MDXContent
}