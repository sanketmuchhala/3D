import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

interface Spot { id: string; label: string; position: [number, number, number]; color: string }

const spots: Spot[] = [
  { id: 'about', label: 'About Me', position: [2.2, 1.3, 1.5], color: '#7ab0d4' },
  { id: 'projects', label: 'Projects', position: [-1.5, 1.3, -2.2], color: '#d4a07a' },
  { id: 'skills', label: 'Skills', position: [3.05, 1.1, -2.0], color: '#7ad49a' },
  { id: 'experience', label: 'Experience', position: [-1.5, 2.1, -2.8], color: '#d4c87a' },
  { id: 'contact', label: 'Contact', position: [0, 1.4, 2.8], color: '#d47a9a' },
]

function Orb({ spot, onClick }: { spot: Spot; onClick: (id: string) => void }) {
  const ref = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime()
      ref.current.position.y = spot.position[1] + Math.sin(t * 1.5 + spot.position[0]) * 0.05
      ref.current.scale.setScalar((hovered ? 1.25 : 1) + Math.sin(t * 2) * 0.04)
    }
  })

  return (
    <group>
      <mesh
        ref={ref}
        position={spot.position}
        onClick={(e) => { e.stopPropagation(); onClick(spot.id) }}
        onPointerEnter={() => { setHovered(true); document.body.style.cursor = 'pointer' }}
        onPointerLeave={() => { setHovered(false); document.body.style.cursor = 'default' }}
      >
        <sphereGeometry args={[0.07, 14, 14]} />
        <meshStandardMaterial
          color={spot.color} emissive={spot.color}
          emissiveIntensity={hovered ? 0.8 : 0.35}
          transparent opacity={hovered ? 0.9 : 0.65} roughness={0.2}
        />
      </mesh>
      <mesh position={spot.position} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.1, 0.006, 6, 28]} />
        <meshStandardMaterial color={spot.color} emissive={spot.color} emissiveIntensity={0.25} transparent opacity={0.4} />
      </mesh>
      {hovered && (
        <Html position={[spot.position[0], spot.position[1] + 0.2, spot.position[2]]} center>
          <div style={{
            background: 'rgba(20,20,38,0.88)', color: '#f0ebe3',
            padding: '5px 12px', borderRadius: '7px', fontSize: '12px',
            fontFamily: 'Inter,system-ui,sans-serif', fontWeight: 500,
            whiteSpace: 'nowrap', backdropFilter: 'blur(8px)',
            border: `1px solid ${spot.color}30`, pointerEvents: 'none',
          }}>
            {spot.label}
          </div>
        </Html>
      )}
    </group>
  )
}

export default function Hotspots({ onClick }: { onClick: (id: string) => void }) {
  return (
    <group>
      {spots.map((s) => <Orb key={s.id} spot={s} onClick={onClick} />)}
    </group>
  )
}
