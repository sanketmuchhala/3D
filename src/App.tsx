import { useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import Scene from './3d/Scene'
import Overlay from './components/Overlay'
import './styles/global.css'

export type OverlayId = 'about' | 'experience' | 'projects' | 'skills' | 'contact' | null

export default function App() {
  const [activeOverlay, setActiveOverlay] = useState<OverlayId>(null)
  const [showHint, setShowHint] = useState(true)

  const handleHotspotClick = useCallback((id: string) => {
    setActiveOverlay(id as OverlayId)
    setShowHint(false)
  }, [])

  const handleClose = useCallback(() => {
    setActiveOverlay(null)
  }, [])

  return (
    <div className="app">
      {/* 3D Canvas */}
      <Canvas
        shadows
        camera={{ position: [4, 3, 5], fov: 50, near: 0.1, far: 50 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        style={{ position: 'fixed', inset: 0 }}
      >
        <color attach="background" args={['#1a1a2e']} />
        <fog attach="fog" args={['#1a1a2e', 8, 18]} />
        <Scene onHotspotClick={handleHotspotClick} />
      </Canvas>

      {/* Navigation bar */}
      <nav className="nav-bar">
        <div className="nav-brand">
          <span className="brand-name">Sanket Muchhala</span>
          <span className="brand-title">AI Engineer & Data Scientist</span>
        </div>
        <div className="nav-links">
          {(['about', 'experience', 'projects', 'skills', 'contact'] as const).map((id) => (
            <button
              key={id}
              className={`nav-link ${activeOverlay === id ? 'active' : ''}`}
              onClick={() => { setActiveOverlay(id); setShowHint(false) }}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
        </div>
      </nav>

      {/* Interaction hint */}
      {showHint && (
        <div className="hint" onClick={() => setShowHint(false)}>
          <div className="hint-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 15l-2 5L9 9l11 4-5 2z" />
              <path d="M15 15l4 4" />
            </svg>
          </div>
          <span>Click glowing orbs to explore &bull; Drag to look around</span>
        </div>
      )}

      {/* Content overlays */}
      <Overlay activeId={activeOverlay} onClose={handleClose} />
    </div>
  )
}
