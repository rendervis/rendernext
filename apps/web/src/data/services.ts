// web/src/data/services.ts
export type ServiceItem = Readonly<{
  id: string
  eyebrow: string
  title: string
  description: string
}>

export const services = [
  {
    id: 'web-app-development',
    eyebrow: 'WEB APPS',
    title: 'Custom web app development',
    description:
      'We build web applications, dashboards, portals, and workflow tools for businesses that need software shaped around how their work actually happens.',
  },
  {
    id: 'saas-mvp-development',
    eyebrow: 'SAAS / MVP',
    title: 'SaaS and MVP development',
    description:
      'We help turn a product idea into a usable first version: product structure, core flows, database logic, user interfaces, and launch-ready implementation.',
  },
  {
    id: 'product-websites',
    eyebrow: 'PRODUCT WEBSITES',
    title: 'Product websites and launch pages',
    description:
      'We design and build clear websites for software products, service offers, and digital platforms so buyers understand what the product does and why it matters.',
  },
  {
    id: 'interactive-3d',
    eyebrow: '3D / CONFIGURATORS',
    title: 'Interactive 3D product presentation',
    description:
      'For furniture and configurable products, we build browser-based 3D viewers, product configurators, AR presentation flows, and supporting rendered visuals.',
  },
] as const satisfies readonly ServiceItem[]
