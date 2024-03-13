/* eslint-disable turbo/no-undeclared-env-vars */
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import { GitHubIcon, LinkedInIcon } from '@/components/SocialIcons'
import causiq from '@/images/logos/causiq.jpg'
import logoRendernext from '@/images/logos/rendernext.svg'
import { formatDate } from '@/lib/formatDate'
import { generateRssFeed } from '@/lib/generateRssFeed'
import { getAllArticles } from '@/lib/getAllArticles'
import { BriefcaseIcon } from '@/components/icons'

const Pointillism = dynamic(
  () =>
    import('p5playground').then((mod) => {
      return mod.Pointillism
    }),
  {
    ssr: false,
  }
)

function Article({ article }) {
  return (
    <Card as="article">
      <Card.Title href={`/articles/${article.slug}`}>
        {article.title}
      </Card.Title>
      <Card.Eyebrow as="time" dateTime={article.date} decorate>
        {formatDate(article.date)}
      </Card.Eyebrow>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  )
}

function SocialLink({ icon: Icon, ...props }) {
  return (
    <Link
      target="_blank"
      rel="noopener noreferrer"
      className="group -m-1 p-1"
      {...props}
    >
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600" />
    </Link>
  )
}

function Resume() {
  let resume = [
    {
      company: 'Rendernext',
      title: 'Fullstack Web Developer',
      logo: logoRendernext,
      start: '2022',
      end: {
        label: 'Present',
        dateTime: new Date().getFullYear(),
      },
    },
    {
      company: 'Causiq',
      title: 'React Developer',
      logo: causiq,
      start: '2021',
      end: '2022',
    },
  ]

  return (
    <div className="rounded-2xl border border-zinc-100 p-6">
      <h2 className="flex text-sm font-semibold text-zinc-900">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <li key={roleIndex} className="flex gap-4">
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5">
              <Image
                src={role.logo}
                alt="Logo image"
                className="h-7 w-7 rounded-full"
                unoptimized
              />
            </div>
            <dl className="flex flex-auto flex-wrap gap-x-2 ">
              <dt className="sr-only">Company</dt>
              <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {role.company}
              </dd>
              <dt className="sr-only">Role</dt>
              <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                {role.title}
              </dd>
              <dt className="sr-only">Date</dt>
              <dd
                className="ml-auto text-xs text-zinc-400"
                aria-label={`${role.start.label ?? role.start} until ${role.end.label ?? role.end
                  }`}
              >
                <time dateTime={role.start.dateTime ?? role.start}>
                  {role.start.label ?? role.start}
                </time>{' '}
                <span aria-hidden="true">—</span>{' '}
                <time dateTime={role.end.dateTime ?? role.end}>
                  {role.end.label ?? role.end}
                </time>
              </dd>
            </dl>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default function Home({ articles }) {
  return (
    <>
      <Head>
        <title>Software developer</title>
        <meta
          name="description"
          content="I am Tălvan Octavian, an application developer from Romania who is passionate about creating user friendly web applications. My specialty lies in React Frontend Development with a strong interest in the Canva API and its related libraries, such as p5JS and threeJS. By leveraging my expertise, I hope to offer creative solutions to companies looking to augment their online presence. Let's work together to materialize your vision with the aid of technology."
        />
      </Head>
      <div className="absolute left-0 top-0 h-full w-full">
        <Pointillism id="canvas-about-page" />
      </div>
      <Container>
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl">
            Software developer.
          </h1>
          <p className="mt-6 text-base text-zinc-600">
            I am Tălvan Octavian, an application developer from Romania who is
            passionate about creating user-friendly web applications. My
            specialty lies in React Frontend Development with a strong interest in the Canva API and its related libraries, such as p5JS and threeJS. By leveraging my expertise, I hope to offer
            creative solutions to companies looking to augment their online
            presence. Let&apos;s work together to materialize your vision with
            the aid of technology.
          </p>
          <div className="mt-6 flex gap-6">
            <SocialLink
              href="https://github.com/rendervis/rendernext"
              aria-label="Follow on GitHub"
              icon={GitHubIcon}
            />
            <SocialLink
              href="https://www.linkedin.com/in/octavian-talvan-1b179388/"
              aria-label="Follow on LinkedIn"
              icon={LinkedInIcon}
            />
          </div>
        </div>
      </Container>
      <div className="flex h-full flex-col">
        <Container className="mt-24 h-full md:mt-28">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
            <div className="flex flex-col gap-16">
              {articles.map((article) => (
                <Article key={article.slug} article={article} />
              ))}
            </div>
            <div className="space-y-10 lg:pl-16 xl:pl-24">
              <Resume />
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}

export async function getStaticProps() {
  if (process.env.NODE_ENV === 'production') {
    await generateRssFeed()
  }

  return {
    props: {
      articles: (await getAllArticles())
        .slice(0, 4)
        .map(({ component, ...meta }) => meta),
    },
  }
}
