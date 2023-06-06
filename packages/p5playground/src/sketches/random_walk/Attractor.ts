import P5 from 'p5'
import Walker, { Particle } from '../../lib/random/Walker'

class Attractor {
  p5: P5

  mass: number
  /** @type {number} the universal gravitational constant */
  G: number
  /** @type {number} diameter */
  d: number
  pullDiameter: number
  orbitDiameter: number
  maxAttractionForce: number
  maxOrbitingForce: number
  location: P5.Vector

  constructor(p5: P5) {
    this.p5 = p5

    this.G = 7.4
    this.mass = 80
    this.maxAttractionForce = 4
    this.maxOrbitingForce = 4
    this.d = this.mass * 1
    this.orbitDiameter = this.d + 60
    this.pullDiameter = this.d + 400
    this.location = p5.createVector((p5.width / 2) * 1.2, (p5.height / 2) * 0.5)
  }
  render() {
    const p = this.p5

    p.stroke(0)
    p.fill(175, 200)
    p.ellipse(this.location.x, this.location.y, this.d, this.d)

    // Add dotted blue ellipse for orbitRadius
    //  if (this.isPulling ) {
    p.strokeWeight(1)
    p.noFill()
    p.stroke(0, 0, 255, 100)
    p.drawingContext.setLineDash([5, 5])
    p.ellipse(
      this.location.x,
      this.location.y,
      this.orbitDiameter,
      this.orbitDiameter
    )
    p.drawingContext.setLineDash([])
    // }

    // Add dotted blue ellipse for pullRadius
    // if (this.isOrbiting) {
    p.strokeWeight(1)
    p.noFill()
    p.stroke(0, 0, 255, 100)
    p.drawingContext.setLineDash([5, 5])
    p.ellipse(
      this.location.x,
      this.location.y,
      this.pullDiameter,
      this.pullDiameter
    )
    p.drawingContext.setLineDash([])
    // }
  }

  contains(location: P5.Vector): boolean {
    return this.isPulling(location)
  }

  calculate(m: Walker): P5.Vector {
    const p = this.p5
    // // Calculate direction of force
    // let force = this.location.copy().sub(m.location)
    // // Distance between objects
    // let distance = force.mag()
    // // Limiting the distance to eliminate "extreme" results for very close or very far objects
    // distance = p.constrain(distance, this.orbitRadius, this.pullRadius)

    // // Apply gravitational force between the mover and the Attractor
    // // Calculate gravitional force magnitude
    // let strength = (this.G * this.mass * m.mass) / (distance * distance)

    // if (this.isPulling(m.location)) {
    //   // Apply attraction force towards the Attractor
    //   force.setMag(strength * this.maxAttractionForce)
    //   force.limit(m.maxForce)
    // } else if (this.isOrbiting(m.location)) {
    //   // Apply orbiting force around the Attractor
    //   let angle = force.heading() + p.HALF_PI
    //   force = p.createVector(p.cos(angle), p.sin(angle))
    //   force.mult(strength * this.maxOrbitingForce)

    //   // Calculate desired velocity and steering force
    //   let desiredVelocity = force.copy().setMag(this.maxOrbitingForce)
    //   let steering = desiredVelocity.sub(m.velocity)
    //   // steering.limit(m.maxForce)
    //   force = steering
    // } else {
    //   force.setMag(strength)
    // }

    // Calculate direction of force
    const dir = this.location.copy().sub(m.location)
    // Distance between objects
    let distance = dir.mag()

    dir.normalize()

    // Limiting the distance to eliminate "extreme" results for very close or very far objects
    distance = p.constrain(distance, 80, this.pullDiameter)

    // Calculate gravitational force magnitude
    const magnitude = (this.G * this.mass * m.mass) / (distance * distance)

    // Get force vector --> magnitude * direction
    const force = dir.mult(magnitude)
    return force
  }

  isPulling(location: P5.Vector): boolean {
    const p = this.p5
    const l = location.copy()

    const d = p.dist(l.x, l.y, this.location.x, this.location.y)
    const pullRadius = this.pullDiameter / 2

    return d <= pullRadius
  }

  isOrbiting(location: P5.Vector): boolean {
    const p = this.p5
    const l = location

    let d = p.dist(l.x, l.y, this.location.x, this.location.y)
    const orbitRadius = this.orbitDiameter / 2
    const attractorRadius = this.d / 2

    return d <= orbitRadius && d > attractorRadius
  }
}

export default Attractor
