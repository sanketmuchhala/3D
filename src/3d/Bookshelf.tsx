const shelfWoodColor = '#b8956a'
const bookColors = [
  '#2d4a7a', '#7a3b3b', '#3b7a4a', '#7a6b3b', '#5a3b7a',
  '#3b6a7a', '#7a3b5a', '#4a6a3b', '#6a4a3b', '#3b4a6a',
  '#8b6b4b', '#4b7a6b', '#6b4b7a', '#7a7a4b', '#4b5a7a',
]

function Book({ position, size, color, rotation = [0, 0, 0] as [number, number, number] }: {
  position: [number, number, number]
  size: [number, number, number]
  color: string
  rotation?: [number, number, number]
}) {
  return (
    <mesh position={position} rotation={rotation} castShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.8} />
    </mesh>
  )
}

function ShelfBoard({ position, size }: { position: [number, number, number]; size: [number, number, number] }) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={shelfWoodColor} roughness={0.55} />
    </mesh>
  )
}

export default function Bookshelf({ position = [3.8, 0, -2.5] as [number, number, number] }) {
  const shelfW = 1.0
  const shelfD = 0.28
  const shelfH = 2.2
  const boardT = 0.025
  const shelfSpacing = 0.42
  const numShelves = 5

  return (
    <group position={position}>
      {/* Side panels */}
      <mesh position={[-shelfW / 2, shelfH / 2, 0]} castShadow>
        <boxGeometry args={[boardT, shelfH, shelfD]} />
        <meshStandardMaterial color={shelfWoodColor} roughness={0.55} />
      </mesh>
      <mesh position={[shelfW / 2, shelfH / 2, 0]} castShadow>
        <boxGeometry args={[boardT, shelfH, shelfD]} />
        <meshStandardMaterial color={shelfWoodColor} roughness={0.55} />
      </mesh>

      {/* Back panel */}
      <mesh position={[0, shelfH / 2, -shelfD / 2 + 0.005]}>
        <boxGeometry args={[shelfW, shelfH, 0.01]} />
        <meshStandardMaterial color="#a8835e" roughness={0.6} />
      </mesh>

      {/* Shelf boards */}
      {Array.from({ length: numShelves }).map((_, i) => (
        <ShelfBoard
          key={`shelf${i}`}
          position={[0, i * shelfSpacing + boardT / 2, 0]}
          size={[shelfW - boardT, boardT, shelfD]}
        />
      ))}
      {/* Top board */}
      <ShelfBoard position={[0, shelfH, 0]} size={[shelfW + boardT, boardT, shelfD]} />

      {/* === BOOKS === */}
      {/* Bottom shelf — tall books */}
      {Array.from({ length: 6 }).map((_, i) => (
        <Book
          key={`b0-${i}`}
          position={[-0.35 + i * 0.12, 0.2, 0.02]}
          size={[0.08, 0.35, 0.2]}
          color={bookColors[i]}
        />
      ))}

      {/* Second shelf — mixed books */}
      {Array.from({ length: 7 }).map((_, i) => (
        <Book
          key={`b1-${i}`}
          position={[-0.38 + i * 0.11, 0.2 + shelfSpacing, -0.01]}
          size={[0.065, 0.25 + Math.random() * 0.1, 0.18]}
          color={bookColors[(i + 3) % bookColors.length]}
        />
      ))}

      {/* Third shelf — some books + small object */}
      {Array.from({ length: 4 }).map((_, i) => (
        <Book
          key={`b2-${i}`}
          position={[-0.35 + i * 0.13, 0.2 + shelfSpacing * 2, 0]}
          size={[0.08, 0.28, 0.19]}
          color={bookColors[(i + 7) % bookColors.length]}
        />
      ))}
      {/* Horizontal stacked books */}
      <Book position={[0.2, 0.08 + shelfSpacing * 2, 0]} size={[0.18, 0.06, 0.14]} color="#8b6b4b" rotation={[0, 0, 0]} />
      <Book position={[0.2, 0.14 + shelfSpacing * 2, 0]} size={[0.17, 0.06, 0.14]} color="#6b8b5b" rotation={[0, 0.05, 0]} />

      {/* Fourth shelf — fewer items, more air */}
      <Book position={[-0.3, 0.2 + shelfSpacing * 3, 0]} size={[0.09, 0.3, 0.2]} color="#3b5a7a" />
      <Book position={[-0.18, 0.2 + shelfSpacing * 3, 0]} size={[0.07, 0.28, 0.18]} color="#7a5a3b" />
      {/* Small decorative box */}
      <mesh position={[0.15, 0.07 + shelfSpacing * 3, 0]} castShadow>
        <boxGeometry args={[0.12, 0.1, 0.12]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Small framed photo */}
      <mesh position={[0.35, 0.1 + shelfSpacing * 3, -0.08]}>
        <boxGeometry args={[0.1, 0.14, 0.015]} />
        <meshStandardMaterial color="#e8ddd0" roughness={0.7} />
      </mesh>
      <mesh position={[0.35, 0.1 + shelfSpacing * 3, -0.07]}>
        <planeGeometry args={[0.07, 0.1]} />
        <meshStandardMaterial color="#8fac8f" roughness={0.5} />
      </mesh>
    </group>
  )
}
