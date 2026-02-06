import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const deskWoodColor = '#b8956a'
const metalColor = '#2a2a2a'
const screenBorderColor = '#333333'
const keyboardColor = '#2d2d2d'

function Monitor({ position, rotation = [0, 0, 0] as [number, number, number], scale = 1, screenContent = '#0f172a' }: {
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  screenContent?: string
}) {
  const screenRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (screenRef.current) {
      const mat = screenRef.current.material as THREE.MeshStandardMaterial
      const t = clock.getElapsedTime()
      const r = Math.sin(t * 0.3) * 0.02
      const g = Math.sin(t * 0.3 + 1) * 0.02
      const b = Math.sin(t * 0.3 + 2) * 0.02
      mat.emissive.setRGB(0.05 + r, 0.08 + g, 0.15 + b)
    }
  })

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Monitor bezel */}
      <mesh castShadow>
        <boxGeometry args={[0.65, 0.4, 0.025]} />
        <meshStandardMaterial color={screenBorderColor} roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Screen */}
      <mesh ref={screenRef} position={[0, 0, 0.014]}>
        <planeGeometry args={[0.58, 0.34]} />
        <meshStandardMaterial
          color={screenContent}
          roughness={0.2}
          metalness={0.1}
          emissive="#0a1628"
          emissiveIntensity={0.6}
        />
      </mesh>
      {/* Screen content lines — code-like */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={`line${i}`} position={[-0.18 + (i % 3) * 0.02, 0.12 - i * 0.035, 0.015]}>
          <planeGeometry args={[0.12 + Math.random() * 0.2, 0.008]} />
          <meshBasicMaterial color={i % 3 === 0 ? '#4fc3f7' : i % 3 === 1 ? '#81c784' : '#ce93d8'} transparent opacity={0.5} />
        </mesh>
      ))}
      {/* Stand neck */}
      <mesh position={[0, -0.24, -0.04]} castShadow>
        <boxGeometry args={[0.04, 0.08, 0.04]} />
        <meshStandardMaterial color={metalColor} roughness={0.2} metalness={0.8} />
      </mesh>
      {/* Stand base */}
      <mesh position={[0, -0.28, 0.02]} castShadow>
        <boxGeometry args={[0.18, 0.015, 0.12]} />
        <meshStandardMaterial color={metalColor} roughness={0.2} metalness={0.8} />
      </mesh>
    </group>
  )
}

export default function Desk({ position = [-2.0, 0, -2.0] as [number, number, number] }) {
  return (
    <group position={position}>
      {/* === DESK === */}
      {/* Desktop surface */}
      <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.04, 0.75]} />
        <meshStandardMaterial color={deskWoodColor} roughness={0.5} />
      </mesh>

      {/* Desk legs — metal frame style */}
      {/* Left leg frame */}
      <mesh position={[-1.0, 0.375, 0]} castShadow>
        <boxGeometry args={[0.04, 0.75, 0.6]} />
        <meshStandardMaterial color={metalColor} roughness={0.2} metalness={0.8} />
      </mesh>
      {/* Right leg frame */}
      <mesh position={[1.0, 0.375, 0]} castShadow>
        <boxGeometry args={[0.04, 0.75, 0.6]} />
        <meshStandardMaterial color={metalColor} roughness={0.2} metalness={0.8} />
      </mesh>
      {/* Cross bar */}
      <mesh position={[0, 0.1, 0.25]}>
        <boxGeometry args={[2.0, 0.03, 0.03]} />
        <meshStandardMaterial color={metalColor} roughness={0.2} metalness={0.8} />
      </mesh>

      {/* === MONITORS === */}
      {/* Center monitor — main, larger */}
      <Monitor position={[0, 1.05, -0.2]} scale={1.1} />
      {/* Left monitor — angled inward */}
      <Monitor position={[-0.72, 1.02, -0.15]} rotation={[0, 0.25, 0]} scale={0.95} />
      {/* Right monitor — angled inward */}
      <Monitor position={[0.72, 1.02, -0.15]} rotation={[0, -0.25, 0]} scale={0.95} />

      {/* === KEYBOARD === */}
      <mesh position={[0, 0.78, 0.15]} castShadow>
        <boxGeometry args={[0.42, 0.015, 0.14]} />
        <meshStandardMaterial color={keyboardColor} roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Key rows suggestion */}
      {Array.from({ length: 4 }).map((_, row) =>
        Array.from({ length: 12 }).map((_, col) => (
          <mesh key={`key${row}-${col}`} position={[-0.17 + col * 0.031, 0.79, 0.1 + row * 0.032]}>
            <boxGeometry args={[0.025, 0.004, 0.025]} />
            <meshStandardMaterial color="#3a3a3a" roughness={0.5} />
          </mesh>
        ))
      )}

      {/* === MOUSE === */}
      <mesh position={[0.35, 0.78, 0.18]} castShadow>
        <boxGeometry args={[0.06, 0.02, 0.1]} />
        <meshStandardMaterial color={keyboardColor} roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Mouse pad */}
      <mesh position={[0.35, 0.772, 0.18]} receiveShadow>
        <boxGeometry args={[0.25, 0.003, 0.22]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>

      {/* === DESK ACCESSORIES === */}
      {/* Coffee mug */}
      <mesh position={[-0.85, 0.81, 0.2]} castShadow>
        <cylinderGeometry args={[0.035, 0.03, 0.09, 16]} />
        <meshStandardMaterial color="#f5f0eb" roughness={0.8} />
      </mesh>
      {/* Mug handle */}
      <mesh position={[-0.82, 0.81, 0.2]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.02, 0.005, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#f5f0eb" roughness={0.8} />
      </mesh>

      {/* Small succulent on desk */}
      <mesh position={[0.9, 0.8, -0.15]} castShadow>
        <cylinderGeometry args={[0.04, 0.035, 0.06, 8]} />
        <meshStandardMaterial color="#d4c5b0" roughness={0.9} />
      </mesh>
      <mesh position={[0.9, 0.86, -0.15]}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshStandardMaterial color="#7cb87a" roughness={0.8} />
      </mesh>

      {/* === CHAIR === */}
      <group position={[0, 0, 0.65]}>
        {/* Seat */}
        <mesh position={[0, 0.48, 0]} castShadow>
          <boxGeometry args={[0.48, 0.06, 0.45]} />
          <meshStandardMaterial color="#2d2d2d" roughness={0.7} />
        </mesh>
        {/* Backrest */}
        <mesh position={[0, 0.78, -0.2]} castShadow>
          <boxGeometry args={[0.46, 0.55, 0.04]} />
          <meshStandardMaterial color="#2d2d2d" roughness={0.7} />
        </mesh>
        {/* Chair base post */}
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.25, 8]} />
          <meshStandardMaterial color={metalColor} roughness={0.2} metalness={0.8} />
        </mesh>
        {/* Chair base star — 5 legs */}
        {Array.from({ length: 5 }).map((_, i) => {
          const angle = (i / 5) * Math.PI * 2
          return (
            <group key={`cleg${i}`}>
              <mesh position={[Math.sin(angle) * 0.2, 0.08, Math.cos(angle) * 0.2]} rotation={[0, -angle, Math.PI / 2 - 0.3]}>
                <cylinderGeometry args={[0.012, 0.012, 0.22, 6]} />
                <meshStandardMaterial color={metalColor} roughness={0.2} metalness={0.8} />
              </mesh>
              {/* Wheel */}
              <mesh position={[Math.sin(angle) * 0.28, 0.03, Math.cos(angle) * 0.28]}>
                <sphereGeometry args={[0.025, 8, 8]} />
                <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
              </mesh>
            </group>
          )
        })}
        {/* Armrests */}
        <mesh position={[-0.27, 0.62, -0.05]} castShadow>
          <boxGeometry args={[0.04, 0.04, 0.25]} />
          <meshStandardMaterial color={metalColor} roughness={0.3} metalness={0.7} />
        </mesh>
        <mesh position={[0.27, 0.62, -0.05]} castShadow>
          <boxGeometry args={[0.04, 0.04, 0.25]} />
          <meshStandardMaterial color={metalColor} roughness={0.3} metalness={0.7} />
        </mesh>
        {/* Armrest supports */}
        <mesh position={[-0.27, 0.55, -0.05]}>
          <boxGeometry args={[0.03, 0.14, 0.03]} />
          <meshStandardMaterial color={metalColor} roughness={0.3} metalness={0.7} />
        </mesh>
        <mesh position={[0.27, 0.55, -0.05]}>
          <boxGeometry args={[0.03, 0.14, 0.03]} />
          <meshStandardMaterial color={metalColor} roughness={0.3} metalness={0.7} />
        </mesh>
      </group>
    </group>
  )
}
