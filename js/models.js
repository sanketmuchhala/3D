class FurnitureModels {
    static createDesk(position = { x: -3, y: 0, z: 2 }) {
        const deskGroup = new THREE.Group();
        
        // Main desk surface
        const deskGeometry = new THREE.BoxGeometry(4, 0.1, 2);
        const woodMaterial = ThreeUtils.createTexturedMaterial(0x8b4513);
        const deskSurface = new THREE.Mesh(deskGeometry, woodMaterial);
        deskSurface.position.set(position.x, position.y + 1.5, position.z);
        deskSurface.castShadow = true;
        deskSurface.receiveShadow = true;
        deskGroup.add(deskSurface);

        // Desk legs with more detail
        const legGeometry = new THREE.CylinderGeometry(0.08, 0.12, 1.5);
        const metalMaterial = ThreeUtils.createMetallicMaterial(0x444444);
        
        const legPositions = [
            [position.x - 1.8, position.y + 0.75, position.z - 0.8],
            [position.x - 1.8, position.y + 0.75, position.z + 0.8],
            [position.x + 1.8, position.y + 0.75, position.z - 0.8],
            [position.x + 1.8, position.y + 0.75, position.z + 0.8]
        ];
        
        legPositions.forEach(pos => {
            const leg = new THREE.Mesh(legGeometry, metalMaterial);
            leg.position.set(...pos);
            leg.castShadow = true;
            deskGroup.add(leg);
        });

        // Cable management
        const cableGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.5);
        const cableMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 });
        
        for (let i = 0; i < 3; i++) {
            const cable = new THREE.Mesh(cableGeometry, cableMaterial);
            cable.position.set(position.x + 1.5, position.y + 1.2, position.z - 0.5 + i * 0.1);
            cable.rotation.z = Math.PI / 4;
            deskGroup.add(cable);
        }

        return deskGroup;
    }

    static createLaptop(position = { x: -3.5, y: 1.58, z: 2.2 }) {
        const laptopGroup = new THREE.Group();
        
        // Laptop base
        const baseGeometry = new THREE.BoxGeometry(1.2, 0.05, 0.8);
        const laptopMaterial = ThreeUtils.createMetallicMaterial(0x2c2c2c);
        const base = new THREE.Mesh(baseGeometry, laptopMaterial);
        base.position.set(position.x, position.y, position.z);
        base.castShadow = true;
        laptopGroup.add(base);

        // Laptop screen
        const screenGeometry = new THREE.BoxGeometry(1.15, 0.7, 0.03);
        const screen = new THREE.Mesh(screenGeometry, laptopMaterial);
        screen.position.set(position.x, position.y + 0.4, position.z - 0.35);
        screen.rotation.x = -Math.PI * 0.15;
        screen.castShadow = true;
        laptopGroup.add(screen);

        // Screen display
        const displayGeometry = new THREE.PlaneGeometry(1.1, 0.65);
        const displayMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x001122,
            transparent: true,
            opacity: 0.9
        });
        const display = new THREE.Mesh(displayGeometry, displayMaterial);
        display.position.set(position.x, position.y + 0.4, position.z - 0.35 + 0.02);
        display.rotation.x = -Math.PI * 0.15;
        laptopGroup.add(display);

        // Code lines on screen
        const codeLineGeometry = new THREE.PlaneGeometry(0.8, 0.02);
        const codeMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x00ff41,
            transparent: true,
            opacity: 0.8
        });
        
        for (let i = 0; i < 8; i++) {
            const codeLine = new THREE.Mesh(codeLineGeometry, codeMaterial);
            const offset = (i - 4) * 0.06;
            codeLine.position.set(
                position.x - 0.1, 
                position.y + 0.4 + offset * Math.cos(Math.PI * 0.15), 
                position.z - 0.35 + 0.025 + offset * Math.sin(Math.PI * 0.15)
            );
            codeLine.rotation.x = -Math.PI * 0.15;
            laptopGroup.add(codeLine);
        }

        // Trackpad
        const trackpadGeometry = new THREE.PlaneGeometry(0.4, 0.3);
        const trackpadMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x333333,
            transparent: true,
            opacity: 0.8
        });
        const trackpad = new THREE.Mesh(trackpadGeometry, trackpadMaterial);
        trackpad.position.set(position.x, position.y + 0.026, position.z + 0.15);
        trackpad.rotation.x = -Math.PI / 2;
        laptopGroup.add(trackpad);

        return laptopGroup;
    }

    static createMonitor(position = { x: -4.5, y: 1.8, z: 2.5 }) {
        const monitorGroup = new THREE.Group();
        
        // Monitor stand
        const standGeometry = new THREE.CylinderGeometry(0.08, 0.12, 0.4);
        const standMaterial = ThreeUtils.createMetallicMaterial(0x222222);
        const stand = new THREE.Mesh(standGeometry, standMaterial);
        stand.position.set(position.x, position.y - 0.5, position.z);
        stand.castShadow = true;
        monitorGroup.add(stand);

        // Monitor base
        const baseGeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.05);
        const base = new THREE.Mesh(baseGeometry, standMaterial);
        base.position.set(position.x, position.y - 0.7, position.z);
        base.castShadow = true;
        monitorGroup.add(base);

        // Monitor screen frame
        const frameGeometry = new THREE.BoxGeometry(1.6, 1, 0.08);
        const frameMaterial = ThreeUtils.createMetallicMaterial(0x111111);
        const frame = new THREE.Mesh(frameGeometry, frameMaterial);
        frame.position.set(position.x, position.y, position.z);
        frame.castShadow = true;
        monitorGroup.add(frame);

        // Screen
        const screenGeometry = new THREE.PlaneGeometry(1.5, 0.9);
        const screenMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x001a33,
            transparent: true,
            opacity: 0.9
        });
        const screen = new THREE.Mesh(screenGeometry, screenMaterial);
        screen.position.set(position.x, position.y, position.z + 0.041);
        monitorGroup.add(screen);

        // Dashboard elements
        this.createDashboardElements(monitorGroup, position);

        // Monitor glow
        const glowGeometry = new THREE.PlaneGeometry(1.4, 0.85);
        const glowMaterial = ThreeUtils.createGlowMaterial(0x0066cc, 0.15);
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        glow.position.set(position.x, position.y, position.z + 0.045);
        monitorGroup.add(glow);

        return monitorGroup;
    }

    static createDashboardElements(parent, position) {
        // Create simple dashboard visualization
        const colors = [0x00ff00, 0xff0000, 0x0000ff, 0xffff00];
        
        for (let i = 0; i < 4; i++) {
            // Data bars
            const barGeometry = new THREE.PlaneGeometry(0.1, 0.3 + Math.random() * 0.3);
            const barMaterial = new THREE.MeshBasicMaterial({ 
                color: colors[i],
                transparent: true,
                opacity: 0.7
            });
            const bar = new THREE.Mesh(barGeometry, barMaterial);
            bar.position.set(
                position.x - 0.4 + i * 0.25,
                position.y - 0.1,
                position.z + 0.042
            );
            parent.add(bar);
        }

        // Circular progress indicators
        const circleGeometry = new THREE.RingGeometry(0.05, 0.08, 16);
        const circleMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x00ffff,
            transparent: true,
            opacity: 0.6
        });
        
        for (let i = 0; i < 3; i++) {
            const circle = new THREE.Mesh(circleGeometry, circleMaterial);
            circle.position.set(
                position.x - 0.3 + i * 0.3,
                position.y + 0.2,
                position.z + 0.042
            );
            parent.add(circle);
        }
    }

    static createKeyboard(position = { x: -2.8, y: 1.58, z: 2.5 }) {
        const keyboardGroup = new THREE.Group();
        
        // Keyboard base
        const baseGeometry = new THREE.BoxGeometry(1.2, 0.08, 0.45);
        const keyboardMaterial = ThreeUtils.createMetallicMaterial(0x1a1a1a);
        const base = new THREE.Mesh(baseGeometry, keyboardMaterial);
        base.position.set(position.x, position.y, position.z);
        base.castShadow = true;
        keyboardGroup.add(base);

        // Individual keys
        const keyGeometry = new THREE.BoxGeometry(0.06, 0.02, 0.06);
        const keyMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
        
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 15; col++) {
                const key = new THREE.Mesh(keyGeometry, keyMaterial);
                key.position.set(
                    position.x - 0.5 + col * 0.07,
                    position.y + 0.045,
                    position.z - 0.15 + row * 0.08
                );
                key.castShadow = true;
                keyboardGroup.add(key);
            }
        }

        // RGB lighting strip
        const rgbGeometry = new THREE.BoxGeometry(1.15, 0.01, 0.02);
        const rgbMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xff0080,
            transparent: true,
            opacity: 0.8
        });
        const rgbStrip = new THREE.Mesh(rgbGeometry, rgbMaterial);
        rgbStrip.position.set(position.x, position.y + 0.05, position.z + 0.2);
        keyboardGroup.add(rgbStrip);

        return keyboardGroup;
    }

    static createBed(position = { x: 4, y: 0, z: -2 }) {
        const bedGroup = new THREE.Group();
        
        // Bed frame
        const frameGeometry = new THREE.BoxGeometry(3.5, 0.4, 2.2);
        const frameMaterial = ThreeUtils.createTexturedMaterial(0x8b4513);
        const frame = new THREE.Mesh(frameGeometry, frameMaterial);
        frame.position.set(position.x, position.y + 0.5, position.z);
        frame.castShadow = true;
        frame.receiveShadow = true;
        bedGroup.add(frame);

        // Mattress
        const mattressGeometry = new THREE.BoxGeometry(3.3, 0.3, 2);
        const mattressMaterial = new THREE.MeshLambertMaterial({ color: 0xf8f8ff });
        const mattress = new THREE.Mesh(mattressGeometry, mattressMaterial);
        mattress.position.set(position.x, position.y + 0.85, position.z);
        mattress.castShadow = true;
        mattress.receiveShadow = true;
        bedGroup.add(mattress);

        // Bed sheets with subtle texture
        const sheetGeometry = new THREE.BoxGeometry(3.3, 0.05, 2);
        const sheetMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xe6e6fa,
            transparent: true,
            opacity: 0.9
        });
        const sheet = new THREE.Mesh(sheetGeometry, sheetMaterial);
        sheet.position.set(position.x, position.y + 1.02, position.z);
        sheet.castShadow = true;
        bedGroup.add(sheet);

        // Pillows with varied positions
        this.createPillows(bedGroup, position);
        
        // Headboard
        const headboardGeometry = new THREE.BoxGeometry(3.5, 1.5, 0.1);
        const headboard = new THREE.Mesh(headboardGeometry, frameMaterial);
        headboard.position.set(position.x, position.y + 1.5, position.z - 1.05);
        headboard.castShadow = true;
        bedGroup.add(headboard);

        return bedGroup;
    }

    static createPillows(parent, bedPosition) {
        const pillowGeometry = new THREE.BoxGeometry(0.7, 0.25, 0.5);
        const pillowColors = [0xffffff, 0xf0f8ff, 0xe6e6fa];
        
        pillowColors.forEach((color, i) => {
            const pillowMaterial = new THREE.MeshLambertMaterial({ color });
            const pillow = new THREE.Mesh(pillowGeometry, pillowMaterial);
            pillow.position.set(
                bedPosition.x - 0.8 + i * 0.8,
                bedPosition.y + 1.15,
                bedPosition.z - 0.6
            );
            pillow.rotation.y = (Math.random() - 0.5) * 0.4;
            pillow.rotation.z = (Math.random() - 0.5) * 0.2;
            pillow.castShadow = true;
            parent.add(pillow);
        });
    }

    static createNightstand(position = { x: 6, y: 0, z: -2 }) {
        const nightstandGroup = new THREE.Group();
        
        // Main body
        const bodyGeometry = new THREE.BoxGeometry(0.8, 0.6, 0.5);
        const woodMaterial = ThreeUtils.createTexturedMaterial(0x8b4513);
        const body = new THREE.Mesh(bodyGeometry, woodMaterial);
        body.position.set(position.x, position.y + 0.5, position.z);
        body.castShadow = true;
        body.receiveShadow = true;
        nightstandGroup.add(body);

        // Drawer handle
        const handleGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.1);
        const handleMaterial = ThreeUtils.createMetallicMaterial(0x444444);
        const handle = new THREE.Mesh(handleGeometry, handleMaterial);
        handle.position.set(position.x + 0.35, position.y + 0.5, position.z);
        handle.rotation.z = Math.PI / 2;
        handle.castShadow = true;
        nightstandGroup.add(handle);

        // Table surface details
        const surfaceGeometry = new THREE.PlaneGeometry(0.75, 0.45);
        const surfaceMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x9b5a2d,
            transparent: true,
            opacity: 0.8
        });
        const surface = new THREE.Mesh(surfaceGeometry, surfaceMaterial);
        surface.position.set(position.x, position.y + 0.81, position.z);
        surface.rotation.x = -Math.PI / 2;
        nightstandGroup.add(surface);

        return nightstandGroup;
    }

    static createLamp(position = { x: 6, y: 0.8, z: -2 }) {
        const lampGroup = new THREE.Group();
        
        // Lamp base
        const baseGeometry = new THREE.CylinderGeometry(0.12, 0.15, 0.25);
        const baseMaterial = ThreeUtils.createMetallicMaterial(0x666666);
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.position.set(position.x, position.y + 0.125, position.z);
        base.castShadow = true;
        lampGroup.add(base);

        // Lamp pole
        const poleGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.4);
        const poleMaterial = new THREE.MeshLambertMaterial({ color: 0x444444 });
        const pole = new THREE.Mesh(poleGeometry, poleMaterial);
        pole.position.set(position.x, position.y + 0.45, position.z);
        pole.castShadow = true;
        lampGroup.add(pole);

        // Lamp shade
        const shadeGeometry = new THREE.ConeGeometry(0.3, 0.4, 8);
        const shadeMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xfffff0,
            transparent: true,
            opacity: 0.9
        });
        const shade = new THREE.Mesh(shadeGeometry, shadeMaterial);
        shade.position.set(position.x, position.y + 0.8, position.z);
        shade.castShadow = true;
        lampGroup.add(shade);

        // Inner light glow
        const glowGeometry = new THREE.ConeGeometry(0.25, 0.35, 8);
        const glowMaterial = ThreeUtils.createGlowMaterial(0xffff99, 0.3);
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        glow.position.set(position.x, position.y + 0.8, position.z);
        lampGroup.add(glow);

        return lampGroup;
    }

    static createPlant(position = { x: -1.2, y: 1.58, z: 1.8 }) {
        const plantGroup = new THREE.Group();
        
        // Pot
        const potGeometry = new THREE.CylinderGeometry(0.15, 0.12, 0.2);
        const potMaterial = new THREE.MeshLambertMaterial({ color: 0x8b4513 });
        const pot = new THREE.Mesh(potGeometry, potMaterial);
        pot.position.set(position.x, position.y + 0.1, position.z);
        pot.castShadow = true;
        plantGroup.add(pot);

        // Soil
        const soilGeometry = new THREE.CylinderGeometry(0.14, 0.14, 0.02);
        const soilMaterial = new THREE.MeshLambertMaterial({ color: 0x2f1b14 });
        const soil = new THREE.Mesh(soilGeometry, soilMaterial);
        soil.position.set(position.x, position.y + 0.19, position.z);
        plantGroup.add(soil);

        // Plant leaves (Monstera-style)
        this.createMonsteraLeaves(plantGroup, position);

        return plantGroup;
    }

    static createMonsteraLeaves(parent, potPosition) {
        const leafMaterial = new THREE.MeshLambertMaterial({ color: 0x228b22 });
        
        // Main stem
        const stemGeometry = new THREE.CylinderGeometry(0.005, 0.008, 0.3);
        const stemMaterial = new THREE.MeshLambertMaterial({ color: 0x8b4513 });
        const stem = new THREE.Mesh(stemGeometry, stemMaterial);
        stem.position.set(potPosition.x, potPosition.y + 0.35, potPosition.z);
        parent.add(stem);

        // Large leaves
        const leafPositions = [
            { angle: 0, height: 0.4, size: { x: 0.15, y: 0.2, z: 0.05 } },
            { angle: 2, height: 0.35, size: { x: 0.12, y: 0.18, z: 0.04 } },
            { angle: 4, height: 0.45, size: { x: 0.13, y: 0.19, z: 0.04 } },
            { angle: 1.5, height: 0.3, size: { x: 0.1, y: 0.15, z: 0.03 } },
            { angle: 3.5, height: 0.38, size: { x: 0.11, y: 0.16, z: 0.03 } }
        ];

        leafPositions.forEach(leaf => {
            const leafGeometry = new THREE.SphereGeometry(1, 8, 6);
            leafGeometry.scale(leaf.size.x, leaf.size.y, leaf.size.z);
            
            const leafMesh = new THREE.Mesh(leafGeometry, leafMaterial);
            const radius = 0.1;
            leafMesh.position.set(
                potPosition.x + Math.cos(leaf.angle) * radius,
                potPosition.y + leaf.height,
                potPosition.z + Math.sin(leaf.angle) * radius
            );
            leafMesh.rotation.y = leaf.angle;
            leafMesh.rotation.x = (Math.random() - 0.5) * 0.5;
            leafMesh.castShadow = true;
            parent.add(leafMesh);

            // Leaf stem
            const leafStemGeometry = new THREE.CylinderGeometry(0.002, 0.003, 0.08);
            const leafStem = new THREE.Mesh(leafStemGeometry, stemMaterial);
            leafStem.position.set(
                potPosition.x + Math.cos(leaf.angle) * radius * 0.5,
                potPosition.y + leaf.height - 0.05,
                potPosition.z + Math.sin(leaf.angle) * radius * 0.5
            );
            leafStem.rotation.z = Math.cos(leaf.angle) * 0.3;
            leafStem.rotation.x = Math.sin(leaf.angle) * 0.3;
            parent.add(leafStem);
        });
    }
}