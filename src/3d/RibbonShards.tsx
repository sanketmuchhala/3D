import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Vector3, Color } from 'three'
import * as THREE from 'three'

interface RibbonShardsProps {
  mousePosition: { x: number; y: number }
}

const RibbonShards = ({ mousePosition }: RibbonShardsProps) => {
  const groupRef = useRef<THREE.Group>(null!)
  const meshRefs = useRef<THREE.Mesh[]>([])
  
  // Generate ribbon shard positions and properties
  const shards = useMemo(() => {
    const shardData = []
    const numShards = 12
    
    for (let i = 0; i < numShards; i++) {
      const angle = (i / numShards) * Math.PI * 2
      const radius = 2 + Math.sin(i * 0.7) * 0.5
      
      shardData.push({
        position: new Vector3(
          Math.cos(angle) * radius,
          Math.sin(i * 0.3) * 1.5,
          Math.sin(angle) * radius
        ),
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ] as [number, number, number],
        scale: 0.8 + Math.random() * 0.4,
        color: new Color().setHSL(0.55 + Math.sin(i * 0.7) * 0.1, 0.8, 0.6),
        originalPosition: new Vector3(
          Math.cos(angle) * radius,
          Math.sin(i * 0.3) * 1.5,
          Math.sin(angle) * radius
        ),
      })
    }
    
    return shardData
  }, [])
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    if (groupRef.current) {
      // Gentle auto-rotation when idle
      const isIdle = Math.abs(mousePosition.x) < 0.01 && Math.abs(mousePosition.y) < 0.01
      if (isIdle) {
        groupRef.current.rotation.y += 0.005
      }
      
      // React to mouse movement
      const targetRotationX = mousePosition.y * 0.3
      const targetRotationY = mousePosition.x * 0.3
      
      groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.05
      groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * 0.05
    }
    
    // Animate individual shards
    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return
      
      const shard = shards[i]
      const phase = time * 0.5 + i * 0.3
      
      // Floating animation
      mesh.position.y = shard.originalPosition.y + Math.sin(phase) * 0.2
      
      // Gentle rotation
      mesh.rotation.x += 0.01
      mesh.rotation.z += 0.005
      
      // Color pulse
      const material = mesh.material as THREE.MeshStandardMaterial
      const intensity = 0.6 + Math.sin(phase * 1.5) * 0.2
      material.emissive.setHSL(0.55 + Math.sin(i * 0.7) * 0.1, 0.5, intensity * 0.1)
    })
  })
  
  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {shards.map((shard, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) meshRefs.current[i] = el
          }}
          position={shard.position}
          rotation={shard.rotation}
          scale={shard.scale}
        >
          <boxGeometry args={[0.3, 1.8, 0.1]} />
          <meshStandardMaterial
            color={shard.color}
            transparent
            opacity={0.8}
            roughness={0.2}
            metalness={0.8}
            emissive={new Color(0x000000)}
          />
        </mesh>
      ))}
      
      {/* Central core */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial
          color="#00d4ff"
          transparent
          opacity={0.6}
          roughness={0.1}
          metalness={0.9}
          emissive="#00d4ff"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  )
}

export default RibbonShards