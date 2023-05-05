import * as P5 from 'p5'
import sketchWrapper from '../../lib/bootstrap/sketchWrapper'
import initSketch from '../../lib/bootstrap/bootstrap'
import { sharedDraw } from './sharedDraw'

const sketchSetup = (p: P5) => {
  p.createCanvas(800, 800)
}

const sketchDraw = (p: P5) => {
  sharedDraw(p)
}

const sketch_1 = sketchWrapper(sketchSetup, sketchDraw)

export default sketch_1
