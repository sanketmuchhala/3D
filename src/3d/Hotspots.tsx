import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

interface HotspotDef {
  id: string
  label: string
  position: [number, number, number]
  color: string
}

const hotspots: HotspotDef[] = [
  { id: 'about', label: 'About Me', position: [2.5, 1.5, 2.0], color: '#7ab0d4' },
  { id: 'projects', label: 'Projects', position: [-2.0, 1.4, -2.0], color: '#d4a07a' },
  { id: 'skills', label: 'Skills', position: [3.8, 1.2, -2.5], color: '#7ad49a' },
  { id: 'contact', label: 'Contact', position: [0, 1.6, 3.3], color: '#d47a9a' },
]

function Hotspot({ def, onClick }: { def: HotspotDef; onClick: (id: string) => void }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime()
      meshRef.current.position.y = def.position[1] + Math.sin(t * 1.5 + def.position[0]) * 0.06
      const s = hovered ? 1.3 : 1.0
      meshRef.current.scale.setScalar(s + Math.sin(t * 2) * 0.05)
    }
  })

  return (
    <group>
      <mesh
        ref={meshRef}
        position={def.position}
        onClick={(e) => { e.stopPropagation(); onClick(def.id) }}
        onPointerEnter={() => { setHovered(true); document.body.style.cursor = 'pointer' }}
        onPointerLeave={() => { setHovered(false); document.body.style.cursor = 'default' }}
      >
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color={def.color}
          emissive={def.color}
          emissiveIntensity={hovered ? 0.8 : 0.4}
          transparent
          opacity={hovered ? 0.95 : 0.7}
          roughness={0.2}
        />
      </mesh>
      {/* Ring around hotspot */}
      <mesh position={def.position} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.12, 0.008, 8, 32]} />
        <meshStandardMaterial
          color={def.color}
          emissive={def.color}
          emissiveIntensity={0.3}
          transparent
          opacity={0.5}
        />
      </mesh>
      {hovered && (
        <Html position={[def.position[0], def.position[1] + 0.25, def.position[2]]} center>
          <div style={{
            background: 'rgba(26, 26, 46, 0.9)',
            color: '#f5f0eb',
            padding: '6px 14px',
            borderRadius: '8px',
            fontSize: '13px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            backdropFilter: 'blur(8px)',
            border: `1px solid ${def.color}40`,
            pointerEvents: 'none',
          }}>
            {def.label}
          </div>
        </Html>
      )}
    </group>
  )
}

export default function Hotspots({ onClick }: { onClick: (id: string) => void }) {
  return (
    <group>
      {hotspots.map((def) => (
        <Hotspot key={def.id} def={def} onClick={onClick} />
      ))}
    </group>
  )
}
