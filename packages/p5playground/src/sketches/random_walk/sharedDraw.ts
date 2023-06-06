// p5playground/src/sketches/random_walks/sharedDraw.ts
import P5 from 'p5'
import { w } from './random_walk'

export function sharedDraw(p: P5, elements: any[]) {
  // Set CENTER mode
  p.ellipseMode(p.CENTER)

  w.run(elements)
}
