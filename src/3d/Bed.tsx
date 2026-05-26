import * as THREE from 'three'
import { useCustomTextures } from './useCustomTextures'

export default function Bed() {
  const textures = useCustomTextures()

  return (
    <group position={[2.2, 0, 1.5]}>
      {/* Platform frame */}
      <mesh position={[0, 0.16, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.8, 0.1, 1.6]} />
        <meshStandardMaterial color="#a8835e" roughness={0.55} map={textures.wood} bumpMap={textures.wood} bumpScale={0.015} />
      </mesh>
      {[[-0.8, -0.65], [0.8, -0.65], [-0.8, 0.65], [0.8, 0.65]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.055, z]} castShadow>
          <boxGeometry args={[0.06, 0.11, 0.06]} />
          <meshStandardMaterial color="#a8835e" roughness={0.5} map={textures.wood} />
        </mesh>
      ))}

      {/* Headboard */}
      <mesh position={[0, 0.65, -0.75]} castShadow>
        <boxGeometry args={[1.8, 0.85, 0.05]} />
        <meshStandardMaterial color="#ddd5c8" roughness={0.75} map={textures.wood} bumpMap={textures.wood} bumpScale={0.01} />
      </mesh>

      {/* Mattress */}
      <mesh position={[0, 0.32, 0.02]} castShadow>
        <boxGeometry args={[1.65, 0.2, 1.45]} />
        <meshStandardMaterial color="#f0ebe3" roughness={0.9} map={textures.fabric} bumpMap={textures.fabric} bumpScale={0.02} />
      </mesh>

      {/* Duvet */}
      <mesh position={[0, 0.44, 0.18]}>
        <boxGeometry args={[1.6, 0.04, 1.05]} />
        <meshStandardMaterial color="#c0b4a2" roughness={0.85} map={textures.fabric} bumpMap={textures.fabric} bumpScale={0.03} />
      </mesh>
      <mesh position={[0, 0.46, 0.68]}>
        <boxGeometry args={[1.6, 0.05, 0.06]} />
        <meshStandardMaterial color="#c0b4a2" roughness={0.8} map={textures.fabric} bumpMap={textures.fabric} bumpScale={0.03} />
      </mesh>

      {/* Pillows */}
      <mesh position={[-0.38, 0.48, -0.48]} rotation={[0.08, 0.02, 0]} castShadow>
        <boxGeometry args={[0.5, 0.1, 0.32]} />
        <meshStandardMaterial color="#e0d8cc" roughness={0.9} map={textures.fabric} bumpMap={textures.fabric} bumpScale={0.02} />
      </mesh>
      {/* Small throw pillow */}
      <mesh position={[0, 0.5, -0.3]} rotation={[0.1, 0, 0]} castShadow>
        <boxGeometry args={[0.3, 0.08, 0.2]} />
        <meshStandardMaterial color="#6b8e6b" roughness={0.9} map={textures.fabric} bumpMap={textures.fabric} bumpScale={0.04} />
      </mesh>

      {/* Blanket Overhang */}
      <mesh position={[-0.8, 0.35, 0.18]} rotation={[0, 0, Math.PI / 2 + 0.1]} castShadow>
        <boxGeometry args={[0.2, 0.02, 1.05]} />
        <meshStandardMaterial color="#c0b4a2" roughness={0.85} map={textures.fabric} bumpMap={textures.fabric} bumpScale={0.03} />
      </mesh>
      <mesh position={[0.8, 0.35, 0.18]} rotation={[0, 0, -Math.PI / 2 - 0.1]} castShadow>
        <boxGeometry args={[0.2, 0.02, 1.05]} />
        <meshStandardMaterial color="#c0b4a2" roughness={0.85} map={textures.fabric} bumpMap={textures.fabric} bumpScale={0.03} />
      </mesh>
      <mesh position={[0, 0.35, 0.72]} rotation={[-Math.PI / 2 - 0.1, 0, 0]} castShadow>
        <boxGeometry args={[1.6, 0.02, 0.2]} />
        <meshStandardMaterial color="#c0b4a2" roughness={0.85} map={textures.fabric} bumpMap={textures.fabric} bumpScale={0.03} />
      </mesh>
      <mesh position={[0.38, 0.48, -0.48]} rotation={[0.08, -0.02, 0]} castShadow>
        <boxGeometry args={[0.5, 0.1, 0.32]} />
        <meshStandardMaterial color="#e0d8cc" roughness={0.9} map={textures.fabric} bumpMap={textures.fabric} bumpScale={0.02} />
      </mesh>

      {/* Nightstand */}
      <mesh position={[-1.15, 0.22, -0.35]} castShadow receiveShadow>
        <boxGeometry args={[0.4, 0.44, 0.36]} />
        <meshStandardMaterial color="#a8835e" roughness={0.5} map={textures.wood} bumpMap={textures.wood} bumpScale={0.015} />
      </mesh>
      <mesh position={[-1.15, 0.22, -0.165]}>
        <boxGeometry args={[0.35, 0.004, 0.004]} />
        <meshStandardMaterial color="#8a6d48" />
      </mesh>
      <mesh position={[-1.15, 0.22, -0.16]}>
        <sphereGeometry args={[0.012, 8, 8]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Bedside lamp */}
      <mesh position={[-1.15, 0.5, -0.35]} castShadow>
        <cylinderGeometry args={[0.05, 0.06, 0.06, 12]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[-1.15, 0.62, -0.35]}>
        <cylinderGeometry args={[0.008, 0.008, 0.2, 6]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[-1.15, 0.75, -0.35]}>
        <cylinderGeometry args={[0.015, 0.08, 0.12, 12]} />
        <meshStandardMaterial color="#f0e4d4" roughness={0.8} transparent opacity={0.85} side={THREE.DoubleSide} emissive="#ffddaa" emissiveIntensity={0.2} />
      </mesh>

      {/* Book on Nightstand */}
      <mesh position={[-1.15, 0.45, -0.25]} rotation={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[0.15, 0.02, 0.2]} />
        <meshStandardMaterial color="#4a2d2d" roughness={0.8} />
      </mesh>
      <mesh position={[-1.15, 0.452, -0.25]} rotation={[0, 0.3, 0]}>
        <boxGeometry args={[0.14, 0.018, 0.19]} />
        <meshStandardMaterial color="#f0f0f0" roughness={0.9} />
      </mesh>
    </group>
  )
}
