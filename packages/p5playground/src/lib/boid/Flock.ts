//packages/p5playground/src/lib/boid/Flock.ts
import Boid from './Boid'

class Flock {
  // An array for all the boids
  private boids: Array<Boid> // Initialize the array

  constructor() {
    this.boids = []
  }

  public run(): void {
    for (let i = 0; i < this.boids.length; i++) {
      this.boids[i].run(this.boids) // Passing the entire list of boids to each boid individually
    }
  }

  public addBoid(b: Boid): void {
    this.boids.push(b)
  }
}

export default Flock
