import Lights from './Lights'
import Level from './Level'
import { Physics } from '@react-three/rapier'
import Player from './Player'

export default function Experience() {
  return (
    <>
      <Lights />
      <Physics>
        <Level />
        <Player />
      </Physics>
    </>
  )
}
