import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'

const eslintConfig = [
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'public/rss/**',
      'next-env.d.ts',
      'eslint.config.mjs',
      'postcss.config.js',
      'next.config.mjs',
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      '@next/next/no-html-link-for-pages': 'off',
    },
    settings: {
      next: {
        rootDir: 'apps/web/',
      },
    },
  },
]

export default eslintConfig