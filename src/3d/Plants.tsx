import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const leafGreen = '#5a8a5a'
const leafDark = '#3d6b3d'
const potColor = '#d4c5b0'
const potDark = '#4a4a4a'
const soilColor = '#5a4a3a'

function Leaf({ position, rotation, scale = 1, color = leafGreen }: {
  position: [number, number, number]
  rotation: [number, number, number]
  scale?: number
  color?: string
}) {
  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <sphereGeometry args={[0.06, 6, 4]} />
      <meshStandardMaterial color={color} roughness={0.7} flatShading />
    </mesh>
  )
}

function FloorPlant({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.02
    }
  })

  return (
    <group position={position} ref={groupRef}>
      {/* Pot */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <cylinderGeometry args={[0.14, 0.1, 0.3, 12]} />
        <meshStandardMaterial color={potColor} roughness={0.85} />
      </mesh>
      {/* Pot rim */}
      <mesh position={[0, 0.305, 0]}>
        <cylinderGeometry args={[0.15, 0.14, 0.02, 12]} />
        <meshStandardMaterial color={potColor} roughness={0.85} />
      </mesh>
      {/* Soil */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.02, 12]} />
        <meshStandardMaterial color={soilColor} roughness={0.95} />
      </mesh>

      {/* Stem */}
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.012, 0.015, 0.5, 6]} />
        <meshStandardMaterial color="#4a7a4a" roughness={0.7} />
      </mesh>

      {/* Leaves — clusters */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const height = 0.5 + i * 0.08
        const radius = 0.08 + Math.sin(i * 1.5) * 0.04
        return (
          <Leaf
            key={`leaf${i}`}
            position={[Math.sin(angle) * radius, height, Math.cos(angle) * radius]}
            rotation={[Math.random() * 0.5, angle, Math.random() * 0.3 - 0.15]}
            scale={0.7 + Math.random() * 0.5}
            color={i % 2 === 0 ? leafGreen : leafDark}
          />
        )
      })}
      {/* Top cluster */}
      {Array.from({ length: 5 }).map((_, i) => {
        const angle = (i / 5) * Math.PI * 2 + 0.3
        return (
          <Leaf
            key={`top${i}`}
            position={[Math.sin(angle) * 0.06, 0.82 + i * 0.03, Math.cos(angle) * 0.06]}
            rotation={[Math.sin(angle) * 0.4, angle, 0]}
            scale={0.8 + Math.random() * 0.4}
            color={leafGreen}
          />
        )
      })}
    </group>
  )
}

function SmallPlant({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.15 + 1) * 0.015
    }
  })

  return (
    <group position={position} ref={groupRef}>
      {/* Small pot */}
      <mesh position={[0, 0.06, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.045, 0.12, 10]} />
        <meshStandardMaterial color={potDark} roughness={0.6} metalness={0.2} />
      </mesh>
      {/* Soil */}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.055, 0.055, 0.01, 10]} />
        <meshStandardMaterial color={soilColor} roughness={0.95} />
      </mesh>
      {/* Small bushy leaves */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2
        return (
          <mesh key={`sl${i}`} position={[Math.sin(angle) * 0.04, 0.18 + Math.random() * 0.05, Math.cos(angle) * 0.04]}>
            <sphereGeometry args={[0.035, 6, 4]} />
            <meshStandardMaterial color={i % 2 === 0 ? '#6b9b6b' : leafGreen} roughness={0.7} flatShading />
          </mesh>
        )
      })}
      <mesh position={[0, 0.22, 0]}>
        <sphereGeometry args={[0.04, 6, 4]} />
        <meshStandardMaterial color={leafGreen} roughness={0.7} flatShading />
      </mesh>
    </group>
  )
}

function HangingPlant({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Macrame-style hanger */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.005, 0.005, 0.3, 4]} />
        <meshStandardMaterial color="#c9b89a" roughness={0.9} />
      </mesh>
      {/* Pot */}
      <mesh position={[0, -0.02, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.06, 0.12, 10]} />
        <meshStandardMaterial color="#e0d5c5" roughness={0.85} />
      </mesh>
      {/* Trailing leaves */}
      {Array.from({ length: 10 }).map((_, i) => {
        const angle = (i / 10) * Math.PI * 2
        const drop = i * 0.04
        return (
          <mesh key={`hl${i}`} position={[Math.sin(angle) * (0.08 + drop * 0.3), -0.1 - drop, Math.cos(angle) * (0.08 + drop * 0.3)]}>
            <sphereGeometry args={[0.025, 5, 4]} />
            <meshStandardMaterial color={i % 3 === 0 ? leafDark : leafGreen} roughness={0.7} flatShading />
          </mesh>
        )
      })}
    </group>
  )
}

export default function Plants() {
  return (
    <group>
      {/* Large floor plant — corner near window */}
      <FloorPlant position={[-3.5, 0, 2.8]} />

      {/* Another floor plant — near bookshelf */}
      <FloorPlant position={[3.5, 0, -0.5]} />

      {/* Small plant on window sill area */}
      <SmallPlant position={[0.3, 0.6, 3.35]} />

      {/* Hanging plant from ceiling near window */}
      <HangingPlant position={[-1.5, 3.0, 3.0]} />

      {/* Small plant on bookshelf (top shelf area) */}
      <SmallPlant position={[3.8, 1.8, -2.5]} />
    </group>
  )
}
