class BedroomPortfolio {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.cameraController = null;
        this.interactionSystem = null;
        this.performanceMonitor = null;
        this.isLoading = true;
        this.loadingProgress = 0;
        this.lights = {};
        this.furnitureObjects = [];
        
        this.init();
    }

    init() {
        this.checkPerformanceCapabilities();
        this.setupScene();
        this.setupCamera();
        this.setupRenderer();
        this.setupControls();
        this.setupInteractionSystem();
        this.createRoom();
        this.setupLighting();
        this.createFurniture();
        this.setupAnimations();
        this.bindEvents();
        this.animate();
        this.finishLoading();
    }

    checkPerformanceCapabilities() {
        const deviceType = MobileDetector.getDeviceType();
        
        // Adjust quality settings based on device
        this.qualitySettings = {
            shadowMapSize: deviceType === 'mobile' ? 1024 : 2048,
            antialias: deviceType !== 'mobile',
            pixelRatio: deviceType === 'mobile' ? 1 : Math.min(window.devicePixelRatio, 2),
            particleCount: deviceType === 'mobile' ? 50 : 100,
            enablePostProcessing: deviceType === 'desktop'
        };
        
        console.log(`Detected ${deviceType} device, adjusting quality settings`);
    }

    setupScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0a0a0a);
        this.scene.fog = new THREE.Fog(0x1a1a2e, 10, 30);
    }

    setupCamera() {
        const aspect = window.innerWidth / window.innerHeight;
        this.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
        this.camera.position.set(0, 5, 12);
        this.camera.lookAt(0, 2, 0);
    }

    setupRenderer() {
        const canvas = document.getElementById('three-canvas');
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: canvas,
            antialias: this.qualitySettings.antialias,
            alpha: false,
            powerPreference: 'high-performance'
        });
        
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(this.qualitySettings.pixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 0.8;
        
        // Performance optimizations
        this.renderer.info.autoReset = false;
        this.performanceMonitor = new PerformanceMonitor();
    }

    setupControls() {
        this.cameraController = new CameraController(
            this.camera, 
            new THREE.Vector3(0, 2, 0)
        );
        
        // Adjust controls based on device type
        const deviceType = MobileDetector.getDeviceType();
        if (deviceType === 'mobile') {
            this.cameraController.rotateSpeed = 0.8;
            this.cameraController.zoomSpeed = 0.8;
            this.cameraController.dampingFactor = 0.08;
        }
    }

    setupInteractionSystem() {
        this.interactionSystem = new InteractionSystem(
            this.scene, 
            this.camera, 
            this.renderer
        );
        
        // Listen for lighting toggle events
        GlobalEventEmitter.on('toggle-lighting', () => {
            this.toggleRoomLighting();
        });
    }

    createRoom() {
        // Floor
        const floorGeometry = new THREE.PlaneGeometry(20, 20);
        const floorMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x2c2c54,
            transparent: true,
            opacity: 0.8
        });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        this.scene.add(floor);

        // Walls
        const wallHeight = 8;
        const wallWidth = 20;
        
        // Back wall
        const backWallGeometry = new THREE.PlaneGeometry(wallWidth, wallHeight);
        const wallMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x1a1a2e,
            transparent: true,
            opacity: 0.9
        });
        const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
        backWall.position.set(0, wallHeight/2, -wallWidth/2);
        backWall.receiveShadow = true;
        this.scene.add(backWall);

        // Left wall
        const leftWall = new THREE.Mesh(backWallGeometry, wallMaterial);
        leftWall.position.set(-wallWidth/2, wallHeight/2, 0);
        leftWall.rotation.y = Math.PI/2;
        leftWall.receiveShadow = true;
        this.scene.add(leftWall);

        // Right wall
        const rightWall = new THREE.Mesh(backWallGeometry, wallMaterial);
        rightWall.position.set(wallWidth/2, wallHeight/2, 0);
        rightWall.rotation.y = -Math.PI/2;
        rightWall.receiveShadow = true;
        this.scene.add(rightWall);

        // Ceiling
        const ceiling = new THREE.Mesh(floorGeometry, wallMaterial);
        ceiling.position.y = wallHeight;
        ceiling.rotation.x = Math.PI / 2;
        this.scene.add(ceiling);

        this.updateLoadingProgress(20, 'Creating room structure...');
    }

    setupLighting() {
        // Ambient light
        this.lights.ambient = new THREE.AmbientLight(0x404040, 0.3);
        this.scene.add(this.lights.ambient);

        // Main directional light (window light)
        this.lights.directional = new THREE.DirectionalLight(0xffffff, 0.8);
        this.lights.directional.position.set(5, 10, 5);
        this.lights.directional.target.position.set(0, 0, 0);
        this.lights.directional.castShadow = true;
        this.lights.directional.shadow.mapSize.width = this.qualitySettings.shadowMapSize;
        this.lights.directional.shadow.mapSize.height = this.qualitySettings.shadowMapSize;
        this.lights.directional.shadow.camera.near = 0.5;
        this.lights.directional.shadow.camera.far = 50;
        this.lights.directional.shadow.camera.left = -10;
        this.lights.directional.shadow.camera.right = 10;
        this.lights.directional.shadow.camera.top = 10;
        this.lights.directional.shadow.camera.bottom = -10;
        this.lights.directional.shadow.bias = -0.0001;
        this.scene.add(this.lights.directional);
        this.scene.add(this.lights.directional.target);

        // Desk lamp (point light)
        this.lights.deskLamp = new THREE.PointLight(0xffcc00, 1, 8);
        this.lights.deskLamp.position.set(-3, 3, 2);
        this.lights.deskLamp.castShadow = true;
        this.lights.deskLamp.shadow.mapSize.width = 512;
        this.lights.deskLamp.shadow.mapSize.height = 512;
        this.scene.add(this.lights.deskLamp);

        // Monitor glow
        this.lights.monitor = new THREE.PointLight(0x00d4ff, 0.5, 4);
        this.lights.monitor.position.set(-4, 2.5, 2);
        this.scene.add(this.lights.monitor);

        // Room accent lighting
        this.lights.accent1 = new THREE.PointLight(0xff6b6b, 0.2, 6);
        this.lights.accent1.position.set(6, 2, -2);
        this.scene.add(this.lights.accent1);

        this.lights.accent2 = new THREE.PointLight(0x4ecdc4, 0.15, 5);
        this.lights.accent2.position.set(-6, 3, -8);
        this.scene.add(this.lights.accent2);

        // Start ambient lighting animations
        this.setupLightingAnimations();
        this.updateLoadingProgress(30, 'Setting up lighting...');
    }

    setupLightingAnimations() {
        // Subtle monitor glow pulse
        LightingAnimations.pulse(this.lights.monitor, 0.3, 0.7, 0.001);
        
        // Desk lamp flicker effect
        LightingAnimations.flicker(this.lights.deskLamp, 1, 0.1, 0.05);
        
        // Accent light breathing effect
        LightingAnimations.pulse(this.lights.accent1, 0.1, 0.3, 0.0008);
        LightingAnimations.pulse(this.lights.accent2, 0.1, 0.25, 0.0012);
    }

    createFurniture() {
        const furnitureList = [
            { create: () => this.createDeskArea(), delay: 0 },
            { create: () => this.createBedArea(), delay: 200 },
            { create: () => this.createWallDecorations(), delay: 400 },
            { create: () => this.createAccessories(), delay: 600 },
            { create: () => this.createTechCorner(), delay: 800 }
        ];

        furnitureList.forEach(({ create, delay }) => {
            setTimeout(create, delay);
        });

        this.updateLoadingProgress(80, 'Adding interactive elements...');
    }

    createDeskArea() {
        // Create desk using modular model
        const desk = FurnitureModels.createDesk({ x: -3, y: 0, z: 2 });
        this.scene.add(desk);
        this.furnitureObjects.push(desk);

        // Create laptop
        const laptop = FurnitureModels.createLaptop({ x: -3.5, y: 1.58, z: 2.2 });
        this.scene.add(laptop);
        
        // Add laptop to interactive objects
        const laptopMesh = laptop.children.find(child => child.geometry);
        if (laptopMesh) {
            this.interactionSystem.addInteractiveObject(laptopMesh, {
                type: 'laptop',
                action: 'showProjects'
            });
        }

        // Create monitor
        const monitor = FurnitureModels.createMonitor({ x: -4.5, y: 1.8, z: 2.5 });
        this.scene.add(monitor);
        
        const monitorMesh = monitor.children.find(child => child.geometry && child.geometry.type === 'BoxGeometry');
        if (monitorMesh) {
            this.interactionSystem.addInteractiveObject(monitorMesh, {
                type: 'monitor',
                action: 'showSkills'
            });
        }

        // Create keyboard
        const keyboard = FurnitureModels.createKeyboard({ x: -2.8, y: 1.58, z: 2.5 });
        this.scene.add(keyboard);
        
        const keyboardMesh = keyboard.children.find(child => child.geometry);
        if (keyboardMesh) {
            this.interactionSystem.addInteractiveObject(keyboardMesh, {
                type: 'keyboard',
                action: 'showCode'
            });
        }

        // Add entrance animation
        AnimationPresets.furnitureEntrance(desk, 0);
        AnimationPresets.furnitureEntrance(laptop, 100);
        AnimationPresets.furnitureEntrance(monitor, 200);
        AnimationPresets.furnitureEntrance(keyboard, 300);
    }

    createBedArea() {
        const bed = FurnitureModels.createBed({ x: 4, y: 0, z: -2 });
        this.scene.add(bed);
        this.furnitureObjects.push(bed);

        const nightstand = FurnitureModels.createNightstand({ x: 6, y: 0, z: -2 });
        this.scene.add(nightstand);

        const lamp = FurnitureModels.createLamp({ x: 6, y: 0.8, z: -2 });
        this.scene.add(lamp);

        // Add interactivity
        const mattress = bed.children.find(child => child.name === 'mattress' || 
                                         (child.geometry && child.geometry.type === 'BoxGeometry'));
        if (mattress) {
            this.interactionSystem.addInteractiveObject(mattress, {
                type: 'bed',
                action: 'showAbout'
            });
        }

        const lampShade = lamp.children.find(child => child.geometry && child.geometry.type === 'ConeGeometry');
        if (lampShade) {
            this.interactionSystem.addInteractiveObject(lampShade, {
                type: 'lamp',
                action: 'toggleLighting'
            });
        }

        // Entrance animations
        AnimationPresets.furnitureEntrance(bed, 0);
        AnimationPresets.furnitureEntrance(nightstand, 100);
        AnimationPresets.furnitureEntrance(lamp, 200);
    }

    createWallDecorations() {
        // Create picture frames
        const framePositions = [
            { x: -6, y: 3, z: -9.9 }, { x: -4, y: 3.5, z: -9.9 }, { x: -2, y: 3, z: -9.9 },
            { x: 2, y: 3.5, z: -9.9 }, { x: 4, y: 3, z: -9.9 }, { x: 6, y: 3.5, z: -9.9 }
        ];

        framePositions.forEach((pos, i) => {
            const frameGeometry = new THREE.BoxGeometry(1, 0.8, 0.1);
            const frameMaterial = ThreeUtils.createMetallicMaterial(0x444444);
            const frame = new THREE.Mesh(frameGeometry, frameMaterial);
            frame.position.set(pos.x, pos.y, pos.z);
            frame.castShadow = true;
            
            this.interactionSystem.addInteractiveObject(frame, {
                type: 'photo-frame',
                action: 'showPhotography',
                id: `frame-${i}`
            });
            
            this.scene.add(frame);
            
            // Add photo inside frame
            const photoGeometry = new THREE.PlaneGeometry(0.9, 0.7);
            const photoMaterial = new THREE.MeshLambertMaterial({ 
                color: 0x666666,
                transparent: true,
                opacity: 0.8 
            });
            const photo = new THREE.Mesh(photoGeometry, photoMaterial);
            photo.position.set(pos.x, pos.y, pos.z + 0.05);
            this.scene.add(photo);

            // Entrance animation
            AnimationPresets.furnitureEntrance(frame, i * 100);
        });

        // AI/ML Posters
        this.createTechPosters();
        this.createFloatingShelves();
    }

    createTechPosters() {
        const posterGeometry = new THREE.PlaneGeometry(1.2, 1.6);
        const posterMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x00d4ff, 
            transparent: true, 
            opacity: 0.7 
        });
        
        const poster1 = new THREE.Mesh(posterGeometry, posterMaterial);
        poster1.position.set(-8, 4, -9.9);
        this.interactionSystem.addInteractiveObject(poster1, {
            type: 'ai-poster',
            action: 'showProjects'
        });
        this.scene.add(poster1);

        const poster2 = new THREE.Mesh(posterGeometry, posterMaterial);
        poster2.position.set(8, 4, -9.9);
        this.interactionSystem.addInteractiveObject(poster2, {
            type: 'ml-poster',
            action: 'showSkills'
        });
        this.scene.add(poster2);

        AnimationPresets.furnitureEntrance(poster1, 100);
        AnimationPresets.furnitureEntrance(poster2, 200);
    }

    createFloatingShelves() {
        const shelfGeometry = new THREE.BoxGeometry(2, 0.1, 0.3);
        const shelfMaterial = ThreeUtils.createTexturedMaterial(0x8b4513);
        
        const positions = [
            { x: 0, y: 5, z: -9.8 },
            { x: 6, y: 2.5, z: -9.8 }
        ];

        positions.forEach((pos, i) => {
            const shelf = new THREE.Mesh(shelfGeometry, shelfMaterial);
            shelf.position.set(pos.x, pos.y, pos.z);
            shelf.castShadow = true;
            this.scene.add(shelf);

            // Add gadgets on first shelf
            if (i === 0) {
                this.createShelfGadgets(pos);
            }

            AnimationPresets.furnitureEntrance(shelf, i * 100);
        });
    }

    createShelfGadgets(shelfPos) {
        const gadgetGeometry = new THREE.BoxGeometry(0.2, 0.3, 0.15);
        const gadgetMaterial = ThreeUtils.createMetallicMaterial(0x333333);
        
        for (let i = 0; i < 4; i++) {
            const gadget = new THREE.Mesh(gadgetGeometry, gadgetMaterial);
            gadget.position.set(
                shelfPos.x - 0.6 + i * 0.4,
                shelfPos.y + 0.2,
                shelfPos.z + 0.1
            );
            gadget.castShadow = true;
            
            this.interactionSystem.addInteractiveObject(gadget, {
                type: 'gadget',
                action: 'showTechSkills'
            });
            
            this.scene.add(gadget);
            AnimationPresets.furnitureEntrance(gadget, i * 50);
        }
    }

    createAccessories() {
        // Coffee mug
        const mugGeometry = new THREE.CylinderGeometry(0.15, 0.12, 0.2);
        const mugMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
        const mug = new THREE.Mesh(mugGeometry, mugMaterial);
        mug.position.set(-2.5, 1.68, 1.5);
        mug.castShadow = true;
        
        this.interactionSystem.addInteractiveObject(mug, {
            type: 'coffee-mug',
            action: 'showPersonality'
        });
        this.scene.add(mug);

        // Steam particles
        this.createSteamEffect(mug.position);

        // Notebook
        const notebookGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.05);
        const notebookMaterial = ThreeUtils.createTexturedMaterial(0x8b4513);
        const notebook = new THREE.Mesh(notebookGeometry, notebookMaterial);
        notebook.position.set(-3.8, 1.58, 1.5);
        notebook.rotation.y = -0.3;
        notebook.castShadow = true;
        
        this.interactionSystem.addInteractiveObject(notebook, {
            type: 'notebook',
            action: 'showResume'
        });
        this.scene.add(notebook);

        // Plant
        const plant = FurnitureModels.createPlant({ x: -1.2, y: 1.58, z: 1.8 });
        this.scene.add(plant);
        
        const pot = plant.children.find(child => child.geometry && child.geometry.type === 'CylinderGeometry');
        if (pot) {
            this.interactionSystem.addInteractiveObject(pot, {
                type: 'plant',
                action: 'showWorkLife'
            });
        }

        // Entrance animations
        AnimationPresets.furnitureEntrance(mug, 0);
        AnimationPresets.furnitureEntrance(notebook, 100);
        AnimationPresets.furnitureEntrance(plant, 200);
    }

    createSteamEffect(mugPosition) {
        if (!this.qualitySettings.enablePostProcessing) return;

        const steamGeometry = new THREE.SphereGeometry(0.03);
        const steamMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xffffff, 
            transparent: true, 
            opacity: 0.3 
        });
        
        for (let i = 0; i < 5; i++) {
            const steam = new THREE.Mesh(steamGeometry, steamMaterial);
            steam.position.set(
                mugPosition.x + (Math.random() - 0.5) * 0.1,
                mugPosition.y + 0.2 + i * 0.1,
                mugPosition.z
            );
            this.scene.add(steam);
            
            // Animate steam rising and fading
            ObjectAnimations.float(steam, 0.05, 0.001);
            ObjectAnimations.fadeOut(steam, 3000 + i * 500);
        }
    }

    createTechCorner() {
        // Server rack
        const serverGeometry = new THREE.BoxGeometry(0.8, 1.5, 0.6);
        const serverMaterial = ThreeUtils.createMetallicMaterial(0x222222);
        const server = new THREE.Mesh(serverGeometry, serverMaterial);
        server.position.set(7, 0.75, 3);
        server.castShadow = true;
        
        this.interactionSystem.addInteractiveObject(server, {
            type: 'server-rack',
            action: 'showArchitecture'
        });
        this.scene.add(server);

        // LED indicators on server
        this.createServerLEDs(server.position);

        // VR Headset with stand
        this.createVRSetup();

        // 3D Printer
        this.create3DPrinter();

        // Arduino setup
        this.createArduinoSetup();

        // Entrance animations
        AnimationPresets.furnitureEntrance(server, 0);
    }

    createServerLEDs(serverPosition) {
        const ledGeometry = new THREE.SphereGeometry(0.02);
        const ledColors = [0x00ff00, 0xff0000, 0x0000ff];
        
        ledColors.forEach((color, i) => {
            const ledMaterial = new THREE.MeshBasicMaterial({ color });
            const led = new THREE.Mesh(ledGeometry, ledMaterial);
            led.position.set(
                serverPosition.x + 0.35,
                serverPosition.y + 0.3 + i * 0.15,
                serverPosition.z + 0.31
            );
            this.scene.add(led);
            
            // Blinking LED animation
            LightingAnimations.pulse(led, 0.5, 1, 0.002 + i * 0.001);
        });
    }

    createVRSetup() {
        const vrGeometry = new THREE.BoxGeometry(0.25, 0.15, 0.2);
        const vrMaterial = ThreeUtils.createMetallicMaterial(0x000000);
        const vrHeadset = new THREE.Mesh(vrGeometry, vrMaterial);
        vrHeadset.position.set(6, 1.7, -1.8);
        vrHeadset.castShadow = true;
        
        this.interactionSystem.addInteractiveObject(vrHeadset, {
            type: 'vr-headset',
            action: 'showFutureTech'
        });
        this.scene.add(vrHeadset);

        // VR Stand
        const standGeometry = new THREE.CylinderGeometry(0.1, 0.15, 0.3);
        const standMaterial = ThreeUtils.createMetallicMaterial(0x333333);
        const stand = new THREE.Mesh(standGeometry, standMaterial);
        stand.position.set(6, 1.55, -1.8);
        stand.castShadow = true;
        this.scene.add(stand);

        AnimationPresets.furnitureEntrance(vrHeadset, 100);
        AnimationPresets.furnitureEntrance(stand, 120);
    }

    create3DPrinter() {
        const printerGeometry = new THREE.BoxGeometry(0.8, 0.6, 0.8);
        const printerMaterial = ThreeUtils.createMetallicMaterial(0x444444);
        const printer = new THREE.Mesh(printerGeometry, printerMaterial);
        printer.position.set(8, 0.3, 2);
        printer.castShadow = true;
        
        this.interactionSystem.addInteractiveObject(printer, {
            type: '3d-printer',
            action: 'showMakerProjects'
        });
        this.scene.add(printer);

        AnimationPresets.furnitureEntrance(printer, 200);
    }

    createArduinoSetup() {
        const arduinoGeometry = new THREE.BoxGeometry(0.3, 0.05, 0.2);
        const arduinoMaterial = new THREE.MeshLambertMaterial({ color: 0x006400 });
        const arduino = new THREE.Mesh(arduinoGeometry, arduinoMaterial);
        arduino.position.set(6.5, 1.6, 2.8);
        arduino.castShadow = true;
        
        this.interactionSystem.addInteractiveObject(arduino, {
            type: 'arduino',
            action: 'showHardware'
        });
        this.scene.add(arduino);

        AnimationPresets.furnitureEntrance(arduino, 150);
    }

    setupAnimations() {
        // Add particle system for ambience
        if (this.qualitySettings.enablePostProcessing) {
            EnvironmentAnimations.particleSystem(this.scene, this.qualitySettings.particleCount, 'dust');
        }
        
        // Add subtle floating animation to some objects
        const floatingObjects = this.scene.children.filter(child => 
            child.name && (child.name.includes('gadget') || child.name.includes('plant'))
        );
        
        floatingObjects.forEach((obj, index) => {
            ObjectAnimations.float(obj, 0.02 + index * 0.01, 0.0005 + index * 0.0002);
        });
    }

    bindEvents() {
        window.addEventListener('resize', this.onWindowResize.bind(this));
        
        // Performance monitoring
        if (this.performanceMonitor.shouldReduceQuality()) {
            this.adjustQualitySettings();
        }
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    adjustQualitySettings() {
        // Reduce quality if performance is poor
        this.renderer.setPixelRatio(1);
        this.renderer.shadowMap.enabled = false;
        
        // Remove particle effects
        const particles = this.scene.children.find(child => child.type === 'Points');
        if (particles) {
            this.scene.remove(particles);
        }
        
        console.log('Quality reduced due to performance issues');
    }

    toggleRoomLighting() {
        const targetIntensity = this.lights.deskLamp.intensity > 0.5 ? 0.1 : 1.2;
        const targetAmbient = this.lights.ambient.intensity > 0.2 ? 0.1 : 0.5;
        
        // Smooth transition
        LightingAnimations.colorTransition(
            this.lights.deskLamp, 
            this.lights.deskLamp.color.getHex(), 
            targetIntensity > 0.5 ? 0xffcc00 : 0x444444, 
            500
        );
        
        GlobalAnimationManager.add('light-toggle', {
            duration: 500,
            easing: ThreeUtils.easeInOutCubic,
            onUpdate: (progress) => {
                const currentDesk = this.lights.deskLamp.intensity;
                const currentAmbient = this.lights.ambient.intensity;
                
                this.lights.deskLamp.intensity = ThreeUtils.lerp(currentDesk, targetIntensity, progress);
                this.lights.ambient.intensity = ThreeUtils.lerp(currentAmbient, targetAmbient, progress);
            }
        });
        
        // Visual feedback
        if (this.renderer.domElement.style.filter) {
            this.renderer.domElement.style.filter = '';
        } else {
            this.renderer.domElement.style.filter = 'brightness(0.7) sepia(0.1)';
            setTimeout(() => {
                this.renderer.domElement.style.filter = '';
            }, 100);
        }
    }

    updateLoadingProgress(percentage, text) {
        this.loadingProgress = percentage;
        const progressBar = document.getElementById('progress-bar');
        const loadingText = document.getElementById('loading-text');
        
        if (progressBar) progressBar.style.width = percentage + '%';
        if (loadingText) loadingText.textContent = text;
    }

    finishLoading() {
        setTimeout(() => {
            this.updateLoadingProgress(100, 'Welcome to my 3D portfolio!');
            
            setTimeout(() => {
                const loadingScreen = document.getElementById('loading-screen');
                loadingScreen.classList.add('hidden');
                this.isLoading = false;
                
                // Show instructions briefly
                const instructions = document.getElementById('instructions');
                if (instructions) {
                    setTimeout(() => {
                        instructions.style.opacity = '0.8';
                        setTimeout(() => {
                            instructions.style.opacity = '0.3';
                        }, 5000);
                    }, 1000);
                }
            }, 500);
        }, 1500);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        
        if (!this.isLoading) {
            // Update camera controls
            this.cameraController.update();
            
            // Update performance monitoring
            this.performanceMonitor.update();
            
            // Update global animation manager
            GlobalAnimationManager.update();
            
            // Auto-adjust quality if needed
            if (this.performanceMonitor.shouldReduceQuality()) {
                this.adjustQualitySettings();
            }
        }
        
        this.renderer.render(this.scene, this.camera);
    }

    destroy() {
        // Clean up resources
        if (this.interactionSystem) {
            this.interactionSystem.destroy();
        }
        
        // Remove event listeners
        window.removeEventListener('resize', this.onWindowResize);
        
        // Dispose of geometries and materials
        this.scene.traverse((object) => {
            if (object.geometry) {
                object.geometry.dispose();
            }
            if (object.material) {
                if (Array.isArray(object.material)) {
                    object.material.forEach(material => material.dispose());
                } else {
                    object.material.dispose();
                }
            }
        });
        
        this.renderer.dispose();
    }
}

// Initialize modal system
document.addEventListener('DOMContentLoaded', () => {
    const modalClose = document.getElementById('modal-close');
    const modalOverlay = document.getElementById('modal-overlay');
    
    modalClose.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
    });
    
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
        }
    });
    
    // Initialize the 3D scene
    new BedroomPortfolio();
});