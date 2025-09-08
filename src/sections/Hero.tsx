import { motion } from 'framer-motion'
import Section from '../components/Section'
import HeroStage from '../3d/HeroStage'
import portfolioData from '../data/projects.json'

const Hero = () => {
  const { personal } = portfolioData
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
  
  return (
    <Section id="hero" className="hero">
      <div className="hero__content">
        <div className="hero__stage-container">
          <HeroStage className="hero__stage" />
          
          <motion.div 
            className="hero__caption"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.h1 
              className="hero__title"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              {personal.name}
            </motion.h1>
            
            <motion.p 
              className="hero__subtitle"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              {personal.title}
            </motion.p>
            
            <motion.p 
              className="hero__description"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              Building intelligent systems that bridge human creativity and machine capability
            </motion.p>
            
            <motion.div 
              className="hero__actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3 }}
            >
              <motion.button
                className="hero__cta hero__cta--primary"
                onClick={() => scrollToSection('projects')}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
              </motion.button>
              
              <motion.button
                className="hero__cta hero__cta--secondary"
                onClick={() => scrollToSection('about')}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                About Me
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          className="hero__scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          onClick={() => scrollToSection('about')}
        >
          <div className="hero__scroll-dot" />
          <span className="hero__scroll-text">Scroll to explore</span>
        </motion.div>
      </div>
    </Section>
  )
}

export default Hero