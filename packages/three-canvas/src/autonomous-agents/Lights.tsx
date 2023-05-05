export default function Lights() {
  return (
    <>
      <directionalLight
        castShadow
        position={[18, 44, 8]}
        intensity={0.64}
        shadow-camera-near={0.1}
        shadow-camera-far={200}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-camera-right={10}
        shadow-camera-left={-10}
        shadow-radius={4}
        shadow-bias={-0.0005}
        shadow-mapSize={[512, 512]}
      />

      <ambientLight intensity={0.16} />
    </>
  )
}
