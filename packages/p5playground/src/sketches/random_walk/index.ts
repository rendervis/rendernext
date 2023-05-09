import initSketch from '../../lib/bootstrap/bootstrap'
import random_walk from './random_walk'

// Initialize the sketch
const sketch = initSketch({ containerId: 'p5-container' })
sketch(random_walk)
