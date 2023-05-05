import P5 from 'p5'

// Define the props for the sketch
interface SketchProps {
  backgroundColor?: string
  containerId: string
}

// Get the root container element
const getContainerElement = (containerId: string): HTMLElement => {
  const containerElement = document.getElementById(containerId)
  if (!containerElement) {
    throw new Error(`Could not find container element with id ${containerId}`)
  }
  return containerElement
}

// Maintain a dictionary of created sketches, keyed by container ID
const createdSketches: { [key: string]: P5 } = {}

// Initialize the sketch
const initSketch = ({ backgroundColor, containerId }: SketchProps) => {
  const containerElement = getContainerElement(containerId)

  const init = (sketch: (p: P5) => void) => {
    const wrapper = (p: P5) => {
      if (backgroundColor) {
        p.background(backgroundColor)
      }

      sketch(p)
    }

    // Check if a sketch has already been created for this container
    if (!createdSketches[containerId]) {
      createdSketches[containerId] = new P5(wrapper, containerElement)
    }
  }
  return init
}

export default initSketch
