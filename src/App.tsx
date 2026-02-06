import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import Scene from './3d/Scene'
import './styles/global.css'

export default function App() {
  const [showHint, setShowHint] = useState(true)

  useEffect(() => {
    // Hide hint after 5 seconds
    const timer = setTimeout(() => setShowHint(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Listen for H key to toggle hint
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'h' || e.key === 'H') {
        setShowHint((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
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
        <Scene />
      </Canvas>

      {/* Interaction hints */}
      {showHint && (
        <div
          className="hint"
          style={{
            position: 'fixed',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(20,20,38,0.9)',
            color: '#f0ebe3',
            padding: '16px 28px',
            borderRadius: '12px',
            fontSize: '14px',
            fontFamily: 'Inter, system-ui, sans-serif',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)',
            zIndex: 1000,
            pointerEvents: 'none',
            textAlign: 'center',
            maxWidth: '500px',
          }}
        >
          <div style={{ marginBottom: '8px', fontWeight: 600 }}>Welcome to my 3D Portfolio</div>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>
            Click to enable controls • WASD to move • Mouse to look around
            <br />
            Click glowing objects to interact • ESC to exit • Press H to toggle this hint
          </div>
        </div>
      )}
    </div>
  )
}
