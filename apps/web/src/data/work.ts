// web/src/data/work.ts
export type WorkItem = Readonly<{
  id: string
  name: string
  label: string
  href: string
  description: string
  proofPoints: readonly string[]
}>

export const workItems = [
  {
    id: 'furnishar',
    name: 'FurnishAR',
    label: '3D configurator',
    href: 'https://www.furnishar.eu',
    description:
      'Interactive 3D product configurator and AR viewer for furniture brands.',
    proofPoints: [
      'SaaS product architecture',
      '3D and AR product presentation',
      'Configurable product workflows',
      'Embeddable viewer experience',
      'Catalog, sharing, QR, and analytics logic',
    ],
  },
  {
    id: 'propunem',
    name: 'Propunem',
    label: 'SaaS platform',
    href: 'https://propunem.ro',
    description:
      'A web product for proposals, negotiation, and client-facing service presentation.',
    proofPoints: [
      'Product workflow design',
      'Client-facing business software',
      'Proposal and template logic',
      'Gallery and download features',
      'Pricing and subscription structure',
    ],
  },
] as const satisfies readonly WorkItem[]