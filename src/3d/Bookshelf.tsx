import { useCustomTextures } from './useCustomTextures'

const colors = ['#2d4a7a', '#7a3b3b', '#3b7a4a', '#7a6b3b', '#5a3b7a', '#3b6a7a', '#7a3b5a', '#4a6a3b', '#6a4a3b', '#3b4a6a', '#8b6b4b', '#4b7a6b']

export default function Bookshelf() {
  const textures = useCustomTextures()
  const W = 0.9, D = 0.26, H = 2.0, T = 0.022
  const shelves = 5
  const gap = H / shelves

  return (
    <group position={[3.05, 0, -2.0]}>
      {/* Side panels */}
      <mesh position={[-W / 2, H / 2, 0]} castShadow>
        <boxGeometry args={[T, H, D]} />
        <meshStandardMaterial color="#a8835e" roughness={0.55} map={textures.wood} bumpMap={textures.wood} bumpScale={0.015} />
      </mesh>
      <mesh position={[W / 2, H / 2, 0]} castShadow>
        <boxGeometry args={[T, H, D]} />
        <meshStandardMaterial color="#a8835e" roughness={0.55} map={textures.wood} bumpMap={textures.wood} bumpScale={0.015} />
      </mesh>
      <mesh position={[0, H / 2, -D / 2 + 0.005]}>
        <boxGeometry args={[W, H, 0.008]} />
        <meshStandardMaterial color="#96784e" roughness={0.6} map={textures.wood} />
      </mesh>
      {Array.from({ length: shelves + 1 }).map((_, i) => (
        <mesh key={i} position={[0, i * gap, 0]} castShadow receiveShadow>
          <boxGeometry args={[W - T, T, D]} />
          <meshStandardMaterial color="#a8835e" roughness={0.55} map={textures.wood} bumpMap={textures.wood} bumpScale={0.015} />
        </mesh>
      ))}
      {/* Shelf 1 */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={`s1-${i}`} position={[-0.3 + i * 0.11, gap * 0.5 + 0.01, 0.01]} castShadow>
          <boxGeometry args={[0.07, gap - 0.06, 0.18]} />
          <meshStandardMaterial color={colors[i]} roughness={0.8} />
        </mesh>
      ))}
      {/* Shelf 2 */}
      {Array.from({ length: 7 }).map((_, i) => (
        <mesh key={`s2-${i}`} position={[-0.33 + i * 0.1, gap * 1.5 + 0.01, -0.005]} castShadow>
          <boxGeometry args={[0.06, gap * (0.6 + (i % 3) * 0.12), 0.17]} />
          <meshStandardMaterial color={colors[(i + 4) % 12]} roughness={0.8} />
        </mesh>
      ))}
      {/* Shelf 3 */}
      {Array.from({ length: 4 }).map((_, i) => (
        <mesh key={`s3-${i}`} position={[-0.28 + i * 0.12, gap * 2.5, 0]} castShadow>
          <boxGeometry args={[0.075, gap - 0.08, 0.18]} />
          <meshStandardMaterial color={colors[(i + 8) % 12]} roughness={0.8} />
        </mesh>
      ))}
      <mesh position={[0.22, gap * 2 + 0.04, 0]} castShadow>
        <boxGeometry args={[0.16, 0.05, 0.13]} />
        <meshStandardMaterial color="#7a6b4b" roughness={0.8} />
      </mesh>
      <mesh position={[0.22, gap * 2 + 0.09, 0]} castShadow>
        <boxGeometry args={[0.15, 0.05, 0.13]} />
        <meshStandardMaterial color="#5b7a5b" roughness={0.8} />
      </mesh>
      {/* Shelf 4 */}
      <mesh position={[-0.25, gap * 3.5, 0]} castShadow>
        <boxGeometry args={[0.08, gap - 0.1, 0.17]} />
        <meshStandardMaterial color="#3b5a7a" roughness={0.8} />
      </mesh>
      <mesh position={[-0.14, gap * 3.5, 0]} castShadow>
        <boxGeometry args={[0.06, gap - 0.12, 0.16]} />
        <meshStandardMaterial color="#7a5a3b" roughness={0.8} />
      </mesh>
      <mesh position={[0.15, gap * 3 + 0.05, 0]} castShadow>
        <boxGeometry args={[0.1, 0.08, 0.1]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.4} metalness={0.3} />
      </mesh>
      <mesh position={[0.3, gap * 3 + 0.07, -0.07]}>
        <boxGeometry args={[0.09, 0.12, 0.012]} />
        <meshStandardMaterial color="#ddd5c8" roughness={0.7} />
      </mesh>
      <mesh position={[0.3, gap * 3 + 0.07, -0.063]}>
        <planeGeometry args={[0.065, 0.085]} />
        <meshStandardMaterial color="#8fac8f" roughness={0.5} />
      </mesh>
      {/* Shelf 5 (top) */}
      <mesh position={[-0.2, gap * 4.5, 0]} castShadow>
        <boxGeometry args={[0.07, gap - 0.14, 0.16]} />
        <meshStandardMaterial color="#4a6a7a" roughness={0.8} />
      </mesh>

      {/* Top of Bookshelf Decorative Items */}
      {/* Vase */}
      <mesh position={[-0.2, gap * 5 + 0.1, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.04, 0.2, 16]} />
        <meshStandardMaterial color="#e0d8cc" roughness={0.2} metalness={0.1} />
      </mesh>
      {/* Small Box */}
      <mesh position={[0.2, gap * 5 + 0.05, 0]} rotation={[0, 0.2, 0]} castShadow>
        <boxGeometry args={[0.15, 0.1, 0.15]} />
        <meshStandardMaterial color="#8b6b4b" roughness={0.8} />
      </mesh>
    </group>
  )
}
