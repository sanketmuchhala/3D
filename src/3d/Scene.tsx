import { Suspense } from 'react'
import { OrbitControls, Environment } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import Room from './Room'
import Bed from './Bed'
import Desk from './Desk'
import Bookshelf from './Bookshelf'
import Plants from './Plants'
import Lighting from './Lighting'
import WallDecor from './WallDecor'

// Temporarily using original scene structure
// The new interaction system is ready but needs debugging
function CameraAnimation() {
  useFrame((state) => {
    // Subtle breathing/floating effect for camera when idle
    const t = state.clock.getElapsedTime()
    state.camera.position.y += Math.sin(t * 0.5) * 0.001
    state.camera.position.x += Math.cos(t * 0.3) * 0.0005
    state.camera.updateProjectionMatrix()
  })
  return null
}

export default function Scene() {
  return (
    <>
      <CameraAnimation />
      <Lighting />
      <Suspense fallback={null}>
        <Environment preset="apartment" />
        <Room />
        <Bed />
        <Desk />
        <Bookshelf />
        <Plants />
        <WallDecor />
      </Suspense>
      <OrbitControls
        makeDefault
        target={[0, 1.1, 0]}
        minDistance={2.5}
        maxDistance={6.5}
        minPolarAngle={Math.PI * 0.15}
        maxPolarAngle={Math.PI * 0.52}
        minAzimuthAngle={-Math.PI * 0.55}
        maxAzimuthAngle={Math.PI * 0.55}
        enablePan={false}
        enableDamping
        dampingFactor={0.06}
        rotateSpeed={0.45}
      />
    </>
  )
}
