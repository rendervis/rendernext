import P5 from 'p5'
import sketchWrapper from '../../lib/bootstrap/sketchWrapper'
import { sharedDraw } from './sharedDraw'

const sketchSetup = (p: P5) => {
  p.createCanvas(800, 800)
  p.frameRate(15)

  p.noStroke()
  p.background(255)
  p.angleMode(p.RADIANS)
}

const sketchDraw = (p: P5) => {
  sharedDraw(p)
}

const pointillism = sketchWrapper(sketchSetup, sketchDraw)

export default pointillism
