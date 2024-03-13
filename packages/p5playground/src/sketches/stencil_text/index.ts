import initSketch from '../../lib/bootstrap/bootstrap'
import stencilText from './stencil_text'

// Initialize the sketch
const sketch = initSketch({ containerId: 'p5-container' })
sketch(stencilText)
