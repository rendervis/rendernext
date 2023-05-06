import { useRef, useEffect } from 'react'
import P5 from 'p5'
import initSketch from '../../lib/bootstrap/bootstrap'

import { sharedDraw } from './sharedDraw'
import sketchWrapper from '../../lib/bootstrap/sketchWrapper'

type Sketch1ReactProps = {
  id: string
}

const Sketch1React = (props: any) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const containerId = props.id || 'p5-container'

  const sketchSetup = (p: P5) => {
    p.createCanvas(800, 800)
  }

  const sketchDraw = (p: P5) => {
    sharedDraw(p)
  }

  useEffect(() => {
    if (containerRef.current) {
      const sketch = sketchWrapper(sketchSetup, sketchDraw)
      const init = initSketch({ containerId })
      init(sketch)
    }
  }, [])

  return <div id={containerId} ref={containerRef} />
}
Sketch1React.displayName = 'Sketch1React'
export default Sketch1React
