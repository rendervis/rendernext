import initSketch from '../../lib/bootstrap/bootstrap'
import stencil_arcs from './stencil_arcs'

// Initialize the sketch
const sketch = initSketch({ containerId: 'p5-container' })
sketch(stencil_arcs)
