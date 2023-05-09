import { useCallback, useEffect, useRef } from 'react'
import P5 from 'p5'
import initSketch, { createdSketches } from '../lib/bootstrap/bootstrap'
import sketchWrapper from '../lib/bootstrap/sketchWrapper'

type P5Props = {
  containerId: string
  setup: (p: P5) => void
  draw: (p: P5) => void
}

const P5Wrapper = ({ containerId, setup, draw }: P5Props) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const sketchSetup = useCallback(
    (p: P5) => {
      const canvas = p.createCanvas(
        containerRef.current?.clientWidth || 100,
        containerRef.current?.clientHeight || 100
      )
      canvas.elt.id = `canvas-${containerId}` // Set the id of the canvas element

      setup(p)
    },
    [containerId, setup]
  )

  const sketchDraw = useCallback(
    (p: P5) => {
      draw(p)
    },
    [draw]
  )

  const counter = useRef(0)
  useEffect(() => {
    if (
      containerRef.current &&
      !createdSketches[containerId] &&
      counter.current === 0
    ) {
      counter.current += 1
      const sketch = sketchWrapper(sketchSetup, sketchDraw)
      const init = initSketch({ containerId })
      init(sketch)
    }

    return () => {
      delete createdSketches[containerId]
    }
  }, [containerId, sketchDraw, sketchSetup])

  return (
    <div
      style={{ width: '100%', height: '100%' }}
      id={containerId}
      ref={containerRef}
    />
  )
}

export default P5Wrapper
