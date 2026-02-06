import * as THREE from 'three'

const woodColor = '#b8956a'
const frameColor = '#e8ddd0'
const sheetColor = '#f5f0eb'
const pillowColor = '#e8e0d8'
const blanketColor = '#c5b8a8'

export default function Bed({ position = [2.5, 0, 2.0] as [number, number, number] }) {
  return (
    <group position={position}>
      {/* Bed frame - low platform style */}
      {/* Platform base */}
      <mesh position={[0, 0.18, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.0, 0.12, 1.8]} />
        <meshStandardMaterial color={woodColor} roughness={0.6} />
      </mesh>

      {/* Platform legs - minimal */}
      {[[-0.85, 0.06, -0.75], [0.85, 0.06, -0.75], [-0.85, 0.06, 0.75], [0.85, 0.06, 0.75]].map((pos, i) => (
        <mesh key={`leg${i}`} position={pos as [number, number, number]} castShadow>
          <boxGeometry args={[0.08, 0.12, 0.08]} />
          <meshStandardMaterial color={woodColor} roughness={0.5} />
        </mesh>
      ))}

      {/* Headboard — minimal flat panel */}
      <mesh position={[0, 0.7, -0.85]} castShadow>
        <boxGeometry args={[2.0, 0.9, 0.06]} />
        <meshStandardMaterial color={frameColor} roughness={0.7} />
      </mesh>

      {/* Mattress */}
      <mesh position={[0, 0.35, 0.02]} castShadow>
        <boxGeometry args={[1.85, 0.2, 1.65]} />
        <meshStandardMaterial color={sheetColor} roughness={0.9} />
      </mesh>

      {/* Sheet / top cover — slightly offset for realism */}
      <mesh position={[0, 0.46, 0.15]}>
        <boxGeometry args={[1.82, 0.02, 1.35]} />
        <meshStandardMaterial color={sheetColor} roughness={0.95} />
      </mesh>

      {/* Blanket — folded at foot, covering lower 2/3 */}
      <mesh position={[0, 0.48, 0.25]}>
        <boxGeometry args={[1.78, 0.04, 1.0]} />
        <meshStandardMaterial color={blanketColor} roughness={0.9} />
      </mesh>
      {/* Blanket fold at foot */}
      <mesh position={[0, 0.5, 0.72]}>
        <boxGeometry args={[1.78, 0.06, 0.08]} />
        <meshStandardMaterial color={blanketColor} roughness={0.85} />
      </mesh>

      {/* Pillows */}
      <mesh position={[-0.4, 0.52, -0.55]} rotation={[0.1, 0, 0]} castShadow>
        <boxGeometry args={[0.55, 0.12, 0.35]} />
        <meshStandardMaterial color={pillowColor} roughness={0.9} />
      </mesh>
      <mesh position={[0.4, 0.52, -0.55]} rotation={[0.1, 0.05, 0]} castShadow>
        <boxGeometry args={[0.55, 0.12, 0.35]} />
        <meshStandardMaterial color={pillowColor} roughness={0.9} />
      </mesh>

      {/* Nightstand */}
      <mesh position={[-1.25, 0.25, -0.4]} castShadow receiveShadow>
        <boxGeometry args={[0.45, 0.5, 0.4]} />
        <meshStandardMaterial color={woodColor} roughness={0.55} />
      </mesh>
      {/* Nightstand drawer line */}
      <mesh position={[-1.25, 0.25, -0.19]}>
        <boxGeometry args={[0.4, 0.005, 0.005]} />
        <meshStandardMaterial color="#9a7a54" roughness={0.5} />
      </mesh>
      {/* Lamp on nightstand */}
      <mesh position={[-1.25, 0.58, -0.4]} castShadow>
        <cylinderGeometry args={[0.06, 0.08, 0.08, 16]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.6} />
      </mesh>
      <mesh position={[-1.25, 0.72, -0.4]}>
        <cylinderGeometry args={[0.01, 0.01, 0.22, 8]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.6} />
      </mesh>
      <mesh position={[-1.25, 0.86, -0.4]} castShadow>
        <cylinderGeometry args={[0.02, 0.1, 0.16, 16]} />
        <meshStandardMaterial color="#f0e6d8" roughness={0.8} transparent opacity={0.9} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}
