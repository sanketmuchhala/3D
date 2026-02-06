/** Minimal wall decorations: framed art, floating shelf, wall clock */
export default function WallDecor() {
  return (
    <group>
      {/* === FRAMED ART — above bed === */}
      {/* Frame */}
      <mesh position={[2.5, 2.1, -0.38]} castShadow>
        <boxGeometry args={[0.8, 0.55, 0.025]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.5} />
      </mesh>
      {/* Art surface — abstract gradient */}
      <mesh position={[2.5, 2.1, -0.365]}>
        <planeGeometry args={[0.72, 0.47]} />
        <meshStandardMaterial color="#e8d5c0" roughness={0.6} />
      </mesh>
      {/* Abstract shapes on art */}
      <mesh position={[2.3, 2.15, -0.36]}>
        <circleGeometry args={[0.1, 24]} />
        <meshStandardMaterial color="#c9907a" roughness={0.5} />
      </mesh>
      <mesh position={[2.65, 2.0, -0.36]}>
        <circleGeometry args={[0.06, 24]} />
        <meshStandardMaterial color="#7a9aa0" roughness={0.5} />
      </mesh>

      {/* === SECOND FRAME — left of bed area === */}
      <mesh position={[0.8, 2.2, -0.38]} castShadow>
        <boxGeometry args={[0.45, 0.6, 0.02]} />
        <meshStandardMaterial color="#e8ddd0" roughness={0.7} />
      </mesh>
      <mesh position={[0.8, 2.2, -0.365]}>
        <planeGeometry args={[0.38, 0.52]} />
        <meshStandardMaterial color="#9ab09a" roughness={0.6} />
      </mesh>
      {/* Minimal mountain silhouette */}
      <mesh position={[0.8, 2.1, -0.36]} rotation={[0, 0, Math.PI / 4]}>
        <planeGeometry args={[0.15, 0.15]} />
        <meshStandardMaterial color="#7a9a7a" roughness={0.5} />
      </mesh>

      {/* === FLOATING SHELF — back wall, above desk === */}
      <mesh position={[-2.0, 2.0, -3.38]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.03, 0.18]} />
        <meshStandardMaterial color="#b8956a" roughness={0.55} />
      </mesh>
      {/* Shelf brackets */}
      <mesh position={[-2.4, 1.95, -3.35]}>
        <boxGeometry args={[0.03, 0.1, 0.15]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.7} />
      </mesh>
      <mesh position={[-1.6, 1.95, -3.35]}>
        <boxGeometry args={[0.03, 0.1, 0.15]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Items on floating shelf */}
      {/* Small trophy/award */}
      <mesh position={[-2.3, 2.07, -3.35]} castShadow>
        <cylinderGeometry args={[0.025, 0.035, 0.1, 8]} />
        <meshStandardMaterial color="#c4a035" roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Camera / tech object */}
      <mesh position={[-1.9, 2.05, -3.38]} castShadow>
        <boxGeometry args={[0.08, 0.06, 0.06]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.4} metalness={0.4} />
      </mesh>
      <mesh position={[-1.87, 2.06, -3.34]}>
        <cylinderGeometry args={[0.015, 0.015, 0.02, 8]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.6} />
      </mesh>

      {/* === WALL CLOCK — right wall === */}
      <mesh position={[3.92, 2.2, 0.5]}>
        <cylinderGeometry args={[0.18, 0.18, 0.03, 24]} />
        <meshStandardMaterial color="#f5f0eb" roughness={0.7} />
      </mesh>
      {/* Clock face */}
      <mesh position={[3.92, 2.2, 0.515]} rotation={[0, -Math.PI / 2, 0]}>
        <circleGeometry args={[0.16, 24]} />
        <meshStandardMaterial color="#ffffff" roughness={0.5} />
      </mesh>
      {/* Clock rim */}
      <mesh position={[3.92, 2.2, 0.5]}>
        <torusGeometry args={[0.18, 0.01, 8, 24]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.6} />
      </mesh>
      {/* Hour markers */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2 - Math.PI / 2
        const x = 3.935
        const r = 0.14
        return (
          <mesh key={`hr${i}`} position={[x, 2.2 + Math.sin(angle) * r, 0.5 + Math.cos(angle) * r]} rotation={[0, -Math.PI / 2, 0]}>
            <boxGeometry args={[0.02, 0.005, 0.005]} />
            <meshStandardMaterial color="#2a2a2a" />
          </mesh>
        )
      })}

      {/* === CEILING LIGHT FIXTURE === */}
      <mesh position={[0, 3.15, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.04, 16]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.6} />
      </mesh>
      <mesh position={[0, 3.1, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#fff8e8" roughness={0.2} emissive="#fff0d0" emissiveIntensity={0.3} />
      </mesh>
    </group>
  )
}
