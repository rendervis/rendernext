/* eslint-disable */
import * as THREE from 'three'
import { Suspense, useContext } from 'react'
import { useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'

import { OrbitControls } from '@react-three/drei'

import Experience from './components/Experience'
// import Scene, { StatsContainer } from './autonomous-agents/SpriteMap'
import Scene from './autonomous-agents/Scene'

import { GuiProvider } from './utils/hooks/useGui'
import { StatsContainer } from './autonomous-agents/SpriteMap'

export default function App() {
  const cameraSettings = {
    position: [-3, 2, 8],
    fov: 75,
    near: 0.1,
    far: 1000,
  }

  const rendererSettings = {
    antialias: true,
    gammaFactor: 2.2,
    gammaOutput: true,
    shadowMapEnabled: true,
    shadowMapType: THREE.VSMShadowMap,
  }

  return (
    <>
      <StatsContainer />
      <GuiProvider>
        <Suspense fallback={null}>
          <Canvas
            gl={{
              antialias: rendererSettings.antialias,
              // gammaFactor: rendererSettings.gammaFactor,
              // gammaOutput: rendererSettings.gammaOutput,
              shadowMapEnabled: rendererSettings.shadowMapEnabled,
              shadowMapType: rendererSettings.shadowMapType,
            }}
            onCreated={({ gl }) => {
              gl.setClearColor(0xffffff)
            }}
          >
            <Scene />
          </Canvas>
        </Suspense>
      </GuiProvider>
    </>
  )
}
