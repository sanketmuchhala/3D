import { Suspense, useState, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stats } from '@react-three/drei'
import RibbonShards from './RibbonShards'

// Loading fallback component
const SceneLoader = () => {
  const meshRef = useRef<any>(null!)
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.y += 0.005
    }
  })
  
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#00d4ff" wireframe />
    </mesh>
  )
}

// Lighting setup
const Lights = () => {
  const directionalRef = useRef<any>(null!)
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    // Subtle color temperature sweep
    if (directionalRef.current) {
      const hue = 0.15 + Math.sin(time * 0.1) * 0.05 // Warm to cool
      directionalRef.current.color.setHSL(hue, 0.1, 1)
    }
  })
  
  return (
    <>
      <ambientLight intensity={0.3} color="#f0f0f0" />
      <directionalLight
        ref={directionalRef}
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight
        position={[-5, 5, 5]}
        intensity={0.5}
        color="#00d4ff"
      />
    </>
  )
}

interface HeroStageProps {
  className?: string
}

const HeroStage = ({ className = '' }: HeroStageProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const isDev = process.env.NODE_ENV === 'development'
  
  const handlePointerMove = (event: React.PointerEvent) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1
    
    setMousePosition({ x: x * 0.5, y: y * 0.5 })
  }
  
  const canvasProps = useMemo(() => ({
    shadows: true,
    camera: { 
      position: [0, 0, 8] as [number, number, number], 
      fov: 50 
    },
    gl: { 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance' as const
    },
    dpr: Math.min(window.devicePixelRatio, 2)
  }), [])
  
  return (
    <div 
      className={`hero-stage ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setMousePosition({ x: 0, y: 0 })}
    >
      <Canvas {...canvasProps}>
        <Lights />
        
        <Suspense fallback={<SceneLoader />}>
          <RibbonShards mousePosition={mousePosition} />
        </Suspense>
        
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
          autoRotate={false}
          rotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
        
        {isDev && <Stats />}
      </Canvas>
    </div>
  )
}

export default HeroStage