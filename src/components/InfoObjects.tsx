import { Interactable } from '../systems/interaction/Interactable'
import { INTERACTABLES } from '../config/interactables'

export function Corkboard() {
  return (
    <Interactable config={INTERACTABLES.corkboard}>
      <group position={[1.8, 1.6, -2.95]}>
        {/* Cork board */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.9, 0.03]} />
          <meshStandardMaterial color="#c19a6b" roughness={0.95} />
        </mesh>

        {/* Frame */}
        <mesh position={[0, 0.46, 0.02]}>
          <boxGeometry args={[1.24, 0.02, 0.02]} />
          <meshStandardMaterial color="#8b7355" roughness={0.7} />
        </mesh>
        <mesh position={[0, -0.46, 0.02]}>
          <boxGeometry args={[1.24, 0.02, 0.02]} />
          <meshStandardMaterial color="#8b7355" roughness={0.7} />
        </mesh>
        <mesh position={[-0.61, 0, 0.02]}>
          <boxGeometry args={[0.02, 0.9, 0.02]} />
          <meshStandardMaterial color="#8b7355" roughness={0.7} />
        </mesh>
        <mesh position={[0.61, 0, 0.02]}>
          <boxGeometry args={[0.02, 0.9, 0.02]} />
          <meshStandardMaterial color="#8b7355" roughness={0.7} />
        </mesh>

        {/* Pinned notes */}
        {[
          { x: -0.3, y: 0.2, rot: -0.05, color: '#fffacd' },
          { x: 0.3, y: 0.15, rot: 0.08, color: '#fff5ee' },
          { x: -0.25, y: -0.15, rot: 0.03, color: '#e6f3ff' },
          { x: 0.25, y: -0.2, rot: -0.06, color: '#fff0f5' },
        ].map((note, i) => (
          <group key={i} position={[note.x, note.y, 0.02]} rotation={[0, 0, note.rot]}>
            <mesh>
              <planeGeometry args={[0.15, 0.15]} />
              <meshStandardMaterial color={note.color} roughness={0.9} />
            </mesh>
            {/* Push pin */}
            <mesh position={[0, 0.06, 0.005]}>
              <cylinderGeometry args={[0.006, 0.006, 0.01, 8]} />
              <meshStandardMaterial color="#ff4444" roughness={0.4} metalness={0.6} />
            </mesh>
            <mesh position={[0, 0.065, 0.005]}>
              <sphereGeometry args={[0.008, 8, 8]} />
              <meshStandardMaterial color="#ff4444" roughness={0.4} metalness={0.6} />
            </mesh>
          </group>
        ))}
      </group>
    </Interactable>
  )
}

export function BusinessCard() {
  return (
    <Interactable config={INTERACTABLES.businessCard}>
      <group position={[-0.8, 0.765, -2.05]} rotation={[-Math.PI / 2, 0, 0.3]}>
        {/* Card */}
        <mesh castShadow>
          <boxGeometry args={[0.085, 0.055, 0.001]} />
          <meshStandardMaterial color="#f5f5f5" roughness={0.6} metalness={0.1} />
        </mesh>

        {/* Text lines (simplified) */}
        <mesh position={[0, 0.015, 0.001]}>
          <planeGeometry args={[0.06, 0.003]} />
          <meshBasicMaterial color="#2a2a2a" transparent opacity={0.8} />
        </mesh>
        <mesh position={[0, 0.008, 0.001]}>
          <planeGeometry args={[0.05, 0.002]} />
          <meshBasicMaterial color="#4a4a4a" transparent opacity={0.6} />
        </mesh>
        <mesh position={[0, 0.002, 0.001]}>
          <planeGeometry args={[0.055, 0.002]} />
          <meshBasicMaterial color="#4a4a4a" transparent opacity={0.6} />
        </mesh>

        {/* Accent line */}
        <mesh position={[0, -0.02, 0.001]}>
          <planeGeometry args={[0.07, 0.001]} />
          <meshBasicMaterial color="#00d4ff" transparent opacity={0.7} />
        </mesh>
      </group>
    </Interactable>
  )
}

export function AboutCard() {
  return (
    <Interactable config={INTERACTABLES.aboutCard}>
      <group position={[2.95, 1.2, 0.8]} rotation={[0, -Math.PI / 2, 0]}>
        {/* Card backing */}
        <mesh castShadow>
          <boxGeometry args={[0.25, 0.18, 0.01]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.6} metalness={0.2} />
        </mesh>

        {/* Text area */}
        <mesh position={[0, 0, 0.006]}>
          <planeGeometry args={[0.22, 0.15]} />
          <meshStandardMaterial color="#f0ebe3" roughness={0.8} />
        </mesh>

        {/* Title bar */}
        <mesh position={[0, 0.06, 0.007]}>
          <planeGeometry args={[0.18, 0.015]} />
          <meshBasicMaterial color="#3d5a80" transparent opacity={0.9} />
        </mesh>

        {/* Text lines */}
        {[-0.03, -0.01, 0.01, 0.03].map((y, i) => (
          <mesh key={i} position={[0, y, 0.007]}>
            <planeGeometry args={[0.18, 0.004]} />
            <meshBasicMaterial color="#4a4a4a" transparent opacity={0.5} />
          </mesh>
        ))}
      </group>
    </Interactable>
  )
}

export function FeaturedBooks() {
  const books = [
    { id: 'bookAI', color: '#8b4513', title: 'AI' },
    { id: 'bookCloud', color: '#2d5a87', title: 'Cloud' },
  ]

  return (
    <group position={[2.95, 0, 0.8]}>
      {books.map((book, i) => (
        <Interactable key={book.id} config={INTERACTABLES[book.id]}>
          <group position={[0, 1.0 + i * 0.25, 0]} rotation={[0, -Math.PI / 2, 0]}>
            {/* Book spine */}
            <mesh castShadow>
              <boxGeometry args={[0.18, 0.22, 0.035]} />
              <meshStandardMaterial color={book.color} roughness={0.7} />
            </mesh>

            {/* Book title (simplified) */}
            <mesh position={[0, 0, 0.018]}>
              <planeGeometry args={[0.15, 0.03]} />
              <meshBasicMaterial color="#f5f5dc" transparent opacity={0.8} />
            </mesh>

            {/* Glow effect when interactable */}
            <mesh position={[0, 0, 0.019]}>
              <planeGeometry args={[0.16, 0.2]} />
              <meshStandardMaterial
                color={book.color}
                emissive={book.color}
                emissiveIntensity={0}
                transparent
                opacity={0.3}
              />
            </mesh>
          </group>
        </Interactable>
      ))}
    </group>
  )
}
