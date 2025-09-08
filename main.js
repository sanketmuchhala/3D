import * as THREE from 'https://unpkg.com/three@0.167.0/build/three.module.js';

// Global state
let scene, camera, renderer, raycaster, mouse, clock;
let furniture = [];
let currentHotspot = 'about';
let isTransitioning = false;
let stats;

// Camera hotspots (x, y, z, target_x, target_y, target_z)
const hotspots = {
    about: { 
        position: new THREE.Vector3(2, 1.6, 2), 
        target: new THREE.Vector3(0, 1, 0),
        description: 'Overview of room and personal introduction'
    },
    projects: { 
        position: new THREE.Vector3(-2.5, 1.4, 0), 
        target: new THREE.Vector3(-1, 1, 0),
        description: 'Desk area showcasing technical projects'
    },
    arcade: { 
        position: new THREE.Vector3(0, 1.2, -1.8), 
        target: new THREE.Vector3(0, 1.5, -1),
        description: 'Gaming setup with interactive demos'
    },
    whiteboard: { 
        position: new THREE.Vector3(2.5, 1.5, -1), 
        target: new THREE.Vector3(1.5, 1.5, -1),
        description: 'Ideas board with research notes'
    },
    contact: { 
        position: new THREE.Vector3(0, 1.6, 1.8), 
        target: new THREE.Vector3(0, 1, 0),
        description: 'Bedroom area with contact information'
    }
};

// Material library
const materials = {
    wall: null,
    wood: null,
    carpet: null,
    fabric: null,
    metal: null,
    screen: null
};

// Portfolio data
let portfolioData = null;

// Initialization
async function init() {
    try {
        // Load portfolio data
        const response = await fetch('./data.json');
        portfolioData = await response.json();
        
        // Create scene
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0a0a0f);
        scene.fog = new THREE.Fog(0x0a0a0f, 8, 20);
        
        // Create camera
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.copy(hotspots.about.position);
        
        // Create renderer
        const canvas = document.getElementById('three-canvas');
        renderer = new THREE.WebGLRenderer({ 
            canvas: canvas,
            antialias: true,
            alpha: false,
            powerPreference: "high-performance"
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;
        
        // Initialize utilities
        raycaster = new THREE.Raycaster();
        mouse = new THREE.Vector2();
        clock = new THREE.Clock();
        
        // Load materials
        await loadMaterials();
        
        // Create room
        createRoom();
        
        // Create furniture
        createFurniture();
        
        // Setup lighting
        setupLighting();
        
        // Setup controls
        setupControls();
        
        // Setup UI
        setupUI();
        
        // Start render loop
        animate();
        
        // Hide loading screen
        hideLoading();
        
        console.log('3D Bedroom Portfolio initialized successfully');
        
    } catch (error) {
        console.error('Initialization failed:', error);
        showError('Failed to load 3D scene. Please refresh the page.');
    }
}

// Material loading with procedural SVG textures
async function loadMaterials() {
    const textureLoader = new THREE.TextureLoader();
    
    // Load SVG textures
    const wallTexture = textureLoader.load('./assets/textures/wall-paint.svg');
    const woodTexture = textureLoader.load('./assets/textures/wood-grain.svg');
    const carpetTexture = textureLoader.load('./assets/textures/carpet.svg');
    const fabricTexture = textureLoader.load('./assets/textures/fabric.svg');
    const metalTexture = textureLoader.load('./assets/textures/metal.svg');
    
    // Configure texture settings
    [wallTexture, woodTexture, carpetTexture, fabricTexture, metalTexture].forEach(texture => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.generateMipmaps = true;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;
    });
    
    // Set texture repeats
    wallTexture.repeat.set(4, 4);
    woodTexture.repeat.set(2, 2);
    carpetTexture.repeat.set(8, 8);
    fabricTexture.repeat.set(4, 4);
    metalTexture.repeat.set(1, 1);
    
    // Create materials
    materials.wall = new THREE.MeshLambertMaterial({ 
        map: wallTexture,
        color: 0xf8f9fa
    });
    
    materials.wood = new THREE.MeshLambertMaterial({ 
        map: woodTexture,
        color: 0xd2b48c
    });
    
    materials.carpet = new THREE.MeshLambertMaterial({ 
        map: carpetTexture,
        color: 0x4a5568
    });
    
    materials.fabric = new THREE.MeshLambertMaterial({ 
        map: fabricTexture,
        color: 0x6366f1
    });
    
    materials.metal = new THREE.MeshLambertMaterial({ 
        map: metalTexture,
        color: 0xe9ecef
    });
    
    materials.screen = new THREE.MeshBasicMaterial({ 
        color: 0x1a1a2e,
        emissive: 0x0f0f23
    });
}

// Room architecture
function createRoom() {
    const roomGroup = new THREE.Group();
    roomGroup.name = 'room';
    
    // Room dimensions: 6m x 4m x 3m
    const roomWidth = 6;
    const roomHeight = 4;
    const roomDepth = 3;
    
    // Floor
    const floorGeometry = new THREE.PlaneGeometry(roomWidth, roomHeight);
    const floor = new THREE.Mesh(floorGeometry, materials.carpet);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    floor.receiveShadow = true;
    floor.name = 'floor';
    roomGroup.add(floor);
    
    // Walls
    // Back wall
    const backWallGeometry = new THREE.PlaneGeometry(roomWidth, roomDepth);
    const backWall = new THREE.Mesh(backWallGeometry, materials.wall);
    backWall.position.set(0, roomDepth / 2, -roomHeight / 2);
    backWall.receiveShadow = true;
    backWall.name = 'back-wall';
    roomGroup.add(backWall);
    
    // Front wall (partial, with opening)
    const frontWallLeft = new THREE.Mesh(
        new THREE.PlaneGeometry(1.5, roomDepth),
        materials.wall
    );
    frontWallLeft.position.set(-2.25, roomDepth / 2, roomHeight / 2);
    frontWallLeft.rotation.y = Math.PI;
    frontWallLeft.receiveShadow = true;
    frontWallLeft.name = 'front-wall-left';
    roomGroup.add(frontWallLeft);
    
    const frontWallRight = new THREE.Mesh(
        new THREE.PlaneGeometry(1.5, roomDepth),
        materials.wall
    );
    frontWallRight.position.set(2.25, roomDepth / 2, roomHeight / 2);
    frontWallRight.rotation.y = Math.PI;
    frontWallRight.receiveShadow = true;
    frontWallRight.name = 'front-wall-right';
    roomGroup.add(frontWallRight);
    
    // Left wall
    const leftWall = new THREE.Mesh(
        new THREE.PlaneGeometry(roomHeight, roomDepth),
        materials.wall
    );
    leftWall.position.set(-roomWidth / 2, roomDepth / 2, 0);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.receiveShadow = true;
    leftWall.name = 'left-wall';
    roomGroup.add(leftWall);
    
    // Right wall
    const rightWall = new THREE.Mesh(
        new THREE.PlaneGeometry(roomHeight, roomDepth),
        materials.wall
    );
    rightWall.position.set(roomWidth / 2, roomDepth / 2, 0);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.receiveShadow = true;
    rightWall.name = 'right-wall';
    roomGroup.add(rightWall);
    
    // Ceiling
    const ceiling = new THREE.Mesh(
        new THREE.PlaneGeometry(roomWidth, roomHeight),
        materials.wall
    );
    ceiling.position.set(0, roomDepth, 0);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.receiveShadow = true;
    ceiling.name = 'ceiling';
    roomGroup.add(ceiling);
    
    scene.add(roomGroup);
}

// Furniture creation
function createFurniture() {
    // Desk (projects hotspot)
    const desk = createDesk();
    desk.position.set(-2, 0, -0.5);
    desk.userData = { hotspot: 'projects', interactive: true };
    furniture.push(desk);
    scene.add(desk);
    
    // Bed (contact hotspot)
    const bed = createBed();
    bed.position.set(1.5, 0, 1.2);
    bed.userData = { hotspot: 'contact', interactive: true };
    furniture.push(bed);
    scene.add(bed);
    
    // Arcade cabinet (arcade hotspot)
    const arcade = createArcadeCabinet();
    arcade.position.set(0.5, 0, -1.8);
    arcade.userData = { hotspot: 'arcade', interactive: true };
    furniture.push(arcade);
    scene.add(arcade);
    
    // Whiteboard (whiteboard hotspot)
    const whiteboard = createWhiteboard();
    whiteboard.position.set(2.5, 1, -1.5);
    whiteboard.userData = { hotspot: 'whiteboard', interactive: true };
    furniture.push(whiteboard);
    scene.add(whiteboard);
    
    // Bookshelf
    const bookshelf = createBookshelf();
    bookshelf.position.set(-2.8, 0, 1);
    bookshelf.userData = { hotspot: 'about', interactive: true };
    furniture.push(bookshelf);
    scene.add(bookshelf);
    
    // Rubik's cube (easter egg)
    const cube = createRubiksCube();
    cube.position.set(-1.5, 0.8, -0.3);
    cube.userData = { interactive: true, easteregg: true };
    furniture.push(cube);
    scene.add(cube);
}

// Furniture builders
function createDesk() {
    const deskGroup = new THREE.Group();
    deskGroup.name = 'desk';
    
    // Desktop
    const desktop = new THREE.Mesh(
        new THREE.BoxGeometry(1.5, 0.05, 0.8),
        materials.wood
    );
    desktop.position.y = 0.75;
    desktop.castShadow = true;
    desktop.receiveShadow = true;
    deskGroup.add(desktop);
    
    // Legs
    for (let i = 0; i < 4; i++) {
        const leg = new THREE.Mesh(
            new THREE.BoxGeometry(0.05, 0.75, 0.05),
            materials.wood
        );
        leg.position.set(
            (i % 2) * 1.4 - 0.7,
            0.375,
            Math.floor(i / 2) * 0.7 - 0.35
        );
        leg.castShadow = true;
        deskGroup.add(leg);
    }
    
    // Monitor
    const monitor = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.3, 0.03),
        materials.screen
    );
    monitor.position.set(0, 1.05, -0.2);
    monitor.castShadow = true;
    deskGroup.add(monitor);
    
    // Monitor stand
    const stand = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.08, 0.2),
        materials.metal
    );
    stand.position.set(0, 0.9, -0.2);
    deskGroup.add(stand);
    
    return deskGroup;
}

function createBed() {
    const bedGroup = new THREE.Group();
    bedGroup.name = 'bed';
    
    // Mattress
    const mattress = new THREE.Mesh(
        new THREE.BoxGeometry(2, 0.3, 1.8),
        materials.fabric
    );
    mattress.position.y = 0.35;
    mattress.castShadow = true;
    mattress.receiveShadow = true;
    bedGroup.add(mattress);
    
    // Bed frame
    const frame = new THREE.Mesh(
        new THREE.BoxGeometry(2.1, 0.2, 1.9),
        materials.wood
    );
    frame.position.y = 0.1;
    frame.castShadow = true;
    frame.receiveShadow = true;
    bedGroup.add(frame);
    
    // Pillows
    for (let i = 0; i < 2; i++) {
        const pillow = new THREE.Mesh(
            new THREE.BoxGeometry(0.4, 0.15, 0.6),
            materials.fabric
        );
        pillow.position.set(i * 0.6 - 0.3, 0.575, -0.6);
        pillow.castShadow = true;
        bedGroup.add(pillow);
    }
    
    return bedGroup;
}

function createArcadeCabinet() {
    const arcadeGroup = new THREE.Group();
    arcadeGroup.name = 'arcade';
    
    // Cabinet body
    const cabinet = new THREE.Mesh(
        new THREE.BoxGeometry(0.6, 1.5, 0.5),
        materials.wood
    );
    cabinet.position.y = 0.75;
    cabinet.castShadow = true;
    cabinet.receiveShadow = true;
    arcadeGroup.add(cabinet);
    
    // Screen
    const screen = new THREE.Mesh(
        new THREE.BoxGeometry(0.4, 0.3, 0.05),
        materials.screen
    );
    screen.position.set(0, 1.2, 0.225);
    screen.castShadow = true;
    arcadeGroup.add(screen);
    
    // Control panel
    const controlPanel = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.05, 0.2),
        materials.metal
    );
    controlPanel.position.set(0, 0.9, 0.2);
    controlPanel.rotation.x = -Math.PI / 6;
    arcadeGroup.add(controlPanel);
    
    return arcadeGroup;
}

function createWhiteboard() {
    const whiteboardGroup = new THREE.Group();
    whiteboardGroup.name = 'whiteboard';
    
    // Board
    const board = new THREE.Mesh(
        new THREE.BoxGeometry(1, 0.02, 0.7),
        new THREE.MeshLambertMaterial({ color: 0xffffff })
    );
    board.castShadow = true;
    board.receiveShadow = true;
    whiteboardGroup.add(board);
    
    // Frame
    const frameTop = new THREE.Mesh(
        new THREE.BoxGeometry(1.1, 0.05, 0.05),
        materials.metal
    );
    frameTop.position.set(0, 0, 0.375);
    whiteboardGroup.add(frameTop);
    
    const frameBottom = new THREE.Mesh(
        new THREE.BoxGeometry(1.1, 0.05, 0.05),
        materials.metal
    );
    frameBottom.position.set(0, 0, -0.375);
    whiteboardGroup.add(frameBottom);
    
    return whiteboardGroup;
}

function createBookshelf() {
    const shelfGroup = new THREE.Group();
    shelfGroup.name = 'bookshelf';
    
    // Main structure
    const shelf = new THREE.Mesh(
        new THREE.BoxGeometry(0.4, 2, 0.8),
        materials.wood
    );
    shelf.position.y = 1;
    shelf.castShadow = true;
    shelf.receiveShadow = true;
    shelfGroup.add(shelf);
    
    // Books (simplified as colored boxes)
    const bookColors = [0x8b5a3c, 0x2d5a87, 0x5d4e37, 0x654321, 0x8b4513];
    for (let level = 0; level < 4; level++) {
        for (let i = 0; i < 3; i++) {
            const book = new THREE.Mesh(
                new THREE.BoxGeometry(0.05, 0.25, 0.15),
                new THREE.MeshLambertMaterial({ color: bookColors[Math.floor(Math.random() * bookColors.length)] })
            );
            book.position.set(
                (i - 1) * 0.08,
                0.4 + level * 0.4,
                0.1
            );
            book.castShadow = true;
            shelfGroup.add(book);
        }
    }
    
    return shelfGroup;
}

function createRubiksCube() {
    const cubeGroup = new THREE.Group();
    cubeGroup.name = 'rubiks-cube';
    
    // Create a colorful cube
    const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff8800, 0xffffff];
    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 0.12, 0.12),
        colors.map(color => new THREE.MeshLambertMaterial({ color }))
    );
    cube.castShadow = true;
    cube.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
    );
    
    cubeGroup.add(cube);
    return cubeGroup;
}

// Lighting setup
function setupLighting() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    scene.add(ambientLight);
    
    // Main ceiling light
    const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
    mainLight.position.set(0, 2.8, 0);
    mainLight.target.position.set(0, 0, 0);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    mainLight.shadow.camera.near = 0.5;
    mainLight.shadow.camera.far = 10;
    mainLight.shadow.camera.left = -5;
    mainLight.shadow.camera.right = 5;
    mainLight.shadow.camera.top = 5;
    mainLight.shadow.camera.bottom = -5;
    mainLight.shadow.bias = -0.0001;
    scene.add(mainLight);
    scene.add(mainLight.target);
    
    // Desk lamp
    const deskLight = new THREE.SpotLight(0xffd700, 0.5);
    deskLight.position.set(-1.5, 1.5, -0.5);
    deskLight.target.position.set(-2, 0.8, -0.5);
    deskLight.angle = Math.PI / 6;
    deskLight.penumbra = 0.3;
    deskLight.decay = 2;
    deskLight.distance = 3;
    deskLight.castShadow = true;
    deskLight.shadow.mapSize.width = 1024;
    deskLight.shadow.mapSize.height = 1024;
    scene.add(deskLight);
    scene.add(deskLight.target);
    
    // Arcade screen glow
    const arcadeLight = new THREE.PointLight(0x00ffff, 0.3);
    arcadeLight.position.set(0.5, 1.2, -1.5);
    arcadeLight.distance = 2;
    arcadeLight.decay = 2;
    scene.add(arcadeLight);
}

// Controls and interaction
function setupControls() {
    // Mouse/touch controls
    window.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('click', onMouseClick, false);
    window.addEventListener('touchstart', onTouchStart, false);
    window.addEventListener('touchmove', onTouchMove, false);
    window.addEventListener('touchend', onTouchEnd, false);
    
    // Keyboard shortcuts
    window.addEventListener('keydown', onKeyDown, false);
    
    // Window resize
    window.addEventListener('resize', onWindowResize, false);
}

function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onMouseClick(event) {
    if (isTransitioning) return;
    
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(furniture, true);
    
    if (intersects.length > 0) {
        const clickedObject = intersects[0].object;
        let targetObject = clickedObject;
        
        // Find the furniture group
        while (targetObject.parent && !targetObject.userData.hotspot) {
            targetObject = targetObject.parent;
        }
        
        if (targetObject.userData.hotspot) {
            navigateToHotspot(targetObject.userData.hotspot);
        } else if (targetObject.userData.easteregg) {
            // Easter egg interaction
            animateRubiksCube(targetObject);
        }
    }
}

function onTouchStart(event) {
    if (event.touches.length === 1) {
        const touch = event.touches[0];
        mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
    }
}

function onTouchMove(event) {
    event.preventDefault();
}

function onTouchEnd(event) {
    onMouseClick(event);
}

function onKeyDown(event) {
    if (isTransitioning) return;
    
    const hotspotKeys = ['1', '2', '3', '4', '5'];
    const hotspotNames = ['about', 'projects', 'arcade', 'whiteboard', 'contact'];
    
    const keyIndex = hotspotKeys.indexOf(event.key);
    if (keyIndex !== -1) {
        navigateToHotspot(hotspotNames[keyIndex]);
    }
    
    // ESC to close overlays
    if (event.key === 'Escape') {
        closeAllOverlays();
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Navigation system
function navigateToHotspot(hotspotName) {
    if (currentHotspot === hotspotName || isTransitioning) return;
    
    const targetHotspot = hotspots[hotspotName];
    if (!targetHotspot) return;
    
    isTransitioning = true;
    currentHotspot = hotspotName;
    
    // Update navigation UI
    updateNavigationUI(hotspotName);
    
    // Camera transition with cubic easing
    const startPos = camera.position.clone();
    const startLookAt = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion).add(camera.position);
    
    const duration = 2000; // 2 seconds
    const startTime = Date.now();
    
    function animateTransition() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Cubic easing out
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        
        // Interpolate position
        camera.position.lerpVectors(startPos, targetHotspot.position, easedProgress);
        
        // Interpolate look-at
        const currentLookAt = new THREE.Vector3().lerpVectors(startLookAt, targetHotspot.target, easedProgress);
        camera.lookAt(currentLookAt);
        
        if (progress < 1) {
            requestAnimationFrame(animateTransition);
        } else {
            isTransitioning = false;
        }
    }
    
    animateTransition();
}

// UI Management
function setupUI() {
    // Navigation buttons
    const navButtons = document.querySelectorAll('.nav-link[data-hotspot]');
    navButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const hotspot = e.target.closest('[data-hotspot]').dataset.hotspot;
            navigateToHotspot(hotspot);
            showOverlay(hotspot);
        });
    });
    
    // Overlay close buttons
    const closeButtons = document.querySelectorAll('.overlay-close');
    closeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const overlay = e.target.closest('[data-overlay]').dataset.overlay;
            hideOverlay(overlay);
        });
    });
    
    // Backdrop click to close
    const backdrop = document.getElementById('overlay-backdrop');
    backdrop.addEventListener('click', closeAllOverlays);
    
    // Populate content
    populateContent();
}

function updateNavigationUI(activeHotspot) {
    const navButtons = document.querySelectorAll('.nav-link[data-hotspot]');
    navButtons.forEach(button => {
        const hotspot = button.dataset.hotspot;
        button.classList.toggle('active', hotspot === activeHotspot);
    });
}

function showOverlay(overlayName) {
    const overlay = document.getElementById(`overlay-${overlayName}`);
    const backdrop = document.getElementById('overlay-backdrop');
    
    if (overlay) {
        backdrop.classList.add('active');
        overlay.classList.add('active');
        overlay.setAttribute('aria-hidden', 'false');
        
        // Focus management
        const focusableElement = overlay.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusableElement) {
            setTimeout(() => focusableElement.focus(), 100);
        }
    }
}

function hideOverlay(overlayName) {
    const overlay = document.getElementById(`overlay-${overlayName}`);
    const backdrop = document.getElementById('overlay-backdrop');
    
    if (overlay) {
        overlay.classList.remove('active');
        overlay.setAttribute('aria-hidden', 'true');
        
        // Check if any overlays are still open
        const openOverlays = document.querySelectorAll('.overlay.active');
        if (openOverlays.length === 0) {
            backdrop.classList.remove('active');
        }
    }
}

function closeAllOverlays() {
    const overlays = document.querySelectorAll('.overlay');
    const backdrop = document.getElementById('overlay-backdrop');
    
    overlays.forEach(overlay => {
        overlay.classList.remove('active');
        overlay.setAttribute('aria-hidden', 'true');
    });
    
    backdrop.classList.remove('active');
}

function populateContent() {
    if (!portfolioData) return;
    
    // About section
    const aboutSummary = document.getElementById('about-summary');
    if (aboutSummary) {
        aboutSummary.innerHTML = `
            <p>${portfolioData.personal.summary}</p>
        `;
    }
    
    // Skills grid
    const skillsGrid = document.getElementById('skills-grid');
    if (skillsGrid && portfolioData.skills) {
        const skillCategories = {
            'AI & ML': portfolioData.skills.ai_ml,
            'Cloud & Infrastructure': portfolioData.skills.cloud_tech,
            'Programming': portfolioData.skills.programming,
            'Specializations': portfolioData.skills.specialties
        };
        
        skillsGrid.innerHTML = Object.entries(skillCategories).map(([category, skills]) => `
            <div class="skill-category">
                <h3>${category}</h3>
                <div class="skill-tags">
                    ${skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            </div>
        `).join('');
    }
    
    // Projects section
    const projectsGrid = document.getElementById('projects-grid');
    if (projectsGrid && portfolioData.projects) {
        projectsGrid.innerHTML = portfolioData.projects.map(project => `
            <div class="project-card">
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                <div class="tech-tags">
                    ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <p class="project-details">${project.details}</p>
                ${project.impact ? `<div class="project-impact"><strong>Impact:</strong> ${project.impact}</div>` : ''}
                ${project.cost ? `<div class="project-cost"><strong>Cost Efficiency:</strong> ${project.cost}</div>` : ''}
                <div class="project-links">
                    <a href="${project.github}" class="project-link" target="_blank">GitHub</a>
                    <a href="${project.demo}" class="project-link" target="_blank">Demo</a>
                </div>
            </div>
        `).join('');
    }
    
    // Contact section
    const contactContent = document.getElementById('contact-content');
    if (contactContent && portfolioData.personal) {
        contactContent.innerHTML = `
            <div class="contact-links">
                <a href="mailto:${portfolioData.personal.email}" class="contact-link">
                    📧 Email
                </a>
                <a href="${portfolioData.personal.github}" class="contact-link" target="_blank">
                    💻 GitHub
                </a>
                <a href="${portfolioData.personal.linkedin}" class="contact-link" target="_blank">
                    🔗 LinkedIn
                </a>
                <a href="${portfolioData.personal.website}" class="contact-link" target="_blank">
                    🌐 Website
                </a>
            </div>
        `;
    }
}

// Animation helpers
function animateRubiksCube(cubeObject) {
    const cube = cubeObject.children[0];
    if (!cube) return;
    
    const startRotation = {
        x: cube.rotation.x,
        y: cube.rotation.y,
        z: cube.rotation.z
    };
    
    const targetRotation = {
        x: startRotation.x + Math.PI * 2,
        y: startRotation.y + Math.PI * 2,
        z: startRotation.z + Math.PI * 2
    };
    
    const duration = 1000;
    const startTime = Date.now();
    
    function animateCube() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        
        cube.rotation.x = startRotation.x + (targetRotation.x - startRotation.x) * easedProgress;
        cube.rotation.y = startRotation.y + (targetRotation.y - startRotation.y) * easedProgress;
        cube.rotation.z = startRotation.z + (targetRotation.z - startRotation.z) * easedProgress;
        
        if (progress < 1) {
            requestAnimationFrame(animateCube);
        }
    }
    
    animateCube();
}

// Render loop
function animate() {
    requestAnimationFrame(animate);
    
    const deltaTime = clock.getDelta();
    
    // Animate furniture (subtle movements)
    furniture.forEach(item => {
        if (item.userData.easteregg) {
            // Gentle rotation for Rubik's cube
            const cube = item.children[0];
            if (cube) {
                cube.rotation.y += deltaTime * 0.2;
            }
        }
    });
    
    // Update stats if available
    if (stats) stats.update();
    
    // Render scene
    renderer.render(scene, camera);
}

// Utility functions
function hideLoading() {
    const loadingOverlay = document.getElementById('loading');
    if (loadingOverlay) {
        loadingOverlay.classList.add('hidden');
        setTimeout(() => {
            loadingOverlay.style.display = 'none';
        }, 500);
    }
}

function showError(message) {
    const loadingOverlay = document.getElementById('loading');
    if (loadingOverlay) {
        loadingOverlay.innerHTML = `
            <div class="loading-content">
                <h2>Error</h2>
                <p>${message}</p>
                <button onclick="window.location.reload()" class="project-link">Reload Page</button>
            </div>
        `;
    }
}

// Performance monitoring (development only)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    import('https://unpkg.com/three@0.167.0/examples/jsm/libs/stats.module.js').then(({ default: Stats }) => {
        stats = new Stats();
        stats.showPanel(0); // FPS panel
        document.getElementById('stats-container').appendChild(stats.dom);
    });
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}