import nextMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypePrism from '@mapbox/rehype-prism'
import  withPlugins from 'next-compose-plugins'
import path from 'path'


/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  reactStrictMode: true,
  // transpilePackages: ['p5playground', 'ui'],
  experimental: {
    scrollRestoration: true,
  },
  webpack: (config) => {
    config.resolve.alias['p5playground'] = path.resolve(
      process.cwd(),
      '../../packages/p5playground/dist/js'
    )
    return config
  },
}



const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrism],
  },
})

export default withPlugins([withMDX],nextConfig)

