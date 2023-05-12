import { Vector, Vector2 } from '@dimforge/rapier2d'
import P5 from 'p5'

interface IMoverBase {
  location: P5.Vector
  velocity: P5.Vector
  acceleration: P5.Vector

  mass: number
  maxSpeed: number
  /** Mover radius */
  r: number

  p5: P5

  /**
   * Applies a force to the mover's acceleration.
   * @param force
   */
  applyForce(force: P5.Vector): void
  /**
   * Updates the mover's location, velocity, and acceleration based on its current state.
   */
  update(): void
  /**
   * Implements any necessary behavior for the mover to stay within the bounds of the screen.
   */
  borders(): void
}

class MoverBase implements IMoverBase {
  location: P5.Vector
  velocity: P5.Vector
  acceleration: P5.Vector

  mass: number
  maxSpeed: number
  r: number

  p5: P5

  constructor(x: number, y: number, p: P5, maxSpeed: number, radius: number) {
    const angle = p.random(p.TWO_PI)

    this.p5 = p
    this.location = p.createVector(x, y)
    this.velocity = p.createVector(p.cos(angle), p.sin(angle))
    this.acceleration = p.createVector(0, 0)

    this.mass = 250
    this.maxSpeed = maxSpeed
    this.r = radius
  }

  applyForce(force: P5.Vector) {
    const f = force.copy()

    // We could add mass here A = F / M
    const A = this.p5.createVector(f.x / this.mass, f.y / this.mass)

    this.acceleration.add(A)
  }

  update() {
    // Update velocity
    this.velocity.add(this.acceleration)
    // Limit speed
    this.velocity.limit(this.maxSpeed)
    this.location.add(this.velocity)

    // Reset acceleration to 0 each cycle
    this.acceleration.mult(0)
  }

  borders() {
    const p = this.p5
    const width = p.width
    const height = p.height

    if (this.location.x < -this.r) {
      // this.velocity.x *= -1
      this.location.x = width + this.r // Wrap around left edge
    }
    if (this.location.y < -this.r) {
      // this.velocity.y *= -1
      this.location.y = height + this.r // Wrap around top edge
    }
    if (this.location.x > width + this.r) {
      // this.velocity.x *= -1
      this.location.x = -this.r // Wrap around right edge
    }
    if (this.location.y > height + this.r) {
      // this.velocity.y *= -1
      this.location.y = -this.r // Wrap around bottom edge
    }
  }
}

interface IMover {
  maxForce: number
  render(p: P5): void
}

class Walker extends MoverBase implements IMover {
  p5: P5
  maxForce: number

  prob: number
  /** @type {number} x Offset */
  xOff: number
  /** @type {number} y Offset */
  yOff: number

  constructor(p: P5) {
    super(p.width / 2, p.height / 2, p, 2, 6)
    this.p5 = p

    this.maxForce = 0.02
    this.prob = 0.5
    this.xOff = 0
    this.yOff = 20000
  }

  run() {
    this.step()
    this.update()
    this.borders()

    this.render()
  }
  step() {
    const p = this.p5

    // forces
    const wind = p.createVector(-0.8, 0)
    const gravity = p.createVector(0, 0.1)

    // Perlin noise walker
    const stepX = p.map(p.noise(this.xOff), 0, 1, -p.width, p.width)
    const stepY = p.map(p.noise(this.yOff), 0, 1, -p.height, p.height)

    const target = p.createVector(stepX, stepY)
    const desired = target.sub(this.location)
    desired.normalize()
    desired.mult(this.maxSpeed)

    let steer = desired.sub(this.velocity)
    steer.limit(this.maxForce)

    this.applyForce(wind)
    this.applyForce(gravity)
    this.applyForce(steer)

    this.xOff += 0.001 // increase the offset values to change the movement pattern
    this.yOff += 0.002
  }

  render() {
    const p = this.p5
    // Point
    // p.point(this.location.x, this.location.y)
    // p.stroke('purple')
    // p.strokeWeight(10)
    drawTriangle(this.location, this.velocity, p, this.r)
  }
}

export default Walker

function drawTriangle(
  position: P5.Vector,
  velocity: P5.Vector,
  p: P5,
  r: number
) {
  // Draw a triangle rotated in the direction of velocity
  let theta = velocity.heading() - p.PI / 2
  p.fill(255, 222, 0)
  p.stroke(255, 222, 0)
  p.push()
  p.translate(position.x, position.y)
  p.rotate(theta)
  p.beginShape(p.TRIANGLES)
  p.vertex(0, r * 2)
  p.vertex(-r, -r * 2)
  p.vertex(r, -r * 2)
  p.endShape()
  p.pop()
}
