# 3D Interactive Portfolio - Bedroom Scene

A immersive 3D bedroom portfolio showcasing AI/ML engineering projects, skills, and experience. Built with vanilla Three.js for optimal GitHub Pages compatibility.

## 🌟 Features

- **Immersive 3D Environment**: Cozy bedroom/atelier scene with interactive furniture
- **Camera Hotspots**: Smooth transitions between 5 different viewpoints
- **Interactive Objects**: Click on furniture to navigate and explore content
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Accessibility**: Full keyboard navigation, ARIA labels, reduced motion support
- **Performance**: 60 FPS target with optimized shadows and materials
- **GitHub Pages Ready**: No build process required, pure ES modules

## 🎮 Navigation

### Mouse/Touch Controls
- **Click** on furniture pieces to navigate to different areas
- **Click** navigation buttons in the top bar

### Keyboard Shortcuts
- **1** - About (Overview)
- **2** - Projects (Desk area)
- **3** - Arcade (Gaming setup)
- **4** - Whiteboard (Ideas & research)
- **5** - Contact (Bedroom area)
- **ESC** - Close overlays

### Interactive Elements
- **Desk**: Technical projects and professional work
- **Bed**: Contact information and personal details
- **Arcade Cabinet**: Interactive demos and mini-games
- **Whiteboard**: Research notes and learning goals
- **Bookshelf**: About section and skills overview
- **Rubik's Cube**: Easter egg animation (click to spin)

## 🏗️ Room Layout

```
    Arcade    Whiteboard
       |          |
   ----+----------+----
   |                  |  
   |    📺      📋    |  Back Wall
   |                  |
   |  📚    🎲   💻  |  
   |               🖱️ |  
   |      🛏️         |  
   |                  |
   +------------------+
        Front Opening
```

### Hotspot Areas
1. **About** (2, 1.6, 2) → Room overview and personal introduction
2. **Projects** (-2.5, 1.4, 0) → Desk with monitor showing technical work
3. **Arcade** (0, 1.2, -1.8) → Gaming cabinet with interactive demos  
4. **Whiteboard** (2.5, 1.5, -1) → Ideas board with research notes
5. **Contact** (0, 1.6, 1.8) → Bedroom area with contact information

## 🛠️ Technical Stack

- **Three.js r167**: 3D rendering engine (ES modules from CDN)
- **Vanilla JavaScript**: No framework dependencies
- **SVG Textures**: Procedural materials for optimal file size
- **HTML Overlays**: Content display system with glassmorphism design
- **CSS3**: Modern styling with custom properties and accessibility

## 🚀 Deployment

### GitHub Pages Deployment

1. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` (or your preferred branch)
   - Folder: `/ (root)`

2. **Access your site**:
   ```
   https://yourusername.github.io/your-repository-name/
   ```

### Local Development

```bash
# Clone the repository
git clone https://github.com/yourusername/your-repo.git
cd your-repo

# Serve locally (any HTTP server works)
python -m http.server 8000
# OR
npx serve .
# OR
php -S localhost:8000

# Open in browser
open http://localhost:8000
```

## 📁 Project Structure

```
├── index.html          # Main HTML structure
├── styles.css          # Comprehensive styling
├── main.js             # Three.js application
├── data.json           # Portfolio content data
├── assets/
│   └── textures/       # SVG procedural textures
│       ├── wood-grain.svg
│       ├── wall-paint.svg
│       ├── carpet.svg
│       ├── fabric.svg
│       └── metal.svg
└── README.md           # This file
```

## ⚡ Performance Optimizations

### Rendering
- **Shadow Optimization**: Limited shadow casters for performance
- **Texture Management**: SVG textures for scalable, lightweight materials
- **Geometry Reuse**: Efficient mesh creation and material sharing
- **Level of Detail**: Simplified models for distant objects

### Memory Management
- **Texture Compression**: Optimized SVG patterns
- **Geometry Disposal**: Proper cleanup of Three.js resources
- **Minimal Dependencies**: Pure ES modules, no build process

### Target Performance
- **Desktop**: 60 FPS on laptop integrated GPUs
- **Mobile**: 30 FPS on mid-range devices
- **Memory**: <50MB total memory usage

## ♿ Accessibility Features

### Keyboard Navigation
- Full keyboard control for all interactions
- Tab navigation through interactive elements
- Arrow key support for hotspot navigation

### Screen Readers
- Semantic HTML structure with proper ARIA labels
- Alternative text for all visual elements
- Live regions for dynamic content updates

### Visual Accessibility
- High contrast mode support
- Reduced motion preference detection
- Scalable text and UI elements
- Focus indicators for all interactive elements

## 🎨 Customization

### Content Updates
Edit `data.json` to update:
- Personal information
- Project details
- Skills and technologies
- Contact information
- Certifications

### Visual Styling
Modify CSS custom properties in `styles.css`:
```css
:root {
  --accent-primary: #4a9eff;      /* Primary accent color */
  --accent-secondary: #00d4ff;    /* Secondary accent */
  --bg-primary: #0a0a0f;          /* Background color */
  /* ... other variables */
}
```

### Room Layout
Adjust furniture positions and hotspots in `main.js`:
```javascript
const hotspots = {
  about: { 
    position: new THREE.Vector3(x, y, z), 
    target: new THREE.Vector3(x, y, z) 
  },
  // ... other hotspots
};
```

## 🐛 Browser Compatibility

### Supported Browsers
- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

### Required Features
- ES6 Modules
- WebGL 2.0
- CSS Grid
- CSS Custom Properties

## 📊 Analytics & Monitoring

### Performance Monitoring
Development mode includes:
- FPS counter (stats.js)
- Memory usage tracking
- Render time analysis

### Production Monitoring
Consider adding:
- Google Analytics
- Error tracking (Sentry)
- Performance monitoring (Web Vitals)


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Three.js**: Powerful 3D library
- **GitHub Pages**: Free static hosting
- **SVG**: Scalable vector graphics for textures
- **Modern Web Standards**: ES6 modules, CSS Grid, WebGL

---

**Live Demo**: [View Portfolio](https://yourusername.github.io/your-repository-name/)

**Contact**: [your.email@example.com](mailto:your.email@example.com)