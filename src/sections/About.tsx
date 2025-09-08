import { motion } from 'framer-motion'
import Section from '../components/Section'
import portfolioData from '../data/projects.json'

const About = () => {
  const { personal, skills } = portfolioData
  
  const skillCategories = [
    { name: 'AI & ML', skills: skills.ai_ml, color: '#00d4ff' },
    { name: 'Cloud', skills: skills.cloud_tech, color: '#4ecdc4' },
    { name: 'Programming', skills: skills.programming, color: '#ff6b6b' },
    { name: 'Specialties', skills: skills.specialties, color: '#ffa726' }
  ]
  
  const ctaButtons = [
    { label: 'Resume', href: '#', icon: '📄' },
    { label: 'Email', href: `mailto:${personal.email}`, icon: '📧' },
    { label: 'GitHub', href: personal.github, icon: '💻' }
  ]
  
  return (
    <Section id="about" className="about">
      <motion.div 
        className="about__content"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.h2 
          className="about__title"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          About Me
        </motion.h2>
        
        <motion.div 
          className="about__summary"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p>{personal.summary}</p>
        </motion.div>
        
        <motion.div 
          className="about__cta-buttons"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {ctaButtons.map((button, index) => (
            <motion.a
              key={button.label}
              href={button.href}
              className="about__cta"
              target={button.label !== 'Email' ? '_blank' : undefined}
              rel={button.label !== 'Email' ? 'noopener noreferrer' : undefined}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
              viewport={{ once: true }}
            >
              <span className="about__cta-icon">{button.icon}</span>
              {button.label}
            </motion.a>
          ))}
        </motion.div>
        
        <motion.div 
          className="about__skills"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="about__skills-title">Skills & Expertise</h3>
          
          <div className="about__skills-grid">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.name}
                className="about__skill-category"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 1 + categoryIndex * 0.1 
                }}
                viewport={{ once: true }}
              >
                <h4 
                  className="about__skill-category-title"
                  style={{ color: category.color }}
                >
                  {category.name}
                </h4>
                <div className="about__skill-badges">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      className="about__skill-badge"
                      style={{ 
                        borderColor: category.color + '40',
                        backgroundColor: category.color + '10'
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: 1.2 + categoryIndex * 0.1 + skillIndex * 0.05 
                      }}
                      viewport={{ once: true }}
                      whileHover={{ 
                        scale: 1.05, 
                        backgroundColor: category.color + '20' 
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </Section>
  )
}

export default About