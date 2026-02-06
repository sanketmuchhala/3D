import { useRef } from 'react'
import * as THREE from 'three'

const ROOM_W = 8
const ROOM_D = 7
const ROOM_H = 3.2
const WALL_T = 0.12

const wallColor = '#f0ebe3'
const floorColor = '#c9a87c'
const ceilingColor = '#f5f1ec'
const baseboardColor = '#d6cfc4'
const windowFrameColor = '#e8e0d4'

function Wall({ position, size, color = wallColor }: { position: [number, number, number]; size: [number, number, number]; color?: string }) {
  return (
    <mesh position={position} receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.85} />
    </mesh>
  )
}

function Baseboard({ position, size }: { position: [number, number, number]; size: [number, number, number] }) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={baseboardColor} roughness={0.6} />
    </mesh>
  )
}

export default function Room() {
  const floorRef = useRef<THREE.Mesh>(null)

  return (
    <group>
      {/* Floor — wood-look */}
      <mesh ref={floorRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[ROOM_W, ROOM_D]} />
        <meshStandardMaterial color={floorColor} roughness={0.55} metalness={0.05} />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, ROOM_H, 0]}>
        <planeGeometry args={[ROOM_W, ROOM_D]} />
        <meshStandardMaterial color={ceilingColor} roughness={0.95} />
      </mesh>

      {/* Back wall (z = -ROOM_D/2) */}
      <Wall position={[0, ROOM_H / 2, -ROOM_D / 2]} size={[ROOM_W, ROOM_H, WALL_T]} />

      {/* Front wall (z = +ROOM_D/2) — with window cutout approximation */}
      {/* Left part of front wall */}
      <Wall position={[-2.2, ROOM_H / 2, ROOM_D / 2]} size={[3.6, ROOM_H, WALL_T]} />
      {/* Right part of front wall */}
      <Wall position={[2.2, ROOM_H / 2, ROOM_D / 2]} size={[3.6, ROOM_H, WALL_T]} />
      {/* Above window */}
      <Wall position={[0, 2.7, ROOM_D / 2]} size={[0.8, 1.0, WALL_T]} />
      {/* Below window */}
      <Wall position={[0, 0.3, ROOM_D / 2]} size={[0.8, 0.6, WALL_T]} />

      {/* Window frame */}
      <mesh position={[0, 1.6, ROOM_D / 2 - 0.01]}>
        <planeGeometry args={[1.4, 2.0]} />
        <meshStandardMaterial color="#c8dbe6" roughness={0.1} metalness={0.3} transparent opacity={0.4} />
      </mesh>
      {/* Window frame border */}
      {[[-0.7, 1.6], [0.7, 1.6]].map(([x, y], i) => (
        <mesh key={`wfv${i}`} position={[x, y, ROOM_D / 2 + 0.01]}>
          <boxGeometry args={[0.04, 2.0, 0.04]} />
          <meshStandardMaterial color={windowFrameColor} roughness={0.5} />
        </mesh>
      ))}
      {[[0, 0.6], [0, 1.6], [0, 2.6]].map(([x, y], i) => (
        <mesh key={`wfh${i}`} position={[x, y, ROOM_D / 2 + 0.01]}>
          <boxGeometry args={[1.4, 0.04, 0.04]} />
          <meshStandardMaterial color={windowFrameColor} roughness={0.5} />
        </mesh>
      ))}
      {/* Window cross */}
      <mesh position={[0, 1.6, ROOM_D / 2 + 0.01]}>
        <boxGeometry args={[0.03, 2.0, 0.03]} />
        <meshStandardMaterial color={windowFrameColor} roughness={0.5} />
      </mesh>

      {/* Left wall (x = -ROOM_W/2) */}
      <Wall position={[-ROOM_W / 2, ROOM_H / 2, 0]} size={[WALL_T, ROOM_H, ROOM_D]} />

      {/* Right wall (x = +ROOM_W/2) */}
      <Wall position={[ROOM_W / 2, ROOM_H / 2, 0]} size={[WALL_T, ROOM_H, ROOM_D]} />

      {/* Baseboards */}
      <Baseboard position={[0, 0.05, -ROOM_D / 2 + 0.06]} size={[ROOM_W, 0.1, 0.08]} />
      <Baseboard position={[-ROOM_W / 2 + 0.06, 0.05, 0]} size={[0.08, 0.1, ROOM_D]} />
      <Baseboard position={[ROOM_W / 2 - 0.06, 0.05, 0]} size={[0.08, 0.1, ROOM_D]} />
      <Baseboard position={[-2.9, 0.05, ROOM_D / 2 - 0.06]} size={[2.2, 0.1, 0.08]} />
      <Baseboard position={[2.9, 0.05, ROOM_D / 2 - 0.06]} size={[2.2, 0.1, 0.08]} />

      {/* Ceiling trim */}
      <mesh position={[0, ROOM_H - 0.03, -ROOM_D / 2 + 0.06]}>
        <boxGeometry args={[ROOM_W, 0.06, 0.06]} />
        <meshStandardMaterial color="#e8e0d4" roughness={0.7} />
      </mesh>
      <mesh position={[-ROOM_W / 2 + 0.06, ROOM_H - 0.03, 0]}>
        <boxGeometry args={[0.06, 0.06, ROOM_D]} />
        <meshStandardMaterial color="#e8e0d4" roughness={0.7} />
      </mesh>
      <mesh position={[ROOM_W / 2 - 0.06, ROOM_H - 0.03, 0]}>
        <boxGeometry args={[0.06, 0.06, ROOM_D]} />
        <meshStandardMaterial color="#e8e0d4" roughness={0.7} />
      </mesh>

      {/* Rug under desk area */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-1.8, 0.005, -1.5]}>
        <planeGeometry args={[3.2, 2.5]} />
        <meshStandardMaterial color="#d4c5b0" roughness={0.95} />
      </mesh>

      {/* Small rug next to bed */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[2.5, 0.005, 1.0]}>
        <circleGeometry args={[0.7, 32]} />
        <meshStandardMaterial color="#bfcfb8" roughness={0.95} />
      </mesh>
    </group>
  )
}
