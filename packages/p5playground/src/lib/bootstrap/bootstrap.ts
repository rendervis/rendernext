import P5 from 'p5'

// Define the props for the sketch
interface SketchProps {
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
export const createdSketches: { [key: string]: P5 } = {}

// Initialize the sketch
const initSketch = ({ containerId }: SketchProps) => {
  console.info(`Initializing P5 sketch for container ID ${containerId}`)

  const containerElement = getContainerElement(containerId)

  const init = (sketch: (p: P5) => void) => {
    const wrapper = (p: P5) => {
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
