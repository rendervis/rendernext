//packages/p5playground/src/sketches/flock/sharedDraw.ts
import P5 from 'p5'
import { Flock } from '../../lib/boid'

export function sharedDraw(p: P5, flock: Flock) {
  // Draw a white background
  p.background(250)
  // Set CENTER mode
  p.ellipseMode(p.CENTER)
  p.rectMode(p.CENTER)

  flock.run()
}
