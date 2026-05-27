type JsonLdProps = Readonly<{
  data: Record<string, unknown>
}>

function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  )
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'RenderNext',
  url: 'https://www.rendernext.eu',
  description:
    'RenderNext is a small product development company building custom web apps, SaaS platforms, product websites, dashboards, and interactive 3D product presentation tools.',
  sameAs: [
    'https://www.furnishar.eu',
    'https://propunem.ro',
  ],
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'RenderNext',
  url: 'https://www.rendernext.eu',
  description:
    'Web app development, SaaS MVP development, product websites, dashboards, and interactive 3D product experiences.',
}

const professionalServiceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'RenderNext',
  url: 'https://www.rendernext.eu',
  description:
    'Custom web application development, SaaS product development, product website development, dashboard development, and interactive 3D product visualization.',
  areaServed: {
    '@type': 'Place',
    name: 'Europe',
  },
  serviceType: [
    'Web app development',
    'SaaS MVP development',
    'Product website development',
    'Dashboard development',
    '3D product configurator development',
    'Interactive product visualization',
  ],
}

export function StructuredData() {
  return (
    <>
      <JsonLd data={organizationJsonLd} />
      <JsonLd data={websiteJsonLd} />
      <JsonLd data={professionalServiceJsonLd} />
    </>
  )
}