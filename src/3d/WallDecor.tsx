export default function WallDecor() {
  return (
    <group>
      <mesh position={[2.2, 1.95, 0.72]} castShadow>
        <boxGeometry args={[0.7, 0.5, 0.02]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.5} />
      </mesh>
      <mesh position={[2.2, 1.95, 0.732]}>
        <planeGeometry args={[0.62, 0.42]} />
        <meshStandardMaterial color="#ddc8b0" roughness={0.6} />
      </mesh>
      <mesh position={[2.05, 1.98, 0.733]}>
        <circleGeometry args={[0.08, 20]} />
        <meshStandardMaterial color="#c09070" roughness={0.5} />
      </mesh>
      <mesh position={[2.35, 1.88, 0.733]}>
        <circleGeometry args={[0.05, 20]} />
        <meshStandardMaterial color="#708a90" roughness={0.5} />
      </mesh>
      <mesh position={[0.7, 2.0, 0.72]} castShadow>
        <boxGeometry args={[0.4, 0.52, 0.018]} />
        <meshStandardMaterial color="#ddd5c8" roughness={0.7} />
      </mesh>
      <mesh position={[0.7, 2.0, 0.73]}>
        <planeGeometry args={[0.33, 0.44]} />
        <meshStandardMaterial color="#90a890" roughness={0.6} />
      </mesh>
      <mesh position={[-1.5, 1.85, -2.88]} castShadow receiveShadow>
        <boxGeometry args={[1.0, 0.025, 0.16]} />
        <meshStandardMaterial color="#a8835e" roughness={0.55} />
      </mesh>
      <mesh position={[-1.9, 1.8, -2.86]}>
        <boxGeometry args={[0.025, 0.08, 0.12]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.7} />
      </mesh>
      <mesh position={[-1.1, 1.8, -2.86]}>
        <boxGeometry args={[0.025, 0.08, 0.12]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.7} />
      </mesh>
      <mesh position={[-1.75, 1.91, -2.86]} castShadow>
        <cylinderGeometry args={[0.02, 0.03, 0.08, 6]} />
        <meshStandardMaterial color="#c4a035" roughness={0.3} metalness={0.7} />
      </mesh>
      <mesh position={[-1.4, 1.89, -2.88]} castShadow>
        <boxGeometry args={[0.07, 0.05, 0.05]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.4} metalness={0.4} />
      </mesh>
      <mesh position={[3.42, 2.0, 0.3]} rotation={[0, -Math.PI / 2, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.025, 20]} />
        <meshStandardMaterial color="#f0ebe3" roughness={0.7} />
      </mesh>
      <mesh position={[3.44, 2.0, 0.3]} rotation={[0, -Math.PI / 2, 0]}>
        <circleGeometry args={[0.13, 20]} />
        <meshStandardMaterial color="#fff" roughness={0.5} />
      </mesh>
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2 - Math.PI / 2
        return (
          <mesh key={i} position={[3.45, 2.0 + Math.sin(a) * 0.11, 0.3 + Math.cos(a) * 0.11]} rotation={[0, -Math.PI / 2, 0]}>
            <boxGeometry args={[i % 3 === 0 ? 0.018 : 0.01, 0.004, 0.004]} />
            <meshStandardMaterial color="#2a2a2a" />
          </mesh>
        )
      })}
    </group>
  )
}
