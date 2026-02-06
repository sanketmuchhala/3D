import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { Interactable } from '../systems/interaction/Interactable'
import { INTERACTABLES } from '../config/interactables'

function Monitor({
  position,
  rotation = [0, 0, 0] as [number, number, number],
  scale = 1,
  vertical = false,
  liveUrl,
  id,
}: {
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  vertical?: boolean
  liveUrl?: string
  id: string
}) {
  const screenRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (screenRef.current) {
      const mat = screenRef.current.material as THREE.MeshStandardMaterial
      const t = clock.getElapsedTime()
      mat.emissive.setRGB(
        0.04 + Math.sin(t * 0.4) * 0.015,
        0.06 + Math.sin(t * 0.4 + 1) * 0.015,
        0.12 + Math.sin(t * 0.4 + 2) * 0.015
      )
    }
  })

  const width = vertical ? 0.36 : 0.6
  const height = vertical ? 0.6 : 0.36

  return (
    <Interactable config={INTERACTABLES[id]}>
      <group position={position} rotation={rotation} scale={scale}>
        {/* Monitor bezel */}
        <mesh castShadow>
          <boxGeometry args={[width, height, 0.02]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.25} metalness={0.7} />
        </mesh>

        {/* Screen */}
        <mesh ref={screenRef} position={[0, 0, 0.012]} data-screen={id}>
          <planeGeometry args={[width - 0.06, height - 0.06]} />
          <meshStandardMaterial
            color="#0c1220"
            roughness={0.15}
            emissive="#0a1628"
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Live content */}
        {liveUrl && (
          <Html
            transform
            occlude
            position={[0, 0, 0.014]}
            scale={vertical ? 0.041 : 0.062}
            style={{ pointerEvents: 'none' }}
          >
            <iframe
              src={liveUrl}
              title={id}
              style={{
                width: vertical ? '360px' : '540px',
                height: vertical ? '600px' : '300px',
                border: 'none',
                borderRadius: '2px',
                overflow: 'hidden',
                pointerEvents: 'none',
              }}
            />
          </Html>
        )}

        {/* Placeholder UI lines */}
        {!liveUrl &&
          Array.from({ length: 7 }).map((_, i) => (
            <mesh key={i} position={[-0.16 + (i % 3) * 0.015, 0.1 - i * 0.03, 0.013]}>
              <planeGeometry args={[0.1 + ((i * 7 + 3) % 5) * 0.03, 0.006]} />
              <meshBasicMaterial
                color={['#64b5f6', '#81c784', '#ce93d8', '#ffb74d'][i % 4]}
                transparent
                opacity={0.45}
              />
            </mesh>
          ))}

        {/* Stand */}
        <mesh position={[0, vertical ? -0.34 : -0.22, -0.03]} castShadow>
          <boxGeometry args={[0.035, vertical ? 0.08 : 0.07, 0.035]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.2} metalness={0.8} />
        </mesh>
        <mesh position={[0, vertical ? -0.38 : -0.255, 0.01]} castShadow>
          <boxGeometry args={[0.16, 0.012, 0.1]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.2} metalness={0.8} />
        </mesh>
      </group>
    </Interactable>
  )
}

function MacBookOnStand() {
  return (
    <group position={[-0.5, 0.78, -0.2]}>
      {/* Vertical stand base */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.08, 0.015, 0.12]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Vertical stand upright */}
      <mesh position={[0, 0.08, 0.03]} castShadow>
        <boxGeometry args={[0.015, 0.16, 0.06]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* MacBook Pro 13" (closed, vertical) */}
      <mesh position={[0, 0.09, 0]} rotation={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.015, 0.2, 0.30]} />
        <meshStandardMaterial color="#4a4a4a" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Apple logo (subtle) */}
      <mesh position={[0.008, 0.09, 0]}>
        <circleGeometry args={[0.015, 16]} />
        <meshBasicMaterial color="#6a6a6a" transparent opacity={0.4} />
      </mesh>

      {/* Cable - power */}
      <mesh position={[0, 0.01, -0.14]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.002, 0.002, 0.15, 6]} />
        <meshStandardMaterial color="#e8e8e8" roughness={0.6} />
      </mesh>

      {/* Charging indicator light */}
      <mesh position={[0, 0.18, -0.15]}>
        <sphereGeometry args={[0.003, 8, 8]} />
        <meshStandardMaterial color="#ff9500" emissive="#ff9500" emissiveIntensity={0.8} />
      </mesh>
    </group>
  )
}

export default function DeskNew() {
  return (
    <group position={[-1.5, 0, -2.2]}>
      {/* Desktop surface */}
      <mesh position={[0, 0.74, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.0, 0.035, 0.7]} />
        <meshStandardMaterial color="#a8835e" roughness={0.5} />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.9, 0.37, 0]} castShadow>
        <boxGeometry args={[0.035, 0.74, 0.55]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.2} metalness={0.8} />
      </mesh>
      <mesh position={[0.9, 0.37, 0]} castShadow>
        <boxGeometry args={[0.035, 0.74, 0.55]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Support bar */}
      <mesh position={[0, 0.08, 0.22]}>
        <boxGeometry args={[1.8, 0.025, 0.025]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Three monitors */}
      {/* Left monitor - vertical (Spotify) */}
      <Monitor
        id="monitorLeft"
        position={[-0.65, 1.12, -0.14]}
        rotation={[0, 0.22, 0]}
        scale={0.9}
        vertical={true}
      />

      {/* Center monitor - (ClaudeOS) */}
      <Monitor
        id="monitorCenter"
        position={[0, 1.0, -0.18]}
        scale={1.05}
        liveUrl="https://sanketmuchhala.github.io/claudos/"
      />

      {/* Right monitor - (GitHub/Safari) */}
      <Monitor
        id="monitorRight"
        position={[0.65, 0.98, -0.14]}
        rotation={[0, -0.22, 0]}
        scale={0.9}
        liveUrl="https://github.com/sanketmuchhala"
      />

      {/* MacBook on vertical stand */}
      <MacBookOnStand />

      {/* Keyboard */}
      <mesh position={[0.2, 0.765, 0.12]} castShadow>
        <boxGeometry args={[0.38, 0.012, 0.13]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.4} metalness={0.3} />
      </mesh>
      {Array.from({ length: 4 }).map((_, row) =>
        Array.from({ length: 11 }).map((_, col) => (
          <mesh key={`${row}-${col}`} position={[0.05 + col * 0.029, 0.773, 0.075 + row * 0.03]}>
            <boxGeometry args={[0.022, 0.003, 0.022]} />
            <meshStandardMaterial color="#383838" roughness={0.5} />
          </mesh>
        ))
      )}

      {/* Mouse + pad */}
      <mesh position={[0.5, 0.76, 0.15]} receiveShadow>
        <boxGeometry args={[0.22, 0.002, 0.2]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
      <mesh position={[0.5, 0.765, 0.15]} castShadow>
        <boxGeometry args={[0.05, 0.018, 0.08]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.4} metalness={0.3} />
      </mesh>

      {/* Coffee mug */}
      <mesh position={[-0.78, 0.79, 0.15]} castShadow>
        <cylinderGeometry args={[0.03, 0.025, 0.08, 12]} />
        <meshStandardMaterial color="#f0ebe3" roughness={0.8} />
      </mesh>
      <mesh position={[-0.75, 0.79, 0.15]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.018, 0.004, 6, 12, Math.PI]} />
        <meshStandardMaterial color="#f0ebe3" roughness={0.8} />
      </mesh>

      {/* USB-C dock */}
      <mesh position={[-0.2, 0.765, -0.15]} castShadow>
        <boxGeometry args={[0.12, 0.02, 0.06]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Cables - USB-C to monitors */}
      {[-0.65, 0, 0.65].map((xPos, i) => (
        <mesh key={i} position={[xPos, 0.85, -0.2]} rotation={[Math.PI / 3, 0, 0]}>
          <cylinderGeometry args={[0.003, 0.003, 0.15, 6]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
        </mesh>
      ))}

      {/* Chair */}
      <group position={[0, 0, 0.6]}>
        <mesh position={[0, 0.46, 0]} castShadow>
          <boxGeometry args={[0.44, 0.05, 0.42]} />
          <meshStandardMaterial color="#2d2d2d" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.74, -0.18]} castShadow>
          <boxGeometry args={[0.42, 0.5, 0.035]} />
          <meshStandardMaterial color="#2d2d2d" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.24, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.22, 6]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.2} metalness={0.8} />
        </mesh>
        {Array.from({ length: 5 }).map((_, i) => {
          const a = (i / 5) * Math.PI * 2
          return (
            <group key={i}>
              <mesh position={[Math.sin(a) * 0.18, 0.07, Math.cos(a) * 0.18]} rotation={[0, -a, Math.PI / 2 - 0.3]}>
                <cylinderGeometry args={[0.01, 0.01, 0.2, 5]} />
                <meshStandardMaterial color="#2a2a2a" roughness={0.2} metalness={0.8} />
              </mesh>
              <mesh position={[Math.sin(a) * 0.25, 0.025, Math.cos(a) * 0.25]}>
                <sphereGeometry args={[0.02, 6, 6]} />
                <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
              </mesh>
            </group>
          )
        })}
      </group>
    </group>
  )
}
