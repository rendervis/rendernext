import * as THREE from 'three'
import React, {
  useRef,
  useEffect,
  useMemo,
  forwardRef,
  useState,
  Suspense,
} from 'react'
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber'
import Stats from 'three/examples/jsm/libs/stats.module'
import {
  TextureLoader,
  SpriteMaterial,
  Sprite as TSprite,
  TorusKnotGeometry,
  MeshBasicMaterial,
  Mesh,
} from 'three'
import Lights from './Lights'
import GUI from 'lil-gui'
// import * as GUI from './gui'
import spriteTexture from 'src/assets/textures/particles/sprite-sheet.png'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import { OrthographicCamera } from '@react-three/drei'
import Camera from './Camera'
extend({ OrbitControls, TransformControls })

interface SpriteExtended extends THREE.Sprite {
  velocityX?: number
}

function getTexture() {
  const texture = new THREE.TextureLoader().load(
    'src/assets/textures/particles/sprite-sheet.png'
  )
  return texture
}

const Sprite = ({
  size,
  transparent,
  opacity,
  spriteNumber = 1,
}: {
  size: number
  transparent: boolean
  opacity: number
  spriteNumber: number
}) => {
  const spriteMaterial = new THREE.SpriteMaterial({
    opacity: opacity,
    color: 0xffffff,
    transparent: transparent,
    map: getTexture(),
  })

  // we have 1 row, with five sprites
  spriteMaterial.map!.offset = new THREE.Vector2(0.2 * spriteNumber, 0)
  spriteMaterial.map!.repeat = new THREE.Vector2(1 / 5, 1)
  // make sure the object is always rendered at the front
  spriteMaterial.depthTest = false

  const spriteRef = useRef<THREE.Sprite>(null)
  const [velocityX, setVelocityX] = useState<number>(1)

  useFrame(({ gl }) => {
    if (spriteRef.current) {
      console.log('spriteRef.current.position.x', spriteRef.current.position.x)
      // spriteRef.current.position.x += velocityX
      // if (spriteRef.current.position.x > window.innerWidth) {
      //   setVelocityX(-1)
      //   spriteNumber += 1
      //   spriteMaterial.map!.offset.set((1 / 5) * (spriteNumber % 4), 0)
      // }
      // if (spriteRef.current.position.x < 0) {
      //   setVelocityX(1)
      // }
    }
  })

  return (
    <sprite
      ref={spriteRef}
      material={spriteMaterial}
      scale={[size, size, size]}
      position={[0, 0, -10]}
      name="Sprite"
    />
  )
}

const createSprite = (
  size: number,
  transparent: boolean,
  opacity: number,
  spriteNumber: number,
  sceneOrtho: THREE.Scene
) => {
  const spriteMaterial = new THREE.SpriteMaterial({
    opacity: opacity,
    color: 0xffffff,
    transparent: transparent,
    map: getTexture(),
  })

  // we have 1 row, with five sprites
  spriteMaterial.map!.offset = new THREE.Vector2(0.2 * spriteNumber, 0)
  spriteMaterial.map!.repeat = new THREE.Vector2(1 / 5, 1)
  // make sure the object is always rendered at the front
  spriteMaterial.depthTest = false

  const sprite = new THREE.Sprite(spriteMaterial)
  sprite.scale.set(size, size, size)
  sprite.position.set(100, 50, -10)
  sprite.userData['velocityX'] = 5
  sprite.name = 'Sprite'

  sceneOrtho.add(sprite)
}
// const Sprite = ({
//   size,
//   transparent,
//   opacity,
//   spriteNumber,
//   sceneOrtho,
// }: {
//   size: number
//   transparent: boolean
//   opacity: number
//   spriteNumber: number
//   sceneOrtho: THREE.Scene
// }) => {
//   useEffect(() => {
//     createSprite(size, transparent, opacity, spriteNumber, sceneOrtho)
//   }, [size, transparent, opacity, spriteNumber, sceneOrtho])

//   return null
// }

const Ground = () => {
  const groundRef = useRef<THREE.Mesh>(null)
  const groundGeometry = new THREE.PlaneBufferGeometry(10000, 10000)
  const groundMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
  })

  useEffect(() => {
    if (groundRef.current) {
      groundRef.current.receiveShadow = true
    }
  }, [])

  return (
    <mesh
      geometry={groundGeometry}
      material={groundMaterial}
      position={[0, -2, 0]}
      rotation={[Math.PI / -2, 0, 0]}
      ref={groundRef}
    />
  )
}

const Cube = () => {
  const ref = useRef<THREE.Mesh | null>(null)

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.x += 0.01
      ref.current.rotation.y += 0.01
      ref.current.rotation.z += 0.01
    }
  })

  return (
    <mesh ref={ref} position={[-2, 0, 0]}>
      <boxBufferGeometry />
      <meshStandardMaterial color="#00ffff" />
    </mesh>
  )
}

export const StatsContainer = () => {
  const stats = useMemo(() => new Stats(), [])

  useEffect(() => {
    if (stats) {
      document.body.appendChild(stats.dom)
      return () => {
        document.body.removeChild(stats.dom)
      }
    }
  }, [stats])

  return null
}

const Scene = () => {
  const texture = new TextureLoader().load(
    '/assets/textures/particles/sprite-sheet.png'
  )

  const props = {
    cubeSpeed: 0.01,
    torusSpeed: 0.01,
    size: 10,
    sprite: 1,
    transparent: true,
    opacity: 0.6,
    // redraw: () => {
    //   const sprite = document.querySelector('[name="Sprite"]') as Element
    //   if (sprite) sprite.remove()
    //   document.querySelector('#sprite-root')?.appendChild(<Sprite {...props} />)
    // },
  }
  const cameraSettings = {
    position: [-3, 2, 8],
    fov: 75,
    near: 0.1,
    far: 1000,
  }

  return (
    <>
      <Suspense fallback={null}>
        <Lights />
        <Camera />
        <Ground />
        <Cube />

        {/* <Camera orthographic position={[0, 0, 5]}>
            <Sprite
              size={props.size}
              transparent={props.transparent}
              opacity={props.opacity}
              spriteNumber={props.sprite}
            />
          </Camera> */}
      </Suspense>
      {/* <OrbitControls
        enableDamping
        dampingFactor={0.05}
        minDistance={3}
        maxDistance={10}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={(3 * Math.PI) / 4}
      /> */}
    </>
  )
}

export default Scene
