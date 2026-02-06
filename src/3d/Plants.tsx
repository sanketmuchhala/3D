import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function FloorPlant({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.015
  })

  return (
    <group position={position} ref={ref}>
      <mesh position={[0, 0.12, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.08, 0.24, 10]} />
        <meshStandardMaterial color="#c8b8a0" roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.125, 0.12, 0.015, 10]} />
        <meshStandardMaterial color="#c8b8a0" roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.24, 0]}>
        <cylinderGeometry args={[0.11, 0.11, 0.015, 10]} />
        <meshStandardMaterial color="#4a3c2e" roughness={0.95} />
      </mesh>
      <mesh position={[0, 0.48, 0]}>
        <cylinderGeometry args={[0.01, 0.012, 0.45, 5]} />
        <meshStandardMaterial color="#4a7a4a" roughness={0.7} />
      </mesh>
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.sin(a) * (0.06 + Math.sin(i * 1.5) * 0.03), 0.42 + i * 0.07, Math.cos(a) * (0.06 + Math.sin(i * 1.5) * 0.03)]}>
            <sphereGeometry args={[0.045, 5, 4]} />
            <meshStandardMaterial color={i % 2 === 0 ? '#5a8a5a' : '#3d6b3d'} roughness={0.7} flatShading />
          </mesh>
        )
      })}
      {Array.from({ length: 5 }).map((_, i) => {
        const a = (i / 5) * Math.PI * 2 + 0.3
        return (
          <mesh key={`t${i}`} position={[Math.sin(a) * 0.04, 0.72 + i * 0.025, Math.cos(a) * 0.04]}>
            <sphereGeometry args={[0.05, 5, 4]} />
            <meshStandardMaterial color="#5a8a5a" roughness={0.7} flatShading />
          </mesh>
        )
      })}
    </group>
  )
}

function SmallPlant({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.05, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.035, 0.1, 8]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.5} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.045, 0.045, 0.01, 8]} />
        <meshStandardMaterial color="#4a3c2e" roughness={0.95} />
      </mesh>
      {Array.from({ length: 5 }).map((_, i) => {
        const a = (i / 5) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.sin(a) * 0.03, 0.15 + (i * 37 % 7) * 0.004, Math.cos(a) * 0.03]}>
            <sphereGeometry args={[0.028, 5, 4]} />
            <meshStandardMaterial color={i % 2 === 0 ? '#6b9b6b' : '#5a8a5a'} roughness={0.7} flatShading />
          </mesh>
        )
      })}
      <mesh position={[0, 0.18, 0]}>
        <sphereGeometry args={[0.032, 5, 4]} />
        <meshStandardMaterial color="#5a8a5a" roughness={0.7} flatShading />
      </mesh>
    </group>
  )
}

function HangingPlant({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.004, 0.004, 0.24, 4]} />
        <meshStandardMaterial color="#c0aa8a" roughness={0.9} />
      </mesh>
      <mesh position={[0, -0.02, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.05, 0.1, 8]} />
        <meshStandardMaterial color="#ddd0c0" roughness={0.85} />
      </mesh>
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2
        const drop = i * 0.03
        return (
          <mesh key={i} position={[Math.sin(a) * (0.06 + drop * 0.3), -0.08 - drop, Math.cos(a) * (0.06 + drop * 0.3)]}>
            <sphereGeometry args={[0.02, 5, 4]} />
            <meshStandardMaterial color={i % 3 === 0 ? '#3d6b3d' : '#5a8a5a'} roughness={0.7} flatShading />
          </mesh>
        )
      })}
    </group>
  )
}

export default function Plants() {
  return (
    <group>
      <FloorPlant position={[-3.0, 0, 2.4]} />
      <FloorPlant position={[3.0, 0, -0.3]} />
      <SmallPlant position={[0.25, 0.64, 2.92]} />
      <SmallPlant position={[3.05, 1.63, -2.0]} />
      <HangingPlant position={[-1.2, 2.85, 2.5]} />
    </group>
  )
}
