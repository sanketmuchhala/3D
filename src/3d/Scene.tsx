import { Suspense } from 'react'
import { OrbitControls, Environment } from '@react-three/drei'
import Room from './Room'
import Bed from './Bed'
import Desk from './Desk'
import Bookshelf from './Bookshelf'
import Plants from './Plants'
import Lighting from './Lighting'
import WallDecor from './WallDecor'
import Hotspots from './Hotspots'

export default function Scene({ onHotspotClick }: { onHotspotClick: (id: string) => void }) {
  return (
    <>
      <Lighting />
      <Suspense fallback={null}>
        <Room />
        <Bed />
        <Desk />
        <Bookshelf />
        <Plants />
        <WallDecor />
        <Hotspots onClick={onHotspotClick} />
        <Environment preset="apartment" environmentIntensity={0.15} />
      </Suspense>

      <OrbitControls
        makeDefault
        target={[0, 1.2, 0]}
        minDistance={2.5}
        maxDistance={7}
        minPolarAngle={Math.PI * 0.15}
        maxPolarAngle={Math.PI * 0.55}
        minAzimuthAngle={-Math.PI * 0.6}
        maxAzimuthAngle={Math.PI * 0.6}
        enablePan={false}
        enableDamping
        dampingFactor={0.05}
        rotateSpeed={0.5}
      />
    </>
  )
}
