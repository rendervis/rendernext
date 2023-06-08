import initSketch from '../../lib/bootstrap/bootstrap'
import stencilGrid from './stencil_grid'

// Initialize the sketch
const sketch = initSketch({ containerId: 'p5-container' })
sketch(stencilGrid)
