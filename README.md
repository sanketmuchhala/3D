# Sanket Muchhala - 3D Interactive Portfolio

A modern, interactive 3D portfolio website showcasing AI/ML engineering expertise through an immersive web experience. Built with React, Three.js, and inspired by minimal design aesthetics.

![Portfolio Preview](./assets/images/portfolio-preview.jpg)

## ✨ Features

### 🎨 Design & Aesthetics
- **Joan Ramos Refusta Inspired**: Minimal chrome, large canvas hero, playful micro-interactions
- **Original Design Language**: Deep charcoal backgrounds, soft off-white text, cool blue accents
- **Typography**: Inter Variable for UI, JetBrains Mono Variable for code elements
- **Responsive**: Fully responsive design that works on desktop, tablet, and mobile

### 🌊 3D Hero Experience  
- **Kinetic Sculpture**: Original ribbon shards kinetic sculpture that reacts to pointer movement
- **Smooth Interactions**: Gentle auto-rotation, easing toward cursor, breathing animations
- **Performance Optimized**: Efficient Three.js rendering with automatic quality adjustment
- **Accessible**: Respects `prefers-reduced-motion` for accessibility

### 📱 Interactive Sections
- **About**: Skills showcase with animated badges and professional summary
- **Projects**: Responsive project cards with hover effects and technology tags
- **Arcade**: Interactive playground with placeholder sketches and modal system
- **Whiteboard**: Markdown-rendered notes with sidebar navigation
- **Contact**: Professional contact methods with availability status

### ♿ Accessibility First
- **Keyboard Navigation**: Full keyboard support with visible focus indicators
- **Screen Reader**: Semantic HTML, ARIA labels, skip-to-content functionality
- **Motion Preferences**: Respects `prefers-reduced-motion` settings
- **Color Contrast**: WCAG compliant color schemes

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **3D Graphics**: Three.js + @react-three/fiber + @react-three/drei
- **Animations**: Framer Motion for smooth UI animations  
- **Styling**: CSS Variables + Modern CSS features
- **Fonts**: Inter Variable, JetBrains Mono Variable
- **Build**: Vite with hot module replacement
- **Deployment**: Replit-ready configuration

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Local Development
```bash
# Clone the repository
git clone <your-repo-url>
cd 3d-portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Replit Deployment
This project is configured to run on Replit out of the box:

1. Import this repository to Replit
2. The project will automatically install dependencies
3. Click "Run" to start the development server
4. Access your portfolio at the provided URL

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Nav.tsx         # Navigation with scroll spy
│   ├── Footer.tsx      # Footer with social links
│   ├── Section.tsx     # Section wrapper component
│   └── SkipToContent.tsx # Accessibility skip link
├── sections/           # Page sections
│   ├── Hero.tsx        # Hero section with 3D stage
│   ├── About.tsx       # About section with skills
│   ├── Projects.tsx    # Projects showcase
│   ├── Arcade.tsx      # Interactive playground
│   ├── Whiteboard.tsx  # Notes and thoughts
│   └── Contact.tsx     # Contact information
├── 3d/                 # Three.js components
│   ├── HeroStage.tsx   # Main 3D canvas setup
│   └── RibbonShards.tsx # Kinetic sculpture component
├── styles/             # CSS styles
│   ├── tokens.css      # Design system variables
│   ├── global.css      # Global styles and reset
│   ├── components.css  # Component-specific styles
│   └── sections.css    # Section-specific styles
├── data/               # Content data
│   └── projects.json   # Portfolio projects and info
├── App.tsx             # Main application component
└── main.tsx           # Application entry point

content/notes/          # Markdown notes for whiteboard
public/                 # Static assets
```

## 🎯 Performance & Optimization

### Bundle Analysis
- **Main bundle**: ~314KB gzipped (1.1MB uncompressed)
- **Dynamic imports**: Ready for code-splitting implementation
- **Font optimization**: Variable fonts with subset loading
- **Image optimization**: WebP with fallbacks

### 3D Performance
- **Adaptive quality**: Automatic quality reduction on lower-end devices
- **Memory management**: Proper geometry and material disposal
- **Frame rate targeting**: Optimized for 60fps on desktop, 30fps on mobile
- **Stats monitoring**: Development performance monitoring

## ♿ Accessibility Features

### Keyboard Navigation
- Tab navigation through all interactive elements
- Enter/Space activation for buttons
- Focus indicators for all focusable elements
- Skip-to-content link for screen readers

### Screen Reader Support
- Semantic HTML structure with proper headings
- ARIA labels for interactive elements
- Alt text for images and icons
- Proper landmark regions

### Motion Accessibility
- Respects `prefers-reduced-motion` media query
- Reduced or disabled animations based on user preference
- Fallback static content for motion-sensitive users

## 🎨 Design Decisions

### Color Palette
- **Background**: Deep charcoal (#1a1a1a) for focus and elegance
- **Text**: Soft off-white (#f8f8f8) for readability
- **Accent**: Cool blue (#00d4ff) used sparingly for emphasis
- **Secondary**: Warm accents for visual variety

### Typography Scale
- **Headlines**: Large scale with tight line-height for impact
- **Body**: Generous line-height (1.75) for readability
- **Code**: Monospace font for technical elements
- **Hierarchy**: Clear visual hierarchy with consistent spacing

### Motion Language
- **Subtle**: Gentle micro-interactions that enhance UX
- **Purposeful**: Animation serves functional purposes
- **Accessible**: Respects user motion preferences
- **Performant**: GPU-accelerated transforms

## 📊 Lighthouse Scores

Target scores for production build:
- **Performance**: ≥85
- **Accessibility**: ≥95  
- **Best Practices**: ≥95
- **SEO**: ≥90

## 🔧 Customization

### Content Updates
Edit `src/data/projects.json` to update:
- Personal information
- Project details
- Skills and certifications
- Contact information

### Styling Changes
Modify design tokens in `src/styles/tokens.css`:
- Color palette
- Typography scale
- Spacing system
- Animation timings

### 3D Scene Modifications
Customize the hero stage in `src/3d/`:
- Adjust kinetic sculpture parameters
- Modify lighting setup
- Change camera settings
- Add new 3D elements

## 🚀 Deployment Options

### Replit (Recommended)
- Zero configuration deployment
- Automatic HTTPS
- Custom domain support
- Built-in collaboration features

### Vercel
```bash
npm install -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### GitHub Pages
```bash
npm run build
# Deploy dist/ folder to gh-pages branch
```

## 🤝 Contributing

This is a personal portfolio project, but suggestions and improvements are welcome:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

**Sanket Muchhala**
- Portfolio: [Live Demo](your-deployed-url)
- LinkedIn: [linkedin.com/in/sanketmuchhala](https://linkedin.com/in/sanketmuchhala)
- GitHub: [github.com/sanketmuchhala](https://github.com/sanketmuchhala)
- Email: sanket.muchhala@example.com

---

**Built with ❤️ and Three.js by Sanket Muchhala**

*This portfolio represents the intersection of creativity and technology, demonstrating both technical expertise and innovative thinking in modern web development and AI/ML engineering.*