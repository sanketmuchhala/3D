import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Section from '../components/Section'

interface Sketch {
  id: string
  name: string
  description: string
  component: React.ComponentType
  preview: string
}

// Placeholder sketch components
const NoiseShader = () => (
  <div className="sketch sketch--shader">
    <canvas width="300" height="200" style={{ background: 'linear-gradient(45deg, #00d4ff, #4ecdc4)' }} />
    <div className="sketch__overlay">
      <h4>Noise Shader</h4>
      <p>Interactive noise field using fragment shaders</p>
      <div className="sketch__status">TODO: Implement WebGL shader</div>
    </div>
  </div>
)

const ParticleField = () => (
  <div className="sketch sketch--particles">
    <div className="particle-container">
      {Array.from({ length: 20 }, (_, i) => (
        <div 
          key={i} 
          className="particle" 
          style={{ 
            left: `${Math.random() * 100}%`, 
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`
          }} 
        />
      ))}
    </div>
    <div className="sketch__overlay">
      <h4>Particle Field</h4>
      <p>Physics-based particle system</p>
      <div className="sketch__status">TODO: Add physics simulation</div>
    </div>
  </div>
)

const Arcade = () => {
  const [selectedSketch, setSelectedSketch] = useState<Sketch | null>(null)
  
  const sketches: Sketch[] = [
    {
      id: 'noise-shader',
      name: 'Noise Shader',
      description: 'Interactive noise field using fragment shaders',
      component: NoiseShader,
      preview: '🌊'
    },
    {
      id: 'particle-field',
      name: 'Particle Field',
      description: 'Physics-based particle system with collision detection',
      component: ParticleField,
      preview: '✨'
    },
    {
      id: 'coming-soon-1',
      name: 'Ray Marching',
      description: 'Real-time ray marching renderer',
      component: () => <div className="sketch sketch--placeholder">Coming Soon</div>,
      preview: '🔺'
    },
    {
      id: 'coming-soon-2',
      name: 'L-Systems',
      description: 'Procedural plant generation using L-systems',
      component: () => <div className="sketch sketch--placeholder">Coming Soon</div>,
      preview: '🌱'
    },
    {
      id: 'coming-soon-3',
      name: 'Fluid Simulation',
      description: 'Real-time fluid dynamics visualization',
      component: () => <div className="sketch sketch--placeholder">Coming Soon</div>,
      preview: '💧'
    },
    {
      id: 'coming-soon-4',
      name: 'Neural Network',
      description: 'Visualizing neural network training',
      component: () => <div className="sketch sketch--placeholder">Coming Soon</div>,
      preview: '🧠'
    }
  ]
  
  const openSketch = (sketch: Sketch) => {
    setSelectedSketch(sketch)
  }
  
  const closeModal = () => {
    setSelectedSketch(null)
  }
  
  return (
    <Section id="arcade" className="arcade">
      <motion.div
        className="arcade__content"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.h2 
          className="arcade__title"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Interactive Playground
        </motion.h2>
        
        <motion.p 
          className="arcade__subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          Experimental sketches, creative coding, and interactive demos
        </motion.p>
        
        <div className="arcade__grid">
          {sketches.map((sketch, index) => (
            <motion.div
              key={sketch.id}
              className={`arcade__card ${sketch.id.includes('coming-soon') ? 'arcade__card--disabled' : ''}`}
              initial={{ opacity: 0, y: 30, rotateY: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.6 + index * 0.1,
                ease: 'easeOut'
              }}
              viewport={{ once: true }}
              whileHover={sketch.id.includes('coming-soon') ? {} : { 
                y: -5, 
                rotateY: 5,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              onClick={() => !sketch.id.includes('coming-soon') && openSketch(sketch)}
            >
              <div className="arcade__card-preview">
                <span className="arcade__card-icon">{sketch.preview}</span>
              </div>
              
              <div className="arcade__card-content">
                <h3 className="arcade__card-title">{sketch.name}</h3>
                <p className="arcade__card-description">{sketch.description}</p>
                
                {sketch.id.includes('coming-soon') ? (
                  <div className="arcade__card-status">Coming Soon</div>
                ) : (
                  <div className="arcade__card-action">Click to explore</div>
                )}
              </div>
              
              <div className="arcade__card-glow" />
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      <AnimatePresence>
        {selectedSketch && (
          <motion.div
            className="arcade__modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeModal}
          >
            <motion.div
              className="arcade__modal-content"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="arcade__modal-close"
                onClick={closeModal}
              >
                ×
              </button>
              
              <div className="arcade__modal-header">
                <h3>{selectedSketch.name}</h3>
                <p>{selectedSketch.description}</p>
              </div>
              
              <div className="arcade__modal-body">
                <selectedSketch.component />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}

export default Arcade