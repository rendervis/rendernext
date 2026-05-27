// web/src/data/process.ts
export type ProcessStepItem = Readonly<{
  id: string
  number: string
  title: string
  description: string
}>

export const processSteps = [
  {
    id: 'clarify',
    number: '01',
    title: 'Clarify',
    description:
      'We define what the product needs to do, who it is for, what workflows matter, and what should not be built yet.',
  },
  {
    id: 'shape',
    number: '02',
    title: 'Shape',
    description:
      'We turn the idea into a practical structure: screens, flows, data, content, technical requirements, and launch priorities.',
  },
  {
    id: 'build',
    number: '03',
    title: 'Build',
    description:
      'The focus is working software: clear interfaces, reliable foundations, and enough flexibility to keep improving.',
  },
  {
    id: 'launch-improve',
    number: '04',
    title: 'Launch / Improve',
    description:
      'After release, the product can be refined based on real usage, business needs, and the next stage of growth.',
  },
] as const satisfies readonly ProcessStepItem[]