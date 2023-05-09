//packages/p5playground/src/sketches/flock/flock.ts

import P5 from 'p5'
import sketchWrapper from '../../lib/bootstrap/sketchWrapper'
import { sharedDraw } from './sharedDraw'
import { Flock, Boid } from '../../lib/boid'

export let flock: Flock

let mouseV: P5.Vector

const sketchSetup = (p: P5) => {
  p.createCanvas(800, 800)
  //set the frame rate
  p.frameRate(30)

  mouseV = p.createVector()
  flock = new Flock()

  // Add an initial set of boids into the system
  for (let i = 0; i < 8; i++) {
    const x = p.width / 2 + p.random(-200, 200)
    const y = p.height / 2 + p.random(-50, 50)

    const b = new Boid(x, y, p, mouseV)
    flock.addBoid(b)
  }
}

const sketchDraw = (p: P5) => {
  mouseV.set(p.mouseX, p.mouseY)

  sharedDraw(p, flock)
}

const sketch = sketchWrapper(sketchSetup, sketchDraw)

export default sketch
