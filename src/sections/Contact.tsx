import { motion } from 'framer-motion'
import Section from '../components/Section'
import portfolioData from '../data/projects.json'

const Contact = () => {
  const { personal } = portfolioData
  
  const contactMethods = [
    {
      method: 'Email',
      value: personal.email,
      href: `mailto:${personal.email}`,
      icon: '📧',
      description: 'Drop me a line'
    },
    {
      method: 'LinkedIn',
      value: 'Connect professionally',
      href: personal.linkedin,
      icon: '🔗',
      description: 'Let\'s connect'
    },
    {
      method: 'GitHub',
      value: 'Check out my code',
      href: personal.github,
      icon: '💻',
      description: 'Explore repositories'
    }
  ]
  
  return (
    <Section id="contact" className="contact">
      <motion.div
        className="contact__content"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.h2 
          className="contact__title"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Let's Connect
        </motion.h2>
        
        <motion.p 
          className="contact__subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          Interested in AI/ML collaboration, have a project in mind, or just want to chat about technology?
        </motion.p>
        
        <div className="contact__methods">
          {contactMethods.map((method, index) => (
            <motion.a
              key={method.method}
              href={method.href}
              className="contact__method"
              target={method.method !== 'Email' ? '_blank' : undefined}
              rel={method.method !== 'Email' ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 30, rotateY: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.6 + index * 0.1,
                ease: 'easeOut'
              }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -5, 
                rotateY: 5,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="contact__method-icon">
                <span>{method.icon}</span>
              </div>
              
              <div className="contact__method-content">
                <h3 className="contact__method-title">{method.method}</h3>
                <p className="contact__method-description">{method.description}</p>
                <span className="contact__method-value">{method.value}</span>
              </div>
              
              <div className="contact__method-arrow">→</div>
              <div className="contact__method-glow" />
            </motion.a>
          ))}
        </div>
        
        <motion.div 
          className="contact__availability"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          viewport={{ once: true }}
        >
          <div className="contact__status">
            <div className="contact__status-indicator contact__status-indicator--available" />
            <span>Available for new opportunities</span>
          </div>
          
          <p className="contact__response-time">
            I typically respond within 24 hours
          </p>
        </motion.div>
        
        <motion.div 
          className="contact__cta"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          viewport={{ once: true }}
        >
          <motion.a
            href={`mailto:${personal.email}?subject=Hello from your portfolio!`}
            className="contact__primary-button"
            whileHover={{ 
              scale: 1.05, 
              y: -2,
              boxShadow: '0 10px 25px rgba(0, 212, 255, 0.3)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="contact__button-icon">✉️</span>
            Get In Touch
          </motion.a>
        </motion.div>
        
        <motion.div 
          className="contact__privacy"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          viewport={{ once: true }}
        >
          <p>
            Your privacy matters. I'll never share your contact information or send unsolicited emails.
          </p>
        </motion.div>
      </motion.div>
    </Section>
  )
}

export default Contact