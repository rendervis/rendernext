import P5 from 'p5'
import { Particle } from '../../lib/random/Walker'

class Liquid {
  p5: P5

  x: number
  y: number
  w: number
  h: number

  /** @type {number} c Coefficient of friction */
  c: number

  constructor(x: number, y: number, p5: P5, w: number, h: number, c: number) {
    this.p5 = p5

    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.c = c
  }

  render() {
    const p = this.p5

    p.noStroke()
    p.fill(180, 180, 220, 100)
    p.rect(this.x, this.y, this.w, this.h)
  }

  contains(location: P5.Vector): boolean {
    const l = location
    return (
      l.x > this.x &&
      l.x < this.x + this.w &&
      l.y > this.y &&
      l.y < this.y + this.h
    )
  }

  /** Calculate drag force */
  calculate(mover: Particle): P5.Vector {
    const speed = mover.velocity.mag()
    const dragMagnitude = this.c * speed * speed

    const dragForce = mover.velocity.copy()
    dragForce.mult(-1)
    dragForce.normalize()

    dragForce.mult(dragMagnitude)
    return dragForce
  }

  friction(mover: Particle) {
    const n = 1 // normal force = the force perpendicular to the surface the object is moving
    const frictionMag = this.c * n

    const frictionForce = mover.velocity.copy()
    frictionForce.mult(-1)
    frictionForce.normalize()
    frictionForce.mult(frictionMag)
    return frictionForce
  }
}

export default Liquid
