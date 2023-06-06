// p5playground/src/lib/random/Walker.ts
import { Vector, Vector2 } from '@dimforge/rapier2d'
import P5 from 'p5'

interface IParticle {
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

class Particle implements IParticle {
  p5: P5

  location: P5.Vector
  velocity: P5.Vector
  acceleration: P5.Vector

  mass: number
  maxSpeed: number
  r: number

  /** @type {boolean} mouse Dragging */
  dragging: boolean
  rollover: boolean
  dragOffset: P5.Vector

  constructor(
    x: number,
    y: number,
    p: P5,
    maxSpeed: number,
    radius: number,
    mass = 1
  ) {
    const angle = p.random(p.TWO_PI)

    this.p5 = p
    this.location = p.createVector(x, y)
    this.velocity = p.createVector(p.cos(angle), p.sin(angle))
    this.acceleration = p.createVector(0, 0)

    this.mass = mass
    this.maxSpeed = maxSpeed
    this.r = radius

    this.dragging = false
    this.rollover = false
    this.dragOffset = this.p5.createVector(0, 0)
  }

  applyForce(force: P5.Vector) {
    const f = force.copy()

    // A = F / M
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

  // mouse interaction
  handlePress(mx: number, my: number) {
    console.log('Walker::handlePress')
    const p = this.p5
    let d = p.dist(mx, my, this.location.x, this.location.y)
    if (d < this.mass) {
      this.dragging = true
      this.dragOffset.x = this.location.x - mx
      this.dragOffset.y = this.location.y - my
    }
  }

  handleHover(mx: number, my: number) {
    const p = this.p5
    let d = p.dist(mx, my, this.location.x, this.location.y)
    if (d < this.mass) {
      this.rollover = true
    } else {
      this.rollover = false
    }
  }

  stopDragging() {
    this.dragging = false
  }

  handleDrag(mx: number, my: number) {
    if (this.dragging) {
      this.location.x = mx + this.dragOffset.x
      this.location.y = my + this.dragOffset.y
    }
  }
}

interface IMover {
  maxForce: number
  render(p: P5): void
}

class Walker extends Particle implements IMover {
  p5: P5
  maxForce: number
  path: P5.Vector[]

  prob: number
  /** @type {number} x Offset */
  xOff: number
  /** @type {number} y Offset */
  yOff: number

  constructor(p: P5) {
    super(p.width / 2, p.height / 2, p, 1.2, 6, 1.6)
    this.p5 = p

    this.maxForce = 0.14
    this.prob = 0.5
    this.xOff = 0
    this.yOff = 5000

    this.path = []
  }

  run(elements: any[]) {
    for (let i = 0; i < elements.length; i++) {
      const envElement = elements[i]
      console.log('envElement.contains::', envElement.contains(this.location))

      if (envElement.contains(this.location)) {
        const envForce = envElement.calculate(this)
        this.applyForce(envForce)
      }
    }

    // Add current location to path
    this.path.push(this.location.copy())

    this.step()
    this.update()
    this.borders()

    this.render()
  }
  step() {
    const p = this.p5

    // Perlin noise walker
    const stepX = p.map(p.noise(this.xOff), 0, 1, -p.width, p.width)
    const stepY = p.map(p.noise(this.yOff), 0, 1, -p.height, p.height)

    const target = p.createVector(stepX, stepY)
    const desired = target.sub(this.location)
    desired.normalize()
    desired.mult(this.maxSpeed)

    let steer = desired.sub(this.velocity)
    steer.limit(this.maxForce)

    this.applyForce(steer)

    this.xOff += 0.02 // increase the offset values to change the movement pattern
    this.yOff += 0.02
  }

  render() {
    const p = this.p5

    drawTriangle(this.location, this.velocity, p, this.r)

    // Draw path
    this.p5.noFill()
    this.p5.stroke(255, 222, 0, 50)

    for (let i = 0; i < this.path.length - 1; i++) {
      const location = this.path[i].copy()
      if (i % 200 === 0) {
        this.p5.strokeWeight(4)
        this.p5.ellipse(location.x, location.y, 18, 18)
      }
      if (i > 0) {
        const p1 = this.path[i - 1]
        const d = location.dist(p1)
        if (d <= 20) {
          this.p5.strokeWeight(1)
          this.p5.line(p1.x, p1.y, location.x, location.y)
        }
      }
    }
  }
}

export default Walker
export { Particle }

function drawTriangle(
  position: P5.Vector,
  velocity: P5.Vector,
  p: P5,
  r: number
) {
  // Draw a triangle rotated in the direction of velocity
  let theta = velocity.heading() - p.PI / 2
  p.rectMode(p.CENTER)

  p.fill(255, 222, 0)
  p.push()
  p.stroke(255, 222, 0)
  p.translate(position.x, position.y)
  p.rotate(theta)
  p.beginShape(p.TRIANGLES)
  p.vertex(0, r * 2)
  p.vertex(-r - 5, -r * 2)
  p.vertex(r + 5, -r * 2)
  p.endShape()

  p.rect(5, -r - 10, 3, 4)
  p.rect(-5, -r - 10, 3, 4)

  p.pop()
}
