import { useRef, useEffect } from 'react'
import P5 from 'p5'
import initSketch, { createdSketches } from '../../lib/bootstrap/bootstrap'

import { sharedDraw } from './sharedDraw'
import sketchWrapper from '../../lib/bootstrap/sketchWrapper'

type PointillismProps = {
  id: string
}

const Pointillism = (props: PointillismProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const containerId = props.id || 'p5-container'

  const sketchSetup = (p: P5) => {
    p.createCanvas(
      containerRef.current?.clientWidth || 100,
      containerRef.current?.clientHeight || 100
    )

    p.frameRate(15)
    p.noStroke()
    p.angleMode(p.RADIANS)
  }

  const sketchDraw = (p: P5) => {
    sharedDraw(p)
  }

  useEffect(() => {
    if (containerRef.current && containerId) {
      const sketch = sketchWrapper(sketchSetup, sketchDraw)
      const init = initSketch({ containerId })
      init(sketch)
    }

    // delete the sketch when the component is unmounted
    return () => {
      delete createdSketches[containerId]
    }
  }, [containerId])

  return (
    <div
      style={{ width: '100%', height: '100%' }}
      id={containerId}
      ref={containerRef}
    />
  )
}
Pointillism.displayName = 'Pointillism'
export default Pointillism
