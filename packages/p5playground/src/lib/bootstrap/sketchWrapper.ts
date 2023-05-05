import P5 from 'p5'

function sketchWrapper(setup: (p: P5) => void, draw: (p: P5) => void) {
  const sketch = (p: P5) => {
    p.setup = () => {
      // Set up the sketch
      setup(p)
    }

    p.draw = () => {
      // Draw the sketch
      draw(p)
    }
  }

  return sketch
}

export default sketchWrapper
