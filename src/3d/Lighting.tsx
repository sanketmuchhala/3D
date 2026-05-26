import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { SoftShadows } from '@react-three/drei'
import * as THREE from 'three'

export default function Lighting() {
  const lampRef = useRef<THREE.PointLight>(null)
  useFrame(({ clock }) => {
    if (lampRef.current) lampRef.current.intensity = 0.35 + Math.sin(clock.getElapsedTime() * 0.5) * 0.04
  })

  return (
    <>
      <SoftShadows size={25} samples={10} focus={0.5} />
      <ambientLight intensity={0.4} color="#ffe8cc" />
      <directionalLight
        position={[0, 4, 5]}
        intensity={1.2}
        color="#fff5e6"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-left={-4}
        shadow-camera-right={4}
        shadow-camera-top={4}
        shadow-camera-bottom={-1}
        shadow-camera-near={0.5}
        shadow-camera-far={12}
        shadow-bias={-0.001}
      />
      <directionalLight position={[-3, 2, 0]} intensity={0.3} color="#e0d8f0" />
      <pointLight ref={lampRef} position={[-1.5, 1.4, -2.2]} intensity={0.6} color="#ffcc88" distance={4} decay={2} />
      <pointLight position={[1.05, 1.1, 1.15]} intensity={0.3} color="#ffe0b0" distance={2.5} decay={2} />
      <pointLight position={[-1.5, 1.1, -2.4]} intensity={0.2} color="#6688cc" distance={2} decay={2} />
      <pointLight position={[0, 2.85, 0]} intensity={0.4} color="#fff8f0" distance={6} decay={2} />
      <hemisphereLight args={['#ffe8cc', '#c4a882', 0.3]} />
    </>
  )
}
