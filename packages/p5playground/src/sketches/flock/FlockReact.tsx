import P5 from 'p5'

// project imports
import { Flock, Boid } from '../../lib/boid'
import P5Wrapper from '../../lib/P5Wrapper'

// define type
type FlockProps = {
  id: string
  backgroundColor?: number[]
}

// ========= // FLOCK REACT // ========= //

const FlockReact = (props: FlockProps) => {
  const containerId = props.id || 'p5-container'

  let mouseV: P5.Vector
  let flock: Flock

  const sketchSetup = (p: P5) => {
    p.frameRate(30)

    mouseV = p.createVector()
    flock = new Flock()

    // Add an initial set of boids into the system
    for (let i = 0; i < 32; i++) {
      const x = p.width / 2 + p.random(-200, 200)
      const y = p.height / 2 + p.random(-50, 50)

      const b = new Boid(x, y, p, mouseV)
      flock.addBoid(b)
    }
  }

  const sketchDraw = (p: P5) => {
    p.background(props.backgroundColor || [255, 255, 255])
    mouseV.set(p.mouseX, p.mouseY)
    flock.run()
  }

  return (
    <P5Wrapper
      containerId={containerId}
      setup={sketchSetup}
      draw={sketchDraw}
    />
  )
}
FlockReact.displayName = 'Flock'
export default FlockReact
