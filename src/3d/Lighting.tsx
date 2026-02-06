import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Lighting() {
  const windowLightRef = useRef<THREE.DirectionalLight>(null)
  const warmPointRef = useRef<THREE.PointLight>(null)

  useFrame(({ clock }) => {
    if (warmPointRef.current) {
      const t = clock.getElapsedTime()
      warmPointRef.current.intensity = 0.4 + Math.sin(t * 0.5) * 0.05
    }
  })

  return (
    <>
      {/* Ambient fill — warm and soft */}
      <ambientLight intensity={0.35} color="#ffeedd" />

      {/* Main window light — simulates sunlight */}
      <directionalLight
        ref={windowLightRef}
        position={[0, 4, 6]}
        intensity={1.2}
        color="#fff5e6"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-1}
        shadow-camera-near={0.5}
        shadow-camera-far={15}
        shadow-bias={-0.0005}
      />

      {/* Secondary fill from the side */}
      <directionalLight
        position={[-4, 3, 0]}
        intensity={0.3}
        color="#e8e0f0"
      />

      {/* Warm desk lamp glow */}
      <pointLight
        ref={warmPointRef}
        position={[-2.0, 1.6, -2.0]}
        intensity={0.5}
        color="#ffcc88"
        distance={4}
        decay={2}
      />

      {/* Nightstand lamp glow */}
      <pointLight
        position={[1.25, 1.2, 1.6]}
        intensity={0.25}
        color="#ffe0b0"
        distance={2.5}
        decay={2}
      />

      {/* Monitor glow — subtle blue */}
      <pointLight
        position={[-2.0, 1.2, -2.2]}
        intensity={0.2}
        color="#6688cc"
        distance={2}
        decay={2}
      />

      {/* Ceiling light — central soft */}
      <pointLight
        position={[0, 3.0, 0]}
        intensity={0.3}
        color="#fff8f0"
        distance={6}
        decay={2}
      />

      {/* Hemisphere for ambient color variation */}
      <hemisphereLight
        args={['#ffeedd', '#c9a87c', 0.25]}
      />
    </>
  )
}
