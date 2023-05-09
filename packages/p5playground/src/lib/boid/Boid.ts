//packages/p5playground/src/lib/boid/Boid.ts
import P5 from 'p5'

class Boid {
  position: P5.Vector
  velocity: P5.Vector
  acceleration: P5.Vector
  mouseV: P5.Vector

  r: number
  maxForce: number
  maxSpeed: number

  desiredSeparation: number
  neighborRadius: number

  points: P5.Vector[]

  p5: P5

  constructor(x: number, y: number, p: P5, mouseV: P5.Vector) {
    this.p5 = p
    this.mouseV = mouseV
    this.acceleration = p.createVector(0, 0)
    const angle = p.random(p.TWO_PI)
    this.velocity = p.createVector(p.cos(angle), p.sin(angle))
    this.position = p.createVector(x, y)

    this.r = 8.0
    this.maxSpeed = 2 // Maximum speed
    this.maxForce = 0.05 // Maximum steering force

    this.desiredSeparation = 60
    this.neighborRadius = 160

    this.points = []
  }

  run(boids: Boid[]) {
    this.flock(boids)
    this.update()
    this.borders()
    this.render()

    this.points.push(this.position.copy())
    if (this.points.length > 10) {
      this.points.splice(0, 1)
    }
  }

  // Apply a force to the boid's acceleration
  applyForce(force: P5.Vector) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force)
  }

  // We accumulate a new acceleration each time based on three rules
  flock(boids: Boid[]) {
    const separation = this.separate(boids)
    const alignment = this.align(boids)
    const cohesion = this.cohesion(boids)

    const mouseFear = this.push(this.mouseV, 300, 45)

    separation.mult(1.5)
    alignment.mult(0.75)
    cohesion.mult(0.9)
    mouseFear.mult(6)

    this.applyForce(separation)
    this.applyForce(alignment)
    this.applyForce(cohesion)
    this.applyForce(mouseFear)
  }

  // Method to update location
  update() {
    // Update velocity
    this.velocity.add(this.acceleration)
    // Limit speed
    this.velocity.limit(this.maxSpeed)
    this.position.add(this.velocity)

    // Reset acceleration to 0 each cycle
    this.acceleration.mult(0)
  }

  // A method that calculates and applies a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
  seek(target: P5.Vector) {
    const tc = target.copy()
    const desired = tc.sub(this.position) // A vector pointing from the location to the target
    desired.normalize()
    desired.mult(this.maxSpeed)

    // Steering = Desired minus Velocity
    const steer = desired.sub(this.velocity)
    steer.limit(this.maxForce) // Limit to maximum steering force

    return steer
  }

  render() {
    const p = this.p5
    // Draw a triangle rotated in the direction of velocity
    // let theta = this.velocity.heading() + p.radians(90)
    // p.fill(255, 222, 0)
    // p.stroke(255, 222, 0)
    // p.push()
    // p.translate(this.position.x, this.position.y)
    // p.rotate(theta)
    // p.beginShape(p.TRIANGLES)
    // p.vertex(0, -this.r * 2)
    // p.vertex(-this.r, this.r * 2)
    // p.vertex(this.r, this.r * 2)
    // p.endShape()
    // p.pop()

    // Draw everything
    for (let i = 0; i < this.points.length; i++) {
      // Draw an ellipse for each element in the arrays.
      p.noStroke()
      p.fill(255, 222, 0, 127)
      p.ellipse(this.points[i].x, this.points[i].y, i, i)
    }
  }

  // Wraparound
  borders() {
    const p = this.p5
    const width = p.width
    const height = p.height

    if (this.position.x < -this.r) {
      // this.velocity.x *= -1
      this.position.x = width + this.r // Wrap around left edge
    }
    if (this.position.y < -this.r) {
      // this.velocity.y *= -1
      this.position.y = height + this.r // Wrap around top edge
    }
    if (this.position.x > width + this.r) {
      // this.velocity.x *= -1
      this.position.x = -this.r // Wrap around right edge
    }
    if (this.position.y > height + this.r) {
      // this.velocity.y *= -1
      this.position.y = -this.r // Wrap around bottom edge
    }
  }

  // Separation
  // Method checks for nearby boids and steers away
  separate(boids: Boid[]) {
    const p = this.p5
    const steer = p.createVector(0, 0)
    let count = 0

    // For every boid in the system, check if it's too close
    for (let i = 0; i < boids.length; i++) {
      const other = boids[i]

      const distance = this.position.dist(other.position)

      if (other != this && distance > 0 && distance < this.desiredSeparation) {
        const p = this.position.copy()

        // Calculate a force that is inversely proportional to distance
        const diff = p.sub(other.position)
        diff.normalize()
        diff.div(distance)
        steer.add(diff)

        count++ // Keep track of how many
      }
    }
    // Average -- divide by how many
    if (count > 0) {
      steer.div(count)
    }
    if (steer.mag() > 0) {
      steer.normalize()
      steer.mult(this.maxSpeed)

      const steerForce = steer.sub(this.velocity)
      steerForce.limit(this.maxForce)

      return steerForce
    } else {
      return p.createVector(0, 0)
    }
  }

  // Alignment
  // For every nearby boid in the system, calculate the average velocity
  align(boids: Boid[]) {
    const p = this.p5
    const sum = p.createVector(0, 0)
    let count = 0

    for (let i = 0; i < boids.length; i++) {
      const other = boids[i]
      const distance = this.position.dist(other.position)
      if (other != this && distance < this.neighborRadius) {
        sum.add(other.velocity)
        count++
      }
    }
    if (count > 0) {
      const desired = sum.div(count)

      desired.normalize()
      desired.mult(this.maxSpeed)

      const steer = desired.sub(this.velocity)
      steer.limit(this.maxForce)
      return steer
    } else {
      return p.createVector(0, 0)
    }
  }

  // Cohesion
  // For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
  cohesion(boids: Boid[]): P5.Vector {
    const p = this.p5
    const sum = p.createVector(0, 0) // Start with empty vector to accumulate all locations
    let count = 0

    for (let i = 0; i < boids.length; i++) {
      let other = boids[i]
      let distance = this.position.dist(other.position)
      if (other != this && distance < this.neighborRadius) {
        sum.add(other.position) // Add location
        count++
      }
    }
    if (count > 0) {
      const desired = sum.div(count)
      return this.seek(desired) // Steer towards the position
    } else {
      return p.createVector(0, 0)
    }
  }

  pull(target: P5.Vector, radius: number = 200, forceFactor: number = 1) {
    const p = this.p5
    const distance = target.dist(this.position)

    if (distance < radius) {
      const steer = this.seek(target)
      steer.mult(forceFactor)
      return steer
    } else {
      return p.createVector(0, 0)
    }
  }

  push(target: P5.Vector, radius: number = 200, forceFactor: number = 1) {
    const p = this.p5
    const distance = target.dist(this.position)

    if (distance < radius) {
      const steer = this.seek(target)
      steer.mult(-1)
      steer.mult(forceFactor)
      return steer
    } else {
      return p.createVector(0, 0)
    }
  }
}

export default Boid
