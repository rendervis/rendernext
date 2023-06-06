import P5 from 'p5'
import sketchWrapper from '../../lib/bootstrap/sketchWrapper'
import { sharedDraw } from './sharedDraw'

const sketchSetup = (p: P5) => {
  p.createCanvas(800, 800)
  p.noLoop()
}

const sketchDraw = (p: P5) => {
  sharedDraw(p)
}

const sketch = sketchWrapper(sketchSetup, sketchDraw)

export default sketch
