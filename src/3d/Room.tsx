const W = 7
const D = 6
const H = 3
const T = 0.1

export default function Room() {
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[W, D]} />
        <meshStandardMaterial color="#c4a882" roughness={0.5} metalness={0.05} />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, H, 0]}>
        <planeGeometry args={[W, D]} />
        <meshStandardMaterial color="#f2ede6" roughness={0.9} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, H / 2, -D / 2]} receiveShadow>
        <boxGeometry args={[W, H, T]} />
        <meshStandardMaterial color="#ece6dc" roughness={0.85} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-W / 2, H / 2, 0]} receiveShadow>
        <boxGeometry args={[T, H, D]} />
        <meshStandardMaterial color="#ece6dc" roughness={0.85} />
      </mesh>

      {/* Right wall */}
      <mesh position={[W / 2, H / 2, 0]} receiveShadow>
        <boxGeometry args={[T, H, D]} />
        <meshStandardMaterial color="#ece6dc" roughness={0.85} />
      </mesh>

      {/* Front wall — left chunk */}
      <mesh position={[-2.1, H / 2, D / 2]}>
        <boxGeometry args={[2.8, H, T]} />
        <meshStandardMaterial color="#ece6dc" roughness={0.85} />
      </mesh>
      {/* Front wall — right chunk */}
      <mesh position={[2.1, H / 2, D / 2]}>
        <boxGeometry args={[2.8, H, T]} />
        <meshStandardMaterial color="#ece6dc" roughness={0.85} />
      </mesh>
      {/* Front wall — above window */}
      <mesh position={[0, 2.6, D / 2]}>
        <boxGeometry args={[1.4, 0.8, T]} />
        <meshStandardMaterial color="#ece6dc" roughness={0.85} />
      </mesh>
      {/* Front wall — below window */}
      <mesh position={[0, 0.3, D / 2]}>
        <boxGeometry args={[1.4, 0.6, T]} />
        <meshStandardMaterial color="#ece6dc" roughness={0.85} />
      </mesh>

      {/* Window glass */}
      <mesh position={[0, 1.55, D / 2 - 0.02]}>
        <planeGeometry args={[1.3, 1.8]} />
        <meshStandardMaterial color="#b8d4e8" roughness={0.05} metalness={0.1} transparent opacity={0.35} />
      </mesh>
      {/* Window mullions */}
      <mesh position={[0, 1.55, D / 2 + 0.01]}>
        <boxGeometry args={[0.025, 1.8, 0.025]} />
        <meshStandardMaterial color="#d8d0c4" roughness={0.5} />
      </mesh>
      <mesh position={[0, 1.55, D / 2 + 0.01]}>
        <boxGeometry args={[1.3, 0.025, 0.025]} />
        <meshStandardMaterial color="#d8d0c4" roughness={0.5} />
      </mesh>
      {/* Window sill */}
      <mesh position={[0, 0.62, D / 2 + 0.08]}>
        <boxGeometry args={[1.5, 0.04, 0.2]} />
        <meshStandardMaterial color="#d8d0c4" roughness={0.5} />
      </mesh>

      {/* Baseboards */}
      <mesh position={[0, 0.04, -D / 2 + 0.05]}>
        <boxGeometry args={[W, 0.08, 0.06]} />
        <meshStandardMaterial color="#d0c8bc" roughness={0.6} />
      </mesh>
      <mesh position={[-W / 2 + 0.05, 0.04, 0]}>
        <boxGeometry args={[0.06, 0.08, D]} />
        <meshStandardMaterial color="#d0c8bc" roughness={0.6} />
      </mesh>
      <mesh position={[W / 2 - 0.05, 0.04, 0]}>
        <boxGeometry args={[0.06, 0.08, D]} />
        <meshStandardMaterial color="#d0c8bc" roughness={0.6} />
      </mesh>

      {/* Area rug — under desk zone */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-1.2, 0.003, -1.2]}>
        <planeGeometry args={[2.8, 2.2]} />
        <meshStandardMaterial color="#cfc0ab" roughness={0.95} />
      </mesh>

      {/* Ceiling light */}
      <mesh position={[0, H - 0.01, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.03, 20]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.6} />
      </mesh>
      <mesh position={[0, H - 0.06, 0]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial color="#fff5e0" emissive="#fff0d0" emissiveIntensity={0.4} roughness={0.2} />
      </mesh>
    </group>
  )
}
