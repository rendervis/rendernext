// apps/web/src/types/p5playground.d.ts
declare module 'p5playground' {
  export type P5BaseSketchProps = Readonly<{
    id: string
  }>

  export type P5FlockProps = Readonly<{
    id: string
    backgroundColor?: number[]
  }>

  export function Sketch1React(props: P5BaseSketchProps): JSX.Element
  export function Pointillism(props: P5BaseSketchProps): JSX.Element
  export function Flock(props: P5FlockProps): JSX.Element
}