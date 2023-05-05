import * as THREE from 'three'
import { RigidBody, CuboidCollider } from '@react-three/rapier'
import { useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

// THREE.ColorManagement.legacyMode = false;

const boxGeometry = new THREE.BoxGeometry(1, 1, 1)

const floor1Material = new THREE.MeshStandardMaterial({ color: 'limegreen' })
const floor2Material = new THREE.MeshStandardMaterial({ color: 'greenyellow' })
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: 'orangered' })
const wallMaterial = new THREE.MeshStandardMaterial({ color: 'slategrey' })

export function BlockStart({ position = [0, 0, 0] }) {
  return (
    <group position={[0, 0, 0]}>
      <mesh
        geometry={boxGeometry}
        material={floor1Material}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      ></mesh>
    </group>
  )
}

export default function Level({ count = 1, types = [] }) {
  function Bounds({ length = 1 }) {
    return (
      <>
        <RigidBody type="fixed" restitution={0.2} friction={0}>
          <mesh
            position={[2 + 0.15, 0.75, -(length * 4) / 2 + 2]}
            scale={[0.3, 1.5, length * 4]}
            material={wallMaterial}
            geometry={boxGeometry}
            castShadow
          />
          <mesh
            position={[-2 - 0.3 + 0.15, 0.75, -(length * 4) / 2 + 2]}
            scale={[0.3, 1.5, length * 4]}
            material={wallMaterial}
            geometry={boxGeometry}
            receiveShadow
          />

          <mesh
            material={wallMaterial}
            geometry={boxGeometry}
            scale={[4, 1.5, 0.3]}
            position={[0, 0.75, -length * 4 + 2 - 0.15]}
          />

          <CuboidCollider
            args={[2, 0.1, 2 * length]}
            position={[0, -0.1, -(length * 2) + 2]}
            restitution={0.2}
            friction={1}
          />
        </RigidBody>
      </>
    )
  }

  return (
    <>
      <BlockStart position={[0, 0, 0]} />

      <Bounds length={count} />
    </>
  )
}
