class CameraAnimations {
    static focusOnObject(camera, target, duration = 1500) {
        const startPosition = camera.position.clone();
        const startTarget = new THREE.Vector3(0, 2, 0); // Current look-at target
        
        // Calculate ideal viewing position for the target
        const idealPosition = this.calculateIdealCameraPosition(target);
        const idealTarget = target.position.clone();
        
        GlobalAnimationManager.add('camera-focus', {
            duration: duration,
            easing: ThreeUtils.easeInOutCubic,
            onUpdate: (progress) => {
                camera.position.lerpVectors(startPosition, idealPosition, progress);
                const currentTarget = new THREE.Vector3().lerpVectors(startTarget, idealTarget, progress);
                camera.lookAt(currentTarget);
            },
            onComplete: () => {
                GlobalEventEmitter.emit('camera-focus-complete', target);
            }
        });
    }

    static returnToOverview(camera, originalPosition, originalTarget, duration = 1500) {
        const startPosition = camera.position.clone();
        const startLookAt = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion).add(camera.position);
        
        GlobalAnimationManager.add('camera-return', {
            duration: duration,
            easing: ThreeUtils.easeInOutCubic,
            onUpdate: (progress) => {
                camera.position.lerpVectors(startPosition, originalPosition, progress);
                const currentTarget = new THREE.Vector3().lerpVectors(startLookAt, originalTarget, progress);
                camera.lookAt(currentTarget);
            }
        });
    }

    static calculateIdealCameraPosition(target) {
        const bbox = new THREE.Box3().setFromObject(target);
        const center = bbox.getCenter(new THREE.Vector3());
        const size = bbox.getSize(new THREE.Vector3());
        
        const maxDim = Math.max(size.x, size.y, size.z);
        const distance = maxDim * 2.5;
        
        // Position camera at an angle that provides good visibility
        const angle = Math.PI / 4;
        return new THREE.Vector3(
            center.x + distance * Math.cos(angle),
            center.y + distance * 0.5,
            center.z + distance * Math.sin(angle)
        );
    }

    static shake(camera, intensity = 0.1, duration = 300) {
        const originalPosition = camera.position.clone();
        const shakeCount = Math.floor(duration / 16); // ~60fps
        let currentShake = 0;
        
        const shakeInterval = setInterval(() => {
            if (currentShake >= shakeCount) {
                clearInterval(shakeInterval);
                camera.position.copy(originalPosition);
                return;
            }
            
            const progress = currentShake / shakeCount;
            const fadeOut = 1 - progress;
            const currentIntensity = intensity * fadeOut;
            
            camera.position.set(
                originalPosition.x + (Math.random() - 0.5) * currentIntensity,
                originalPosition.y + (Math.random() - 0.5) * currentIntensity,
                originalPosition.z + (Math.random() - 0.5) * currentIntensity
            );
            
            currentShake++;
        }, 16);
    }
}

class ObjectAnimations {
    static float(object, amplitude = 0.1, speed = 0.002) {
        const originalY = object.position.y;
        const animationId = `float-${object.uuid}`;
        
        const animate = () => {
            const time = Date.now();
            object.position.y = originalY + Math.sin(time * speed) * amplitude;
            
            if (GlobalAnimationManager.animations.has(animationId)) {
                requestAnimationFrame(animate);
            }
        };
        
        GlobalAnimationManager.add(animationId, {
            duration: Infinity,
            onUpdate: animate
        });
    }

    static pulse(object, minScale = 0.95, maxScale = 1.05, speed = 0.003) {
        const originalScale = object.scale.clone();
        const animationId = `pulse-${object.uuid}`;
        
        const animate = () => {
            const time = Date.now();
            const scale = minScale + (maxScale - minScale) * (Math.sin(time * speed) + 1) / 2;
            object.scale.copy(originalScale).multiplyScalar(scale);
            
            if (GlobalAnimationManager.animations.has(animationId)) {
                requestAnimationFrame(animate);
            }
        };
        
        GlobalAnimationManager.add(animationId, {
            duration: Infinity,
            onUpdate: animate
        });
    }

    static rotate(object, axis = 'y', speed = 0.01) {
        const animationId = `rotate-${object.uuid}`;
        
        const animate = () => {
            switch(axis) {
                case 'x':
                    object.rotation.x += speed;
                    break;
                case 'y':
                    object.rotation.y += speed;
                    break;
                case 'z':
                    object.rotation.z += speed;
                    break;
            }
            
            if (GlobalAnimationManager.animations.has(animationId)) {
                requestAnimationFrame(animate);
            }
        };
        
        GlobalAnimationManager.add(animationId, {
            duration: Infinity,
            onUpdate: animate
        });
    }

    static fadeIn(object, duration = 1000) {
        if (!object.material) return;
        
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        const originalOpacities = materials.map(mat => mat.opacity || 1);
        
        materials.forEach(material => {
            if (!material.transparent) {
                material.transparent = true;
            }
            material.opacity = 0;
        });
        
        GlobalAnimationManager.add(`fade-in-${object.uuid}`, {
            duration: duration,
            easing: ThreeUtils.easeInOutCubic,
            onUpdate: (progress) => {
                materials.forEach((material, index) => {
                    material.opacity = originalOpacities[index] * progress;
                });
            }
        });
    }

    static fadeOut(object, duration = 1000) {
        if (!object.material) return;
        
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        const originalOpacities = materials.map(mat => mat.opacity || 1);
        
        GlobalAnimationManager.add(`fade-out-${object.uuid}`, {
            duration: duration,
            easing: ThreeUtils.easeInOutCubic,
            onUpdate: (progress) => {
                materials.forEach((material, index) => {
                    material.opacity = originalOpacities[index] * (1 - progress);
                });
            },
            onComplete: () => {
                materials.forEach((material, index) => {
                    material.opacity = originalOpacities[index];
                });
            }
        });
    }

    static slideIn(object, direction = 'up', distance = 5, duration = 1000) {
        const originalPosition = object.position.clone();
        let startPosition = originalPosition.clone();
        
        switch(direction) {
            case 'up':
                startPosition.y -= distance;
                break;
            case 'down':
                startPosition.y += distance;
                break;
            case 'left':
                startPosition.x -= distance;
                break;
            case 'right':
                startPosition.x += distance;
                break;
        }
        
        object.position.copy(startPosition);
        
        GlobalAnimationManager.add(`slide-in-${object.uuid}`, {
            duration: duration,
            easing: ThreeUtils.easeInOutCubic,
            onUpdate: (progress) => {
                object.position.lerpVectors(startPosition, originalPosition, progress);
            }
        });
    }

    static bounce(object, height = 0.5, duration = 600) {
        const originalY = object.position.y;
        
        GlobalAnimationManager.add(`bounce-${object.uuid}`, {
            duration: duration,
            easing: (t) => {
                // Bounce easing function
                const n1 = 7.5625;
                const d1 = 2.75;
                
                if (t < 1 / d1) {
                    return n1 * t * t;
                } else if (t < 2 / d1) {
                    return n1 * (t -= 1.5 / d1) * t + 0.75;
                } else if (t < 2.5 / d1) {
                    return n1 * (t -= 2.25 / d1) * t + 0.9375;
                } else {
                    return n1 * (t -= 2.625 / d1) * t + 0.984375;
                }
            },
            onUpdate: (progress) => {
                object.position.y = originalY + height * progress;
            }
        });
    }
}

class LightingAnimations {
    static flicker(light, baseIntensity = 1, flickerAmount = 0.2, speed = 0.1) {
        const animationId = `flicker-${light.uuid}`;
        
        const animate = () => {
            const time = Date.now();
            const flicker = Math.sin(time * speed) * Math.cos(time * speed * 1.3) * flickerAmount;
            light.intensity = baseIntensity + flicker;
            
            if (GlobalAnimationManager.animations.has(animationId)) {
                requestAnimationFrame(animate);
            }
        };
        
        GlobalAnimationManager.add(animationId, {
            duration: Infinity,
            onUpdate: animate
        });
    }

    static pulse(light, minIntensity = 0.5, maxIntensity = 1.5, speed = 0.002) {
        const animationId = `light-pulse-${light.uuid}`;
        
        const animate = () => {
            const time = Date.now();
            const intensity = minIntensity + (maxIntensity - minIntensity) * (Math.sin(time * speed) + 1) / 2;
            light.intensity = intensity;
            
            if (GlobalAnimationManager.animations.has(animationId)) {
                requestAnimationFrame(animate);
            }
        };
        
        GlobalAnimationManager.add(animationId, {
            duration: Infinity,
            onUpdate: animate
        });
    }

    static colorTransition(light, fromColor, toColor, duration = 2000) {
        const startColor = new THREE.Color(fromColor);
        const endColor = new THREE.Color(toColor);
        
        GlobalAnimationManager.add(`color-transition-${light.uuid}`, {
            duration: duration,
            easing: ThreeUtils.easeInOutCubic,
            onUpdate: (progress) => {
                light.color.lerpColors(startColor, endColor, progress);
            }
        });
    }

    static sunrise(lights, duration = 5000) {
        const startColors = lights.map(light => light.color.clone());
        const startIntensities = lights.map(light => light.intensity);
        
        // Simulate sunrise color progression
        const sunriseColors = [
            new THREE.Color(0x000033), // Deep night
            new THREE.Color(0x000066), // Early dawn
            new THREE.Color(0x003366), // Dawn
            new THREE.Color(0x006699), // Light dawn
            new THREE.Color(0xffcc66), // Sunrise
            new THREE.Color(0xffffff)  // Day
        ];
        
        GlobalAnimationManager.add('sunrise', {
            duration: duration,
            easing: ThreeUtils.easeInOutCubic,
            onUpdate: (progress) => {
                const colorIndex = progress * (sunriseColors.length - 1);
                const lowerIndex = Math.floor(colorIndex);
                const upperIndex = Math.ceil(colorIndex);
                const localProgress = colorIndex - lowerIndex;
                
                const currentColor = new THREE.Color().lerpColors(
                    sunriseColors[lowerIndex] || sunriseColors[0],
                    sunriseColors[upperIndex] || sunriseColors[sunriseColors.length - 1],
                    localProgress
                );
                
                lights.forEach((light, index) => {
                    light.color.copy(currentColor);
                    light.intensity = startIntensities[index] * (0.1 + 0.9 * progress);
                });
            }
        });
    }
}

class EnvironmentAnimations {
    static dayNightCycle(scene, duration = 10000) {
        const fog = scene.fog;
        const originalFogColor = fog ? fog.color.clone() : new THREE.Color(0x1a1a2e);
        
        const dayFogColor = new THREE.Color(0x87ceeb);
        const nightFogColor = new THREE.Color(0x1a1a2e);
        
        GlobalAnimationManager.add('day-night-cycle', {
            duration: duration,
            easing: (t) => 0.5 * (1 + Math.sin(2 * Math.PI * t - Math.PI / 2)), // Sine wave
            onUpdate: (progress) => {
                if (fog) {
                    fog.color.lerpColors(nightFogColor, dayFogColor, progress);
                }
                
                // Update scene background if needed
                if (scene.background && scene.background.isColor) {
                    const nightBg = new THREE.Color(0x0a0a0a);
                    const dayBg = new THREE.Color(0x87ceeb);
                    scene.background.lerpColors(nightBg, dayBg, progress * 0.3);
                }
            }
        });
    }

    static particleSystem(scene, count = 100, type = 'dust') {
        const particles = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        const velocities = new Float32Array(count * 3);
        
        for (let i = 0; i < count * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 20;     // x
            positions[i + 1] = Math.random() * 10;         // y
            positions[i + 2] = (Math.random() - 0.5) * 20; // z
            
            velocities[i] = (Math.random() - 0.5) * 0.02;     // vx
            velocities[i + 1] = -Math.random() * 0.01;        // vy (falling)
            velocities[i + 2] = (Math.random() - 0.5) * 0.02; // vz
        }
        
        particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particles.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
        
        let material;
        switch(type) {
            case 'dust':
                material = new THREE.PointsMaterial({
                    color: 0xffffff,
                    size: 0.05,
                    transparent: true,
                    opacity: 0.3
                });
                break;
            case 'sparkles':
                material = new THREE.PointsMaterial({
                    color: 0x00d4ff,
                    size: 0.1,
                    transparent: true,
                    opacity: 0.8
                });
                break;
            default:
                material = new THREE.PointsMaterial({
                    color: 0xcccccc,
                    size: 0.02,
                    transparent: true,
                    opacity: 0.2
                });
        }
        
        const particleSystem = new THREE.Points(particles, material);
        scene.add(particleSystem);
        
        // Animate particles
        const animateParticles = () => {
            const positions = particleSystem.geometry.attributes.position.array;
            const velocities = particleSystem.geometry.attributes.velocity.array;
            
            for (let i = 0; i < positions.length; i += 3) {
                positions[i] += velocities[i];
                positions[i + 1] += velocities[i + 1];
                positions[i + 2] += velocities[i + 2];
                
                // Reset particles that fall too low
                if (positions[i + 1] < -1) {
                    positions[i + 1] = 10;
                    positions[i] = (Math.random() - 0.5) * 20;
                    positions[i + 2] = (Math.random() - 0.5) * 20;
                }
                
                // Keep particles within bounds
                if (Math.abs(positions[i]) > 10) {
                    velocities[i] *= -1;
                }
                if (Math.abs(positions[i + 2]) > 10) {
                    velocities[i + 2] *= -1;
                }
            }
            
            particleSystem.geometry.attributes.position.needsUpdate = true;
            
            if (scene.getObjectById(particleSystem.id)) {
                requestAnimationFrame(animateParticles);
            }
        };
        
        animateParticles();
        
        return particleSystem;
    }
}

class TransitionAnimations {
    static sceneTransition(fromScene, toScene, camera, renderer, duration = 1000, type = 'fade') {
        switch(type) {
            case 'fade':
                this.fadeTransition(fromScene, toScene, camera, renderer, duration);
                break;
            case 'slide':
                this.slideTransition(fromScene, toScene, camera, renderer, duration);
                break;
            case 'zoom':
                this.zoomTransition(fromScene, toScene, camera, renderer, duration);
                break;
        }
    }

    static fadeTransition(fromScene, toScene, camera, renderer, duration) {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: black;
            z-index: 9999;
            opacity: 0;
            pointer-events: none;
        `;
        document.body.appendChild(overlay);
        
        // Fade out
        GlobalAnimationManager.add('fade-out', {
            duration: duration / 2,
            easing: ThreeUtils.easeInOutCubic,
            onUpdate: (progress) => {
                overlay.style.opacity = progress;
            },
            onComplete: () => {
                // Switch scenes
                // Fade in
                GlobalAnimationManager.add('fade-in', {
                    duration: duration / 2,
                    easing: ThreeUtils.easeInOutCubic,
                    onUpdate: (progress) => {
                        overlay.style.opacity = 1 - progress;
                    },
                    onComplete: () => {
                        document.body.removeChild(overlay);
                    }
                });
            }
        });
    }
}

// Global animation presets
const AnimationPresets = {
    // Entrance animations for furniture
    furnitureEntrance: (object, delay = 0) => {
        setTimeout(() => {
            ObjectAnimations.fadeIn(object, 800);
            ObjectAnimations.slideIn(object, 'up', 2, 800);
        }, delay);
    },
    
    // Hover effects for interactive objects
    interactiveHover: (object) => {
        ObjectAnimations.pulse(object, 1, 1.05, 0.005);
    },
    
    // Click feedback
    clickFeedback: (object) => {
        ObjectAnimations.bounce(object, 0.1, 300);
    },
    
    // Ambient lighting
    ambientGlow: (lights) => {
        lights.forEach((light, index) => {
            setTimeout(() => {
                LightingAnimations.pulse(light, 0.8, 1.2, 0.001 + index * 0.0005);
            }, index * 200);
        });
    },
    
    // Loading sequence
    loadingSequence: (objects) => {
        objects.forEach((object, index) => {
            AnimationPresets.furnitureEntrance(object, index * 100);
        });
    }
};