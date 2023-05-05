const param = {
  count: 200,
  radius: 8,
  branches:3
}

const positions = new Float32Array(param.count * 2)

for (let i = 0; i < param.count; i++) {
  const i2 = i * 2
  positions[i2] = Math.random()
  positions[i2 + 1] = Math.random()
}

export const Particles = () => {
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={param.count}
          itemSize={2}
          array={positions}
        />
      </bufferGeometry>
      <pointsMaterial size={0.04} transparent />
    </points>
  )
}
