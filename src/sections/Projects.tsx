import { motion } from 'framer-motion'
import Section from '../components/Section'
import portfolioData from '../data/projects.json'

const Projects = () => {
  const { projects } = portfolioData
  
  return (
    <Section id="projects" className="projects">
      <motion.div
        className="projects__content"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.h2 
          className="projects__title"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Featured Projects
        </motion.h2>
        
        <motion.p 
          className="projects__subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          AI/ML solutions that solve real-world problems
        </motion.p>
        
        <div className="projects__grid">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="projects__card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -8, 
                rotateY: 2,
                rotateX: 2,
                transition: { duration: 0.3 }
              }}
            >
              <div className="projects__card-content">
                <h3 className="projects__card-title">{project.name}</h3>
                <p className="projects__card-description">{project.description}</p>
                
                <div className="projects__card-tech">
                  {project.tech.slice(0, 4).map((tech) => (
                    <span key={tech} className="projects__tech-tag">
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="projects__tech-tag projects__tech-tag--more">
                      +{project.tech.length - 4}
                    </span>
                  )}
                </div>
                
                {project.impact && (
                  <div className="projects__card-impact">
                    <span className="projects__impact-label">Impact:</span>
                    {project.impact}
                  </div>
                )}
                
                {project.cost && (
                  <div className="projects__card-cost">
                    <span className="projects__cost-label">Cost:</span>
                    {project.cost}
                  </div>
                )}
              </div>
              
              <div className="projects__card-actions">
                <motion.a
                  href={project.github}
                  className="projects__card-link"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="projects__link-icon">💻</span>
                  Code
                </motion.a>
                
                <motion.a
                  href={project.demo}
                  className="projects__card-link projects__card-link--primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="projects__link-icon">🚀</span>
                  Demo
                </motion.a>
              </div>
              
              <div className="projects__card-glow" />
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="projects__footer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          viewport={{ once: true }}
        >
          <p>More projects available on my GitHub</p>
          <motion.a
            href={portfolioData.personal.github}
            className="projects__github-link"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="projects__github-icon">💻</span>
            View All Projects
          </motion.a>
        </motion.div>
      </motion.div>
    </Section>
  )
}

export default Projects