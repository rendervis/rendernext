import P5 from 'p5'

// project imports
import P5Wrapper from '../../lib/P5Wrapper'
import { sharedDraw } from './sharedDraw'

// define type
type PointillismProps = {
  id: string
}

// ========= // POINTILLISM REACT // ========= //

const Pointillism = (props: PointillismProps) => {
  const containerId = props.id || 'p5-container'

  const sketchSetup = (p: P5) => {
    p.frameRate(15)
    p.noStroke()
    p.angleMode(p.RADIANS)
  }

  const sketchDraw = (p: P5) => {
    sharedDraw(p)
  }

  return (
    <P5Wrapper
      containerId={containerId}
      setup={sketchSetup}
      draw={sketchDraw}
    />
  )
}
Pointillism.displayName = 'Pointillism'
export default Pointillism
