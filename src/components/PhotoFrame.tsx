import { useTexture } from '@react-three/drei'
import { Interactable } from '../systems/interaction/Interactable'
import { INTERACTABLES } from '../config/interactables'

interface PhotoFrameProps {
  id: string
  position: [number, number, number]
  imageUrl: string
}

export function PhotoFrame({ id, position, imageUrl }: PhotoFrameProps) {
  // Load texture (will fallback to placeholder on error)
  let texture
  try {
    texture = useTexture(imageUrl)
  } catch {
    texture = null
  }

  return (
    <Interactable config={INTERACTABLES[id]}>
      <group position={position}>
        {/* Frame backing */}
        <mesh position={[0, 0, -0.02]} castShadow>
          <boxGeometry args={[0.35, 0.45, 0.03]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.6} metalness={0.2} />
        </mesh>

        {/* Wooden frame */}
        {[
          [0, 0.235, 0, [0.38, 0.02, 0.01]], // top
          [0, -0.235, 0, [0.38, 0.02, 0.01]], // bottom
          [-0.19, 0, 0, [0.02, 0.47, 0.01]], // left
          [0.19, 0, 0, [0.02, 0.47, 0.01]], // right
        ].map((frame, i) => (
          <mesh key={i} position={frame.slice(0, 3) as [number, number, number]} castShadow>
            <boxGeometry args={frame[3] as [number, number, number]} />
            <meshStandardMaterial color="#8b7355" roughness={0.7} metalness={0.1} />
          </mesh>
        ))}

        {/* Photo or placeholder */}
        <mesh position={[0, 0, 0.001]}>
          <planeGeometry args={[0.32, 0.42]} />
          {texture ? (
            <meshStandardMaterial map={texture} roughness={0.8} />
          ) : (
            <meshStandardMaterial color="#d3d3d3" roughness={0.9} />
          )}
        </mesh>

        {/* Glass effect */}
        <mesh position={[0, 0, 0.006]}>
          <planeGeometry args={[0.33, 0.43]} />
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.05}
            roughness={0.1}
            metalness={0.1}
          />
        </mesh>

        {/* Hanging wire (subtle) */}
        <mesh position={[0, 0.24, -0.025]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.15, 0.002, 4, 16, Math.PI]} />
          <meshStandardMaterial color="#4a4a4a" roughness={0.5} metalness={0.6} />
        </mesh>
      </group>
    </Interactable>
  )
}

// Two frames with parent photos
export function ParentPhotoFrames() {
  return (
    <group>
      <PhotoFrame
        id="photoFrame1"
        position={[0.5, 1.7, -2.97]}
        imageUrl="https://photos.app.goo.gl/M8kkxQckyogePwcZA"
      />
      <PhotoFrame
        id="photoFrame2"
        position={[-0.5, 1.7, -2.97]}
        imageUrl="https://photos.app.goo.gl/moeyqienKGizAc8p9"
      />
    </group>
  )
}
