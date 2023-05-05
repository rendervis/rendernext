import { Canvas, useFrame } from '@react-three/fiber'
import { OrthographicCamera, Plane } from '@react-three/drei'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import Lights from './Lights'
import Camera from './Camera'
import { useGui } from '../utils/hooks/useGui'

export function PerspectiveScene({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <perspectiveCamera position={[0, 0, 10]} />
      <ambientLight intensity={0.3} />
      <Lights />
      {children}

      <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeBufferGeometry args={[10000, 10000]} />
        <meshLambertMaterial color={0xffffff} />
      </mesh>
    </>
  )
}

export function OrthoScene() {
  const gui = useGui()
  const texture = useMemo(
    () =>
      new THREE.TextureLoader().load(
        'src/assets/textures/particles/sprite-sheet.png'
      ),
    []
  )
  const [spriteNumber, setSpriteNumber] = useState(1)
  const [size, setSize] = useState(1)
  const [transparent, setTransparent] = useState(true)
  const [opacity, setOpacity] = useState(0.6)
  const spriteRef = useRef<THREE.Sprite>(null)
  const [speed, setSpeed] = useState(0.01)

  const spriteMaterial = new THREE.SpriteMaterial({
    opacity: opacity,
    color: 0xffffff,
    transparent: transparent,
    map: texture,
  })

  // we have 1 row, with five sprites
  spriteMaterial.map!.offset = new THREE.Vector2(0.2 * spriteNumber, 0)
  spriteMaterial.map!.repeat = new THREE.Vector2(1 / 5, 1)
  // make sure the object is always rendered at the front
  spriteMaterial.depthTest = false

  useFrame(({ gl, scene, camera }) => {
    if (spriteRef.current) {
      spriteRef.current.position.x =
        spriteRef.current.position.x +
        (spriteRef.current.userData.velocityX || 0.01)

      const spritePos = spriteRef.current.position.clone().project(camera)
      const x = ((spritePos.x + 1) / 2) * window.innerWidth
      const y = (-(spritePos.y - 1) / 2) * window.innerHeight

      if (x > gl.domElement.clientWidth) {
        spriteRef.current.userData.velocityX = -0.01
        setSpriteNumber((prev) => prev + 1)
        spriteMaterial.map!.offset.set((1 / 5) * (spriteNumber % 4), 0)
      }
      if (x < 0) {
        spriteRef.current.userData.velocityX = 0.01
      }
    }
  })

  const myObject = useMemo(() => {
    return {
      myBoolean: true,
      speed: 1,
      myString: 'lil-gui',
      myNumber: 1,
    }
  }, [])

  useEffect(() => {
    if (gui && spriteRef.current) {
      const folder = gui.addFolder('Speed')
      folder.add(spriteRef.current.userData, 'velocityX', -0.01, 0.5, 0.001)
      // gui.add(myObject, 'speed', 0, 2)
    }
  }, [myObject, gui])

  return (
    <>
      <scene name="OrthoScene">
        <orthographicCamera position={[0, 0, 10]} />
        <sprite
          ref={spriteRef}
          material={spriteMaterial}
          scale={[size, size, 1]}
          name="Sprite"
        />
      </scene>
    </>
  )
}

export default function Scene() {
  return (
    <>
      <PerspectiveScene />
      <OrthoScene />
    </>
  )
}
