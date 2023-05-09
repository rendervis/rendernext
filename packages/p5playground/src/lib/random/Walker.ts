import { Vector, Vector2 } from '@dimforge/rapier2d'
import P5 from 'p5'

class Walker {
  pos: Vector
  prob: number
  /** @type {number} x Offset */
  xOff: number
  /** @type {number} y Offset */
  yOff: number

  constructor(p: P5) {
    this.pos = p.createVector(p.width / 2, p.height / 2)
    this.prob = 0.5

    this.xOff = 0
    this.yOff = 10000
  }

  step(p: P5) {
    // let stepX = p.random(-1, 1)
    // let stepY = p.random(-1, 1)

    // Perlin noise walker
    let stepX = p.map(p.noise(this.xOff), 0, 1, 0, p.width)
    let stepY = p.map(p.noise(this.yOff), 0, 1, 0, p.height)

    this.pos.x = stepX
    this.pos.y = stepY

    this.xOff += 0.001
    this.yOff += 0.001
  }

  display(p: P5) {
    p.point(this.pos.x, this.pos.y)
    p.stroke('purple')
    p.strokeWeight(10)
  }
}

export default Walker
