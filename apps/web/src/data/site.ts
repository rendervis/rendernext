// web/src/data/site.ts
export type NavigationItem = Readonly<{
  label: string
  href: string
}>

export const navigationItems = [
  { label: 'Services', href: '/#services' },
  { label: 'Work', href: '/#work' },
  { label: 'Process', href: '/#process' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/contact' },
] as const satisfies readonly NavigationItem[]

export const footerContentItems = [
  { label: 'Articles', href: '/articles' },
  { label: 'Contact', href: '/contact' },
] as const satisfies readonly NavigationItem[]

export const siteConfig = {
  name: 'RenderNext',
  url: 'https://www.rendernext.eu',
  description:
    'Practical web apps, SaaS platforms, and interactive product experiences.',
  cta: {
    label: 'Start a project',
    href: '/contact',
  },
} as const
