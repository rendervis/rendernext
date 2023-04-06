# rendernext
Info blog. A place to showcase portfolio, ideas, sketches and games.

# Turborepo Tailwind CSS starter
This used to be the official [starter](https://github.com/vercel/turbo/tree/main/examples/with-tailwind) Turborepo.
## What's inside?

This repo includes the following packages/apps:
### Apps and Packages

- `docs`:
    * a [Next.js](https://nextjs.org/) app with [Tailwind CSS](https://tailwindcss.com/)
    * remains untoched as the site is this a work in progress
- `web`: nextJS app with [Tailwind CSS](https://tailwindcss.com/)
- `ui`: [work in progress]
    * a React component library with sass shared by both `web` and `docs` applications
    * webpack5 as builder
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo



### Utilities

This repo has some additional tools already setup for you:

- [Tailwind CSS](https://tailwindcss.com/) for styles
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## Using this example

Run the following command:
```sh
cd "root"
pnpm install
git init . && git add . && git commit -m "Init"
```
