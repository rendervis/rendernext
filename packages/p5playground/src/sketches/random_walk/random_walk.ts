//p5playground/src/sketches/random_walk/random_walk.ts

import P5 from 'p5'
import sketchWrapper from '../../lib/bootstrap/sketchWrapper'
import { sharedDraw } from './sharedDraw'
import Walker from '../../lib/random/Walker'
import Liquid from './Liquid'
import Attractor from './Attractor'

export let w: Walker
export let liquid: Liquid
export let attractor: Attractor
let p5: P5

const sketchSetup = (p: P5) => {
  p5 = p
  p.createCanvas(800, 800)
  p.background(250)

  // environment elements
  liquid = new Liquid(110, (p.height / 2) * 1.2, p, 300, 50, 0.75)
  attractor = new Attractor(p)

  // walker
  w = new Walker(p)
}

const sketchDraw = (p: P5) => {
  p.background(250)

  sharedDraw(p, [attractor, liquid])

  // environment elements
  liquid.render()
  attractor.render()

  if (p5.mouseIsPressed) {
    mouseMoved()
    mousePressed()
    mouseDragged()
  }
}

const sketch_1 = sketchWrapper(sketchSetup, sketchDraw)

export default sketch_1

function mouseMoved() {
  w.handleHover(p5.mouseX, p5.mouseY)
}

function mousePressed() {
  w.handlePress(p5.mouseX, p5.mouseY)
}

function mouseDragged() {
  w.handleHover(p5.mouseX, p5.mouseY)
  w.handleDrag(p5.mouseX, p5.mouseY)
}

function mouseReleased() {
  w.stopDragging()
}
