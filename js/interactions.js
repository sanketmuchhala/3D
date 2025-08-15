class InteractionSystem {
    constructor(scene, camera, renderer) {
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        
        this.interactiveObjects = new Map();
        this.hoveredObject = null;
        this.selectedObject = null;
        
        this.isMouseDown = false;
        this.mouseDownTime = 0;
        this.clickThreshold = 200; // ms
        
        this.bindEvents();
    }

    addInteractiveObject(mesh, data) {
        this.interactiveObjects.set(mesh.uuid, {
            mesh: mesh,
            data: data,
            originalMaterial: mesh.material.clone ? mesh.material.clone() : mesh.material,
            originalScale: mesh.scale.clone(),
            isHovered: false,
            isSelected: false
        });
    }

    removeInteractiveObject(mesh) {
        this.interactiveObjects.delete(mesh.uuid);
    }

    bindEvents() {
        const canvas = this.renderer.domElement;
        
        // Mouse events
        canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        canvas.addEventListener('click', this.onClick.bind(this));
        
        // Touch events for mobile
        canvas.addEventListener('touchstart', this.onTouchStart.bind(this));
        canvas.addEventListener('touchmove', this.onTouchMove.bind(this));
        canvas.addEventListener('touchend', this.onTouchEnd.bind(this));
        
        // Prevent context menu on right click
        canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    }

    updateMouse(clientX, clientY) {
        const rect = this.renderer.domElement.getBoundingClientRect();
        this.mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    }

    onMouseMove(event) {
        this.updateMouse(event.clientX, event.clientY);
        
        if (!this.isMouseDown) {
            this.checkHover();
        }
    }

    onMouseDown(event) {
        this.isMouseDown = true;
        this.mouseDownTime = Date.now();
        this.updateMouse(event.clientX, event.clientY);
    }

    onMouseUp(event) {
        const clickDuration = Date.now() - this.mouseDownTime;
        this.isMouseDown = false;
        
        if (clickDuration < this.clickThreshold) {
            this.checkClick();
        }
    }

    onClick(event) {
        // Fallback for click events
        if (!this.isMouseDown) {
            this.updateMouse(event.clientX, event.clientY);
            this.checkClick();
        }
    }

    onTouchStart(event) {
        if (event.touches.length === 1) {
            event.preventDefault();
            const touch = event.touches[0];
            this.updateMouse(touch.clientX, touch.clientY);
            this.isMouseDown = true;
            this.mouseDownTime = Date.now();
        }
    }

    onTouchMove(event) {
        if (event.touches.length === 1) {
            event.preventDefault();
            const touch = event.touches[0];
            this.updateMouse(touch.clientX, touch.clientY);
            
            if (!this.isMouseDown) {
                this.checkHover();
            }
        }
    }

    onTouchEnd(event) {
        event.preventDefault();
        const clickDuration = Date.now() - this.mouseDownTime;
        this.isMouseDown = false;
        
        if (clickDuration < this.clickThreshold && event.changedTouches.length === 1) {
            this.checkClick();
        }
    }

    checkHover() {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const meshes = Array.from(this.interactiveObjects.values()).map(obj => obj.mesh);
        const intersects = this.raycaster.intersectObjects(meshes, true);
        
        // Clear previous hover
        if (this.hoveredObject && this.hoveredObject.data.type !== 'selected') {
            this.clearHoverEffects(this.hoveredObject);
            this.hoveredObject = null;
        }
        
        // Apply new hover
        if (intersects.length > 0) {
            const intersectedObject = this.findInteractiveParent(intersects[0].object);
            if (intersectedObject && !intersectedObject.isSelected) {
                this.hoveredObject = intersectedObject;
                this.applyHoverEffects(intersectedObject);
            }
        }
        
        // Update cursor
        this.updateCursor(intersects.length > 0);
    }

    checkClick() {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const meshes = Array.from(this.interactiveObjects.values()).map(obj => obj.mesh);
        const intersects = this.raycaster.intersectObjects(meshes, true);
        
        if (intersects.length > 0) {
            const intersectedObject = this.findInteractiveParent(intersects[0].object);
            if (intersectedObject) {
                this.handleClick(intersectedObject);
            }
        }
    }

    findInteractiveParent(object) {
        let current = object;
        while (current) {
            const interactiveData = this.interactiveObjects.get(current.uuid);
            if (interactiveData) {
                return interactiveData;
            }
            current = current.parent;
            if (current === this.scene) break;
        }
        return null;
    }

    applyHoverEffects(objectData) {
        const mesh = objectData.mesh;
        objectData.isHovered = true;
        
        // Scale animation
        GlobalAnimationManager.add(`hover-scale-${mesh.uuid}`, {
            duration: 200,
            easing: ThreeUtils.easeInOutCubic,
            onUpdate: (progress) => {
                const scale = ThreeUtils.lerp(1, 1.05, progress);
                mesh.scale.copy(objectData.originalScale).multiplyScalar(scale);
            }
        });

        // Glow effect for certain objects
        if (this.shouldGlow(objectData.data.type)) {
            this.addGlowEffect(mesh);
        }

        // Material brightness
        if (mesh.material.color) {
            GlobalAnimationManager.add(`hover-brightness-${mesh.uuid}`, {
                duration: 200,
                easing: ThreeUtils.easeInOutCubic,
                onUpdate: (progress) => {
                    const brightness = ThreeUtils.lerp(1, 1.2, progress);
                    mesh.material.color.copy(objectData.originalMaterial.color).multiplyScalar(brightness);
                }
            });
        }
    }

    clearHoverEffects(objectData) {
        const mesh = objectData.mesh;
        objectData.isHovered = false;
        
        // Remove animations
        GlobalAnimationManager.remove(`hover-scale-${mesh.uuid}`);
        GlobalAnimationManager.remove(`hover-brightness-${mesh.uuid}`);
        
        // Reset scale
        GlobalAnimationManager.add(`unhover-scale-${mesh.uuid}`, {
            duration: 200,
            easing: ThreeUtils.easeInOutCubic,
            onUpdate: (progress) => {
                const currentScale = mesh.scale.x;
                const targetScale = 1;
                const scale = ThreeUtils.lerp(currentScale, targetScale, progress);
                mesh.scale.copy(objectData.originalScale).multiplyScalar(scale);
            }
        });

        // Reset material
        if (mesh.material.color && objectData.originalMaterial.color) {
            GlobalAnimationManager.add(`unhover-brightness-${mesh.uuid}`, {
                duration: 200,
                easing: ThreeUtils.easeInOutCubic,
                onUpdate: (progress) => {
                    const currentColor = mesh.material.color.clone();
                    mesh.material.color.lerpColors(currentColor, objectData.originalMaterial.color, progress);
                }
            });
        }

        // Remove glow
        this.removeGlowEffect(mesh);
    }

    shouldGlow(objectType) {
        const glowTypes = ['laptop', 'monitor', 'charging-station', 'server-rack', 'vr-headset'];
        return glowTypes.includes(objectType);
    }

    addGlowEffect(mesh) {
        // Create a glow outline
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0x00d4ff,
            transparent: true,
            opacity: 0.2,
            side: THREE.BackSide
        });
        
        const glowMesh = new THREE.Mesh(mesh.geometry, glowMaterial);
        glowMesh.scale.multiplyScalar(1.02);
        glowMesh.name = 'glow-effect';
        mesh.add(glowMesh);
    }

    removeGlowEffect(mesh) {
        const glowEffect = mesh.getObjectByName('glow-effect');
        if (glowEffect) {
            mesh.remove(glowEffect);
        }
    }

    updateCursor(isOverInteractive) {
        const canvas = this.renderer.domElement;
        if (isOverInteractive) {
            canvas.style.cursor = 'pointer';
        } else {
            canvas.style.cursor = 'grab';
        }
    }

    handleClick(objectData) {
        const data = objectData.data;
        
        // Visual feedback for click
        this.showClickFeedback(objectData.mesh);
        
        // Haptic feedback for mobile
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
        
        // Handle the interaction
        this.executeInteraction(data);
        
        // Analytics/tracking
        this.trackInteraction(data);
    }

    showClickFeedback(mesh) {
        // Quick scale pulse
        const originalScale = mesh.scale.clone();
        
        GlobalAnimationManager.add(`click-feedback-${mesh.uuid}`, {
            duration: 150,
            easing: ThreeUtils.easeInOutCubic,
            onUpdate: (progress) => {
                let scale;
                if (progress < 0.5) {
                    scale = ThreeUtils.lerp(1, 0.95, progress * 2);
                } else {
                    scale = ThreeUtils.lerp(0.95, 1.05, (progress - 0.5) * 2);
                }
                mesh.scale.copy(originalScale).multiplyScalar(scale);
            },
            onComplete: () => {
                mesh.scale.copy(originalScale);
            }
        });
    }

    executeInteraction(data) {
        console.log('Executing interaction:', data);
        
        switch (data.action) {
            case 'showProjects':
                this.showModal('projects', portfolioData.projects);
                break;
            case 'showSkills':
                this.showModal('skills', portfolioData.skills);
                break;
            case 'showCertifications':
                this.showModal('certifications', portfolioData.certifications);
                break;
            case 'showAbout':
                this.showModal('about', portfolioData.personal);
                break;
            case 'showPhotography':
                this.showModal('photography', portfolioData.interests);
                break;
            case 'showResume':
                this.showModal('resume');
                break;
            case 'showContact':
                this.showModal('about', portfolioData.personal);
                break;
            case 'showCode':
                this.showCodeAnimation();
                break;
            case 'showPersonality':
                this.showPersonalityModal();
                break;
            case 'showWorkLife':
                this.showWorkLifeModal();
                break;
            case 'showTechSkills':
                this.showModal('skills', portfolioData.skills);
                break;
            case 'showArchitecture':
                this.showArchitectureModal();
                break;
            case 'showHardware':
                this.showHardwareModal();
                break;
            case 'showMakerProjects':
                this.showMakerProjectsModal();
                break;
            case 'showFutureTech':
                this.showFutureTechModal();
                break;
            case 'toggleLighting':
                this.toggleRoomLighting();
                break;
            default:
                console.log('Unhandled interaction action:', data.action);
        }
    }

    showModal(type, data) {
        const modalOverlay = document.getElementById('modal-overlay');
        const modalBody = document.getElementById('modal-body');
        
        if (modalTemplates[type]) {
            modalBody.innerHTML = modalTemplates[type](data);
            modalOverlay.classList.add('active');
            
            // Animate modal entrance
            GlobalAnimationManager.add('modal-entrance', {
                duration: 300,
                easing: ThreeUtils.easeInOutCubic,
                onUpdate: (progress) => {
                    const modal = modalOverlay.querySelector('.modal-content');
                    if (modal) {
                        const scale = ThreeUtils.lerp(0.8, 1, progress);
                        modal.style.transform = `scale(${scale})`;
                    }
                }
            });
        }
    }

    showCodeAnimation() {
        // Create a special modal with typing animation
        const modalOverlay = document.getElementById('modal-overlay');
        const modalBody = document.getElementById('modal-body');
        
        const codeLines = [
            'import tensorflow as tf',
            'from transformers import AutoModel, AutoTokenizer',
            '',
            'class AILearningAssistant:',
            '    def __init__(self):',
            '        self.model = AutoModel.from_pretrained("gpt-4")',
            '        self.tokenizer = AutoTokenizer.from_pretrained("gpt-4")',
            '',
            '    def generate_schedule(self, user_data):',
            '        """Adaptive learning schedule generation"""',
            '        features = self.extract_features(user_data)',
            '        schedule = self.model.predict(features)',
            '        return self.optimize_schedule(schedule)',
        ];
        
        modalBody.innerHTML = `
            <div class="modal-header">
                <h2>Live Coding Demo</h2>
                <p>AI Learning Assistant Implementation</p>
            </div>
            <div class="code-container">
                <pre><code id="typing-code"></code></pre>
            </div>
        `;
        
        modalOverlay.classList.add('active');
        
        // Typing animation
        let currentLine = 0;
        let currentChar = 0;
        const codeElement = document.getElementById('typing-code');
        
        const typeCode = () => {
            if (currentLine < codeLines.length) {
                const line = codeLines[currentLine];
                if (currentChar < line.length) {
                    codeElement.textContent += line[currentChar];
                    currentChar++;
                    setTimeout(typeCode, 50);
                } else {
                    codeElement.textContent += '\n';
                    currentLine++;
                    currentChar = 0;
                    setTimeout(typeCode, 200);
                }
            }
        };
        
        setTimeout(typeCode, 500);
    }

    showPersonalityModal() {
        const modalOverlay = document.getElementById('modal-overlay');
        const modalBody = document.getElementById('modal-body');
        
        modalBody.innerHTML = `
            <div class="modal-header">
                <h2>About My Personality</h2>
                <p>The person behind the code</p>
            </div>
            <div class="personality-content">
                <div class="personality-trait">
                    <h3>☕ Coffee-Driven Developer</h3>
                    <p>I believe the best code is written with good coffee. My daily ritual includes exploring new brewing methods and finding the perfect balance between caffeine and creativity.</p>
                </div>
                <div class="personality-trait">
                    <h3>🎯 Problem Solver</h3>
                    <p>I approach challenges with curiosity and persistence. Whether it's optimizing ML models or debugging complex systems, I enjoy breaking down problems into manageable pieces.</p>
                </div>
                <div class="personality-trait">
                    <h3>🌱 Continuous Learner</h3>
                    <p>The AI/ML field evolves rapidly, and I thrive on staying current with the latest research, techniques, and tools. Learning is not just professional development—it's a passion.</p>
                </div>
                <div class="personality-trait">
                    <h3>🎨 Creative Technologist</h3>
                    <p>I find beauty in elegant code architecture and enjoy creating solutions that are not just functional, but also intuitive and user-friendly.</p>
                </div>
            </div>
        `;
        
        modalOverlay.classList.add('active');
    }

    showWorkLifeModal() {
        const modalOverlay = document.getElementById('modal-overlay');
        const modalBody = document.getElementById('modal-body');
        
        modalBody.innerHTML = `
            <div class="modal-header">
                <h2>Work-Life Philosophy</h2>
                <p>Balance, Growth, and Well-being</p>
            </div>
            <div class="worklife-content">
                <div class="balance-section">
                    <h3>🌿 Sustainable Growth</h3>
                    <p>I believe in sustainable development practices—both in code and in life. Taking breaks, maintaining plants, and spending time in nature helps me stay creative and focused.</p>
                </div>
                <div class="balance-section">
                    <h3>🏃‍♂️ Active Lifestyle</h3>
                    <p>Regular exercise and outdoor activities keep my mind sharp. I find that some of my best solutions come during walks or while exploring new places with my camera.</p>
                </div>
                <div class="balance-section">
                    <h3>👥 Community Engagement</h3>
                    <p>Contributing to open-source projects and mentoring others in AI/ML is important to me. Sharing knowledge strengthens the entire community.</p>
                </div>
                <div class="balance-section">
                    <h3>🧘‍♂️ Mindful Technology</h3>
                    <p>While I love technology, I believe in using it mindfully. Regular digital detoxes and time away from screens help maintain perspective and creativity.</p>
                </div>
            </div>
        `;
        
        modalOverlay.classList.add('active');
    }

    showArchitectureModal() {
        this.showModal('projects', portfolioData.projects.filter(p => p.id === 'aws-geospatial'));
    }

    showHardwareModal() {
        const modalOverlay = document.getElementById('modal-overlay');
        const modalBody = document.getElementById('modal-body');
        
        modalBody.innerHTML = `
            <div class="modal-header">
                <h2>Hardware & IoT Projects</h2>
                <p>Bridging Physical and Digital Worlds</p>
            </div>
            <div class="hardware-projects">
                <div class="project-card">
                    <h3>🔧 Smart Home Automation</h3>
                    <p>Arduino-based system for controlling lighting, temperature, and security using ML for behavior prediction and energy optimization.</p>
                    <div class="tech-tags">
                        <span class="tech-tag">Arduino</span>
                        <span class="tech-tag">Raspberry Pi</span>
                        <span class="tech-tag">Machine Learning</span>
                        <span class="tech-tag">IoT</span>
                    </div>
                </div>
                <div class="project-card">
                    <h3>📊 Environmental Monitoring</h3>
                    <p>Sensor network for tracking air quality, temperature, and humidity with real-time data visualization and alerts.</p>
                    <div class="tech-tags">
                        <span class="tech-tag">Sensors</span>
                        <span class="tech-tag">Data Analytics</span>
                        <span class="tech-tag">Real-time Processing</span>
                    </div>
                </div>
                <div class="project-card">
                    <h3>🤖 AI-Powered Robot Assistant</h3>
                    <p>Personal robot project combining computer vision, natural language processing, and robotics for home assistance tasks.</p>
                    <div class="tech-tags">
                        <span class="tech-tag">Computer Vision</span>
                        <span class="tech-tag">NLP</span>
                        <span class="tech-tag">Robotics</span>
                        <span class="tech-tag">Python</span>
                    </div>
                </div>
            </div>
        `;
        
        modalOverlay.classList.add('active');
    }

    showMakerProjectsModal() {
        const modalOverlay = document.getElementById('modal-overlay');
        const modalBody = document.getElementById('modal-body');
        
        modalBody.innerHTML = `
            <div class="modal-header">
                <h2>Maker Projects & 3D Printing</h2>
                <p>Creating Physical Solutions</p>
            </div>
            <div class="maker-projects">
                <div class="project-card">
                    <h3>🖨️ Custom Hardware Enclosures</h3>
                    <p>Designed and printed custom cases for Raspberry Pi projects, Arduino setups, and electronic prototypes with optimal cooling and accessibility.</p>
                </div>
                <div class="project-card">
                    <h3>🏠 Home Organization Solutions</h3>
                    <p>Created custom organizers, cable management systems, and desk accessories that perfectly fit specific needs and spaces.</p>
                </div>
                <div class="project-card">
                    <h3>🔧 Prototype Development</h3>
                    <p>Rapid prototyping for IoT device housings, sensor mounts, and mechanical components for various automation projects.</p>
                </div>
                <div class="project-card">
                    <h3>🎨 Artistic & Functional Prints</h3>
                    <p>Combination of aesthetic and functional design, including architectural models, decorative elements, and replacement parts.</p>
                </div>
            </div>
        `;
        
        modalOverlay.classList.add('active');
    }

    showFutureTechModal() {
        const modalOverlay = document.getElementById('modal-overlay');
        const modalBody = document.getElementById('modal-body');
        
        modalBody.innerHTML = `
            <div class="modal-header">
                <h2>Future Technology Interests</h2>
                <p>Exploring Tomorrow's Possibilities</p>
            </div>
            <div class="future-tech-content">
                <div class="tech-area">
                    <h3>🥽 Virtual & Augmented Reality</h3>
                    <p>Exploring applications of VR/AR in education, training, and data visualization. Working on immersive interfaces for AI model interpretation.</p>
                    <div class="tech-tags">
                        <span class="tech-tag">Unity</span>
                        <span class="tech-tag">WebXR</span>
                        <span class="tech-tag">Spatial Computing</span>
                    </div>
                </div>
                <div class="tech-area">
                    <h3>🧠 Brain-Computer Interfaces</h3>
                    <p>Following developments in BCI technology and its potential applications in accessibility, productivity, and human-AI collaboration.</p>
                </div>
                <div class="tech-area">
                    <h3>🌐 Edge AI & IoT</h3>
                    <p>Implementing AI models on edge devices for real-time processing, privacy-preserving machine learning, and distributed intelligence systems.</p>
                </div>
                <div class="tech-area">
                    <h3>⚡ Quantum Computing</h3>
                    <p>Learning quantum algorithms and their potential impact on machine learning, cryptography, and optimization problems.</p>
                </div>
            </div>
        `;
        
        modalOverlay.classList.add('active');
    }

    toggleRoomLighting() {
        // This will be handled by the main scene's lighting system
        GlobalEventEmitter.emit('toggle-lighting');
    }

    trackInteraction(data) {
        // Analytics tracking (if implemented)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'portfolio_interaction', {
                'object_type': data.type,
                'action': data.action,
                'value': 1
            });
        }
        
        console.log('Interaction tracked:', {
            type: data.type,
            action: data.action,
            timestamp: new Date().toISOString()
        });
    }

    destroy() {
        const canvas = this.renderer.domElement;
        
        // Remove event listeners
        canvas.removeEventListener('mousemove', this.onMouseMove);
        canvas.removeEventListener('mousedown', this.onMouseDown);
        canvas.removeEventListener('mouseup', this.onMouseUp);
        canvas.removeEventListener('click', this.onClick);
        canvas.removeEventListener('touchstart', this.onTouchStart);
        canvas.removeEventListener('touchmove', this.onTouchMove);
        canvas.removeEventListener('touchend', this.onTouchEnd);
        
        // Clear interactive objects
        this.interactiveObjects.clear();
        this.hoveredObject = null;
        this.selectedObject = null;
    }
}