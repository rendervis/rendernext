// apps/web/next.config.mjs
import createMDX from '@next/mdx'

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: ['remark-gfm'],
    rehypePlugins: ['@mapbox/rehype-prism'],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  reactStrictMode: true,
  transpilePackages: ['p5playground', 'ui'],

}

export default withMDX(nextConfig)