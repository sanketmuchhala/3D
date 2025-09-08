import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface NavProps {
  currentSection: string
}

const Nav = ({ currentSection }: NavProps) => {
  const [isScrolled, setIsScrolled] = useState(false)

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'arcade', label: 'Arcade' },
    { id: 'whiteboard', label: 'Whiteboard' },
    { id: 'contact', label: 'Contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.nav
      className={`nav ${isScrolled ? 'nav--scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="nav__container">
        <motion.div 
          className="nav__brand"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <motion.button
            onClick={() => scrollToSection('hero')}
            className="nav__brand-link"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Go to home section"
          >
            Sanket Muchhala
          </motion.button>
        </motion.div>
        
        <ul className="nav__list">
          {navItems.map((item) => (
            <motion.li key={item.id} className="nav__item">
              <motion.button
                onClick={() => scrollToSection(item.id)}
                className={`nav__link ${
                  currentSection === item.id ? 'nav__link--active' : ''
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Go to ${item.label} section`}
                aria-current={currentSection === item.id ? 'page' : undefined}
              >
                <span className="nav__link-text">{item.label}</span>
                {currentSection === item.id && (
                  <motion.div
                    className="nav__link-indicator"
                    layoutId="nav-indicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </motion.button>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.nav>
  )
}

export default Nav