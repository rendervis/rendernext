import Head from 'next/head'
import Image from 'next/image'
import { Card } from '@/components/Card'
import {LinkIcon} from '@/components/icons'
import { SimpleLayout } from '@/components/SimpleLayout'
import logoPropunem from '@/images/logos/propunem.jpg'

const projects = [
  {
    name: 'Propunem',
    description:
      'Canvas Editor as a marketing tool, with the main goal to promote services and help with negotiation.',
    link: { href: 'https://propunem.ro', label: 'propunem.ro' },
    logo: logoPropunem,
  },



]

export default function Projects() {
  return (
    <>
      <Head>
        <title>Projects - Talvan Octavian</title>
        <meta
          name="description"
          content="Things I’ve made."
        />
      </Head>
      <SimpleLayout
        title="Things I’ve made."
        intro="I’ve worked on little projects over the years but these are the ones that I’m most proud of."
      >
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <Card as="li" key={project.name}>
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5">
                <Image
                  src={project.logo}
                  alt=""
                  className="h-8 w-8"
                  unoptimized
                />
              </div>
              <h2 className="mt-6 text-base font-semibold text-zinc-800">
                <Card.Link href={project.link.href}>{project.name}</Card.Link>
              </h2>
              <Card.Description>{project.description}</Card.Description>
              <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
                <LinkIcon className="h-6 w-6 flex-none" />
                <span className="ml-2">{project.link.label}</span>
              </p>
            </Card>
          ))}
        </ul>
      </SimpleLayout>
    </>
  )
}
