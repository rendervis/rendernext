//packages/p5playground/src/sketches/flock/index.ts

import initSketch from '../../lib/bootstrap/bootstrap'
import wrapped from './flock'

// Initialize the sketch
const sketch = initSketch({ containerId: 'p5-container' })
sketch(wrapped)
