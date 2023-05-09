import P5 from 'p5'
import { w } from './random_walk'

export function sharedDraw(p: P5) {
  // Set CENTER mode
  p.ellipseMode(p.CENTER)

  w.step(p)
  w.display(p)
}
