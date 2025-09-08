import { useEffect, useState } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import SkipToContent from './components/SkipToContent'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Arcade from './sections/Arcade'
import Whiteboard from './sections/Whiteboard'
import Contact from './sections/Contact'

function App() {
  const [currentSection, setCurrentSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'arcade', 'whiteboard', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="app">
      <SkipToContent />
      <Nav currentSection={currentSection} />
      <main tabIndex={-1} role="main" aria-label="Main content">
        <Hero />
        <About />
        <Projects />
        <Arcade />
        <Whiteboard />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App