import { motion } from 'framer-motion'
import portfolioData from '../data/projects.json'

const Footer = () => {
  const { personal } = portfolioData

  const socialLinks = [
    {
      name: 'GitHub',
      url: personal.github,
      icon: '💻'
    },
    {
      name: 'LinkedIn',
      url: personal.linkedin,
      icon: '🔗'
    },
    {
      name: 'Email',
      url: `mailto:${personal.email}`,
      icon: '📧'
    }
  ]

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__main">
            <h4 className="footer__name">{personal.name}</h4>
            <p className="footer__title">{personal.title}</p>
          </div>
          
          <div className="footer__links">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                className="footer__link"
                target={link.name !== 'Email' ? '_blank' : undefined}
                rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.3, 
                  delay: index * 0.1,
                  ease: 'easeOut'
                }}
              >
                <span className="footer__link-icon">{link.icon}</span>
                <span className="footer__link-text">{link.name}</span>
              </motion.a>
            ))}
          </div>
        </div>
        
        <motion.div 
          className="footer__bottom"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="footer__copyright">
            © 2024 Built with ❤️ and Three.js
          </p>
          <p className="footer__tech">
            <code>React + Vite + TypeScript</code>
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer