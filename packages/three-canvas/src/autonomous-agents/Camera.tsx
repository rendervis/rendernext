import React, { useRef, useLayoutEffect } from 'react'
import { PerspectiveCamera, OrthographicCamera } from 'three'
import { useFrame, useThree } from '@react-three/fiber'

interface CameraProps {
  position?: [number, number, number]
  orthographic?: boolean
  children?: React.ReactNode
}

const Camera: React.FC<CameraProps> = ({
  position = [-3, 2, 8],
  orthographic = false,
  children,
}) => {
  const { set, gl } = useThree()
  const camera = useRef<PerspectiveCamera | OrthographicCamera>()

  const aspect = gl.domElement.width / gl.domElement.height
  useLayoutEffect(() => {
    if (orthographic) {
      camera.current = new OrthographicCamera(
        -gl.domElement.width / 2,
        gl.domElement.width / 2,
        gl.domElement.height / 2,
        -gl.domElement.height / 2,
        -10,
        10
      )
    } else {
      camera.current = new PerspectiveCamera(75, aspect, 0.1, 1000)
    }
  }, [aspect, gl.domElement.height, gl.domElement.width, orthographic])

  useLayoutEffect(() => {
    if (camera.current) {
      camera.current.position.set(position[0], position[1], position[2])
      set({ camera: camera.current })
    }
  }, [position, set])

  useFrame(() => {
    camera.current?.updateMatrixWorld()
  })

  return <>{children}</>
}

export default Camera
