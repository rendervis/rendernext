import P5 from 'p5'
import sketchWrapper from '../../lib/bootstrap/sketchWrapper'
import { sharedDraw } from './sharedDraw'
import Walker from '../../lib/random/Walker'

export let w: Walker

const sketchSetup = (p: P5) => {
  p.createCanvas(800, 800)
  w = new Walker(p)
  p.background(250)
}

const sketchDraw = (p: P5) => {
  sharedDraw(p)
}

const sketch_1 = sketchWrapper(sketchSetup, sketchDraw)

export default sketch_1
